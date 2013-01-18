/*
 * Motion test on mouse event
 */

$(function(){
	var $canvas = $('#main')
	var canvas = $canvas.get(0);
	var speed = 30;
	var height = $canvas.attr('height');
	var width = $canvas.attr('width');

	var cellHeight = 20;
	var cellWidth = 20;
	var strokeWidth = 1;
	var strokeStyle = 'rgb(40,40,40)';
	var rows = height/20;
	var cols = width/20;
	var defaultColor = 'rgba(10,40,200, 1)';

	var grid = new Array();
	var gridBuffer = new Array();

	var STARTING_RADIUS = 20
		, MAX_RADIUS = 40;

	var radius = STARTING_RADIUS,
		expanding = true;
	
	var c_x = 200
		c_y = 200;

	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function init(){
		//Initialize grids
		draw();
	}

	function updateRadius(){
		if(radius < STARTING_RADIUS) {
			expanding = true;
		}
		else if(radius > MAX_RADIUS) {
			expanding = false;
		}
		if(expanding){
			radius += 2;
		}
		else{
			radius -= 2;
		}
	}

	function addAlpha(ctx){
		ctx.beginPath();
		ctx.rect(0,0,width,height);
		ctx.fillStyle = 'rgba(256,256,256, .5)';
		ctx.fill();
	}

	function draw(){
		if (canvas.getContext) {
		  var context = canvas.getContext("2d");
		  context.beginPath();
		  context.arc(c_x,c_y,radius,0,Math.PI*2,true);
		  context.fillStyle = 'rgb(0,0,100)';
		  context.fill();
			context.strokeStyle = 'rgb(40,40,40)';
			context.lineWidth = strokeWidth;
			context.stroke();
			updateRadius();
			addAlpha(context);
			// Future-proof: when feature is fully standardized
			if (window.requestAnimationFrame) window.requestAnimationFrame(draw);
			// IE implementation
			else if (window.msRequestAnimationFrame) window.msRequestAnimationFrame(draw);
			// Firefox implementation
			else if (window.mozRequestAnimationFrame) window.mozRequestAnimationFrame(draw);
			// Chrome implementation
			else if (window.webkitRequestAnimationFrame) window.webkitRequestAnimationFrame(draw);
			// Other browsers that do not yet support feature
			else setTimeout(draw, PERIOD);
		}
	}
	$canvas.on('mousemove', function(e){
		c_x = (e.pageX-$(this).offset().left);
    	c_y = (e.pageY-$(this).offset().top);
  	});
  	$canvas.css('cursor', 'none');
	init();
});
