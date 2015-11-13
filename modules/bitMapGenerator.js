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
	for (i=0; i<bitmap.length; i++) {
		console.log(bitmap[i].join(" | "))
	}
	return bitmap;
	}
	
}