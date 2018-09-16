var express = require('express')
var router = express.Router();
var jazz = require('./jazz/index')


router.use('/jazz',jazz)

module.exports = router;
