var express = require('express');
var router = express.Router();

var book_controller = require('../controllers/bookController');
var commonController = require('../controllers/commonController');
var sonarReportController = require('../controllers/sonarReport/sonarDataController');


router.post('/login', book_controller.login);
router.get('/dashboard', book_controller.dashboard);
router.get('/clientInfo', commonController.clientInfo);
router.get('/getProjects', commonController.projects);
router.get('/sonarReport', sonarReportController.getSonarReport);

module.exports = router;