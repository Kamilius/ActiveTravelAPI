const Event = require('../models/event');

module.exports = (router) => {
  router.route('/event')
    // Create event
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
    // Get all events
    // Can receive parameters "hot" to search by "isHot" property
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
};