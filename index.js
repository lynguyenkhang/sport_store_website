require('dotenv').config();


var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


mongoose.connect(process.env.MONGOLAB_ROSE_URI);	


app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static	('publics'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var secretCookie = "admnadsn@##@7a";
app.use(cookieParser(secretCookie));

// middlewares
var sessionMiddleware = require('./middlewares/session.middleware.js');
var brandsMiddleware = require('./middlewares/brandsList.middleware.js');
var productMiddleware = require('./middlewares/products.middleware.js');

// routes:
var productsRoute = require('./routes/products.route.js');
var cartRoute = require('./routes/cart.route.js');
var apiProductsInCartRoute = require('./api/routes/productsInCart.route.js');

app.use(sessionMiddleware.sessionId);
app.use(brandsMiddleware.list);
app.use('/api/productsInCart', apiProductsInCartRoute);
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
app.use('/cart', cartRoute);



app.listen(port, function(req,res){
	console.log('port ' + port + 'runiing...');
});

