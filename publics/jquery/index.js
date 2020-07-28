$(document).ready(function(){


	$(".account-box").mouseenter(function(){
		$(".sign-box").show();
	});

	$(".account-box").mouseleave(function(){
		$(".sign-box").hide();
	})




	// PRODUCCTS CATEGORY

	$(".products-category-title").click(function(){

		$(".products-list").toggle("fast");
		$(".products-category").toggleClass("products-category-border");
	})

	$(".products-list").hover(function(){
		$("#product-brands-box").toggle();
	})





	function showBrands(product, arr){
		arr.map(function(item){
			if(item === product){
				$(item).show();
			} else {
				$(item).hide();
			}
		})
	};

	var productList = [".racket-brands",".shoes-brands", ".t_shirt-brands",".dress-brands",".pants-brands",".tui-brands",".bag-brands",".accessories-brands"];



	// show product brands	
	$("#racket-title").hover(function(){
		showBrands(".racket-brands",productList);

	})
	
	$("#shoes-title").hover(function(){
		showBrands(".shoes-brands",productList);
	})

	$("#t_shirt-title").hover(function(){
		showBrands(".t_shirt-brands",productList);
	})

	$("#dress-title").hover(function(){
		showBrands(".dress-brands",productList);
	})

	$("#pants-title").hover(function(){
		showBrands(".pants-brands",productList);
	})

	$("#tui-title").hover(function(){
		showBrands(".tui-brands",productList);
	})

	$("#bag-title").hover(function(){
		showBrands(".bag-brands",productList);
	})

	$("#accessories-title").hover(function(){
		showBrands(".accessories-brands",productList);
	})


	// Chinh sach
	$(".chinh-sach").mouseenter(function(){
		$(".chinh-sach-box").show();
	})

	$(".chinh-sach").mouseleave(function(){
		$(".chinh-sach-box").hide();
	})

	// Huong dan
	$(".huong-dan").mouseenter(function(){
			$(".huong-dan-box").show();
		})

	$(".huong-dan").mouseleave(function(){
		$(".huong-dan-box").hide();
	})

	// San pham
	$(".san-pham").mouseenter(function(){
			$(".san-pham-box").show();
		})

	$(".san-pham").mouseleave(function(){
		$(".san-pham-box").hide();
	})

	//CART BOX
		$(".cart_btn_close").click(function(){
			console.log("okay");
			$("#list_cart_box").attr("style", "right: -30vw;");
		})

		$(".cart-icon").click(function(){
			console.log("okay");
			$("#list_cart_box").attr("style", "right: 0vw;");
		})



});