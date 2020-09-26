var mongoose = require("mongoose");

var buyers_Schema = new mongoose.Schema({
	user: Object,
	cart: Object,
	totalPrice: String,
	payment: String,
	startTime: Date,
	endTime: Date 
});

var Buyers = mongoose.model('Buyers', buyers_Schema, 'buyers');

module.exports = Buyers;