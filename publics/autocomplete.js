function addActive(x, currentFocus){
    /*a function to classify an item as "active":*/
	if(!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if(currentFocus >= x.length) currentFocus = 0;
    if(currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
    return currentFocus;
}

function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/	
	for(var i = 0; i < x.length; i++){
		x[i].classList.remove("autocomplete-active");
	}
}

function closeAllLists(input, elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for(var i = 0; i < x.length; i++){
    	if( elmnt != x[i] && elmnt != input) {
    		x[i].parentNode.removeChild(x[i]);
    	}
    }
}

function autocomplete(inp, arr){
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  inp.addEventListener("input", function(e){
  	var list_el, link_el, i, goi_y_el, val = this.value;
	/*close any already open lists of autocompleted values*/
	closeAllLists(inp);
	if(!val) { return false;}
	currentFocus = -1;
	/*create a DIV element that will contain the items (values):*/
	list_el = document.createElement("DIV");
	list_el.setAttribute("id", this.id + "autocomplete-list");
	list_el.setAttribute("class", "autocomplete-items");
	/*append the DIV element as a child of the autocomplete container:*/
	this.parentNode.appendChild(list_el);
	goi_y_el = document.createElement("P");
	goi_y_el.innerText = 'Sản phẩm gợi ý:';
	goi_y_el.setAttribute("class", "san-pham-goi-y");
	list_el.appendChild(goi_y_el);

	/*for each item in the array .... */
	var suggestions = 0;
	for(i = 0; i < arr.length; i++){
		var val_lowerCase = val.toLowerCase();
		var index = arr[i].title.toLowerCase().indexOf(val_lowerCase);
		if(index > -1){
			suggestions++;
			if(suggestions > 5) {break;}

			link_el = document.createElement("A");
			link_el.setAttribute("class", "item-link");
			if(suggestions == 1) link_el.classList.add("mt-0");
			link_el.setAttribute("href", `/products/details/${arr[i]._id}`);

			var img_el = document.createElement("IMG");
			img_el.setAttribute("src", arr[i].img);
			img_el.classList.add("hinh-anh-sp");
			link_el.appendChild(img_el);


			// title - price box
			var title_price_el = document.createElement("DIV");
			// make title 
			var title_el = document.createElement("DIV");
			var end = index + val.length;
			title_el.innerHTML = arr[i].title.slice(0, index);
			title_el.innerHTML += "<strong>" + arr[i].title.slice(index, end) + "</strong>";
			title_el.innerHTML += arr[i].title.slice(end);
			title_price_el.appendChild(title_el);

			// make price
			var price_el = document.createElement('DIV');
			price_el.innerHTML = arr[i].price;
			title_price_el.appendChild(price_el);

			link_el.appendChild(title_price_el);

			/*execute a function when someone clicks on the item value (DIV element):*/
			// link_el.addEventListener("click", function(e){
			// 	inp.value = this.getElementsByTagName("input")[0].value;
   //            close the list of autocompleted values,
   //            (or any other open lists of autocompleted values:
			//   closeAllLists(inp);
			// });

			list_el.appendChild(link_el);
		}
	}
  });
	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener("keydown", function(e) {
		var x = document.getElementById("myInputautocomplete-list");
		if(x) x = x.getElementsByTagName("a");
		if(e.keyCode == 40){
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and make the current item more visible:*/
        currentFocus = addActive(x, currentFocus);
		} else if( e.keyCode == 38) { //up
			/*If the arrow UP key is pressed,
			decrease the currentFocus variable:*/
			currentFocus--;
			currentFocus = addActive(x, currentFocus);
		} else if( e.keyCode == 13) {
			/* If the ENTER key is pressed, prevent from
			from being submitted */
			e.preventDefault();
			if(currentFocus > -1){
	          /*and simulate a click on the "active" item:*/
				if(x) x[currentFocus].click();     
			}
		}

	});
	 // exucute a function when someone clicks in the document:
	document.addEventListener("click", function(e){
		closeAllLists(e.target);
	})
};

// var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
//	DATA

function loadData(){
	axios({
			method: 'get',
			url: '/api/products'
		}).then(function(res){
			var data = res.data;
			// var countries = data.map(function(ele){
			// 	return ele.title;
			// })
			autocomplete(document.getElementById("myInput"), data);
		}).catch(function(err){
			console.log(err);
		})
}

	
loadData();











