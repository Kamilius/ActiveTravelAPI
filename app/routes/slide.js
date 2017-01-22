const Slide = require('../models/slide');
const checkAuthentication = require('../middleware/check-authentication');

module.exports = (router) => {
  router.route('/slide')
    /**
     * Create slide
     */
    .post(checkAuthentication, (req, res) => {
      const slide = new Slide({
        event: req.body.eventId,
        document: req.body.documentId,
      });

      // save the slide and check for errors
      slide.save()
        .then(() => {
          res.json({ message: 'Slide created' });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    });
    /**
     * Get all available slides
     */
  router.route('/slides')
    .get((req, res) => {
      Slide.find()
        .then((slides) => {
          res.json(slides);
        })
        .catch((err) => {
          res.send(err);
        });
    });

  router.route('/slide/:id')
    /**
     * Get slide by id
     */
    .get((req, res) => {
      Slide.findById(req.params.id)
        .then((slide) => {
          res.json(slide);
        })
        .catch((err) => {
          res.send(err);
        })
    })
    /**
     * Update slide
     */
    .put(checkAuthentication, (req, res) => {
      Slide.findByIdAndUpdate(req.params.id, {
        event: req.body.eventId,
        document: req.body.documentId,
      }).then(() => {
        res.json({ message: 'Slide updated' });
      })
      .catch((err) => {
        res.send(err);
      });
      /*, (err, doc) => {
        if (err) {
          res.status(400).send(err);
        }

        res.json({ message: 'Slide updated' });
      });
        .then((slide) => {
          slide.event = req.body.eventId;
          slide

          slide.save()

        })
        .catch((err) => {
          res.send(err);
        });*/
    })
    /**
     * Delete slide
     */
    .delete(checkAuthentication, (req, res) => {
      Slide.findByIdAndRemove(req.params.id)
        .then(() => {
          res.json({ message: 'Slide deleted' });
        })
        .catch((err) => {
          res.send(err);
        });
    });

  return router;
};