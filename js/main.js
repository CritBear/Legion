
var Game = {
	canvas: undefined,
	ctx: undefined,
	camera: undefined,
	key: {
		_pressed: {},
		
		LEFT: 65,
		UP: 87,
		RIGHT: 68,
		DOWN: 83,
		
		isDown: function(keyCode) {
			return this._pressed[keyCode];
		},
		onKeyDown: function(event) {
			this._pressed[event.keyCode] = true;
		},
		onKeyUp: function(event) {
			this._pressed[event.keyCode] = false;
		}
	},
};

var player = {
	pos: new Vector(),
	vel: new Vector(),
	width: 50,
	height: 50,
	
	update: function() {
		this.updatePos();
		this.draw();
	},
	updatePos: function() {
		var key = Game.key;
		
		if(key.isDown(key.UP)) {
			this.vel.y = -2;
		}else if(key.isDown(key.DOWN)) {
			this.vel.y = 2;
		}else{
			this.vel.y = 0;
		}
		if(key.isDown(key.LEFT)) {
			this.vel.x = -2;
		}else if(key.isDown(key.RIGHT)) {
			this.vel.x = 2;
		}else{
			this.vel.x = 0;
		}
		this.pos.add(this.vel);
	},
	draw: function() {
		Game.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
	},
};

var c1;

function init() {
	
	document.body.style.margin = "0px";
	document.body.style.overflow = "hidden";

	Game.canvas = document.createElement("canvas");
	Game.canvas.width = window.innerWidth;
	Game.canvas.height = window.innerHeight;
	document.body.appendChild(Game.canvas);

	Game.ctx = Game.canvas.getContext("2d");
	Game.camera = new Camera(Game.ctx);
	
	window.addEventListener('keyup', function(event) { Game.key.onKeyUp(event); }, false);
	window.addEventListener('keydown', function(event) { Game.key.onKeyDown(event); }, false);
	
	
	c1 = makeCharacter("tmp").setPos(new Vector(10,10)).setSize(30,90).spawn();
	
	Game.ctx.font = "20px Arial";
	
	requestAnimationFrame(loop);
}

function loop() {
	
	update();
	
	requestAnimationFrame(loop);
}

function update() {
	
	
	/*
	Player.prototype.update = function() {
		if (Key.isDown(Key.UP)) this.moveUp();
		if (Key.isDown(Key.LEFT)) this.moveLeft();
		if (Key.isDown(Key.DOWN)) this.moveDown();
		if (Key.isDown(Key.RIGHT)) this.moveRight();
	};
	*/
	
	Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
	
	Game.camera.moveTo(player.pos.x, player.pos.y);
	
	Game.camera.begin();
	
	c1.update();
	player.update();
	
	DrawTool.sword(Game.ctx, 100, 100, 10, 100, 0);
	
	// Debuging______________________________________
	Game.ctx.fillText(c1.vel.x, 10, 200);
	Game.ctx.fillText(c1.pos.x, 10, 230);
	
	
	Game.camera.end();
	
}