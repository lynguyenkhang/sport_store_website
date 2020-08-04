var express = require('express');
var router = express.Router();
var controller = require('../controllers/cart.controller.js');

router.get('/', controller.index);
router.get('/add/:productId', controller.addToCart);
router.get('/thanh_toan', controller.thanh_toan);
router.post('/thanh_toan', controller.check_thanh_toan);

module.exports = router;