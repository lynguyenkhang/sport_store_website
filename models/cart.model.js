var mongoose = require("mongoose");

var cart_Schema = new mongoose.Schema({
	sessionId: String,
	cart: Object
});

var Cart = mongoose.model('Cart', cart_Schema, 'cart');

module.exports = Cart;
