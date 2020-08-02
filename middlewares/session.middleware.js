var shortid = require('shortid');
var Cart = require('../models/cart.model.js');
var Products = require('../models/products.model.js'); 
var functions = require('../controllers/functions.js');

module.exports.sessionId = async function(req, res, next){
	if(!req.signedCookies.sessionId){
		res.cookie('sessionId', shortid.generate(), {
			signed: true
		});
		res.redirect('/');
		return;
	} else {
		// show quantity of products in cart
		var sessionId = req.signedCookies.sessionId;
		var this_session = await Cart.find({ sessionId : sessionId});
		var cart;
		var productsInCart = [];
		var numCart = 0;
		var totalPrice = 0; 
		if(this_session.length){
			cart = this_session[0].cart;
			for(var product in cart){
				numCart += cart[product];
				var item = await Products.find({ _id : product });
				item[0]["quantity"] = cart[product];
				productsInCart.push(item[0]);

				// calculate total 
				var end = item[0].price.length - 2;
				var priceStr = item[0].price.slice(0, end);
				priceStr = functions.removeWord(priceStr,'.');
				var price = parseInt(priceStr);
				totalPrice += (price * cart[product]);
			}
		}
		totalPrice = JSON.stringify(totalPrice);
		totalPrice = functions.addVND(totalPrice);
		res.locals.totalPrice = totalPrice;
		res.locals.cart = productsInCart;
		res.locals.numCart = numCart;
		res.locals.sessionId = req.signedCookies.sessionId
	}
	next();
}