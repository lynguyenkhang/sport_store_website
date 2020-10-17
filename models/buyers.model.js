const mongoose = require("mongoose");

const buyers_Schema = new mongoose.Schema({
	user: Object,
	cart: Object,
	totalPrice: String,
	payment: String,
	startTime: Date,
	endTime: Date 
});

const Buyers = mongoose.model('Buyers', buyers_Schema, 'buyers');

module.exports = Buyers;