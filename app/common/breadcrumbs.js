app.breadcrumbs = app.breadcrumbs || [];

angular.module('services.breadcrumbs', []);
angular.module('services.breadcrumbs').factory('breadcrumbs', ['$rootScope',
    '$location', function ($rootScope, $location) {

        //var breadcrumbs = [];
        var breadcrumbsService = {};

        //we want to update breadcrumbs only when a route is actually changed
        //as $location.path() will get updated imediatelly (even if route change fails!)
        $rootScope.$on('$routeChangeSuccess', function (event, current) {

            var pathElements = $location.path().split('/'), result = app.breadcrumbs, i;
            var breadcrumbPath = function (index) {
                return '/' + (pathElements.slice(0, index + 1)).join('/');
            };

            pathElements.shift();
            for (i = 0; i < pathElements.length; i++) {
                result.push({ name: pathElements[i], path: breadcrumbPath(i) });
            }

            $rootScope.$broadcast('navigationChange', { 'template': result[result.length - 1].name });
            app.breadcrumbs = result;
        });

        breadcrumbsService.getAll = function () {
            return app.breadcrumbs;
        };

        breadcrumbsService.getFirst = function () {
            return app.breadcrumbs[0] || {};
        };

        breadcrumbsService.getPrevious = function () {
            app.breadcrumbs.pop();
            return app.breadcrumbs[app.breadcrumbs.length - 1];
        }

        return breadcrumbsService;
    }]);