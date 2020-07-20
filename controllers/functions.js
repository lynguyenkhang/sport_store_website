
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
	var result;
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


module.exports.removeWord = function(str, word){
	while(str.indexOf(word) > -1){
		str = str.replace(word,'');
	}

	return str;
}