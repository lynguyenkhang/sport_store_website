var Cart = require('../models/cart.model.js');


module.exports.addToCart = async function(req, res, next){
	var end = req.params.productId.indexOf("@");
	var increase_Str = req.params.productId.slice(end+1);
	var increase = JSON.parse(increase_Str);
	var productId = req.params.productId.slice(0, end);



	var quantity = req.query.quantity;
	var sessionId = req.signedCookies.sessionId;
	if(!sessionId){
		res.redirect('/');
		return;
	}

	var this_session = await Cart.find({ sessionId : sessionId});

	if(this_session.length == 0){
		var cart = {};
		cart[productId] = increase;

		await Cart.insertMany({ 
			sessionId: sessionId,
			cart: cart
		});
		res.redirect('/');
		return;

	} else {
		var cart = this_session[0].cart;
		var count = 0;
		for(var product in cart){
			if(product == productId){ count = cart[product];}
		}

		cart[productId] = count + increase;
		console.log(cart);

		await Cart.updateOne({sessionId: sessionId},{ cart: cart });
		res.redirect('/');
		return;
	}
}




