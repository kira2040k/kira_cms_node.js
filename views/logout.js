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
    req.session.destroy();
    res.redirect('/login')
    });


module.exports = router