const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
dbname = "amazon";
const dburl = `mongodb+srv://RajuRk:1234@rajkumar.bfgft.mongodb.net/${dbname}`;

module.exports = {dburl, MongoClient, mongodb, dbname};