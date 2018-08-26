var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  MongoClient = require('mongodb').MongoClient,
  url = "mongodb://localhost:27017/",
  cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// app.get('/list', function (req, res) {
//    res.send('Hello World');
//    console.log('dddd');
// })

app.post('/loginTeacher', function (req, res) {
  MongoClient.connect(url, function (err, db) {

    if (err) throw err;

    var dbo = db.db("Teacherdb"),
        query = { userName: req.body.userName };

    dbo.collection("teacherprofile").findOne(query, function (err, user) {
      if (err) throw err;

      if (!user) {
        res.end('username not found', res);
      } else if (user.password !== req.body.password) {
        res.end('incorrect password', res);
      } else {
        res.json(user);
      }
      
      console.log(user);
      db.close();
    });
    // res.json({"foo": "bar"});
    // /res.end('ok', res);
  });
});

app.post('/addTeacher', function (req, res) {
  MongoClient.connect(url, function (err, db) {

    if (err) throw err;

    var dbo = db.db("Teacherdb");
    dbo.collection("teacherprofile").insertOne(req.body, function (err, res) {
      if (err) throw err;
      db.close();
    });
    // res.json({"foo": "bar"});
    res.end('ok', res);
  });
});

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
})