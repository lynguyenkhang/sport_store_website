const mongoose = require('mongoose')

const products_cloudinary_Schema = new mongoose.Schema({
    product: String,
    brand: String,
    title: String,
    price: Number,
    url_img : String
})

const Products_cloudinary = mongoose.model('products_cloudinary', products_cloudinary_Schema, 'products_cloudinary');
module.exports = Products_cloudinary;