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

function changeID(newID){
	document.getElementById("id").innerHTML = newID;
}

function drawBitmap(map) {
	for (i=0; i<map.length; i++) {
		for (j=0; j<map[i].length; j++) {
			if (map[i][j] == 1) {
				draw(i, j, 16, true);
			} else {
				draw(i, j, 16, false);
			}
		}
	}
}

function socket() {
	var socket = io();
	socket.on('map', function(data){
		data = JSON.parse(data);
		spacemanData = data.spacemanData.substr(3, data.spacemanData.length-3).split("],[");
		var dataArray = [];
		for (i=0; i<spacemanData.length; i++) {
			dataArray.push(spacemanData[i].split(","));
		}
		drawBitmap(dataArray);
		console.log("Drew Bits");
		changeID(data._id);
	});	
}

function background() {
	var rn = Math.floor((Math.random() * 150) + 60);
	var rs = Math.floor((Math.random() * 11) + 4);
	var t = new Trianglify({
	 x_gradient: Trianglify.colorbrewer.Spectral[rs],
	    noiseIntensity: 0,
	    cellsize: rn
	});
	var pattern = t.generate(window.innerWidth, window.innerWidth+200);
	document.body.setAttribute('style', 'background-image: '+pattern.dataUrl);
}

socket();
background();