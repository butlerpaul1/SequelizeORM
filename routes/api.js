const express = require('express');

const router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://paul:1234@localhost:5432/pgguide');

//users
router.get('/products', (req, res) =>  {
  sequelize.query("select * from products", { type: sequelize.QueryTypes.SELECT})
    .then(function(users){
      res.json(users);
    });
});

router.get('/products/:id', (req, res) =>  {
  sequelize.query("select * from products where id = 5", { type: sequelize.QueryTypes.SELECT})
    .then(function(users){
      res.json(users);
    });
});

router.get('/update', (req, res) =>  {
  sequelize.query("UPDATE products SET price = '59.99' WHERE title ='GTA V'").spread(function(results, metadata){
    res.json(metadata);
  })
});


router.get('/delete', (req, res) =>  {
  sequelize.query("delete from products where title ='GTA V';").spread(function(results, metadata){
    res.json(metadata);
  })
});

router.get('/post', (req, res) =>  {
  var childProcess = require('child_process');

function runScript(scriptPath, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var process = childProcess.fork(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}

// run a script and invoke a callback 
runScript('./models/Products.js', function (err) {
    if (err) throw err;
    console.log('finished running some-script.js');
    res.send('Product Added')
});
});




/* console.log(req.body);
res.send({
  type:'POST',
  id: req.body.id,
  email: req.body.email,
  details: req.body.details,
  created_at: req.body.created_at,
  deleted_at: req.body.deleted_at
});
*/
module.exports = router;
