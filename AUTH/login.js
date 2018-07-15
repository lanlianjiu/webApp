+ function ($) {
    var app = angular.module('login', []);
    app.controller('loginController', ['$scope', '$http', function ($scope, $http) {
       
        $scope.model = {};
        
        $scope.login = function () {
            var data = {
                username: $scope.model.username,
                password: $scope.model.password,
                rememberMe: 1
            };
            $.post("http://localhost/ATS/backend/web/InterfaceRequest.php?r=site/login", data,
                function (res) {
                    //if (res.status) {

                        $.localCache.remove($.cfg.access_tokone);
                        $.localCache.set($.cfg.access_tokone, 1234567);
                        $.localCache.remove($.cfg.user);
                        $.localCache.set($.cfg.user, res.data);
                        window.location.href = 'index.html';
                    //}
                     
                }, 'json')
        };

    }])

}(jQuery);