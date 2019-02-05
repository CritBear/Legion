var canvas;
var ctx;

function init() {
	
	document.body.style.margin "0px"
	document.body.style.overflow = "hidden";

	canvas = document.createElement("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.appendChild(canvas);

	ctx = canvas.getContext("2d");
	
	requestAnimationFrame(loop);
}

function loop() {
	
	update();
	
	requestAnimationFrame(loop);
}

function update() {
	
}