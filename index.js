const express = require('express')
const app = express()
const router = express.Router()
const helmet = require('helmet');
const ejs = require('ejs');
app.set('view engine', 'ejs')
const session = require('express-session')
const morgan = require('morgan');
const { concatSeries } = require('async');
let logger = morgan('combined')
const fs = require('fs')
const path = require('path')
const funs = require('./views/funs')
const compression = require('compression')
var accessLogStream = fs.createWriteStream(path.join('./config/', 'http_logs.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))
app.use(session({ secret: 'kira', cookie: { maxAge: 60000 }}))

app.use(compression()) 
app.use(helmet()); //CSP😉 
app.get('/', function (req, res, next) {
    funs.readFile('config/config.txt', 'utf-8')
    .then(data => {
		if (data != '') res.redirect('/login');
		else {
			res.redirect('/install');
		}
	}).catch(err => {
		console.log(err);
	});

    

});
//pages

app.use('/s', express.static('./views',{ maxAge: 31557600 }))
app.use('/install',require('./views/install'));
app.use('/login',require('./views/login'));
app.use('/register',require('./views/register'));
app.use('/admin',require('./views/admin'));
app.use('/admin-panel',require('./views/admin_page'));
app.use('/plug',require('./views/plug'))
app.use('/profile',require('./views/profile'))
app.use('/logout',require('./views/logout'))

//plugins
app.use('/plug/ip_info',require('./views/ip_info'))
app.use('/plug/short-link',require('./views/short'))
app.use('/plug/exec',require('./views/exec'))
app.listen(8000)
