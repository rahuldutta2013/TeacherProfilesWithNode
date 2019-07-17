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


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: senderEmailAddress,
    pass: senderEmailPassword
  }
});

// var sess;


// app.get('/logout', function (req, res) {
//   sess = {};
//   res.status(200).send({ httpStatus: 'OK' });
// });

// app.post('/addTeacher', function (req, res) {
//   MongoClient.connect(url, function (err, db) {

//     if (err) throw err;

//     var dbo = db.db(dbName);

//     dbo.collection("teacherprofile").find({ 'email': req.body.email }).count(function (err, count) {
//       console.log(count);
//       if (count) {
//         res.status(400).send('Email id already exits');
//       } else {
//         dbo.collection("teacherprofile").find({ 'userName': req.body.userName }).count(function (err, count) {
//           if (count) {
//             res.status(400).send('UserName already exits');
//           } else {
//             req.body.password = Math.random().toString(36).substr(2, 9);
//             req.body.verificationCode = Math.random().toString(36).substr(2, 5);

//             var mailOptions = {
//               from: senderEmailAddress,
//               to: req.body.email,
//               subject: 'Complete Two Step Verification',
//               text: 'Verification Code: ' + req.body.verificationCode
//             };

//             dbo.collection("teacherprofile").insertOne(req.body, function (err, response) {
//               if (err) throw err;

//               console.log(response);

//               res.status(200).json({ 'id': response.ops[0]._id });

//               transporter.sendMail(mailOptions, function (error, info) {
//                 if (error) {
//                   console.log(error);
//                 } else {
//                   console.log('Email sent: ' + info.response);
//                 }
//               });
//             });
//           }
//         });
//       }
//     });
//   });
// });


// app.post('/verifyCode', function (req, res) {
//   MongoClient.connect(url, function (err, db) {

//     if (err) throw err;

//     var dbo = db.db(dbName);
//     var myquery = { _id: ObjectId(req.body._id) };

//     dbo.collection("teacherprofile").findOne(myquery, function (err, result) {
//       if (err) {
//         console.log(err);
//       } else {
//         if (result.verificationCode === req.body.verificationCode) {
//           var mailOptions = {
//             from: senderEmailAddress,
//             to: result.email,
//             subject: 'Account Creation Is Successful',
//             text: 'User-name: ' + result.userName + '  Password: ' + result.password
//           };

//           transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//               console.log(error);
//             } else {
//               console.log('Email sent: ' + info.response);
//             }
//           });

//           res.status(200).send('Verified');
//         } else {
//           res.status(400).send('invalid verification code');
//         }
//       }
//     });
//   });
// });


var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
});