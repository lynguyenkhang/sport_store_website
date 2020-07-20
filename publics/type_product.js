
function change(){
	var brandCbs = document.querySelectorAll("#brandsList input[type='checkbox']");
	var priceCbs = document.querySelectorAll("#productsList input[type='checkbox']");
	var nameInput = document.getElementById('form-control-2').value;

	var filters = {
		brand: getClassOfCheckedCheckboxes(brandCbs),
		price: getClassOfCheckedCheckboxes(priceCbs),
		name: nameInput
	};

	console.log(filters);
	filterResult(filters);
}




//----------------------------------------------------------------------------------------------------------------


function removeWord(str, word){
	while(str.indexOf(word) > -1){
		str = str.replace(word,'');
	}

	return str;
}


function getClassOfCheckedCheckboxes(checkboxes){
	var classes = [];

	if(checkboxes && checkboxes.length > 0){
		for(var i = 0; i < checkboxes.length; i++){
			var cb = checkboxes[i];


			if(cb.checked){
				var rel = cb.getAttribute('rel');
				rel = rel.toLowerCase();
				classes.push(rel);
			}

		}
	}

	return classes;
}



function filterResult(filters){
	var rElems = document.querySelectorAll('.all-products-box');
	var hiddenElems = [];

	if(!rElems || rElems.length < 0){
		return;
	}

	for(var el of rElems){


		// fitler by Brand
		if(filters.brand.length > 0){
				var isHidden = true;

			for(var condition of filters.brand){
				condition = condition.toLowerCase();
				if(el.classList.contains(condition)){
					isHidden = false;
					break;
				}
			}

			if(isHidden){
				hiddenElems.push(el);
			}

		}



		// filter by Price
		if(filters.price.length > 0){
			var isHidden = true;

			var index = el.classList.length -2;
			var priceStr = el.classList[index];
			priceStr = removeWord(priceStr, '.');
			var price_el = parseInt(priceStr);



			for(var condition of filters.price){
				
				if((condition == "giá dưới 500.000đ") && (price_el < 500000)){
					isHidden = false;
					break;
				}

				if((condition == "500.000đ - 1 triệu") && (price_el <= 1000000) &&(price_el >= 500000)){
					isHidden = false;
					break;
				}

				if((condition == "1 - 2 triệu") && (price_el <= 2000000) &&(price_el >= 1000000)){
					isHidden = false;
					break;
				}

				if((condition == "2 - 3 triệu") && (price_el <= 3000000) &&(price_el >= 2000000)){
					isHidden = false;
					break;
				}

				if((condition == "giá trên 3 triệu") && (price_el > 3000000)){
					isHidden = false;
					break;
				}
			}

			if(isHidden){
				hiddenElems.push(el);
			}

		}

		// filter by searched word
		if(filters.name){
			var isHidden = true;

			var searchedWord = filters.name.toLowerCase();
			var title = el.id.toLowerCase();
			if(title.indexOf(searchedWord) > -1){
				isHidden = false;
			}

			if(isHidden){
				hiddenElems.push(el);
			}
		}

	}


	for (var i = 0; i < rElems.length; i++) {
		rElems[i].style.display = "flex";
	}

	if(hiddenElems.length <= 0){
		return;
	}

	for (var i = 0; i < hiddenElems.length; i++) {
		hiddenElems[i].style.display = "none";
	}
}


//----------------------------------------------------------------------------------------------------------------
	// trường hợp link dẫn đến 1 loại và hãng sp cụ thể như :
	// vợt cầu lông yonex

function choosingBrand(){
	var check_ThuongHieu = document.getElementById('thuong_hieu').innerText;
	var check_loai_phu_kien = document.getElementById('loai_phu_kien').innerText;

	if(check_ThuongHieu != ""){
		var choosenInput = document.querySelectorAll(`#${check_ThuongHieu}`);
		choosenInput[0].checked = true;
	}

	if(check_loai_phu_kien != ""){
		var choosenInput_2 = document.getElementById('form-control-2');
		choosenInput_2.value = check_loai_phu_kien;
	}

	change();
}

choosingBrand();




















