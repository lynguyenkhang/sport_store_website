var Cart = require('../models/cart.model.js');
var Buyers = require('../models/buyers.model.js');
var Products = require('../models/products.model.js');
var functions = require('../controllers/functions.js');




module.exports.index = async function(req, res, next){
	res.render('cart/gio_hang');
}







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


module.exports.thanh_toan = async function(req, res ,next){
	var cart = await Cart.find({ sessionId : req.signedCookies.sessionId});
	cart = cart[0].cart;
	var empty = functions.isEmpty(cart);
	if(empty){
		res.redirect('/');
		return;
	}
	res.render("cart/thanh_toan");
}

module.exports.check_thanh_toan = async function(req, res, next){
	var fullName = req.body.fullName;
	var phoneNumber = req.body.phoneNumber;
	var address = req.body.address;
	var email = req.body.email;
	var totalPrice = req.body.totalPrice;
	var payment_method;
	var errors = [];

	if(req.body.payment_method_COD){
		payment_method = "COD";
	} else {
		payment_method = "bank";
	}

	if(!fullName.length){
		errors.push("Họ và tên không để trống");
	}
	if(!phoneNumber.length){
		errors.push("Số điện thoại không để trống");
	} else {
		if(isNaN(phoneNumber)){
			errors.push("Số điện thọai không hợp lệ")
		}		
	}

	if(!address.length){
		errors.push("Địa chỉ không để trống");
	} 

	if(!email.length){
		errors.push("Email không để trống");
	} else {
		if(email.indexOf("@") < 0){
			errors.push("Email không hợp lệ");
		}
	}

	if(errors.length){
		res.render("cart/thanh_toan",{
			errors: errors,
			fullName: fullName,
			phoneNumber: phoneNumber,
			address: address,
			email: email
		})
		return;
	}

	var now = new Date();
	var sessionId = req.signedCookies.sessionId;
	var cart = await Cart.find({ sessionId : sessionId});
	cart = cart[0].cart;

	var product_obj = {};
	for(var product in cart){
		 var item = await Products.find({ _id: product });
		 item =  item[0].price;
		 var soluong = cart[product];
		 product_obj[`${product}`] = {
		 	quantity: soluong,
		 	price: item
		 }
	}

	user = {
		fullName: fullName,
		phoneNumber: phoneNumber,
		address: address,
		email: email
	}

	var buyer = await Buyers.create({
			user: user,
			cart: product_obj,
			totalPrice: totalPrice,
			payment: payment_method,
			startTime: now,
			endTime: null,
	})

	res.clearCookie('sessionId');
	await Cart.findOneAndDelete({ sessionId: sessionId});

	res.render('cart/xac_nhan_don_hang',{
		orderId: buyer.id
	});

}



