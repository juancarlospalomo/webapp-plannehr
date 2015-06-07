angular.module('enterproductlist', [])

.controller('enterproductlist_controller', ['$scope', function ($scope) {

    $scope.list = [{ 'name': 'product1', 'description': 'description1' }];
    $scope.catalog = [{ 'name': 'product2', 'description': 'description2' }];

}]);