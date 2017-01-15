const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
  // uploaded files will go to public/uploads
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  // filename will be jsTimestamp.ext to avoid filenames collisions
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });
const path = require('path');
const checkAuthentication = require('../middleware/check-authentication');

const Document = require('../models/document');

module.exports = (router) => {
  router.use(upload.single('document'));

  router.route('/document')
    /**
     * Create document
     */
    .post(checkAuthentication, (req, res) => {
      if (!req.file) {
        res.status(400).send({ message: 'No document files specified' });

        return;
      }

      // Store available document entry in database
      const doc = new Document();

      doc.size = req.file.size;
      doc.title = req.file.originalname;
      doc.url = req.file.path.replace('public', '');

      // save the doc and check for errors
      doc.save()
        .then(() => {
          res.json({ message: 'Document created', url: doc.url, id: doc._id });
        })
        .catch((err) => {
          res.send(err);
        });
    })
    /**
     * Get all available documents
     */
    .get((req, res) => {
      Document.find()
        .then((documents) => {
          res.json(documents);
        })
        .catch((err) => {
          res.send(err);
        });
    });

  router.route('/document/:id')
    /**
     * Delete document
     */
    .delete(checkAuthentication, (req, res) => {
      // Remove file entry from db
      Document.findById(req.params.id)
        .then((doc) => {
          const docUrl = doc.url;

          Document.remove({
            _id: doc._id,
          }, (err) => {
            if (err) {
              res.send(err);
              return;
            }
            // Remove file from disk
            fs.unlink(`public${docUrl}`, (err) => {
              if (err) {
                res.send(err);
                return;
              }
              res.json({ message: 'Document deleted' });
            });
          });
        });
    });

  return router;
};