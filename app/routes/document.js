const Document = require('../models/document');

module.exports = (router) => {
  router.route('/document')
    /**
     * Create document
     */
    .post((req, res) => {
      if (!req.files.document) {
        res.status(400).send({ message: 'No document files specified' });

        return;
      }

      // Read uploaded document
      fs.readFile(req.files.document.path, (err, data) => {
        if (err) {
          res.send(err);
          return;
        }

        let newDocName = `/uploads/${req.files.document.name}`
        let newPath = `${__dirname}${newDocName}`;
        // Write uploaded document into new direction
        fs.writeFile(newPath, data, (err) => {
          if (err) {
            res.send(err);
            return;
          }
          // Store available document entry in database
          const doc = new Document();

          doc.size = req.files.document.size;
          doc.title = req.files.document.name;
          doc.url = newDocName;

          // save the doc and check for errors
          doc.save()
            .then(() => {
              res.json({ message: 'Document created', url: doc.url });
            })
            .catch((err) => {
              res.send(err);
            });
        });
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
    .delete((req, res) => {
      Document.remove({
        _id: req.params.id
      }, (err, doc) => {
        if (err) {
          res.send(err);
        }

        res.json({ message: 'Document deleted' });
      });
    });

  return router;
};