var makeLegion = function(leader) {
	var options = { leader: leader };
	
	return {
		
	}
}

var Legion = (function() {
	function Legion(options) {
		this.members = [];
	}
	Legion.prototype.moveTo = function() {
		
	};
	Legion.prototype.attack = function(target) {
		this.members.forEach(function(member) {
			member.attack(target);
		});
	};
	Legion.prototype.addMember = function(member) {
		this.members.push(member);
		return this;
	};
	return Legion;
})();

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
	}
	Character.prototype.update = function() {
		this.updatePos();
		this.draw();
	};
	Character.prototype.updatePos = function() {
		this.moveTo(new Vector(player.pos.x, player.pos.y - player.height + this.height));
		this.pos.add(this.vel);
	};
	Character.prototype.moveTo = function(vector) {
		//tmp
		this.vel = Vector.subtract(vector, this.pos).normalize();
	};
	Character.prototype.attack = function(target) {
		
	};
	Character.prototype.draw = function() {
		var ctx = Game.ctx;
		ctx.save();
		ctx.fillStyle = this.color;
		DrawTool.circle(ctx, this.pos.x, this.pos.y, this.width/2);
		DrawTool.roundedRect(ctx, this.pos.x, this.pos.y+this.width, this.width, this.height-this.width, 9);
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