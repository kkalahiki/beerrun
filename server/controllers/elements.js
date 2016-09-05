var Type = require('../models/types.js');

module.exports.create = function (req, res, element) {
	var newType = req.body;
	var type = new Type[element](req.body);
	type.needed = true;
	type.save(function (err, result) {
		res.json(result);
		/*Type[element].find(function (err, results) {
			res.json({'resultSet':results});
		});*/
	});
}

module.exports.read = function (req, res, element) {
	Type[element].find(function (err, results) {
		res.json(results);
	});
}

module.exports.update = function (req, res, element) {
	Type[element].findOneAndUpdate({ _id : req.params[0] }, req.body, {}, function (err, result) {
		if (err) {console.log(err)}
		else {
			//res.json(result);
			Type[element].find(function (err, results) {
				res.json({'resultSet':results});
			});
		}
	});
}

module.exports.delete = function (req, res, element) {
	Type[element].findOneAndRemove({ _id : req.params[0] }, function (err, result) {
		//res.json(result);
		Type[element].find(function (err, results) {
			res.json({'resultSet':results});
		});
	});
}

module.exports.alexa = function (req, res, element) {
	var responseList = '';
	var ingredients = Type[element].find(function (err, results) {
		/*console.log(results);*/
		for (var i=0; i<results.length; i++) {
			responseList += results[i].name+' ';
		}

		var responseBody = {
		  "version": "1.0",
		  "response": {
		    "outputSpeech": {
		      "type": "PlainText",
		      "text": responseList
		    },
		    "shouldEndSession": true
		  }
		};
		/*res.json(results);*/
		res.json(responseBody);
	});

	

	/*res.json(responseBody);*/

}