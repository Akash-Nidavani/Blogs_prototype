const bodyParser = require('body-parser');

const trimBodyMiddleware = (req, res, next) => {
  bodyParser.urlencoded({ extended: true })(req, res, () => {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].trim();
      }
    }
    next();

  });
};

module.exports = { trimBodyMiddleware }
