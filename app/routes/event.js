const Event = require('../models/event');
const checkAuthentication = require('../middleware/check-authentication');

module.exports = (router) => {
  /**
   * Save separate event for each available startDate
   * @param {Object} data - event data
   * @param {Object} res  - response object for API communication
   */
  const saveMultipleEvents = (data, res) => {
    let events = data.startDate.map((startDate) => {
      return {
        category: data.category,
        dayAmount: data.dayAmount,
        description: data.description,
        image: data.image,
        isHot: data.isHot,
        location: data.location,
        price: data.price,
        startDate,
        title: data.title,
      }
    });

    Event.create(events, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json({ message: 'Events created' });
      }
    });
  };

  /**
   * Save single event
   * @param {Object} data - event data
   * @param {Object} res  - response object for API communication
   */
  const saveSingleEvent = (data, res) => {
    const event = new Event({
      category: data.category,
      dayAmount: data.dayAmount,
      description: data.description,
      image: data.image,
      isHot: data.isHot,
      location: data.location,
      price: data.price,
      startDate: data.startDate,
      title: data.title,
    });

    event.save()
      .then(() => {
        res.json({ message: 'Event created' });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  };

  router.route('/event')
    /**
     * Create event
     */
    .post(checkAuthentication, (req, res) => {
      // If multiple start dates specified, create separate event for each date
      if (req.body.startDate instanceof Array) {
        saveMultipleEvents(req.body, res);
      // create single event
      } else {
        saveSingleEvent(req.body, res);
      }
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
        .populate('category')
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
    .put(checkAuthentication, (req, res) => {
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
    .delete(checkAuthentication, (req, res) => {
      Event.findByIdAndRemove(req.params.id)
        .then(() => {
          res.json({ message: 'Event removed' });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
};