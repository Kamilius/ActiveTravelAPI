// BASE SETUP
// =============================================================================
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();

const jwt = require('jsonwebtoken');
const config = require('./app/config');

mongoose.connect(config.database);
app.set('superSecret', config.secret);

// configure app to use bodyParser()
app.use(bodyParser.json({ limit: '10mb'  }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// log requests to the console
app.use(morgan('dev'));

const port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

require('./app/routes/authenticate')(router, app);
require('./app/routes/category')(router);
require('./app/routes/document')(router);
require('./app/routes/event')(router);
require('./app/routes/service')(router);
require('./app/routes/service-category')(router);
require('./app/routes/slide')(router);
require('./app/routes/uploaded-image')(router);
require('./app/routes/user')(router);

// REGISTER ROUTES -------------------------------
// all routes will be prefixed with /api
app.use('/api', router);
app.use(express.static('public'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);