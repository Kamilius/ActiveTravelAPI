const bcrypt = require('bcrypt');

const User = require('../models/user');
const checkAuthentication = require('../middleware/check-authentication');

module.exports = (router) => {
  router.route('/user')
    /**
     * Create user
     */
    .post(checkAuthentication, (req, res) => {
      // generate password hash
      bcrypt.hash(req.body.password, 10)
        .then((hash) => {
          // save user with password hash
          const user = new User({
            name: req.body.name,
            password: hash,
            admin: true,
          });

          user.save()
            .then(() => {
              res.json({ message: 'User created' });
            })
            .catch((err) => {
              res.send(err);
            });
        })
        .catch((err) => {
          res.send(err);
        })
    });
}