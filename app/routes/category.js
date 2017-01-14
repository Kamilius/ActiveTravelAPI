const Category = require('../models/category');

module.exports = (router) => {
  router.route('/category')
  /**
   * Create category with name
   */
  .post((req, res) => {
    const category = new Category();

    category.name = req.body.name;

    // save the category and check for errors
    category.save()
      .then(() => {
        res.json({ message: 'Category created' });
      })
      .catch((err) => {
        res.status(400).send(err);
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
  /**
   * Get category by id
   */
  .get((req, res) => {
    Category.findById(req.params.id, (err, category) => {
      if (err) {
        res.send(err);
        return;
      }

      if (category) {
        res.json(category);
        return;
      }

      res.json(`No category with id '${req.params.id}' found`);
    });
  })
  /**
   * Update category's name
   */
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
    Category.remove({
      _id: req.params.id
    }, (err, category) => {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Category deleted' });
    });
  });

  return router;
};