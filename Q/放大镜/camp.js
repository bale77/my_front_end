var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	copycanvas = document.getElementById('copycanvas'),
	copycontext = copycanvas.getContext('2d'),
	square = document.getElementById('square'),
	squaredata = {},
	box = canvas.getBoundingClientRect();

image = new Image(),
image.src = "logo.png";

image.onload = function(){
	context.drawImage(image,0,0,canvas.width,canvas.height);
}

function copy(){
	
	copycontext.drawImage(
		canvas,
		squaredata.left - box.left,
		squaredata.top - box.top,
		90,
		90,
		0,0,copycanvas.width,copycanvas.height
	);
}

function showSquare(){
	square.style.display = 'block';
}

function hideSquare(){
	square.style.display = 'none';
}


function createSquare(x,y){	

	x = x - 45 < canvas.offsetLeft ? canvas.offsetLeft:x - 45;
	y = y - 45 < canvas.offsetTop ? canvas.offsetTop:y - 45;
	
	x = x + 90 < box.right ? x:box.right - 90;
	y = y + 90 < box.bottom ? y:box.bottom - 90;
	
	squaredata.left = x;
	squaredata.top = y;
	moveSquare(x,y);
}

function moveSquare(x,y){

	square.style.left = x + "px";
	square.style.top = y + "px";
	showCanvas();
	showSquare();
	copy();
}

function showCanvas(){
	copycanvas.style.display = "inline";
}

function hideCanvas(){
	copycanvas.style.display = "none";
}

canvas.onmouseover = function(e){
	var x = e.clientX,
		y = e.clientY;
	createSquare(x,y);
}

window.onmousemove = function(e){
	var x = e.clientX,
		y = e.clientY;
	if(x >= canvas.offsetLeft && x <= canvas.offsetLeft + canvas.width && y >= canvas.offsetTop && y <= canvas.offsetTop + canvas.height){
		createSquare(x,y);
	}else{
		hideSquare();
		hideCanvas();
	}
}
