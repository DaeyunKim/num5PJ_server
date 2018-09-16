const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
// const express = require('express');
// var app = express();
// var router = express.Router();
// var jazz = require('./jazz/index')


// router.use('/jazz',jazz)
// express 모듈을 만들고 관련 함수를 app에 넣어버림 
var express = require('express')
    , app = express()

var bodyParser = require('body-parser')
var router = require('./router/index')
var session = require('express-session')
var db = require('./utils/db')

var cors = require('cors');

// Connection URL
// const url = 'mongodb://222.106.100.125:5050';
// var url = 'mongodb://localhost:27017/num5PJ';
var url = 'mongodb://num5PJ:qwe123@ds157522.mlab.com:57522/npm5pj';
// post방식의 데이터를 이용할려면 필요 ( npm install body-parser )
// bodyParser의 json과 urlencoded 부분의 사용명시
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// express-session (사용할진 몰겠음)
app.use(session({
	secret : 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))

 
// Use connect method to connect to the server
db.connect(url, function(err) {
  console.log("Connected successfully to mongodb");

  if(err) {
  	console.log('Unable to connect to Mongo,')
  	process.exit(1)
  } else { 
	// app.listen(3001, function(){
	//     console.log("start test");
	// });
  } 
})

//add cors setting
app.use(cors({ origin: 'https://mycalender-187407.firebaseapp.com/' }))
// 이 부분은 app.use(router) 전에 추가하도록 하자
app.use(router)


// app.use(function(req, res, next) {
//   res.status(404).send('Sorry cant find that!');
// });

// // Handle 500
// app.use(function(error, req, res, next) {
//    res.send('500: Internal Server Error', 500);
// });
exports.app = functions.https.onRequest(app);

// executeCommand :  firebase serve --only functions,hosting
// uloadCommand : firebase deploy --only functions:app