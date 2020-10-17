const Products = require('../../models/products.model.js');

module.exports.getAll = async function(req, res){
	let products = await Products.find();
	res.json(products);
}