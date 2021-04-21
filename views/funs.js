const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const morgan = require('morgan');
const path = require('path')
let logger = morgan('combined')
const conn_find = async (query) => {
    return new Promise((resolve, reject) => {
       
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("kira_cms");
            dbo.collection("kira_cms").findOne(query, function(err, result) {
              if (err) throw err;
              if(result){
                  resolve(result)
              }
              db.close()
            });
          });
    });
}

const conn_insert = async (query) => {
    return new Promise((resolve, reject) => {
       
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("kira_cms");
            dbo.collection("kira_cms").insertOne(query, function(err, result) {
              if (err) throw err;
              if(result){
                  resolve(result)
              }
              db.close()
            });
          });
    });
}
const conn_plugs_find = (query) =>
{
    return new Promise((resolve, reject) => {
       
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("kira_cms");
            dbo.collection("plugs").findOne(query, function(err, result) {
              if (err) throw err;
              if(result){
                  resolve(result)
              }
              
            });
          });
    });
}
const conn_plugs_change_mode = (name,mode) =>
{
    return new Promise((resolve, reject) => {
       
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("kira_cms");
            mode = {$set: mode}
            dbo.collection("plugs").updateOne(name, mode, function(err, result) {
              if (err) throw err;
              if(result){
                  resolve(result)
              }
              db.close()
            });
          });
    });
}
const short_link = (link) =>
{
    return new Promise((resolve, reject) => {
       
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("kira_cms");

            
            url = {base:link,short:Date.now()}
            dbo.collection("short_link").insertOne(url, function(err, result) {
              if (err) throw err;
              if(result){
                  resolve(result)
              }
              db.close()
            });
          });
    });
}
const get_short_link = (link) =>
{
    return new Promise((resolve, reject) => {
       
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("kira_cms");
            dbo.collection("short_link").findOne(link, function(err, result) {
              if (err) throw err;
              if(result){
                  resolve(result)
              }
              
            });
          });
    });
}
const create_pulg = (link) =>
{
    return new Promise((resolve, reject) => {
       
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("kira_cms");
            dbo.collection("plugs").insertOne(link, function(err, result) {
              if (err) throw err;
              
              
            });
          });
    });
}
const get_user = (user) =>
{
    return new Promise((resolve, reject) => {
       
        MongoClient.connect(url,function(err, db) {
            if (err) throw err;
            var dbo = db.db("kira_cms");
            dbo.collection("kira_cms").findOne(user, function(err, result) {
              if (err) throw err;
              resolve(result)
              
            });
          });
    });
}
const readFile = (fileName, encoding) => {
	return new Promise((resolve, reject) => {
		fs.readFile(fileName, encoding, (err, data) => {
			if (err) {
				return reject(err);
			}
			resolve(data);
		});
	});
}
module.exports = 
{conn_find,
  conn_insert,
  conn_plugs_find,
  conn_plugs_change_mode,
  short_link,
  get_short_link,
  create_pulg,
  get_user,
  readFile
}