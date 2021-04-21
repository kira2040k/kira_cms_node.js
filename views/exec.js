const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const session = require('express-session');
const funs = require('./funs')
const { exec } = require("child_process");

router.get('/', function (req, res, next) {
    
    funs.conn_plugs_find({name:'exec'})
    .then(result =>{
        //check mode 
        if(result.mode != "enable") res.send('this plugins is disable');
            else{
                res.render('./ejs/exec')
        }
        res.send('1')
            
        
    })
    //change mode 
    if(req.query.mode){
        let mode = req.query.mode
        funs.conn_plugs_change_mode({name:'exec'},{mode:mode})
    }
    
});
router.post('/', function (req, res, next) {

    funs.conn_plugs_find({name:'exec'})
    .then(result => {
        if(result.mode != "enable") res.send('disable');
        else{
        exec(req.body.command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                res.send('command error')
                return;
            }
            res.send(`${stdout}`);
        });
    }
    })
    
    
});
module.exports = router