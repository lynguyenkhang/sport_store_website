var Products = require('../../models/products.model.js');

module.exports.getAll = async function(req, res){
	var products = await Products.find();
	res.json(products);
}
