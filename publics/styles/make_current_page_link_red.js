var page = document.getElementById("current_page");

if(page.innerText != ""){
	document.getElementById(page.innerText).style = "color: red !important";
}