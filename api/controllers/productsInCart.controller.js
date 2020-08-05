var Cart = require('../../models/cart.model.js');

module.exports.getAllSessionsInCart = async function(req, res){
	var cart = await Cart.find();
	res.json(cart);
}

module.exports.getOneCart = async function(req, res){
	var sessionId = req.params.sessionId;
	var cart = await Cart.find({ sessionId: sessionId});
	res.json(cart);
}

module.exports.updateOneCart = async function(req,res){
	var sessionId = req.params.sessionId;
	var changes = req.body;

	var this_session = await Cart.find({ sessionId: sessionId});
	if(!this_session.length){
		await Cart.insertMany({
			sessionId: sessionId,
			cart: changes
		})
		console.log(`a new cart with sessionId: ${sessionId} is created`);
	} else {
		await Cart.updateOne({ sessionId: sessionId}, {
			cart: changes
		})
		console.log(`cart with sessionId: ${sessionId} is updated `);
	}

	var cart = await Cart.find({ sessionId: sessionId});
	res.json(cart);
}

