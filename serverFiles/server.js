var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/list', function (req, res) {
//    res.send('Hello World');
//    console.log('dddd');
// })

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.post('/addTeacher', function (req, res) {
  res.header('Access-Control-Allow-Origin', "http://127.0.0.1")

  res.send('cors problem fixed:)');
   MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { name: "Rahul11", address: "111" };
    dbo.collection("customers").insertOne(myobj, function(err, res) {
      if (err) throw err;
      db.close();
    });
    res.end('1 document inserted', res);
  });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
})