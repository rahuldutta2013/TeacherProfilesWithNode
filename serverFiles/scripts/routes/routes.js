var express = require('express');
var router = express.Router();

var loginController = require('../controllers/loginController');
var commonController = require('../controllers/commonController');
var studentController = require('../controllers/studentController');


var sonarReportController = require('../controllers/sonarReport/sonarDataController');


router.post('/login', loginController.login);
router.get('/logout', loginController.logout);
router.post('/editTeacher', loginController.editTeacher);
router.post('/addPerson', loginController.addPerson);
router.post('/verifyCode', loginController.verifyCode);
router.get('/dashboard', loginController.dashboard);

// router.get('/addStudent', studentController.addStudent);

router.get('/clientInfo', commonController.clientInfo);
router.get('/getProjects', commonController.projects);
router.get('/sonarReport', sonarReportController.getSonarReport);

module.exports = router;