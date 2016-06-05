var express = require('express');
var router = express.Router();

require('./main.js').init(router);
require('./auth.js').init(router);
require('./telegram.js').init(router);

module.exports = router;
