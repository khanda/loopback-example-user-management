/**
 * Created by quyen on 31/05/2018.
 */
'use strict';
var app = require('../server');
var mysqlDataSource = app.dataSources.mysqlDs;
console.log('-----------create admin');
var userModel = app.models.user;
userModel.create(
    {username: 'admin', email: 'admin@gmail.com', password: '123456'},
    function (err, user) {
      if (err){
        console.log(err);
        throw err;
      }
      //create the admin role
      app.models.Role.create({
        name: 'admin'
      }, function (err, role) {
        if (err){
          console.log(err);
          throw err;
        }

        //make bob an admin
        role.principals.create({
          principalType: app.models.RoleMapping.USER,
          principalId: user.id
        }, function (err, principal) {
          // mysqlDataSource.disconnect();
        });
      });
    });
