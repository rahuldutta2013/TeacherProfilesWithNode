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
            query = { userName: req.body.params.UserName };

        dbo.collection("teacherprofile").findOne(query, function (err, user) {
            if (err) throw err;

            if (!user) {
                res.end('username not found', res);
            } else if (user.password !== req.body.params.PassWord) {
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

// Display list of all books.
exports.book_list = function (req, res) {
    res.send('hello NODE');
};

// Display detail page for a specific book.
exports.book_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
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

// Handle book create on POST.
exports.book_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Book create POST');
};

// Display book delete form on GET.
exports.book_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};