const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const funs = require('./funs')



//install page
router.get('/', function(req, res, next) {
	funs.readFile('config/config.txt', 'utf-8').then(data => {
		if (data != '') res.send('cms installed');
		else {
			console.log(data);
			res.render('./ejs/install');
		}
	}).catch(err => {
		res.send('error try again later...');
	});
});
//install page
router.post('/', function(req, res, next) {
	let username = req.body.username;
	let password = req.body.password;
	let password2 = req.body.password2;
	funs.readFile('config/config.txt', 'utf-8').then(data => {
		if (data != '') res.send('cms installed');
		else {
			if (password != password2) res.send('password is not the same');
			else {
				MongoClient.connect(url, function(err, db) {
					if (err) throw err;
					var dbo = db.db('kira_cms');
					dbo.createCollection('cms', function(err, result) {
						if (err) throw err;
						
						db.close();
					});
					
				});
				funs.create_pulg({name:'short-link',mode:'disable'})
				funs.create_pulg({name:'exec',mode:'disable'})
				funs.create_pulg({name:'ip_info',mode:'disable'})
				data = `username:${username}\npassword:${password}`
				fs.writeFile('config/config.txt', data, function(err) {
					if (err) console.log(err);
					res.send('cms installed')
				});
			}
		}
	}).catch(err => {
		console.log(err);
	});
});



module.exports = router