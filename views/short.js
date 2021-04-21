const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const session = require('express-session');
const funs = require('./funs')
router.get('/', function (req,res, next) {
        
        funs.conn_plugs_find({name:'short-link'})
        .then(result =>{
            //check mode 
            if(result.mode != "enable") res.send('this plugins is disable');
            else{
            if(req.query.url){
                let link = Number(req.query.url)
                
                
                funs.get_short_link({short:link})
                .then(result =>{
                    
                    res.redirect(result.base)
                    
                }) 
            }
            else{
                res.render('./ejs/short')
            }
        }})
        //change mode
        if(req.query.mode){
            let mode = req.query.mode
            funs.conn_plugs_change_mode({name:'short-link'},{mode:mode})
        }
    
});
router.post('/', function (req,res, next) {
    funs.conn_plugs_find({name:'short-link'})
    .then(result =>{
        try{
        if(result.mode != "enable") res.send('this plugins is disable');
        else{
            let url = req.body.url
            res.send(url);
            funs.short_link(url)
        }
    }
    catch(e){
        res.send('erorr database')
    }
    })
    

});
module.exports = router