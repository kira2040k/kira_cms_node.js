const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const session = require('express-session');
const { concatSeries } = require('async');
router.use(session({secret: 'kira'}));
const funs = require('./funs')

router.get('/', function (req, res, next) {
if(req.session.username) res.redirect('profile');
  else{
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.render('ejs/login.ejs')
  }
});
router.post('/', function (req, res, next) {
    let username =  req.body.username
    let password = req.body.password;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("kira_cms");
        dbo.collection("kira_cms").findOne({username:username,password:password}, function(err, result) {
          if (err) throw err;
          if(result !== null){
            sess = req.session;
            sess.username = username;
            res.redirect('profile')

          }
          else{
          res.send('welcome')
          }
          db.close();
        });
      });
});
module.exports = router