const ServiceCategory = require('../models/service-category');

module.exports = (router) => {
  router.route('/service-category')
  /**
   * Create category with name
   */
  .post((req, res) => {
    if (!req.body.name || !req.body.name.trim().length) {
      res.status(400).send({ message: 'No service category name specified' });

      return;
    }

    const serviceCategory = new ServiceCategory();      // create a new instance of the ServiceCategory model

    serviceCategory.name = req.body.name;  // set the service category's name (comes from the request)

    // save the service category and check for errors
    serviceCategory.save()
      .then(() => {
        res.json({ message: 'Service category created' });
      })
      .catch((err) => {
        console.log(err)
        res.send(err);
      });
  })
  /**
   * Get all available service categories
   */
  .get((req, res) => {
    ServiceCategory.find()
      .then((categories) => {
        res.json(categories);
      })
      .catch((err) => {
        res.send(err);
      });
  });

router.route('/category/:id')
  /**
   * Get service category by id
   */
  .get((req, res) => {
    ServiceCategory.findById(req.params.id, (err, category) => {
      if (err) {
        res.send(err);
        return;
      }

      if (category) {
        res.json(category);
        return;
      }

      res.status(400).send({ message: `No service category with id '${req.params.id}' found` });
    });
  })
  /**
   * Update category's name
   */
  .put((req, res) => {
    if (!req.body.name || !req.body.name.trim().length) {
      res.status(400).send({ message: 'No service category name specified' });

      return;
    }

    ServiceCategory.findById(req.params.id)
      .then((category) => {
        category.name = req.body.name;

        category.save()
          .then(() => {
            res.json({ message: 'Category updated' });
          })
          .catch((err) => {
            res.send(err);
          });
      })
      .catch((err) => {
        res.send(err);
      });
  })
  /**
   * Delete category
   */
  .delete((req, res) => {
    ServiceCategory.remove({
      _id: req.params.id
    }, (err, category) => {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Category successfully deleted' });
    });
  });

  return router;
};