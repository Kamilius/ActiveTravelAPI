const Event = require('../models/event');

module.exports = (router) => {
  router.route('/event')
    /**
     * Create event
     */
    .post((req, res) => {
      const event = new Event({
        category: req.body.category,
        dayAmount: req.body.dayAmount,
        description: req.body.description,
        image: req.body.image,
        isHot: req.body.isHot,
        location: req.body.location,
        price: req.body.price,
        startDate: req.body.startDate,
        title: req.body.title,
      });

      event.save()
        .then(() => {
          res.json({ message: 'Event created' });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    });
  router.route('/events')
    /**
     * Get all events
     * Can receive parameters "hot" to search by "isHot" property
     */
    .get((req, res) => {
      let query;

      if (req.query.hot) {
        query = { isHot: req.query.hot === 'true' };
        console.log(query)
      }

      Event.find(query)
        .populate('category')
        .then((events) => {
          res.json(events);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
  router.route('/event/:id')
    /**
     * Get event by id
     */
    .get((req, res) => {
      Event.findById(req.params.id)
        .then((event) => {
          res.json(event);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    /**
     * Update event
     */
    .put((req, res) => {
      Event.findById(req.params.id)
        .then((event) => {
          event.category = req.body.category;
          event.dayAmount = req.body.dayAmount;
          event.description = req.body.description;
          event.image = req.body.image;
          event.isHot = req.body.isHot;
          event.location = req.body.location;
          event.price = req.body.price;
          event.startDate = req.body.startDate;
          event.title = req.body.title;

          event.save()
            .then(() => {
              res.json({ message: 'Event updated' });
            })
            .catch((err) => {
              res.status(400).send(err);
            });
        })
    })
    /**
     * Delete event
     */
    .delete((req, res) => {
      Event.findByIdAndRemove(req.params.id)
        .then(() => {
          res.json({ message: 'Event removed' });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
};