var makeCharacter = function(name) {
	var options = { name: name };
	
	return {
		setPos: function(v) {
			if(v instanceof Vector) {
				options.pos = v;
				return this;
			}else{
				console.log("Err: makeCharacter( " + name + " ).setPos is not Vector");
				return;
			}
		},
		setVel: function(v) {
			if(v instanceof Vector) {
				options.vel = v;
				return this;
			}else{
				console.log("Err: makeCharacter( " + name + " ).setVel is not Vector");
				return;
			}
		},
		setSize: function(w, h) {
			options.width = w;
			options.height = h;
			return this;
		},
		setColor: function(c) {
			options.color = c;
			return this;
		},
		setHealth: function(value) {
			options.maxHealth = value;
			return this;
		},
		spawn: function() {
			return new Character(options);
		}
	}
};

var Character = (function() {
	function Character(options) {
		this.pos = options.pos || new Vector();
		this.vel = options.vel || new Vector();
		this.width = options.width || 30;
		this.height = options.height || 90;
		this.color = options.color || "black";
		this.maxHealth = options.maxHealth || 100;
		this.health = this.maxHealth;
		
		this.head = {
			pos: this.pos.clone(),
			radius: this.width/2,
		};
		this.body = {
			pos: Vector.add(this.pos, new Vector(0, this.width)),
			width: this.width,
			height: this.height - this.width,
		};
	}
	Character.prototype.update = function() {
		this.updatePos();
		this.draw();
	};
	Character.prototype.updatePos = function() {
		this.pos.add(this.vel);
	};
	Character.prototype.moveTo = function(vector) {
		
	};
	Character.prototype.draw = function() {
		ctx.save();
		ctx.fillStyle = this.color;
		DrawTool.circle(this.head.pos.x, this.head.pos.y, this.head.radius);
		DrawTool.roundedRect(this.body.pos.x, this.body.pos.y, this.body.width, this.body.height, 9);
		ctx.restore();
		/* 
		1) draw line
			ctx.beginPath();
			ctx.moveTo(0,0);
			ctx.lineTo(100,100);
			ctx.stroke();
		
		2) strokeRect(x, y, width, height);
		
		3) draw triangle
			ctx.beginPath();
			ctx.moveTo(75, 50);
			ctx.lineTo(100, 75);
			ctx.lineTo(100, 25);
			ctxfill();
		
		4) draw arc
			https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Drawing_shapes
		*/
	};
	return Character;
})();