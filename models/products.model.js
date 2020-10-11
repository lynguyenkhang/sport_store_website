const mongoose = require("mongoose");

const products_Schema = new mongoose.Schema({
	product: String,
	title: String,
	price: String,
	img: String,
	linkDownImg: String,
	link: String,
	brand: String
});

const Products = mongoose.model('Products_cloudinary', products_Schema, 'products_cloudinary');

module.exports = Products;
