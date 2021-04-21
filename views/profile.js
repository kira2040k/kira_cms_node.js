const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
const session = require('express-session');
const funs = require('./funs');
const validator = require('validator');



router.get('/',  function (req, res, next) {
    let username = req.session.username
    if(!username) res.sendStatus(403);
    else{
        funs.get_user({username:username})
        .then(async result =>{
            let username = await result.username
            let password = await result.password
            username = validator.escape(username)
            password = validator.escape(password)
            res.render('./ejs/profile',{username:username,password:password})
        })
    }
    

});
module.exports = router
