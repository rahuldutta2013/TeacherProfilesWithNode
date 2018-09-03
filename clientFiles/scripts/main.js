var teacherApp = angular.module('teacherApp', ['ui.router']);

teacherApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './clientFiles/templates/partial-home.html'
        })

        .state('login', {
            url: '/login',
            templateUrl: './clientFiles/templates/loginPage.html'
        })

        .state('twoStepPage', {
            url: '/twoStepPage/:regId',
            templateUrl: './clientFiles/templates/twoStep.html',
            params: {
                'regId': ''
            }
        })

        .state('registerTeacher', {
            url: '/registerTeacher',
            templateUrl: './clientFiles/templates/registerTeacherForm.html'
        })

        .state('teacherHome', {
            url: '/teacherHome?:userId',
            templateUrl: './clientFiles/templates/teacherHome.html',
            params: {
                'userId': ''
            }
        })
});