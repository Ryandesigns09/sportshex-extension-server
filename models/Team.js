const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  league: {
    type: String,
    required: true
  },
  colors: [{
    name: String,
    hex: String
  }]
});

teamSchema.statics.getLeagues = function(callback) {
  return this.distinct("league", callback);
};

module.exports = mongoose.model('Team', teamSchema);
