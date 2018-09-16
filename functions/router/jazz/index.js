var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
var db = require(path.resolve() + '/utils/db' );
var sanitize = require('mongo-sanitize');
var location = require('./location/index')
//http://mongodb.github.io/node-mongodb-native/3.0/quick-start/quick-start/
var MongoClient = require('mongodb').MongoClient;


router.post('/', function(req,res) {
	console.log('called api: /jazz function: post(insert)')
	const collection = db.get().collection('jazz');

	let jazzData = req.body;
	collection.insertOne(jazzData, function(err,r) {
		console.log(r.insertedCount);
		if( r.insertedCount > 0 ) {
			res.status(200).send({status : "success"});
		} else {
			throw new Error('insert data zero');
		}
	}) 
		
});

router.get('/', function(req,res) {
    console.log('called api: /jazz function: get(select)')
	
	const collection = db.get().collection('jazz');
	let day = sanitize(req.query.day);
	let weekAgo = '\'\'';

	if(day != null) {
		day = day * -1;
		weekAgo = getDateAFewDayAgo(day);
	}

	collection.find({date : {$gte: weekAgo }}, {_id : 0}).toArray(function(err, docs) {
		res.status(200).send({result : docs});
	})
	
});


function getDateAFewDayAgo(numFromToday = 0){
  let d = new Date();
  d.setDate(d.getDate() + numFromToday);
  const month = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
  const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
  return  `${d.getFullYear()}-${month}-${day}`;
}

router.use('/location', location)

module.exports = router;
