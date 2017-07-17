var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Pokemon = require('./app/models/pokemon');

// Configure app for bodyParser()
// lets us grab data from the body of POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up port for server to listen on
var port = process.env.PORT || 3000;

// Connect to DB
mongoose.connect('mongodb://localhost:27017/pokemonapi');

// API Routes
var router = express.Router();

// Routes will all be prefixed with /api
app.use('/api', router);

// MIDDLEWARE - Check if request is safe
router.use(function(req, res, next) {
  console.log('Something is processing right now');
  next();
});

// Test Route
router.get('/', function(req, res) {
  res.json({message: 'Gotta catch them all'});
});

router.route('/pokemons')
  .post(function(req, res) {
    var pokemon = new Pokemon(); // new instance of a pokemon
    pokemon.name = req.body.name;
    pokemon.type = req.body.type;
    pokemon.attack = req.body.attack;

    pokemon.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Pokemon was successfully created'});
    });
  })

  .get(function(req, res) {
    Pokemon.find(function(err, pokemons) {
      if (err) {
        res.send(err);
      }
      res.json(pokemons);
    });
  });

router.route('/pokemon/:pokemon_id')
  .get(function(req, res) {
    Pokemon.findById(req.params.pokemon_id, function(err, pokemon) {
      if (err) {
        res.send(err);
      }
      res.json(pokemon);
    });
  });

router.route('/pokemon/name/:name')
  .get(function(req, res) {
    Pokemon.find({make:req.params.make}, function(err, pokemon) {
      if (err) {
        res.send(err);
      }
      res.json(pokemon);
    });
  });

router.route('/pokemon/type/:type')
  .get(function(req, res) {
    Pokemon.find({color:req.params.color}, function(err, pokemon) {
      if (err) {
        res.send(err);
      }
      res.json(pokemon);
    });
  });

  router.route('/vehicle/attack/:attack')
    .get(function(req, res) {
      Pokemon.find({color:req.params.color}, function(err, pokemon) {
        if (err) {
          res.send(err);
        }
        res.json(pokemon);
      });
    });

// Fire up server
app.listen(port);

// Print friendly message to console
console.log('Server listening on port ' + port);
