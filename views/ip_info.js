const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const session = require('express-session');
const funs = require('./funs')
var getIP = require('ipware')().get_ip;

router.get('/', function (req, res, next) {
    var ipInfo = getIP(req);
    funs.conn_plugs_find({name:'ip_info'})
    .then(result =>{
    if(result.mode == 'disable') res.send('you\'t access this page');
    else{
        if(req.query.ip) res.render('./ejs/ip_info',{ip:req.query.ip}); //echo $_GET['ip'];
        else res.render('./ejs/ip_info',{ip:ipInfo.clientIp});
    }
    if(req.query.mode){
        funs.conn_plugs_change_mode({name:'ip_info'},{mode:req.query.mode})
        
    } 
})
   
    
})

module.exports = router