require('dotenv').config();


var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect(process.env.MONGOLAB_ROSE_URI);	


app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static	('publics'));

// middlewares
var brandsMiddleware = require('./middlewares/brandsList.middleware.js');
var productMiddleware = require('./middlewares/products.middleware.js');
app.use(brandsMiddleware.list);

var productsRoute = require('./routes/products.route.js');


app.get('/', productMiddleware.load,function(req,res,next){
	// console.log(req.products[0]);

	// variable "rackets", "shoeslist",... tự đc đưa vào file pug
	// k cần ghi thêm vào phần render

	res.render('index',{
		keyword: "Bạn tìm gì ...",
		currentPage: "trang_chu"
	});
})


app.use('/products',productsRoute);



app.listen(port, function(req,res){
	console.log('port ' + port + 'runiing...');
});

