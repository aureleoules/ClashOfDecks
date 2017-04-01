const express = require('express');
const app = express();
const mongo = require('mongodb');
const MongoClient = require("mongodb").MongoClient;
const config = require('./config/database'); // get db config file
const path = require('path');
const port = process.env.PORT || 3000;
const api = express.Router();
const bodyParser = require('body-parser');
app.use(express.static(path.resolve(__dirname, '../app/build')));
/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.end();
    } else {
        next();
    }
});

api.get('/deck/random', (req, res) => {

    MongoClient.connect(config.database, function (err, db) {
        if (err) {
            return console.dir(err);
        }
        var collection = db.collection('decks');
        collection.count(function (err, count)  {
            var random = Math.floor(Math.random() * count)
            collection.find().limit(1).skip(random).toArray(function (err, data) {
                res.json({
                    success: true,
                    body: data[0]
                })
            });
        });

    });

});

api.get('/deck/get', (req, res) => {
    if (req.query.id) {
        const deckId = new mongo.ObjectID(req.query.id);
        MongoClient.connect(config.database, function (error, db) {
            if (error)
                return funcCallback(error);
            db.collection('decks').findOne({
                _id: deckId
            }, (err, data) => {
                if (data) {
                    res.json(data);
                }
            });
        });
    }
});

api.post('/deck/create', (req, res) => {
    const cardList = require('./data/cards.json');
    const deck = req.body.deck;
    var canProceed = true;
    for (var i = 0; i < deck.length; i++) {
        if (!cardList.cards.includes(deck[i])) {
            canProceed = false;
        }
    }

    if (deck.length === 8 && canProceed) {
        MongoClient.connect(config.database, function (error, db) {
            if (error)
                return funcCallback(error);
            db.collection('decks').insertOne({
                deck
            }, (err, result) => {
                res.json({
                    success: true,
                    body: {
                        _id: result.ops[0]._id
                    }
                });
            });
        });
    } else {
        res.json({
            success: false,
            body: {
                msg: "Deck is not complete.",
                errCode: 0
            }
        })
    }

});

// connect the api routes under /api/*

app.use('/api', api);

app.get('*', (req, res) => {
    response.sendFile(path.resolve(__dirname, '../app/build', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log('Server at: http://localhost:' + port);
});