var mongoose = require('mongoose');
const mongoURI = 'mongodb://172.31.23.200:27017/fantasy';
const db = mongoose.connect(mongoURI, { useNewUrlParser: true });
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

MongoClient.connect(mongoURI, {
  poolSize: 1000
}, function(err, db) {
  assert.equal(null, err);
  db.close();
});

var playerSchema = mongoose.Schema({
  id: Number,
  rank: Number,
  name: String,
  position: String,
  team: String,
  bye: Number,
  ADP: Number,
  url: String,
});
var rankingSchema = mongoose.Schema({
  user: String,
  userRanking: String,
  qb: Array,
  rb: Array,
  wr: Array,
  te: Array,
  def: Array,
  pk: Array,
});

var Player = mongoose.model('Player', playerSchema);
var Ranking = mongoose.model('Ranking', rankingSchema);

var selectAll = function(callback) {
  Player.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var findRanking = function(user, callback) {
  Ranking.find({user: user}, function(err, items) {
    if (items.length === 0) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var postRanking = function(ranking, callback) {
  Ranking.find({user:ranking.user}, function(err, items) {
    if (items.length === 0) {
      Ranking.create(ranking, function(err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, 'Successfully Created Ranking');
        }
      });
    } else {
      Ranking.update(ranking, function(err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, 'Successfully Updated Ranking');
        }
      });
    }
  });
}

module.exports.selectAll = selectAll;
module.exports.findRanking = findRanking;
module.exports.postRanking = postRanking;