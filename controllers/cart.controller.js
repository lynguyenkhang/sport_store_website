const Cart = require('../models/cart.model.js');
const Buyers = require('../models/buyers.model.js');
const Products = require('../models/products.model.js');
const functions = require('../controllers/functions.js');



module.exports.index = async function(req, res, next){
	res.render('cart/gio_hang');
}

module.exports.thanh_toan = async function(req, res ,next){
	let cart = await Cart.find({ sessionId : req.signedCookies.sessionId});
	cart = cart[0].cart;
	let empty = functions.isEmpty(cart);
	if(empty){
		res.redirect('/');
		return;
	}
	res.render("cart/thanh_toan");
}

module.exports.check_thanh_toan = async function(req, res, next){
	let fullName = req.body.fullName;
	let phoneNumber = req.body.phoneNumber;
	let address = req.body.address;
	let email = req.body.email;
	let totalPrice = req.body.totalPrice;
	let payment_method;
	let errors = [];

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

	let now = new Date();
	let sessionId = req.signedCookies.sessionId;
	let cart = await Cart.find({ sessionId : sessionId});
	cart = cart[0].cart;

	let product_obj = {};
	for(let product in cart){
		 let item = await Products.find({ _id: product });
		 item =  item[0].price;
		 let soluong = cart[product];
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

	let buyer = await Buyers.create({
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



