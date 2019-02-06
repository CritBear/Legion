var canvas;
var ctx;

var c1;

function init() {
	
	document.body.style.margin = "0px";
	document.body.style.overflow = "hidden";

	canvas = document.createElement("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.appendChild(canvas);

	ctx = canvas.getContext("2d");
	
	c1 = makeCharacter("tmp").setPos(new Vector(10,10)).setColor("blue").setSize(20,70).spawn();
	
	requestAnimationFrame(loop);
}

function loop() {
	
	update();
	
	requestAnimationFrame(loop);
}

function update() {
	c1.update();
}