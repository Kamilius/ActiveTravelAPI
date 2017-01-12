// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express = require('express');        // call express
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();                 // define our app using express

mongoose.connect('mongodb://developer:dev123@ds145828.mlab.com:45828/active_travel'); // connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

require('./app/routes/category')(router);
require('./app/routes/service-category')(router);

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);