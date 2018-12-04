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

exports.getSonarReport = function (req, res) {
    if (sess && sess.uniquId === req.query.userId) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;

            var dbo = db.db(dbName),
                query = {
                    "Last_run_date": {"$gte": req.query.fromDate, "$lt": req.query.toDate},
                    "ProjectId": {"$in": req.query.ProjectID.split(',')},
                    "ClientId": {"$in": req.query.clientID.split(',')}
                };

            dbo.collection("clients").find(query).toArray(function (err, response) {
                if (err) throw err;

                if (!response) {
                    res.end('no projects found!!', res);
                } else {
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

