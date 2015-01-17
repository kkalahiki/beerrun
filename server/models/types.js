var mongoose = require('mongoose');

module.exports.recipes = mongoose.model('recipes', {
	name: String,
	description: String,
	url: String,
	ingredients: []
});

module.exports.ingredients = mongoose.model('ingredients', {
	name: String,
	description: String,
	needed: Boolean,
	amount: String,
	section: String
});
