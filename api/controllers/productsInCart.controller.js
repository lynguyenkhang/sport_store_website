const Cart = require('../../models/cart.model.js');

module.exports.getAllSessionsInCart = async function(req, res){
	let cart = await Cart.find();
	res.json(cart);
}

module.exports.getOneCart = async function(req, res){
	let sessionId = req.params.sessionId;
	let cart = await Cart.find({ sessionId: sessionId});
	res.json(cart);
}

module.exports.updateOneCart = async function(req,res){
	let sessionId = req.params.sessionId;
	let changes = req.body;

	let this_session = await Cart.find({ sessionId: sessionId});
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

	let cart = await Cart.find({ sessionId: sessionId});
	res.json(cart);
}

