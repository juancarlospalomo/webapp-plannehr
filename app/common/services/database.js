angular.module('services.database', ['angular-websql'])
    .constant('contract_db', {
        DB_NAME: "planner_db",
        DB_VERSION: "1.0",
        DB_DESC: "Planner Database",
        DB_SIZE: 2 * 1024 * 1024,
        LIST: 'list',
        CATALOG: 'catalog',
        COLUMN_ID: '_id',
        COLUMN_PRODUCT_NAME: 'name',
        COLUMN_PRODUCT_AMOUNT: 'amount',
        COLUMN_UNIT_ID: "unit_id",
        COLUMN_CATEGORY_ID: "category_id",
        COLUMN_MARKET_ID: "market_id",
        COLUMN_COMMITTED: "committed",
        DML_TABLE_LIST: {
            name: { type: 'INTEGER', null: 'NOT NULL' },
            amount: { type: 'TEXT' },
            unit_id: { type: 'INTEGER' },
            category_id: { type: 'INTEGER' },
            market_id: { type: 'INTEGER' },
            committed: { type: 'INTEGER' }
        },
    })

.factory('database', ['$webSql', '$q', 'contract_db', function ($webSql, $q, contract_db) {

    var database = {};

    database.createProduct = function (product) {
        var db = $webSql.openDatabase(contract_db.DB_NAME, contract_db.DB_VERSION, contract_db.DB_DESC, contract_db.DB_SIZE);
        if (typeof (db) != 'undefined') {
            db.createTable(contract_db.LIST, contract_db.DML_TABLE_LIST).then(function () {
                var item = {};
                item[contract_db.COLUMN_PRODUCT_NAME] = product.name;
                item[contract_db.COLUMN_PRODUCT_AMOUNT] = product.amount;
                item[contract_db.COLUMN_UNIT_ID] = product.unitId;
                item[contract_db.COLUMN_CATEGORY_ID] = product.categoryId;
                item[contract_db.COLUMN_MARKET_ID] = product.marketId;
                item[contract_db.COLUMN_COMMITTED] = product.committed;
                db.insert(contract_db.LIST, item).then(function (result) {
                    console.log(result);
                })
            });
        }
    }

    //TODO: where param
    database.getProducts = function () {
        var db = $webSql.openDatabase(contract_db.DB_NAME, contract_db.DB_VERSION, contract_db.DB_DESC, contract_db.DB_SIZE);
        var deferred = $q.defer();
        if (typeof (db) != 'undefined') {
            db.select(contract_db.LIST, { committed: "0" }).then(function (result) {
                console.log(result.rows);
                deferred.resolve(result.rows);
            }, function (error) {
                console.log(error);
                deferred.reject();
            });
        }
        return deferred.promise;
    }

    return database;
}]);