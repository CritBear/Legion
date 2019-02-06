var canvas;
var ctx;

var Key = {
	_pressed: {},
	
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	
	isDown: function(keyCode) {
		return this._pressed[keyCode];
	},
	onKeyDown: function(event) {
		this._pressed[event.keyCode] = true;
	},
	onKeyUp: function(event) {
		this._pressed[event.keyCode] = false;
	},
};

var camera = {
	pos: new Vector(),
	vel: new Vector(),
	
	update: function() {
		this.pos.add(this.vel);
	},
};

var player = {
	pos: new Vector(0, 0),
	vel: new Vector(),
	width: 50,
	height: 50,
	
	update: function() {
		this.updatePos();
		this.draw();
	},
	updatePos: function() {
		if(Key.isDown(Key.UP)) {
			this.vel.y = -2;
		}else if(Key.isDown(Key.DOWN)) {
			this.vel.y = 2;
		}else{
			this.vel.y = 0;
		}
		if(Key.isDown(Key.LEFT)) {
			this.vel.x = -2;
		}else if(Key.isDown(Key.RIGHT)) {
			this.vel.x = 2;
		}else{
			this.vel.x = 0;
		}
		this.pos.add(this.vel);
	},
	draw: function() {
		ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
	},
};

var c1;

function init() {
	
	document.body.style.margin = "0px";
	document.body.style.overflow = "hidden";

	canvas = document.createElement("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.appendChild(canvas);

	ctx = canvas.getContext("2d");
	
	window.addEventListener('keyup', function(event) { Key.onKeyUp(event); }, false);
	window.addEventListener('keydown', function(event) { Key.onKeyDown(event); }, false);
	
	
	c1 = makeCharacter("tmp").setPos(new Vector(10,10)).setSize(30,90).spawn();
	
	requestAnimationFrame(loop);
}

function loop() {
	
	update();
	
	requestAnimationFrame(loop);
}

function update() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	/* Debuging______________________________________*/
	ctx.font = "20px Arial";
	ctx.fillText(camera.vel.x, 10, 200);
	ctx.fillText(camera.pos.x, 10, 230);
	/*
	Player.prototype.update = function() {
		if (Key.isDown(Key.UP)) this.moveUp();
		if (Key.isDown(Key.LEFT)) this.moveLeft();
		if (Key.isDown(Key.DOWN)) this.moveDown();
		if (Key.isDown(Key.RIGHT)) this.moveRight();
	};
	*/
	camera.update(); //camera.update must be out of ctx.translate
	ctx.translate( camera.pos.x, camera.pos.y );
	// Object Update
	player.update();
	c1.update();
	
	ctx.translate( -camera.pos.x, -camera.pos.y );
}