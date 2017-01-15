const UploadedImage = require('../models/uploaded-image');
const checkAuthentication = require('../middleware/check-authentication');

module.exports = (router) => {
  router.route('/uploaded-image')
    /**
     * Create image encoded into base64 string
     */
    .post(checkAuthentication, (req, res) => {
      const image = new UploadedImage(); // create a new instance of the UploadedImage model

      image.base64 = req.body.base64; // set the image's base64 (comes from the request)

      // save the image and check for errors
      image.save()
        .then(() => {
          res.json({ message: 'Image created' });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    /**
     * Get all available images
     */
    .get((req, res) => {
      UploadedImage.find()
        .then((images) => {
          res.json(images);
        })
        .catch((err) => {
          res.send(err);
        });
    });

  router.route('/uploaded-image/:id')
    /**
     * Get image by id
     */
    .get((req, res) => {
      UploadedImage.findById(req.params.id, (err, image) => {
        if (err) {
          res.send(err);
          return;
        }

        if (image) {
          res.json(image);
          return;
        }

        res.json(`No image with id '${req.params.id}' found`);
      });
    })
    /**
     * Update image's name
     */
    .put(checkAuthentication, (req, res) => {
      if (!req.body.base64 || !req.body.base64.length) {
        res.status(400).send({ message: 'No base64 parameter specified' });

        return;
      }

      UploadedImage.findById(req.params.id)
        .then((image) => {
          image.base64 = req.body.base64;

          image.save()
            .then(() => {
              res.json({ message: 'Image updated' });
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
     * Delete image
     */
    .delete(checkAuthentication, (req, res) => {
      UploadedImage.remove({
        _id: req.params.id,
      }, (err) => {
        if (err) {
          res.send(err);
        }

        res.json({ message: 'Image deleted' });
      });
    });

  return router;
};