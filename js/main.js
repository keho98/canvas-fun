/*
 * Mondrian Generator
 * Basic mondrian like generator using recursion
 */

$(function(){
	var canvas = $('#main').get(0);
	var speed = 30;

	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function init(){
		draw();
	}

	function draw(){
		if (canvas.getContext) {
		  var ctx = canvas.getContext("2d");
		  drawMondrian(0,0,720,480, ctx, ["rgb(200,0,0)", "rgb(0,200,0)", "rgb(0,0,200)", "rgb(256,256,256)", "rgb(256,256,256)"], 4, 10);
		}
	}

	function drawMondrian(x,y,w,h, context, colors, levels, strokeWidth){
		context.beginPath();
		context.rect(x,y,w,h);
		context.fillStyle = colors[getRandomInt(0, colors.length - 1)];
		context.fill();
		context.strokeStyle = "rgb(0,0,0)";
		context.lineWidth = strokeWidth;
		context.stroke();
		if(levels === 0) return;
		else{
			//Vertical Split
			if(Math.random() < .5){
				var randomX = getRandomInt(x, x+w);
				drawMondrian(randomX,y,x+w - randomX,h, context, colors, levels-1);
				drawMondrian(x,y,randomX - x,h, context, colors, levels-1);
			}
			//Horizontal Split
			else{
				var randomY = getRandomInt(y, y+h);
				drawMondrian(x, randomY, w, y+h - randomY, context, colors, levels-1);
				drawMondrian(x, y, w, randomY - y, context, colors, levels - 1);
			}
		}
	}
	$('.redraw').on('click', function(){
		draw();
	})
	init();
});
