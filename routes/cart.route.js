const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.controller.js');

router.get('/', controller.index);
router.get('/thanh_toan', controller.thanh_toan);
router.post('/thanh_toan', controller.check_thanh_toan);

module.exports = router;