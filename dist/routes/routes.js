var express = require('express');
var router = express.Router();

// TODO
// router.use('/show/:id', require('./show'));

router.use('/resume', require('./resume'));
router.use('/works', require('./works'));
router.use('/contact', require('./contact'));
router.use('/exhibition', require('./exhibition'));
router.use('/$', require('./index'));

module.exports = router;
