
var GameManager = (function() {
	var instance;
	
	function initiate() {
		return {
			canvas: undefined,
			ctx: undefined,
			key: {
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
			},
			camera: undefined,
		};
	}
	return {
		getInstance: function() {
			if(!instance) {
				instance = initiate();
			}
			return instance;
		}
	}
})();

var player = {
	pos: new Vector(0, 0),
	vel: new Vector(),
	width: 50,
	height: 50,
	
	update: function(key) {
		this.updatePos(key);
	},
	updatePos: function(key) {
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
	draw: function(ctx) {
		ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
	},
};

var c1;

function init() {
	
	var GM = GameManager.getInstance();
	
	document.body.style.margin = "0px";
	document.body.style.overflow = "hidden";

	GM.canvas = document.createElement("canvas");
	GM.canvas.width = window.innerWidth;
	GM.canvas.height = window.innerHeight;
	document.body.appendChild(GM.canvas);

	GM.ctx = GM.canvas.getContext("2d");
	GM.camera = new Camera(GM.ctx);
	
	window.addEventListener('keyup', function(event) { GM.key.onKeyUp(event); }, false);
	window.addEventListener('keydown', function(event) { GM.key.onKeyDown(event); }, false);
	
	
	c1 = makeCharacter("tmp").setPos(new Vector(10,10)).setSize(30,90).spawn();
	
	requestAnimationFrame(loop);
}

function loop() {
	
	update();
	
	requestAnimationFrame(loop);
}

function update() {
	//GameManger 싱글턴으로 전역변수 다 빼는 게 맞는 건가?
	var GM = GameManager.getInstance();
	/* Debuging______________________________________
	ctx.font = "20px Arial";
	ctx.fillText(camera.vel.x, 10, 200);
	ctx.fillText(camera.pos.x, 10, 230);
	*/
	/*
	Player.prototype.update = function() {
		if (Key.isDown(Key.UP)) this.moveUp();
		if (Key.isDown(Key.LEFT)) this.moveLeft();
		if (Key.isDown(Key.DOWN)) this.moveDown();
		if (Key.isDown(Key.RIGHT)) this.moveRight();
	};
	*/
	player.update(GM.key);
	c1.update();
	
	GM.ctx.clearRect(0, 0, GM.canvas.width, GM.canvas.height);
	
	GM.camera.moveTo(player.pos.x, player.pos.y);
	
	GM.camera.begin();
	
	c1.draw(GM.ctx);
	player.draw(GM.ctx);
	
	GM.camera.end();
	
}