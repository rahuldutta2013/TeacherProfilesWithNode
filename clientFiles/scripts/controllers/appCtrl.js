teacherApp.controller('appController', function ($scope) {


});

teacherApp.controller('loginController', function ($scope, $state, $http, $rootScope) {
    $scope.userName = '';

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
                $state.go('teacherHome', { teacherInfo : response.data})
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

teacherApp.controller('teacherDashBoardController', function ($scope, $stateParams, $http) {
    var userName = $stateParams.teacherInfo;
    

    $scope.getTeacherInfo = function() {
        $http({
            method: "GET",
            url: "http://127.0.0.1:8081/dashboard",
            params: {
                userName: userName
            }
        }).then(function mySuccess(response) {
            if (response.statusText === 'OK') {
                $scope.teacherInfo = response.data;
            }
        }, function myError(response) {
            console.log(response);
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
});