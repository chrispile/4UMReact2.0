var express = require('express');
var router = express.Router();
var sha1 = require('../public/javascripts/sha1');
var pgSetup = require('../pgSetup.js');
var pgClient = pgSetup.getClient();
var requireLogin = require('../requireLogin');
var HttpStatus = require('http-status-codes')

// router.get("/r/:token", function(req, res, next) {
//     pgClient.query("SELECT EXISTS(SELECT 1 FROM Resets WHERE token=$1)", [req.params.token], function(err, result) {
//         if(err) {
//             console.log(err);
//         } else {
//             if(result.rows[0].exists) {
//                 res.render('Reset', {title: 'Reset Password Form', exists: true});
//             } else {
//                 res.render('Reset', {title: 'Reset Password Form', exists: false});
//             }
//         }
//     })
// })

router.post('/login', function(req, res, next) {
  var encryptPass = sha1.hash(req.body.password);
  var queryConfig = {
    text: "SELECT * FROM Users WHERE email=$1 AND password=$2",
    values: [req.body.email, encryptPass]
  }
  pgClient.query(queryConfig, function(err, result) {
    if(err) {
      console.log(err);
    }
    else {
      if(result.rows.length === 0) {
        res.json({error: 'fail_login'});
      } else {
        req.session.user = result.rows[0];
        res.json(result.rows[0]);
      }
    }
  });
});

router.get('/logout', function(req, res) {
  req.session.destroy()
  res.sendStatus(200)
});


module.exports = router;
