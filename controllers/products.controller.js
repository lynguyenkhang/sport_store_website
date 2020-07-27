var Products = require('../models/products.model.js');
var functions = require('./functions.js');

module.exports.index = async function(req, res){

	if(!req.query.page){
		var page = 1;
	} else {
		var page = req.query.page;
	}

	var paginationNumber = functions.pageNumber(page, 5);


	var perPage = 12; // x
	var begin = page * perPage - perPage;
	var end = page * perPage;

	var products = await Products.find();
	// console.log(products.slice(0,2));
	res.render('products/index', {
		productList: products.slice(begin, end),	
		paginationNumber: paginationNumber,
		// để phân biệt pagination trang products với search
		page: '?page=',
		// placeholder: 
	})
}



module.exports.search = async function(req,res){
	var query_name = req.query.name;
	var name = query_name.toLowerCase();
	var query_type = req.query.type;

	type = functions.translateProduct(query_type);

	var brand = req.query.brand;
	brand = brand.toLowerCase();

	// tách price
	var query_price = req.query.price;

	var priceArr = [];
	switch(query_price){
		case "Giá dưới 500.000đ":
			priceArr = [0, 500000]; break;
		case "500.000đ - 1 triệu":
			priceArr = [500000, 1000000]; break;
		case "1 - 2 triệu":
			priceArr = [1000000, 2000000]; break;
		case "2 - 3 triệu":
			priceArr = [2000000, 3000000]; break;
		case "Trên 3 triệu":
			priceArr = [3000000, 99999999]; break;
		default:
			priceArr = [0, 99999999]; break;
	}

	// var test = "Vợt cầu lông titit";
	// var index = test.indexOf(name);
	// console.log(name);
	// console.log(index);

	var products;

	// Xét trường hợp 'tất cả' cho type và brand

	switch(type){
		case "accessories":
			switch(brand){
				case "tất cả":
					var grips = await Products.find({ product: "grip"});
					var strings = await Products.find({ product: "string" });
					var socks = await Products.find({ product: "socks" });
					products = grips.concat(strings).concat(socks);
					break;
				default: 
					var grips = await Products.find({ product: "grip", brand: brand });
					var strings = await Products.find({ product: "string" , brand: brand });
					var socks = await Products.find({ product: "socks" , brand: brand });
					products = grips.concat(strings).concat(socks);
					break;};	
			break;

		case "tất cả":
			switch(brand){
				case "tất cả":
					products = await Products.find(); break;
				default:
					products = await Products.find({ brand: brand }); break;
			}; break;

		default:
			switch(brand){
				case "tất cả":
					products = await Products.find({ product: type }); break;
				default:
					products = await Products.find({ product: type, brand: brand}); break;
			}			
	}




	var pageURL = "/search?name=" + query_name + "&type=" + query_type + "&brand=" + brand +"&price=" + query_price +"&page=";

	// xử lí phần  PRICE và Name
	products = products.filter( product => {
		// xử lí phần PRICE
		var end = product.price.length - 2;
		var priceStr = product.price.slice(0, end);
		priceStr = functions.removeWord(priceStr,'.');
		var price = parseInt(priceStr);


		//xử lí phần Name
		var checkName = product.title.toLowerCase().indexOf(name);

		return (price > priceArr[0]) && (price <= priceArr[1]) && (checkName > -1);
	})


	//Create pagination
	if(!req.query.page){
			var page = 1;
		} else {
			var page = req.query.page;
		}

		var paginationNumber = functions.pageNumber(page, 10);


		var perPage = 12; // x
		var begin = page * perPage - perPage;
		var end = page * perPage;

		// var products = await Products.find();
		// console.log(products.slice(0,2));
		res.render('products/index', {
			productList: products.slice(begin, end),	
			paginationNumber: paginationNumber,
			// để phân biệt pagination trang products với search
			page: pageURL,
			placeholder: query_name
		})
}


module.exports.view = async function(req, res){
	var type = req.params.type;
	var brands;
	var thuong_hieu;
	var loai_phu_kien;

	// trường hợp link dẫn đến 1 loại và hãng sp cụ thể như :
	// vợt cầu lông yonex

	var index = type.indexOf('@');
	var index_acc = type.indexOf('$');


	if(index > -1){
		// trương hợp phụ kiện
		if(index_acc > -1){
			thuong_hieu = type.slice(index + 1, index_acc);
			loai_phu_kien = type.slice(index_acc + 1);
			console.log(loai_phu_kien);
		} else {
			thuong_hieu = type.slice(index + 1);
		}

		type = type.slice(0, index);
	}




	// filter-bar in left
	switch(type){
		case "racket":
			brands = res.locals.racketBrands; break;
		case "shoes":
			brands = res.locals.shoesBrands; break;
		case "t_shirt":
			brands = res.locals.t_shirtBrands; break;
		case "pants":
			brands = res.locals.pantsBrands; break;
		case "balo":
			brands = res.locals.baloBrands; break;
		case "accessories":
			brands = res.locals.baloBrands;
			var placeholder = "Tìm Loại Phụ Kiện";
			// var brand_title = "LOẠI PHỤ KIỆN";
			break;
		default:
			console.log('err');
			break;
	}


	// products in right 
	var productList = await Products.find({ product : type});
	if(type == 'accessories'){
		var grips = await Products.find({ product: "grip"});
		var strings = await Products.find({ product: "string" });
		var socks = await Products.find({ product: "socks" });
		productList = grips.concat(strings).concat(socks);
	}



	res.render('products/type_product', {
		title: type,
		thuong_hieu: thuong_hieu,
		loai_phu_kien: loai_phu_kien,
		brands: brands,
		placeholder: placeholder,
		// brand_title: brand_title,
		productList: productList
	})

	//use for type_product.js
	return productList;
}





module.exports.view_details = async function(req,res){
	var product = await Products.findOne({ link : req.params.sp})

	var type_product = functions.translateProduct_2(product.product);
	var upperBrand = functions.toUpperFirstLetter(product.brand);
	var brand_product = type_product + " " + upperBrand;
	

	res.render('products/details',{
		type_product: type_product,
		brand_product: brand_product,
		title_product: product.title,
		brand: upperBrand,
		price: product.price,
		img: product.img,
		id: product._id
	});


}


