+ function ($) {
    var app = angular.module('Index', []);
    app.controller('indexController', ['$scope', '$http', function ($scope, $http) {

        $scope.menuList = {};
        $scope.userInfo = {};

        // if (!($.u.user.result)) {
        //     window.location.href = 'login.html';
        // };
        // $scope.userInfo.username = $.u.user.result.username;

        $scope.loadNode = function (data, pid) {

            var result = [],
                temp;

            for (var i = 0; i < data.length; i++) {
                if (data[i].pId == pid) {

                    result.push(data[i]);

                    temp = $scope.loadNode(data, data[i].id);
                    if (temp.length > 0) data[i].children = temp;
                    if (data[i].pId != 0) data[i].targetType = "iframe-tab";
                    if (data[i].url) data[i].url = data[i].url;
                }
            }

            return result;
        };

        //获取菜单
        $scope.getMenus = function () {
            $.post("http://localhost/ATS/backend/web/InterfaceRequest.php?r=site/index", {},
                function (res) {

                    if (res.status) {
                        $scope.menuList = $scope.loadNode(res.data, 0);
                    };
                    $scope.$apply();

                }, 'json').then(function () {
                 $("#side-menu").metisMenu({
                     toggle: true
                 });
            });
        };


        //退出登录
        $scope.loginOut = function () {
            $.post("CRUD-InterfaceRequest.php?r=site/logout", {},
                function (result) {
                    if (result) {
                        $.localCache.remove($.cfg.user);
                        window.location.href = "login.html";
                    } else {
                        $.localCache.remove($.cfg.user);
                        window.location.href = 'login.html';
                    };
                }, 'json');
        };

        $(document).ready(function () {
            $scope.getMenus();
        });

    }])

}(jQuery);