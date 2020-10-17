const Products = require('../../models/products.model.js');

module.exports.getAll = async function(req, res){
<<<<<<< HEAD
	const products = await Products.find();
=======
	let products = await Products.find();
>>>>>>> image_cloudinary
	res.json(products);
}