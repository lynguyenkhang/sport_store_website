const Product_brands = require('../models/products_brands.model.js');


// chuyển tiếng Việt không dấu
function convertVNese(alias) {
    let str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|{|}|\||\\/g," ");
    str = str.replace(/ + /g," ");
    str = str.trim(); 
    return str;
}
 function addSpace(alias){
 	let str = alias;
    str = str.replace(/-/g," ");
    return str;
 }





module.exports.list = async function(req, res, next){

	let brands = await Product_brands.find();
	// console.log(brands);
	// console.log(brands[0].brands);
	
	res.locals.racketBrands = brands[0].brands;
	res.locals.racketBrands_sp = brands[0].brands.slice(0, 5);

	res.locals.shoesBrands = brands[1].brands;
	res.locals.shoesBrands_sp = brands[1].brands.slice(0,5);

	res.locals.t_shirtBrands = brands[2].brands;
	res.locals.t_shirtBrands_sp = brands[2].brands.slice(0, 5);

	res.locals.dressBrands = brands[3].brands;
	res.locals.dressBrands_sp = brands[3].brands.slice(0, 5);

	res.locals.pantsBrands = brands[4].brands;
	res.locals.pantsBrands_sp = brands[4].brands.slice(0, 5);

	res.locals.tuiBrands = brands[5].brands;
	res.locals.tuiBrands_sp = brands[5].brands.slice(0, 5);

	res.locals.baloBrands = brands[6].brands;
	res.locals.baloBrands_sp = brands[6].brands.slice(0, 5);

	accessoriesBrands = brands[7].brands;
	// console.log(convertVNese(accessoriesBrands[0]));
	// console.log(addSpace(accessoriesBrands[0]));

	let nameAccessoriesBrands = [];
	let linkAccessoriesBrands = [];

	for(let i of accessoriesBrands){
		nameAccessoriesBrands.push(addSpace(i));
		linkAccessoriesBrands.push(convertVNese(i));
	}

	res.locals.nameAccessoriesBrands = nameAccessoriesBrands;
	res.locals.nameAccessoriesBrands_sp = nameAccessoriesBrands.slice(0, 5);
	
	res.locals.linkAccessoriesBrands = linkAccessoriesBrands;
	res.locals.linkAccessoriesBrands_sp = linkAccessoriesBrands.slice(0, 5);




	next();
}