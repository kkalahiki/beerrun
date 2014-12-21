var Type = require('../models/types.js');

module.exports.create = function (req, res, element) {
	var newType = req.body;
	var type = new Type[element](req.body);
	type.save(function (err, result) {
		//res.json(result);
		Type[element].find(function (err, results) {
			res.json({'resultSet':results});
		});
	});
}

module.exports.read = function (req, res, element) {
	Type[element].find({'needed':true}, function (err, results) {
		res.json(results);
	});
}

module.exports.update = function (req, res, element) {
	Type[element].findOneAndUpdate({ _id : req.params[0] }, req.body, {}, function (err, result) {
		if (err) {console.log(err)}
		else {
			//res.json(result);
			Type[element].find({'needed':true}, function (err, results) {
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