var express = require('express');
var router = express.Router();
var controller = require('..//controllers/products.controller.js');

router.get('/', controller.index);
router.get('/search', controller.search);

router.get('/:type', controller.view);

router.get('/details/:sp', controller.view_details);





module.exports = router;