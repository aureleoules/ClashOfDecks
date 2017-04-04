const express = require('express');
const app = express();
const mongo = require('mongodb');
const MongoClient = require("mongodb").MongoClient;
const config = require('./config/database'); // get db config file
const path = require('path');
const port = process.env.PORT || 3000;
const api = express.Router();
const bodyParser = require('body-parser');
const cardList = require('./data/cards.json');

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

const getMaxArena = deck => {
    var maxArena = 0;
    for (let i = 0; i < deck.length; i++) {
        for (let j = 0; j < cardList.length; j++) {
            if (deck[i] === cardList[j].idName && cardList[j].arena > maxArena) {
                maxArena = cardList[j].arena;
            }
        }
    }
    return maxArena;
}

const getAverageCost = deck => {
    var average = 0;
    for (let i = 0; i < deck.length; i++) {
        for (let j = 0; j < cardList.length; j++) {
            if (deck[i] === cardList[j].idName) {
                average += cardList[j].elixirCost;
            }
        }
    }
    average = average / deck.length;
    return average.toFixed(1);
}

api.post('/deck/create', (req, res) => {
    const deckTypes = require('./data/deckTypes.json');
    var cardsArray = Object.keys(cardList).map(item => cardList[item].idName);

    const deck = req.body.deck;
    const deckInfos = req.body.infos;
    if (!deckInfos.type) deckInfos.type = null;

    var canProceed = true;
    canProceed = deckTypes.indexOf(deckInfos.type) > -1;
    for (let i = 0; i < deck.length; i++) {
        if (!cardsArray.includes(deck[i])) {
            canProceed = false;
        }
    }

    if (deck.length === 8 && canProceed) {
        const maxArena = getMaxArena(deck);
        const averageCost = getAverageCost(deck);
        const document = {
            deck: deck,
            infos: {
                title: deckInfos.title,
                description: deckInfos.desc,
                type: deckInfos.type,
                arena: maxArena,
                averageCost: averageCost
            }
        }
        MongoClient.connect(config.database, function (error, db) {
            if (error)
                return funcCallback(error);
            db.collection('decks').insertOne(document, (err, result) => {
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

api.get('/deck/search', (req, res) => {
    const query = req.query.request;
    if(query) {
        MongoClient.connect(config.database, (err, db) => {
            if(err) return funcCallback(err);
            db.collection('decks').find({
                $text: {
                    $search: query
                }
            }).toArray((err, data) => {
                if(err) throw err;
                res.json({success: true, body: data});
            });
        });
    }
});
// connect the api routes under /api/*

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../app/build', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log('Server at: http://localhost:' + port);
});