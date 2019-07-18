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

var externalRoutes = require('./scripts/routes/routes');
app.use('/externalRoutes', externalRoutes);


var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
});