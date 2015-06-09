'use strict';

/* App Module */
/* App Structure based on https://github.com/angular-app/angular-app */

var app = angular.module('plannehrApp', ['ngMaterial',
    'ngRoute',
    'enterproductlist',
    'productcard',
    'services.breadcrumbs',
    'services.database']);


app.constant('plannehrContants', {
    HOME_LIST: 'enterproductlist',
    HOME_SHOPPING_LIST: 'shoppinglist'
});

app.config(['$routeProvider',
    '$mdIconProvider',
    'plannehrContants',
    '$mdThemingProvider', function ($routeProvider, $mdIconProvider, plannehrContants, $mdThemingProvider) {

        /* Theme config */
        $mdThemingProvider.theme('default')
            .primaryPalette('red');


        /* Route config */
        $routeProvider.when('/' + plannehrContants.HOME_LIST, {
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
            .icon('action:add', 'assets/svg/ic_add.svg')
            .icon('action:back', 'assets/svg/ic_back.svg');
    }]);


app.controller('plannehr_controller', ['$scope',
    '$location',
    'breadcrumbs',
    '$mdSidenav',
    '$rootScope',
    'plannehrContants',
    'database', function ($scope, $location, breadcrumbs, $mdSidenav, $rootScope, plannehrContants, database) {

        var isHome = true;

        $scope.menu_icon = 'action:menu';
        $scope.breadcrumbs = breadcrumbs;

        /*
        * Build handler to open/close a SideNav;
        */
        $scope.toggleLeft = function (navID) {
            if (isHome) {
                $mdSidenav(navID).toggle();
            } else {
                $location.path($scope.breadcrumbs.getPrevious().path);
            }
        }

        $rootScope.$on('navigationChange', function (event, current) {
            if (current.template == plannehrContants.HOME_LIST) {
                isHome = true;
                $scope.menu_icon = 'action:menu';
            } else {
                isHome = false;
                $scope.menu_icon = 'action:back';
            }
        });

        $scope.addProduct = function () {
            $location.path('/productcard');
        }

    }]);
