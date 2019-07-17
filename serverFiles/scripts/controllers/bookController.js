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

global.sess;

exports.login = function (req, res) {
    MongoClient.connect(url, function (err, db) {

        if (err) throw err;

        var dbo = db.db(dbName),
            query = { userName: req.body.userName };

        dbo.collection("teacherprofile").findOne(query, function (err, user) {
            if (err) throw err;

            if (!user) {
                res.end('username not found', res);
            } else if (user.password !== req.body.password) {
                res.end('incorrect password', res);
            } else {
                req.session.user = user;
                sess = req.session.user;
                sess.uniquId = req.session.user.userName;
                res.status(200);
                res.json(user);
            }

            db.close();
        });
    });
};

exports.editTeacher = function (req, res) {
    if (sess && sess.uniquId) {
        MongoClient.connect(url, function (err, db) {

            if (err) throw err;

            var dbo = db.db(dbName);
            var myquery = { _id: ObjectId(req.body._id) },
                newInfo = req.body;

            delete newInfo._id;

            dbo.collection("teacherprofile").updateOne(myquery, { $set: newInfo }, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).send('Successfully updated user');
                }
            });
        });
    } else {
        res.status(400).json('Login required');
    }
};

// Display book create form on GET.
exports.dashboard = function (req, res) {
    if (sess && sess.uniquId) {
        MongoClient.connect(url, function (err, db) {

            if (err) throw err;

            var dbo = db.db(dbName),
                query = { "_id": sess._id };

            dbo.collection("teacherprofile").findOne(query, function (err, user) {
                if (err) throw err;

                if (!user) {
                    res.status(304).send('user not found');
                } else {
                    res.status(200).send(user);
                }

                db.close();
            });
        });
    } else {
        res.status(400).json('Login required');
    }
};

