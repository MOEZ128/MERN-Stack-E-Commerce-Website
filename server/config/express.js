const BODY_PARSER = require('body-parser');
const CORS = require('cors');
const PASSPORT = require('passport');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // Make sure this uploads directory exists
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const upload = multer({ storage: storage });

const REGISTER_STRATEGY = require('./passport').localRegister();
const LOGIN_STRATEGY = require('./passport').localLogin();

module.exports = (APP) => {
    APP.use(BODY_PARSER.urlencoded({ extended: false }));
    APP.use(BODY_PARSER.json());
    APP.use(CORS());
    APP.use(PASSPORT.initialize());

    PASSPORT.use('local-register', REGISTER_STRATEGY);
    PASSPORT.use('local-login', LOGIN_STRATEGY);
};