var express 				= require('express'),
	app 					= express(),
	port 					= 3002,
	mongoose 				= require('mongoose'),
	bodyParser				= require('body-parser'),
	jsonParser				= bodyParser.json(),
	env						= require('./env.properties.js'),
	elementsController		= require('./server/controllers/elements.js'),
	shopController			= require('./server/controllers/shop.js');;

mongoose.connect('mongodb://'+env.host+':27017/beerrun');

app.get('/', function (req, res) {res.sendFile(__dirname + '/client/views/index.html')});

// Elements API
app.get('/api/elements', jsonParser, function (req, res) { elementsController.read(req, res, 'all') });
app.put('/api/elements/*', jsonParser, elementsController.update);
app.delete('/api/elements/*', jsonParser, elementsController.delete);

// Ingredients
app.post('/api/ingredients', jsonParser, function (req, res) { elementsController.create(req, res, 'ingredients') });
app.get('/api/ingredients', jsonParser, function (req, res) { elementsController.read(req, res, 'ingredients') });
app.put('/api/ingredients/*', jsonParser, function (req, res) { elementsController.update(req, res, 'ingredients') });
app.delete('/api/ingredients/*', jsonParser, function (req, res) { elementsController.delete(req, res, 'ingredients') });

// Shop
app.post('/api/shop', jsonParser, function (req, res) { shopController.create(req, res, 'ingredients') });
app.get('/api/shop', jsonParser, function (req, res) { shopController.read(req, res, 'ingredients') });
app.put('/api/shop/*', jsonParser, function (req, res) { shopController.update(req, res, 'ingredients') });
app.delete('/api/shop/*', jsonParser, function (req, res) { shopController.delete(req, res, 'ingredients') });

// Recipes
app.post('/api/recipes', jsonParser, function (req, res) { elementsController.create(req, res, 'recipes') });
app.get('/api/recipes', jsonParser, function (req, res) { elementsController.read(req, res, 'recipes') });
app.put('/api/recipes/*', jsonParser, function (req, res) { elementsController.update(req, res, 'recipes') });
app.delete('/api/recipes/*', jsonParser, function (req, res) { elementsController.delete(req, res, 'recipes') });


app.use('/js', express.static(__dirname + '/client/js'));
app.use('/views', express.static(__dirname + '/client/views'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/images', express.static(__dirname + '/client/images'));
app.use('/thirdparty', express.static(__dirname + '/client/thirdparty'));
app.use('/bower_components', express.static(__dirname + '/client/bower_components'));

app.listen(port, function () {
	console.log('listening')
})