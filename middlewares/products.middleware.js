var Products = require('../models/products.model.js'); 



module.exports.load = async function(req, res, next){
	// var products = await Products.find();

	// load Rackets database
	var rackets_lining = await Products.find({ product: "racket", brand:"lining"});
	var rackets_yonex = await Products.find({ product: "racket", brand:"yonex"});
	var rackets_victor = await Products.find({ product: "racket", brand:"victor"});

	rackets_lining = rackets_lining.slice(0,3);
	rackets_yonex1 = rackets_yonex.slice(0,4);
	rackets_victor = rackets_victor.slice(0,3);
	rackets_yonex2 = rackets_yonex.slice(4,6);

	rackets = rackets_yonex1.concat(rackets_lining).concat(rackets_victor).concat(rackets_yonex2);
	req.rackets = rackets;

	//load Shoes database
	var shoes_lining = await Products.find({ product: "shoes", brand:"lining"});
	var shoes_yonex = await Products.find({ product: "shoes", brand:"yonex"});
	var shoes_victor = await Products.find({ product: "shoes", brand:"victor"});

	shoes_lining = shoes_lining.slice(0,3);
	shoes_yonex1 = shoes_yonex.slice(0,4);
	shoes_victor = shoes_victor.slice(0,3);
	shoes_yonex2 = shoes_yonex.slice(4,6);

	shoesList = shoes_yonex1.concat(shoes_lining).concat(shoes_victor).concat(shoes_yonex2);
	req.shoesList = shoesList;

	//load T_SHIRT database
	var t_shirt_lining = await Products.find({ product: "t_shirt", brand:"lining"});
	var t_shirt_yonex = await Products.find({ product: "t_shirt", brand:"yonex"});
	var t_shirt_victor = await Products.find({ product: "t_shirt", brand:"victor"});

	t_shirt_lining = t_shirt_lining.slice(0,4);
	t_shirt_yonex1 = t_shirt_yonex.slice(0,2);
	t_shirt_victor = t_shirt_victor.slice(0,4);
	t_shirt_yonex2 = t_shirt_yonex.slice(2,4);

	t_shirtList = t_shirt_yonex1.concat(t_shirt_lining).concat(t_shirt_victor).concat(t_shirt_yonex2);
	req.t_shirtList = t_shirtList;


	//load PANTS database
	var pants_lining = await Products.find({ product: "pants", brand:"lining"});
	var pants_yonex = await Products.find({ product: "pants", brand:"yonex"});
	var pants_victor = await Products.find({ product: "pants", brand:"victor"});

	pants_lining = pants_lining.slice(0,4);
	pants_yonex1 = pants_yonex.slice(0,2);
	pants_victor = pants_victor.slice(0,4);
	pants_yonex2 = pants_yonex.slice(2,4);

	pantsList = pants_yonex1.concat(pants_lining).concat(pants_victor).concat(pants_yonex2);
	req.pantsList = pantsList;


	//load BALO database
	var balo_lining = await Products.find({ product: "balo", brand:"lining"});
	var balo_yonex = await Products.find({ product: "balo", brand:"yonex"});
	var balo_victor = await Products.find({ product: "balo", brand:"victor"});

	balo_lining = balo_lining.slice(0,4);
	balo_yonex1 = balo_yonex.slice(0,2);
	balo_victor = balo_victor.slice(0,4);
	balo_yonex2 = balo_yonex.slice(2,4);

	baloList = balo_yonex1.concat(balo_lining).concat(balo_victor).concat(balo_yonex2);
	req.baloList = baloList;

	//load ACCESSORIES database
	//load BALO database
	var socks_lining = await Products.find({ product: "socks", brand:"lining"});
	var string_yonex = await Products.find({ product: "string", brand:"yonex"});
	var grip_victor = await Products.find({ product: "grip", brand:"victor"});

	socks_lining = socks_lining.slice(0,4);
	string_yonex1 = string_yonex.slice(0,4);
	grip_victor = grip_victor.slice(0,4);
	// string_yonex2 = string_yonex.slice(3,5);

	accessoriesList = string_yonex1.concat(socks_lining).concat(grip_victor);
	req.accessoriesList = accessoriesList;


	next();
}
