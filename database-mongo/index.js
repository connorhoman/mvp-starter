var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fantasy');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var playerSchema = mongoose.Schema({
  id: Number,
  rank: Number,
  pick: Number,
  name: String,
  position: String,
  team: String,
  bye: Number,
  ADP: Number,
  STD: Number,
  HIGH: Number,
  LOW: Number,
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
})

var Player = mongoose.model('Player', playerSchema);
var Ranking = mongoose.model('Ranking', rankingSchema);

var selectAll = function(callback) {
  Player.find({}, function(err, items) {
    if(err) {
      callback(err, null);
      console.log('Error passed to server', err);
    } else {
      callback(null, items);
      console.log("Found initial rankings")
    }
  });
};

var findRanking = function(user, callback) {
  Ranking.find({user: user}, function(err, items) {
    if (items.length === 0) {
      callback(err, null);
      console.log('Error passed to server', err);
    } else {
      callback(null, items);
      console.log('GET Successfuly found these items');
    }
  });
};

var postRanking = function(ranking, callback) {
  Ranking.update(ranking, function(err) {
    if (err) {
      Ranking.create(ranking, function(err) {
        if (err) {
          callback(err, null);
          console.log('POST Error passed to server', err);
        } else {
          callback(null, 'success');
          console.log('POST success');
        }
      });
    } else {
      callback(null, 'Successfully Found');
    }
  });
}

module.exports.selectAll = selectAll;
module.exports.findRanking = findRanking;
module.exports.postRanking = postRanking;