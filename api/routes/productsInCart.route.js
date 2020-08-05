var express = require('express');
var router = express.Router();
var controller = require('../controllers/productsInCart.controller.js');

router.get('/:sessionId', controller.getOneCart);
router.patch('/:sessionId', controller.updateOneCart);


module.exports = router;