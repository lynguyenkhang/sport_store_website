

function increaseNum(){

	var quant = document.getElementById("quantity-box");
	var value = JSON.parse(quant.value);
	var increase = value + 1;
	quant.value = increase;

	var btn_buy = document.getElementById("btn_buy");
	var link = btn_buy.href;
	var end = link.indexOf("@") + 1;
	var increase_link = link.slice(0,end) + JSON.stringify(increase);
	btn_buy.href = increase_link;
}


function decreaseNum(){
	var quant = document.getElementById("quantity-box");
	var value = JSON.parse(quant.value);
	var decrease;

	if(value == 1){
		decrease = value;
	} else {
		decrease = value - 1;
	}
	quant.value = decrease;

	var btn_buy = document.getElementById("btn_buy");
	var link = btn_buy.href;
	var end = link.indexOf("@") + 1;
	var decrease_link = link.slice(0,end) + JSON.stringify(decrease);
	btn_buy.href = decrease_link;

}