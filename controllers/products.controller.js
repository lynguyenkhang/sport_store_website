var Products = require('../models/products.model.js');


function pageNumber(currentPage, max){

	let maxNumber = Math.ceil(currentPage / max) * max;
	let paginationNumber = [];
	let negative_max = max * -1;

	for(let i = negative_max; i < (max+2); i++){
		let index = maxNumber + i;
		paginationNumber.push(index);
	}

	// để số trang luôn dương
	if(maxNumber == max){
		let draft = paginationNumber[1];
		paginationNumber[0] = draft;
	}

	return paginationNumber;

}




module.exports.index = async function(req, res){
	// if(!req.query.page){
	// 	var page = 1;
	// } else {
	// 	var page = req.query.page;
	// }

	// var maxNumber = Math.ceil((page/3) * 3);
	// var paginationNumber = [];

	// if(maxNumber > 3){
	// 	//					Previous			1			  2				3			Next
	// 	paginationNumber = [maxNumber - 3, maxNumber - 2, maxNumber -1, maxNumber, maxNumber + 1];
	// } else {
	// 	maxNumber = 3;
	// 	// Do this to make paginationNumber alway positive number
	// 	paginationNumber = [maxNumber - 2, maxNumber - 2, maxNumber -1, maxNumber, maxNumber + 1];
	// }

	// var perPage = 16; // x
	// var begin = page * perPage - perPage;
	// var end = page * perPage;

	// var products = await Products.find();
	// // console.log(products.slice(0,2));
	// res.render('products/index', {
	// 	productList: products.slice(begin, end),	
	// 	paginationNumber: paginationNumber
	// })

// ----------------------------------------
	if(!req.query.page){
		var page = 1;
	} else {
		var page = req.query.page;
	}

	var paginationNumber = pageNumber(page, 5);


	var perPage = 12; // x
	var begin = page * perPage - perPage;
	var end = page * perPage;

	var products = await Products.find();
	// console.log(products.slice(0,2));
	res.render('products/index', {
		productList: products.slice(begin, end),	
		paginationNumber: paginationNumber
	})



}