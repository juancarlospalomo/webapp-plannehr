'use strict';

/* App Module */
/* App Structure based on https://github.com/angular-app/angular-app*/

var app = angular.module('plannehrApp', ['ngMaterial',
    'ngRoute',
    'enterproductlist',
    'productcard',
    'services.breadcrumbs']);

app.config(['$routeProvider', '$mdIconProvider', function ($routeProvider, $mdIconProvider) {
    /* Route config */
    $routeProvider.when('/enterproductlist', {
        templateUrl: 'enter-product-list/enterproductlist.html',
        controller: 'enterproductlist_controller'
    }).
        when('/productcard', {
            templateUrl: 'product-card/productcard.html',
            controller: 'productcard_controller'
        }).
        otherwise({
            redirectTo: '/enterproductlist'
        });

    /* Icon provider */
    $mdIconProvider
        .icon('action:menu', 'assets/svg/ic_menu.svg')
        .icon('action:mic', 'assets/svg/ic_mic.svg')
        .icon('action:edit', 'assets/svg/ic_edit.svg')
        .icon('action:market', 'assets/svg/ic_supermarket.svg')
        .icon('action:settings', 'assets/svg/ic_settings.svg')
        .icon('action:dollar', 'assets/svg/ic_dollar.svg')
        .icon('action:add', 'assets/svg/ic_add.svg');
}]);


app.controller('plannehr_controller', ['$scope', '$location', 'breadcrumbs', function ($scope, $location, breadcrumbs) {

    $scope.menu_icon = 'action:menu';
    $scope.breadcrumbs = breadcrumbs;

    $scope.addProduct = function () {
        $location.path('/productcard');
        console.log($scope.breadcrumbs.getAll());
    }

}]);
