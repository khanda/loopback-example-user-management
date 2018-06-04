/**
 * Created by quyen on 31/05/2018.
 */
'use strict';

module.exports = function (app) {
  var mysqlDataSource = app.dataSources.mysqlDs;
  var notInMysqlDsModels = ['Email'];
  var allModels = app.models();
  var allModelsName = [];
  allModels.forEach(function (Model) {
    allModelsName.push(Model.modelName);
  });
  var mySqlModels = allModelsName.filter(checkNotInMySqlDs);
  mysqlDataSource.autoupdate(mySqlModels, function (err, result) {
    if (err) {
      throw err;
    }
    console.log('All tables [' + mySqlModels + '] updated in ', mysqlDataSource.adapter.name);

  });


  function checkNotInMySqlDs(model) {
    return notInMysqlDsModels.indexOf(model) < 0;
  }
};
