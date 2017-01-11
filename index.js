// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express = require('express');        // call express
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();                 // define our app using express

const Category = require('./app/models/category');

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

// more routes for our API will happen here

router.route('/category')
  /**
   * Create category with name
   */
  .post((req, res) => {
    if (!req.body.name || !req.body.name.trim().length) {
      res.status(400).send({ message: 'No category name specified' });

      return;
    }

    const category = new Category();      // create a new instance of the Category model

    category.name = req.body.name;  // set the category's name (comes from the request)

    // save the category and check for errors
    category.save()
      .then(() => {
        res.json({ message: 'Category created' });
      })
      .catch((err) => {
        res.send(err);
      });
  })
  /**
   * Get all available categories
   */
  .get((req, res) => {
    Category.find()
      .then((categories) => {
        res.json(categories);
      })
      .catch((err) => {
        res.send(err);
      });
  });

router.route('/category/:id')
  .get((req, res) => {
    Category.findById(req.params.id, (err, category) => {
      if (err) {
        res.send(err);
        return;
      }
      console.log(category);
      res.json(category);
    });
  })
  .put((req, res) => {
    if (!req.body.name || !req.body.name.trim().length) {
      res.status(400).send({ message: 'No category name specified' });

      return;
    }

    Category.findById(req.params.id)
      .then((category) => {
        category.name = req.body.name;

        category.save()
          .then(() => {
            res.json({ message: 'Category updated!' });
          })
          .catch((err) => {
            res.send(err);
          });
      })
      .catch((err) => {
        res.send(err);
      });
  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);