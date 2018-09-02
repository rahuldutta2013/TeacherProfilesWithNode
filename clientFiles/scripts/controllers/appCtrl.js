teacherApp.controller('appController', function ($scope) {


});

teacherApp.controller('loginController', function ($scope, $state, $http, $rootScope) {
    $scope.userName = $scope.password = 'rahuldutta';

    $scope.loginTeacher = function () {
        $http({
            method: "POST",
            url: "http://127.0.0.1:8081/loginTeacher",
            data: {
                userName: $scope.userName,
                password: $scope.password
            }
        }).then(function mySuccess(response) {
            if (response.statusText === 'OK') {
                $state.go('teacherHome', { userId : response.data._id})
            }
        }, function myError(response) {
            console.log(response);
        });
    };

    $scope.registerTeacher = function () {
        $http({
            method: "POST",
            url: "http://127.0.0.1:8081/addTeacher",
            data: {
                name: $scope.name,
                subject: $scope.subject,
                userName: $scope.userName,
                password: $scope.password
            }
        }).then(function mySuccess(response) {
            if (response.statusText === 'OK') {
                $state.go('login');
            }
        }, function myError(response) {
            console.log(response);
        });
    };
});

teacherApp.controller('teacherDashBoardController', function ($scope, $stateParams, $http, $state) {
    var userId = $stateParams.userId;
    
    $scope.getTeacherInfo = function() {
        $http({
            method: "GET",
            url: "http://127.0.0.1:8081/dashboard",
            params: {
                userId: userId
            }
        }).then(function mySuccess(response) {
            if (response.statusText === 'OK') {
                $scope.teacherInfo = response.data;
            }
        }, function myError(response) {
            if (response.data === 'Login required') {
                $state.go('login');
            }
        });
    };

    $scope.getTeacherInfo();

    $scope.logout = function() {
        $http({
            method: "GET",
            url: "http://127.0.0.1:8081/logout"
        }).then(function mySuccess(response) {
            if (response.statusText === 'OK') {
                $state.go('login');
            }
        }, function myError(response) {
            console.log(response);
        });
    };

    $scope.EditProfile = function () {
        console.log($scope.myForm);
        $http({
            method: "POST",
            url: "http://127.0.0.1:8081/editTeacher",
            data: $scope.teacherInfo
        }).then(function mySuccess(response) {
            if (response.statusText === 'OK') {
                angular.element('#edit_modal').modal('hide');
            }
        }, function myError(response) {
            console.log(response);
        });
    };
});