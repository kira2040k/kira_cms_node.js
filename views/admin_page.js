const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const session = require('express-session');
const { concatSeries } = require('async');
const funs = require('./funs');

//don't forget to set sessions  
router.get('/', function (req, res, next) {
    
    if(req.session.admin){
        res.render('./ejs/admin_page.ejs');
        
    }
    else{
        res.send('try harder..')
    }
})

module.exports = router