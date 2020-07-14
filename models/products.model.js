 var mongoose = require("mongoose");

var products_Schema = new mongoose.Schema({
	product: String,
	title: String,
	price: String,
	img: String,
	linkDownImg: String,
	link: String,
	brand: String
});

var Products = mongoose.model('Products', products_Schema, 'products');

module.exports = Products;
