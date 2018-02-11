const express = require('express');
const http = require('http');
const app = express();
var bodyParser = require("body-parser");

var Sequelize = require('sequelize')
    , sequelize = new Sequelize('pgguide', 'postgres', '1234', {
    dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
    port:    5432, // or 5432 (for postgres)
});
app.use(bodyParser.json());

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });

    
    var Products = sequelize.define('Products', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: Sequelize.STRING,
        price: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
        deleted_at: Sequelize.DATE,
        tags: Sequelize.STRING
    },{
        tableName: 'products',
        timestamps: false
    });

sequelize.sync().then(function() {
  return Products.create({
    title: 'GTA V',
    price: '79.99',
    tags: '{GUNS}'
  });
}).then(function(res) {
  console.log(res.get({
    plain: true
  }))

  });
