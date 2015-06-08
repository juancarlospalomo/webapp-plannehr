angular.module('resources.datatypes', ['ngResource'])

.factory('dataTypes', ['$resource', function ($resource) {

    return $resource('data/:dataType.json', { dataType: '@dataType' }, {
        query: { method: 'GET', params: {dataType: '@dataType'}, isArray: false }
    });

}]);