$(document).ready(function(){
//CART BOX
	$(".cart_btn_close").click(function(){
		console.log("okay");
		$("#list_cart_box").attr("style", "right: -30vw;");
	})

	$(".cart-icon").click(function(){
		console.log("okay");
		$("#list_cart_box").attr("style", "right: 0vw;");
	})

})
	


// function increaseQuantity(id, quantity){
// 	var cart = crawlProductsInCart();

// 	console.log(cart[id]);
// }



function increaseQuantity(sessionId, productId, priceStr){
	// buy-number-box
	var element = document.getElementById(productId);
	var input = element.querySelector("input");
	var quantity = JSON.parse(input.value) + 1;

	// badge-cart
	var badge_cart = document.querySelector(".badge-cart");

	// Giỏ hàng title (tổng só sản phẩm)
	var gio_hang = document.querySelector(".gio-hang-content");
	var gio_hang_number = gio_hang.querySelector("span");
	var currentNumber = JSON.parse(gio_hang_number.innerText[1]) + 1;

	// crawl "cart" objective and increase value.
	var cart = crawlProductsInCart();
	cart[`${productId}`] = quantity;

	//total Price
	var totalPriceElement = document.querySelectorAll(".total-price > span")[1];
	var totalPrice = totalPriceElement.innerText;
	totalPrice = removeWordAndParseInt(totalPrice, '.');
	var price = removeWordAndParseInt(priceStr, '.');
	var newPrice = JSON.stringify(totalPrice + price);
	newPrice = addVND(newPrice);


	axios({
		method: 'patch',
		url: `/api/productsInCart/${sessionId}`,
		data: cart
	}).then(function(res){
		// change value in html
		badge_cart.innerText = `${currentNumber}`;
		gio_hang_number.innerText = `(${currentNumber}) `;
		input.value = quantity;
		totalPriceElement.innerText = newPrice;		
	}).catch(function(err){
		console.log(err);
	})
}



function decreaseQuantity(sessionId, productId, priceStr){
	// buy-number-box
	var element = document.getElementById(productId);
	var input = element.querySelector("input");
	var quantity = JSON.parse(input.value) - 1;

	// badge-cart
	var badge_cart = document.querySelector(".badge-cart");

	// Giỏ hàng title (tổng só sản phẩm)
	var gio_hang = document.querySelector(".gio-hang-content");
	var gio_hang_number = gio_hang.querySelector("span");
	var currentNumber = JSON.parse(gio_hang_number.innerText[1]) - 1;

	if(!quantity){
		quantity = 1;
	} else {
		// crawl "cart" objective and decrease value.
		var cart = crawlProductsInCart();
		cart[`${productId}`] = quantity;

		//total Price
		var totalPriceElement = document.querySelectorAll(".total-price > span")[1];
		var totalPrice = totalPriceElement.innerText;
		totalPrice = removeWordAndParseInt(totalPrice, '.');
		var price = removeWordAndParseInt(priceStr, '.');
		var newPrice = JSON.stringify(totalPrice - price);
		newPrice = addVND(newPrice);


		axios({
			method: 'patch',
			url: `/api/productsInCart/${sessionId}`,
			data: cart
		}).then(function(res){
			// change value in html
			badge_cart.innerText = `${currentNumber}`;
			gio_hang_number.innerText = `(${currentNumber}) `;
			input.value = quantity;
			totalPriceElement.innerText = newPrice;
		}).catch(function(err){
			console.log(err);
		})

	}
}


function deleteProduct(sessionId, productId, priceStr){
	var element = document.getElementById(productId);
	var badge_cart = document.querySelector(".badge-cart");

	//crawl "cart" objective
	var cart = crawlProductsInCart();
	var quantity =  cart[`${productId}`];
	delete cart[`${productId}`]

	// total Price
	var totalPriceElement = document.querySelectorAll(".total-price > span")[1];
	var totalPrice = totalPriceElement.innerText;
	var price = removeWordAndParseInt(priceStr, '.');
	totalPrice = removeWordAndParseInt(totalPrice, '.');
	price = price * quantity;
	var newPrice = JSON.stringify(totalPrice - price);
	newPrice = addVND(newPrice);

	// Giỏ hàng title (tổng só sản phẩm)
	var gio_hang = document.querySelector(".gio-hang-content");
	var gio_hang_number = gio_hang.querySelector("span");
	var begin = gio_hang_number.innerText.indexOf("(") + 1;
	var end = gio_hang_number.innerText.indexOf(")");



	var currentNumber = JSON.parse(gio_hang_number.innerText.slice(begin, end)) - quantity;


	axios({
		method: 'patch',
		url: `/api/productsInCart/${sessionId}`,
		data: cart
	}).then(function(res){
		// change value in html
		element.setAttribute("style", "display: none;");
		badge_cart.innerText = `${currentNumber}`;
		gio_hang_number.innerText = `(${currentNumber}) `;
		totalPriceElement.innerText = newPrice;
	}).catch(function(err){
		console.log(err);
	})

}







function crawlProductsInCart() {
	var idProductElement = document.querySelectorAll('.id-product-box');
	var quantityProductElement = document.querySelectorAll('.buy-number-box-2');
	idProductElement = [...idProductElement];
	quantityProductElement = [...quantityProductElement];

	var cart = {};
	for(var i = 0; i < idProductElement.length; i++){

		if(idProductElement[i].style.display != "none"){
			var id = idProductElement[i].id;
			var quantity = quantityProductElement[i].value;
			quantity = JSON.parse(quantity);
			cart[`${id}`] = quantity;
		}
	}
	// console.log(cart);
	return cart;
}

function removeWordAndParseInt(str, word){
	var end = str.length - 2;
	var str = str.slice(0, end);

	while(str.indexOf(word) > -1){
		str = str.replace(word,'');
	}
	var result = JSON.parse(str);
	return result;
}

function addVND(str){
	var result = ''
	for(var i = 1 ; i <= str.length ; i++){
		var index = str.length - i;
		if(( i == 4) || (i == 7)) {
			result = str[index] + '.' + result;
		} else {
			result = str[index] + result;
		}
	}
	result = result + ' ₫';
	return result;
}





