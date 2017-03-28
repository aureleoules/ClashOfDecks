const express = require('express');
const app = express();
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

api.get('/deck/get', function (req, res) {
    res.json({
        insane: "yes"
    })
});

api.post('/deck/create', function (req, res) {

    MongoClient.connect(config.database, function (error, db) {
        if (error)
            return funcCallback(error);
        db.collection('decks').insertOne({
            deck: req.body.deck
        }, (err, result) => {
            res.json({
                "ok": "ok"
            })
        });
    });
});

// connect the api routes under /api/*

app.use('/api', api);

app.get('*', function (req, res) {
    response.sendFile(path.resolve(__dirname, '../app/build', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log('Server at: http://localhost:' + port);
});