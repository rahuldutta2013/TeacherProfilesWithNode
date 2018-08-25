teacherApp.controller('appController', function ($scope) {


});

teacherApp.controller('loginController', function ($scope, $state, $http) {
    $scope.userName = '';

    $scope.loginTeacher = function () {
        $state.go('teacherHome');
        console.log($scope.userName);

        $http({
            method: "GET",
            url: "http://127.0.0.1:8081/addTeacher"
        }).then(function mySuccess(response) {
            $scope.myWelcome = response.data;
            console.log(res);
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    };

    $scope.registerTeacher = function () {
        $http({
            method: "POST",
            url: "http://127.0.0.1:8081/addTeacher",
            headers : {
                'Access-Control-Allow-Origin': "http://127.0.0.1"
              },
            data: {
                name: $scope.name,
                address: $scope.subject,
                userName: $scope.userName,
                password: $scope.password
            }
        }).then(function mySuccess(response) {
            console.log(res);
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    };
});