var express = require('express'),
    app = express(),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    url = "mongodb://localhost:27017/",
    cors = require('cors'),
    nodemailer = require('nodemailer'),
    senderEmailAddress = 'rahul.dutta@learningmate.com',
    senderEmailPassword = 'probabilityrd1993',
    ObjectId = require('mongodb').ObjectID,
    dbName = /*'Teacherdb';*/ 'local';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(session({
    secret: 'random_string_goes_here',
    resave: false,
    saveUninitialized: true
}));

// var sess;
var removeRedundantData = function(data) {
    var obj = {};

    for (var i = 0, len = data.length; i < len; i++) {
        obj[data[i]['ClientId']] = data[i];
    }

    data = [];

    for (var key in obj) {
        data.push(obj[key]);
    }

    return data;
};

exports.clientInfo = function (req, res) {
    if (sess && sess.uniquId === req.query.UserID) {
        MongoClient.connect(url, function (err, db) {

            if (err) throw err;

            var dbo = db.db(dbName);

            dbo.collection("clients").find().toArray(function (err, response) {
                if (err) throw err;

                if (!response) {
                    res.end('no clients found!!', res);
                } else {
                    response = removeRedundantData(response);
                    res.status(200);
                    res.json(response);
                }

                db.close();
            });
        });
    } else {
        res.send("login required!!");
    }
};

exports.projects = function (req, res) {
    if (sess && sess.uniquId === req.query.UserID) {
        MongoClient.connect(url, function (err, db) {

            if (err) throw err;

            var dbo = db.db(dbName),
                query = { ClientId: { $in: req.query.ClientID.split(',') } };


            dbo.collection("clients").find(query).toArray(function (err, user) {
                if (err) throw err;

                if (!user) {
                    res.end('username not found', res);
                } else if (user.password !== req.body.password) {
                    res.end('incorrect password', res);
                } else {
                    res.status(200);
                    res.json(user);
                }

                db.close();
            });
        });
    } else {
        res.send("login required!!");
    }
};