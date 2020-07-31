var express = require('express');
var router = express.Router();
var controller = require('../controllers/productsInCart.controller.js');

// router.get('/', controller.getAllSessionsInCart);
router.get('/:sessionId', controller.getOneCart);
router.patch('/:sessionId', controller.updateOneCart);
// router.delete('/:sessionId', controller.deleteOneSession);

module.exports = router;