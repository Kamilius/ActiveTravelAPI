const Service = require('../models/service');

module.exports = (router) => {
  router.route('/service')
    /**
     * Create service
     */
    .post((req, res) => {
      const service = new Service({
        capacity: req.body.capacity,
        description: req.body.description,
        image: req.body.image,
        location: req.body.location,
        price: req.body.price,
        serviceCategory: req.body.serviceCategory,
        title: req.body.title,
      });

      service.save()
        .then(() => {
          res.json({ message: 'Service created' });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    });
  router.route('/services')
    /**
     * Get all services
     */
    .get((req, res) => {
      Service.find()
        .populate('serviceCategory')
        .then((services) => {
          res.json(services);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
  router.route('/service/:id')
    /**
     * Get service by id
     */
    .get((req, res) => {
      Service.findById(req.params.id)
        .populate('serviceCategory')
        .then((services) => {
          res.json(services);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    /**
     * Update service
     */
    .put((req, res) => {
      Service.findById(req.params.id)
        .then((service) => {
          service.capacity = req.body.capacity;
          service.description = req.body.description;
          service.image = req.body.image;
          service.location = req.body.location;
          service.price = req.body.price;
          service.serviceCategory = req.body.serviceCategory;
          service.title = req.body.title;

          service.save()
            .then(() => {
              res.json({ message: 'Service updated' });
            })
            .catch((err) => {
              res.status(400).send(err);
            });
        })
    })
    /**
     * Delete service
     */
    .delete((req, res) => {
      Service.findByIdAndRemove(req.params.id)
        .then(() => {
          res.json({ message: 'Service removed' });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
};