var DrawTool = {
	
	roundedRect: function(ctx, x, y, width, height, radius) {
		
		ctx.beginPath();
		ctx.moveTo(x, y + radius);
		ctx.lineTo(x, y + height - radius);
		ctx.arcTo(x, y + height, x + radius, y + height, radius);
		ctx.lineTo(x + width - radius, y + height);
		ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
		ctx.lineTo(x + width, y + radius);
		ctx.arcTo(x + width, y, x + width - radius, y, radius);
		ctx.lineTo(x + radius, y);
		ctx.arcTo(x, y, x, y + radius, radius);
		ctx.fill();
	},
	
	circle: function(ctx, x, y, radius) {
		
		ctx.beginPath();
		ctx.arc(x + radius, y + radius, radius, 0, Math.PI*2, false);
		ctx.fill();
	},
	
	sword: function(ctx, x, y, size, radian) {
		
		ctx.translate(x, y);
		ctx.rotate(radian);
		ctx.translate(-x, -y);
		
		ctx.beginPath();
		ctx.moveTo(x - 5 * size, y + 35 * size);
		ctx.lineTo(x + 5 * size, y + 35 * size);
		ctx.lineTo(x + 5 * size, y - 15 * size);
		ctx.lineTo(x + 35 * size, y - 15 * size);
		ctx.lineTo(x + 35 * size, y - 25 * size);
		ctx.lineTo(x + 10 * size, y - 25 * size);
		ctx.lineTo(x + 10 * size, y - 155 * size);
		ctx.lineTo(x, y - 215 * size);
		ctx.lineTo(x - 10 * size, y - 155 * size);
		ctx.lineTo(x - 10 * size, y - 25 * size);
		ctx.lineTo(x - 35 * size, y - 25 * size);
		ctx.lineTo(x - 35 * size, y - 15 * size);
		ctx.lineTo(x - 5 * size, y - 15 * size);
		ctx.lineTo(x - 5 * size, y + 35 * size);
		ctx.fill();
		
		ctx.translate(x, y);
		ctx.rotate(-radian);
		ctx.translate(-x, -y);
	},
	
	shield: function(ctx, x, y, size) {
		//quadraticCurveTo(cp1x, cp1y, x, y)
		//bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
	},
}