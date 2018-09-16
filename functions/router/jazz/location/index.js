var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
var db = require(path.resolve() + '/utils/db' );
var sanitize = require('mongo-sanitize');

router.get('/', function(req,res) {
    console.log('called api: /jazz/location function: get(select)')
	
	const collection = db.get().collection('jazz');
	
	collection.distinct('performInfo.location',function(err, docs) {
		res.status(200).send({result : docs});
	})

});

module.exports = router;
