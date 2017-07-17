var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PokemonSchema = new Schema({
  name: String,
  type: String,
  attack: String
});

module.exports = mongoose.model('Pokemon', PokemonSchema);
