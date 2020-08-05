

function increaseNum(){

	var quant = document.getElementById("quantity-box");
	var value = JSON.parse(quant.value);
	var increase = value + 1;
	quant.value = increase;
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
}