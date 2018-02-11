const express = require('express')
const app = express()

const routes = require('./routes/api');

var bodyParser = require("body-parser");

var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://paul:1234@localhost:5432/pgguide');


//bodyParser
app.use(bodyParser.json());
//api
app.use(routes);

//models
app.use(express.static('models'));


//html
app.use(express.static('public'));

sequelize
  .authenticate()
  .then(function (err) {
    console.log('Connection works');
  })
  .catch(function(err) {
    console.log('Connection does not work', err);
  });

  app.get('/', (req, res) =>  {
    res.end();
  });

  app.listen(3000, () => console.log('Example app listening on port 3000!'))
