var MongoClient = require('mongodb').MongoClient

var state = {
  db: null,
}

exports.connect = function(url, done) {
  if (state.db) return done()

  MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    if (err) return done(err)
    state.db = client.db('npm5pj');
    done()
  })
}

exports.get = function() {
  return state.db
}

/*
exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}*/



/*
module.exports = function(){
    var mysql = require('mysql');
    var conn = mysql.createConnection({
      host     : config.host,
      port : config.port,
      user     : config.user,
      password : config.password,
      database :  config.database
    });
    conn.connect();
    return conn;
  }

*/