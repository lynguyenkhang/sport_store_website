const shortid = require('shortid');
const Cart = require('../models/cart.model.js');
const Products = require('../models/products.model.js'); 
const functions = require('../controllers/functions.js');

module.exports.sessionId = async function(req, res, next){
	if(!req.signedCookies.sessionId){
		res.cookie('sessionId', shortid.generate(), {
			signed: true
		});
		res.redirect('/');
		return;
	} else {
		// show quantity of products in cart
		let sessionId = req.signedCookies.sessionId;
		let this_session = await Cart.find({ sessionId : sessionId});
		let cart;
		let productsInCart = [];
		let numCart = 0;
		let totalPrice = 0; 
		if(this_session.length){
			cart = this_session[0].cart;
			for(let product in cart){
				numCart += cart[product];
				let item = await Products.find({ _id : product });
				item[0]["quantity"] = cart[product];
				productsInCart.push(item[0]);

				// calculate total 
				let end = item[0].price.length - 2;
				let priceStr = item[0].price.slice(0, end);
				priceStr = functions.removeWord(priceStr,'.');
				let price = parseInt(priceStr);
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