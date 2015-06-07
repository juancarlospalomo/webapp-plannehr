angular.module('productcard', [])

.controller('productcard_controller', ['$scope', function ($scope) {

    $scope.categories = [{ 'name': 'carne' }, { 'name': 'pescado' }];

}]);