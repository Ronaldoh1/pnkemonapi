var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PokemonSchema = new Schema({
  make: String,
  model: String,
  color: String
});

module.exports = mongoose.model('Pokemon', PokemonSchema);
