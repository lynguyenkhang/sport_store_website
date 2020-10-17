const Products = require('../models/products.model.js');
const functions = require('./functions.js');

module.exports.index = async function(req, res){
	let page = !req.query.page ? 1 : req.query.page;

	let paginationNumber = functions.pageNumber(page, 5);

	let perPage = 12; // x
	let begin = page * perPage - perPage;
	let end = page * perPage;

	let products = await Products.find();
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
	let query_name = req.query.name;
	let name = query_name.toLowerCase();
	let query_type = req.query.type;

	type = functions.translateProduct(query_type);

	let brand = req.query.brand;
	brand = brand.toLowerCase();

	// tách price
	let query_price = req.query.price;

	let priceArr = [];
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


	let products, grips, strings, socks;

	// Xét trường hợp 'tất cả' cho type và brand

	switch(type){
		case "accessories":
			switch(brand){
				case "tất cả":
					grips = await Products.find({ product: "grip"});
					strings = await Products.find({ product: "string" });
					socks = await Products.find({ product: "socks" });
					products = grips.concat(strings).concat(socks);
					break;
				default: 
					grips = await Products.find({ product: "grip", brand: brand });
					strings = await Products.find({ product: "string" , brand: brand });
					socks = await Products.find({ product: "socks" , brand: brand });
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




	let pageURL = "/search?name=" + query_name + "&type=" + query_type + "&brand=" + brand +"&price=" + query_price +"&page=";

	// xử lí phần  PRICE và Name
	products = products.filter( product => {
		// xử lí phần PRICE
		let end = product.price.length - 2;
		let priceStr = product.price.slice(0, end);
		priceStr = functions.removeWord(priceStr,'.');
		let price = parseInt(priceStr);


		//xử lí phần Name
		let checkName = product.title.toLowerCase().indexOf(name);

		return (price > priceArr[0]) && (price <= priceArr[1]) && (checkName > -1);
	})


	//Create pagination
	if(!req.query.page){
			let page = 1;
		} else {
			let page = req.query.page;
		}

		let paginationNumber = functions.pageNumber(page, 10);


		let perPage = 12; // x
		let begin = page * perPage - perPage;
		let end = page * perPage;

		// let products = await Products.find();
		// console.log(products.slice(0,2));
		res.render('products/index', {
			productList: products.slice(begin, end),	
			paginationNumber: paginationNumber,
			// để phân biệt pagination trang products với search
			page: pageURL,
			name_value: query_name
		})
}


module.exports.view = async function(req, res){
	let type = req.params.type;
	let brands;
	let thuong_hieu;
	let loai_phu_kien;
	let placeholder;

	// trường hợp link dẫn đến 1 loại và hãng sp cụ thể như :
	// vợt cầu lông yonex

	let index = type.indexOf('@');
	let index_acc = type.indexOf('$');


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
			placeholder = "Tìm Loại Phụ Kiện";
			// let brand_title = "LOẠI PHỤ KIỆN";
			break;
		default:
			console.log('err');
			break;
	}


	// products in right 
	let productList = await Products.find({ product : type});
	if(type == 'accessories'){
		let grips = await Products.find({ product: "grip"});
		let strings = await Products.find({ product: "string" });
		let socks = await Products.find({ product: "socks" });
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
	let product = await Products.findOne({ _id : req.params.sp});
	let productsList = await Products.find({
		product: product.product,
		brand: product.brand
	});

	let type_product = functions.translateProduct_2(product.product);
	let upperBrand = functions.toUpperFirstLetter(product.brand);
	let brand_product = type_product + " " + upperBrand;
	

	res.render('products/details',{
		productsList: productsList,
		type_product: type_product,		
		brand_product: brand_product,
		product: product,
		brand: upperBrand
	});


}


