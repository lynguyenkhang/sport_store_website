var mongoose = require("mongoose");

var products_brands_Schema = new mongoose.Schema({
	product: String,
	brands: Array
});

var Product_brands = mongoose.model('Product_brands', products_brands_Schema, 'product_brands');

module.exports = Product_brands;

