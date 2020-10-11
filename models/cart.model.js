const mongoose = require("mongoose");

const cart_Schema = new mongoose.Schema({
	sessionId: String,
	cart: Object
});

const Cart = mongoose.model('Cart', cart_Schema, 'cart');

module.exports = Cart;
