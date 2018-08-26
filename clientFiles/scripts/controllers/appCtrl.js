teacherApp.controller('appController', function ($scope) {


});

teacherApp.controller('loginController', function ($scope, $state, $http) {
    $scope.userName = '';
    $scope.teacherName = ''

    $scope.loginTeacher = function () {
        
        console.log($scope.userName);

        $http({
            method: "POST",
            url: "http://127.0.0.1:8081/loginTeacher",
            data: {
                userName: $scope.userName,
                password: $scope.password
            }
        }).then(function mySuccess(response) {
            if (response.statusText === 'OK') {
                $scope.teacherName = response.data.name;
                $state.go('teacherHome');
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

teacherApp.controller('teacherDashBoardController', function ($scope) {

});