require('dotenv').config();


var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_ROSE_URI);	




app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static	('publics'));


// middlewares
var brandsMiddleware = require('./middlewares/brandsList.middleware.js');

app.use(brandsMiddleware.list);



app.get('/',function(req,res){
	res.render('index',{
		keyword: "Bạn tìm gì ..."
	});
})



app.listen(port, function(req,res){
	console.log('port ' + port + 'runiing...');
});

