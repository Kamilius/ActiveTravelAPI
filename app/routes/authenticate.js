const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = (router, app) => {
  router.post('/authenticate', (req, res) => {
    // find the user
    User.findOne({
      name: req.body.name,
    }, (err, user) => {
      if (err) throw err;

      if (!user) {
        res.status(401).json({ message: 'Authentication failed. User not found.' });
      } else if (user) {
        bcrypt.compare(req.body.password, user.password)
          .then(() => {
            // if user is found and password is right
            // create a token
            const token = jwt.sign(user, app.get('superSecret'), {
              expiresIn: 60 * 60, // expires in 1 hour
            });

            // return the information including token as JSON
            res.status(200).json({
              message: 'Authentication successful',
              token,
            });
          })
          .catch(() => {
            res.status(401).json({ message: 'Authentication failed. Wrong password.' });
          });
      }
    });
  });
}