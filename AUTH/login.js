+ function ($) {
    var app = angular.module('login', []);
    app.controller('loginController', ['$scope', '$http', function ($scope, $http) {
        $(".login-form").css("margin-top", (document.body.clientHeight / 3)); //登录框
        $scope.model = {};
        $scope.login = function () {
            $.post("http://localhost/ATS/backend/web/InterfaceRequest.php?r=site/index", {
                    username: $scope.model.username,
                    password: $scope.model.password
                },
                function (res) {


                }, 'json')
        };

    }])

}(jQuery);