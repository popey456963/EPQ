module.exports = {
	generateBitmap: function(bits) {
		var bitmap = new Array(bits);
		for (i=0; i<bitmap.length; i++) {
			bitmap[i] = new Array(bits);
		}
		for (i=0; i<bitmap.length; i++) {
			for (j=0; j<bitmap[i].length; j++) {
				if (Math.random() > 0.5) {
					bitmap[i][j] = 0;
				} else {
					bitmap[i][j] = 1;
				}
			}
		}

		console.log("Height of Bits: " + bits);
		console.log("Area of Bitmap: " + bits*bits);
		/*
		for (i=0; i<bitmap.length; i++) {
			console.log(bitmap[i].join(" | "))
		}
		*/
		return bitmap;
	},

	migrateBitmap: function(oldmap, callback) {
		for (i=0; i<oldmap.length; i++) {
			for (j=0; j<oldmap[i].length; j++) {
				var randomNumber = Math.random();
				console.log(randomNumber);
				if (randomNumber < 1/16) {
					if (oldmap[i][j] == 0) {
						oldmap[i][j] = 1;
					} else {
						oldmap[i][j] = 0;
					}
				}
			}
		}
		callback(oldmap);
	},

	getGenerateMap: function(callback) {
		callback(module.exports.generateBitmap(16));
	},

	generateNewSave: function(callback) {
		map = JSON.stringify(module.exports.generateBitmap(16));
		vote = 50;
		people = 0;
		callback(map, vote, people);
	},

	makeBaseGenerations: function(database) {
		database.getNumberOfSpacemen(function(data){
			if (data < 3) {
				module.exports.generateNewSave(
					function(map, vote, people) {
						database.addSpaceman(map, vote, people, function(data) {
							console.log(data);
							module.exports.makeBaseGenerations(database);
						});
					}
				);
			} else {
				// Don't Generate More Data
			}
		});
	}
}