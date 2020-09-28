const Products = require('../../models/products.model.js');

module.exports.getAll = async function(req, res){
	const products = await Products.find();
	res.json(products);
}