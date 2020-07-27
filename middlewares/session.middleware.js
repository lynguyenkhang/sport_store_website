var shortid = require('shortid');
var Cart = require('../models/cart.model.js');


module.exports = async function(req, res, next){
	if(!req.signedCookies.sessionId){
		res.cookie('sessionId', shortid.generate(), {
			signed: true
		});
	} else {
		// show quantity of products in cart
		var sessionId = req.signedCookies.sessionId;
		var this_session = await Cart.find({ sessionId : sessionId});
		var cart;
		var numCart = 0;
		if(this_session.length){
			cart = this_session[0].cart;
			for(var product in cart){
				numCart += cart[product];
			}
		}
		res.locals.numCart = numCart;
	}
	next();
}