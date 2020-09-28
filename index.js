require('dotenv').config();

// declare package
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// declare middlewares
const sessionMiddleware = require('./middlewares/session.middleware.js');
const brandsMiddleware = require('./middlewares/brandsList.middleware.js');
const productMiddleware = require('./middlewares/products.middleware.js');

// declare routes
const productsRoute = require('./routes/products.route.js');
const cartRoute = require('./routes/cart.route.js');
const apiProductsInCartRoute = require('./api/routes/productsInCart.route.js');
const apiProductsRoute = require('./api/routes/products.route.js');

// set configure
mongoose.connect(process.env.MONGOLAB_ROSE_URI);	
app.set('view engine', 'pug');
app.set('views', './views');

// use middlewares
app.use(express.static('publics'));
app.use(express.json());
app.use(cookieParser(process.env.secretCookie));
app.use(sessionMiddleware.sessionId);
app.use(brandsMiddleware.list);

// router:
app.use('/api/productsInCart', apiProductsInCartRoute);
app.use('/api/products', apiProductsRoute);

app.get('/', productMiddleware.load,function(req,res,next){
	// console.log(req.products[0]);
	// constiable "rackets", "shoeslist",... tự đc đưa vào file pug
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

