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
    var vehicle = new Pokemon(); // new instance of a pokemon
    pokemon.name = req.body.name;
    pokemon.type = req.body.type;
    pokemon.attack = req.body.attack;

    vehicle.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Pokemon was successfully created'});
    });
  })

  .get(function(req, res) {
    Vehicle.find(function(err, pokemons) {
      if (err) {
        res.send(err);
      }
      res.json(vehicles);
    });
  });

router.route('/vehicle/:pokemon_id')
  .get(function(req, res) {
    Vehicle.findById(req.params.vehicle_id, function(err, vehicle) {
      if (err) {
        res.send(err);
      }
      res.json(pokemon);
    });
  });

router.route('/vehicle/name/:name')
  .get(function(req, res) {
    Vehicle.find({make:req.params.make}, function(err, vehicle) {
      if (err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });

router.route('/vehicle/type/:type')
  .get(function(req, res) {
    Vehicle.find({color:req.params.color}, function(err, vehicle) {
      if (err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });

  router.route('/vehicle/attack/:attack')
    .get(function(req, res) {
      Vehicle.find({color:req.params.color}, function(err, vehicle) {
        if (err) {
          res.send(err);
        }
        res.json(vehicle);
      });
    });

// Fire up server
app.listen(port);
// Print friendly message to console
console.log('Server listening on port ' + port);
