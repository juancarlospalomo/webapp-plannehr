angular.module('productcard', ['resources.datatypes', 'services.database'])

.controller('productcard_controller', ['$scope', 'dataTypes', 'database', function ($scope, dataTypes, database) {

    $scope.categories = dataTypes.query({ dataType: 'categories' });
    $scope.measureUnits = dataTypes.query({ dataType: 'measure_units' });
    $scope.product = model.product;

    /* Promise for categories are loaded */
    $scope.categories.$promise.then(function (result) {
        $scope.categories = result.categories;
    });
    
    /* Promise for measure units are loaded */
    $scope.measureUnits.$promise.then(function (result) {
        $scope.measureUnits = result.measures;
    });
    
    $scope.add = function () {
        database.createProduct($scope.product);
    }

}]);