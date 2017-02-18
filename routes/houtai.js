var mongoURL = "mongodb://mingxuanhan:liumiaomiao@128.199.200.212:27017/mytime";
var mongo = require("./mongo");
var ObjectId = require('mongodb').ObjectId;

exports.addonetime = function(req, res) {
	console.log(req.body);
	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('mytime');
		var json_responses;
		coll.save({
			onetime : req.body
		}, function(err, status) {
			if (status) {
				console.log("save onetime success");
				json_responses = {
					"status" : "success"
				};
				res.send(json_responses);
			} else {
				console.log("save onetime returned false");
				json_responses = {
					"status" : "failed"
				};
				res.send(json_responses);
			}
		});
	});
};

exports.getalltime = function(req, res) {
	console.log(req.body);
	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('mytime');
		var json_responses;
		coll.find({}).toArray(function(err, doc) {
			if (doc) {
				console.log(doc);
				console.log("find times success!");
				res.send({
					mytimes : doc
				});

			} else {
				console.log("find returned false");

			}
		});
	});
};
