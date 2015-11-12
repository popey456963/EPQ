function generateBitmap(bits) {
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

function draw(x, y, bits, on) {
  var x = x * 32;
  var y = y * 32;
  var height = 512 / bits;
  var width = 512 / bits;
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth="1";
    if (on) {
	    ctx.strokeStyle = "blue";
	    ctx.fillStyle =   "blue";
	} else {
	    ctx.strokeStyle = "white";
	    ctx.fillStyle =   "white";
	}
    ctx.fill();
    ctx.stroke();
  }
}

var map = generateBitmap(16);

for (i=0; i<map.length; i++) {
	for (j=0; j<map.length; j++) {
		if (map[i][j] == 1) {
			draw(i, j, 16, true);
		} else {
			draw(i, j, 16, false);
		}
	}
}

var rn = Math.floor((Math.random() * 150) + 60);
var rs = Math.floor((Math.random() * 11) + 4);
var t = new Trianglify({
 x_gradient: Trianglify.colorbrewer.Spectral[rs],
    noiseIntensity: 0,
    cellsize: rn
});
var pattern = t.generate(window.innerWidth, window.innerWidth+200);
document.body.setAttribute('style', 'background-image: '+pattern.dataUrl);