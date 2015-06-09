angular.module('enterproductlist', ['services.database'])

.controller('enterproductlist_controller', ['$scope', 'database', function ($scope, database) {

    $scope.list = [];

    database.getProducts().then(function (rows) {
        for (i = 0; i < rows.length; i++) {
            var product = {};
            product.id = rows.item(i)._id;
            product.name = rows.item(i).name;
            $scope.list.push(product);
        }
    });

    $scope.catalog = [{ 'name': 'product2', 'description': 'description2' }];

}]);