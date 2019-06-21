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

var Player = mongoose.model('Player', playerSchema);

var selectAll = function(callback) {
  Player.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;