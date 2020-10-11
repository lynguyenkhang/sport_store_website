
module.exports.pageNumber = function(currentPage, max) {

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


module.exports.translateProduct = function(product){
	let result;
	switch(product){
		case "Vợt cầu lông":
			result = "racket"; break;
		case "Áo cầu lông":
			result = "t_shirt"; break;
		case "Giày cầu lông":
			result = "shoes"; break;
		case "Balo cầu lông":
			result = "balo"; break;
		case "Phụ kiện cầu lông":
			result = "accessories"; break;
		case "Quần cầu lông":
			result = "pants"; break;	
		default:
			result = "tất cả"; break;												
	}
	return result;
}

module.exports.translateProduct_2 = function(product){
	let result;
	switch(product){
		case "racket":
			result = "Vợt cầu lông"; break;
		case "t_shirt":
			result = "Áo cầu lông"; break;
		case "shoes":
			result = "Giày cầu lông"; break;
		case "balo":
			result = "Balo cầu lông"; break;
		case "accessories":
			result = "Phụ kiện cầu lông"; break;
		case "pants":
			result = "Quần cầu lông"; break;	
		default:
			result = "Error"; break;												
	}
	return result;
}

module.exports.toUpperFirstLetter = function(brand){
	let result = brand[0].toUpperCase();
	for(let i = 1; i < brand.length; i++){
		result += brand[i];
	}	
	return result;
}


module.exports.removeWord = function(str, word){
	while(str.indexOf(word) > -1){
		str = str.replace(word,'');
	}

	return str;
}

module.exports.addVND = function(str){
	let result = ''
	for(let i = 1 ; i <= str.length ; i++){
		let index = str.length - i;
		if(( i == 4) || (i == 7)) {
			result = str[index] + '.' + result;
		} else {
			result = str[index] + result;
		}
	}
	result = result + ' ₫';
	return result;
}


module.exports.isEmpty = function(obj) {
    return Object.keys(obj).length === 0;
}


