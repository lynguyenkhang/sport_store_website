const mongoose = require("mongoose");

const products_Schema = new mongoose.Schema({
	product: String,
	title: String,
	price: String,
	img: String,
	brand: String
});

const Products = mongoose.model('Products', products_Schema, 'products');

module.exports = Products;
