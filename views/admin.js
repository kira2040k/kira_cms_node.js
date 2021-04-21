const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const session = require('express-session');
const { concatSeries } = require('async');


router.get('/', function (req, res, next) {
    res.render('ejs/admin')

});
router.post('/', function (req, res, next) {
    
    fs.readFile('config/config.txt', 'utf8', function (err,data) {
        if (err) res.send('error');        
        var Re = /username:.*/g;
        var u = Re.exec(data);
        Re = /:.*/g;
        u = Re.exec(u[0])
        u = u[0].substring(1)

        Re = /password:.*/g;
        let p = Re.exec(data);
        Re = /:.*/g
        p = Re.exec(p[0])
        p = p[0].substring(1)

        if(req.body.username == u && req.body.password == p){
        req.session.admin = u
        res.redirect('/admin-panel')
        }
        else{
            res.send('error username or password incorrect')

        }

      });
});

module.exports = router