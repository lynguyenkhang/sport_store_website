const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.controller.js');

router.get('/', controller.index);
router.get('/search', controller.search);

router.get('/:type', controller.view);

router.get('/details/:sp', controller.view_details);





module.exports = router;