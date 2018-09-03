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
  ObjectId = require('mongodb').ObjectID;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(session({
  secret: 'random_string_goes_here',
  resave: false,
  saveUninitialized: true
}));


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: senderEmailAddress,
    pass: senderEmailPassword
  }
});

var sess;

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

    dbo.collection("teacherprofile").find({ 'email': req.body.email }).count(function (err, count) {
      console.log(count);
      if (count) {
        res.status(400).send('Email id already exits');
      } else {
        dbo.collection("teacherprofile").find({ 'userName': req.body.userName }).count(function (err, count) {
          if (count) {
            res.status(400).send('UserName already exits');
          } else {
            req.body.password = Math.random().toString(36).substr(2, 9);
            req.body.verificationCode = Math.random().toString(36).substr(2, 5);

            var mailOptions = {
              from: senderEmailAddress,
              to: req.body.email,
              subject: 'Complete Two Step Verification',
              text: 'Verification Code: ' + req.body.verificationCode
            };

            dbo.collection("teacherprofile").insertOne(req.body, function (err, response) {
              if (err) throw err;

              console.log(response);

              res.status(200).json({ 'id': response.ops[0]._id });

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            });
          }
        });
      }
    });
  });
});


app.post('/verifyCode', function (req, res) {
  MongoClient.connect(url, function (err, db) {

    if (err) throw err;

    var dbo = db.db("Teacherdb");
    var myquery = { _id: ObjectId(req.body._id) };

    dbo.collection("teacherprofile").findOne(myquery, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        if (result.verificationCode === req.body.verificationCode) {
          var mailOptions = {
            from: senderEmailAddress,
            to: result.email,
            subject: 'Account Creation Is Successful',
            text: 'User-name: ' + result.userName + '  Password: ' + result.password
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

          res.status(200).send('Verified');
        } else {
          res.status(400).send('invalid verification code');
        }
      }
    });
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