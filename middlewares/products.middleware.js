var Products = require('../models/products.model.js'); 



module.exports.load = async function(req, res, next){
	var products = await Products.find();

	var rackets_lining = await Products.find({ product: "racket", brand:"lining"});
	var rackets_yonex = await Products.find({ product: "racket", brand:"yonex"});
	var rackets_victor = await Products.find({ product: "racket", brand:"victor"});

	rackets_lining = rackets_lining.slice(0,3);
	rackets_yonex1 = rackets_yonex.slice(0,4);
	rackets_victor = rackets_victor.slice(0,3);
	rackets_yonex2 = rackets_yonex.slice(4,6)

	rackets = rackets_yonex1.concat(rackets_lining).concat(rackets_victor).concat(rackets_yonex2);

	// req.rackets = rackets.slice(0, 10);
	req.rackets = rackets;
	next();
}
