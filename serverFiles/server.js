var express = require('express'),
  app = express(),
  session = require('express-session');
bodyParser = require('body-parser'),
  MongoClient = require('mongodb').MongoClient,
  url = "mongodb://localhost:27017/",
  cors = require('cors');

var ObjectId = require('mongodb').ObjectID;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(session({
  secret: 'random_string_goes_here',
  resave: false,
  saveUninitialized: true
}));

var sess;

// app.use(function(req, res, next) {
//   if (req.session && req.session.user) {
//     User.findOne({ email: req.session.user.email }, function(err, user) {
//       if (user) {
//         req.user = user;
//         delete req.user.password; // delete the password from the session
//         req.session.user = user;  //refresh the session value
//         res.locals.user = user;
//       }
//       // finishing processing the middleware and run the route
//       next();
//     });
//   } else {
//     next();
//   }
// });

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
        req.session.user = user;
        sess = req.session.user;
        sess.uniquId = req.session.user.userName;
        res.json(user);
      }

      db.close();
    });
  });
});

app.get('/logout', function (req, res) {
  sess = {};
  res.end('logged out');
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

app.post('/editTeacher', function (req, res) {
  if (sess && sess.uniquId) {
    MongoClient.connect(url, function (err, db) {

      if (err) throw err;

      var dbo = db.db("Teacherdb");
      var myquery = { _id: ObjectId(req.body._id) },
        newInfo = req.body;

      delete newInfo['_id'];

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
});

app.get('/dashboard', function (req, res) {
  if (sess && sess.uniquId) {
    MongoClient.connect(url, function (err, db) {

      if (err) throw err;

      var dbo = db.db("Teacherdb"),
        query = { "_id": ObjectId(req.query.userId) };

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
});

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
})