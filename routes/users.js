var express = require('express');
var router = express.Router();
var sha1 = require('../public/javascripts/sha1');
var pgSetup = require('../pgSetup.js');
var pgClient = pgSetup.getClient();
var errorCodes = require('../errorCodes');
var HttpStatus = require('http-status-codes')


router.get('/check/isLoggedIn', function(req, res, next) {
  pgClient.query("SELECT username FROM users WHERE uid = $1", [res.locals.user.uid], function(err, result) {
    if(err) {
      console.log(err);
    } else {
      res.json(result.rows[0]);
    }
  })
})

//Returns a User row by uid
router.get('/:uid', function(req, res, next) {
    pgClient.query('SELECT * FROM USERS WHERE uid = $1', [req.params.uid], function(err, result) {
        if(err) {
            console.log(err);
        } else {
            if(result.rows.length == 0) {
                res.status(HttpStatus.NOT_FOUND).json({error: errorCodes.UserNotFound});
            } else {
                res.json(result.rows[0]);
            }
        }
    });
});

router.get('/username/:username', function(req, res, next) {
  var queryConfig = {
    text: "SELECT users.username, users.joindate, count(posts.username) as totalPosts, sum(posts.score) as totalScore \
          FROM users \
          LEFT JOIN posts ON users.username=posts.username \
          WHERE users.username= $1 \
          GROUP BY users.username, users.joindate",
    values: [req.params.username]
  }
  pgClient.query(queryConfig, function(err, result) {
    if(err) {
      console.log(err);
    } else {
      res.json(result.rows[0]);
    }
  })
})


//Returns all rows from Users
router.get('/', function(req, res, next) {
    pgClient.query("SELECT * FROM Users", [], function(err, result) {
        if(err) {
            console.log(err);
        }
        else {
            res.json(result.rows);
        }
    })
});

//Posts a new row into Users
    //If the username or email is taken, it will render the register page with the specified error message.
    //If register is successful, it will render the login page.
router.post('/', function(req, res, next) {
    var encryptPass = sha1.hash(req.body.password);
    var queryConfig = {
        text: "INSERT INTO Users(email, username, password) VALUES ($1, $2, $3)",
        values: [req.body.email, req.body.username, encryptPass]
    }
    pgClient.query(queryConfig, function(err, result) {
        if(err) {
            if(err.constraint == 'users_username_key') {
              res.json({error: 'username_taken'})
                // res.status(HttpStatus.CONFLICT)
            }
            else if(err.constraint == 'users_email_key') {
              res.json({error: 'email_taken'})
                // res.status(HttpStatus.CONFLICT)
            } else {
                console.log(err);
            }
        }
        else {
          res.json({success: true});
        }
    });
});

//Updates a user's password by email
router.patch('/', function(req, res, next) {
    var encryptPass = sha1.hash(req.body.password);
    pgClient.query("UPDATE USERS SET password=$1 WHERE email=$2", [encryptPass, req.body.email], function(err, result) {
        if(err) {
            console.log(err);
        } else {
            res.sendStatus(HttpStatus.OK);
        }
    })
})

module.exports = router;
