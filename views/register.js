const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const session = require('express-session');
const { concatSeries } = require('async');
router.use(session({secret: 'kira'}));

router.get('/', function (req, res, next) {
    res.render('ejs/register');
});

router.post('/', function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("kira_cms");
        dbo.collection("kira_cms").findOne({username:username}, function(err, result) {
          if (err) throw err;
          if(result){
              res.send('user exitxs..');
          }
          else{
            dbo.collection("kira_cms").insertOne({username:username,password:password}, function(err, result) {
            res.redirect('/login')
            
            });
          }
          
        });
      });
});
module.exports = router