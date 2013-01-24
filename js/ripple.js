/*
 * Motion test on mouse event
 */
var $canvas, canvas, height, width, rows,cols; 
var speed = 30;

var cellHeight = 20;
var cellWidth = 20;
var strokeWidth = 1;
var strokeStyle = 'rgb(40,40,40)';

var defaultColor = 'rgba(10,40,200, 1)';

var grid = new Array();
var gridBuffer = new Array();

var shapes = new Array();

var STARTING_RADIUS = 20
	, MAX_RADIUS = 40;

var radius = STARTING_RADIUS,
	expanding = true;

var c_x = 200
	c_y = 200;

var GRAVITY = -9.81;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init(){
	//Initialize grids
	shapes.push({x:c_x, y:c_y, v_x:0, v_y:0,shapeType: 'arc', strokeStyle: 'rgb(0,0,200)', r1: 50, r2: 0, v_r: 5});
	context2 = $('#main1').get(0).getContext('2d');
	drawObject(context2, {x:c_x, y:c_y, v_x:0, v_y:0,shapeType: 'arc', fillStyle: 'red',strokeStyle: 'rgb(0,0,200)', r1: 50, r2: 0, v_r: 5});
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
		radius += 1;
	}
	else{
		radius -= 1;
	}
}

function updateShape(i){
	shapes[i].r1 += shapes[i].v_r;
}

function addAlpha(ctx){
	ctx.beginPath();
	ctx.rect(0,0,width,height);
	ctx.fillStyle = 'rgba(256,256,256, .5)';
	ctx.fill();
}

function drawObject(ctx, obj){
	//console.log(obj.shapeType);
	ctx.beginPath();
	switch(obj.shapeType){
		case 'arc':
			ctx.arc(obj.x, obj.y, obj.r1, obj.r2, Math.PI*2, true);
			break;
	}
	if(obj.fillStyle){
		ctx.fillStyle = obj.fillStyle;
		ctx.fill();
	}
	if(obj.strokeStyle){
		ctx.strokeStyle = obj.strokeStyle;
		ctx.stroke();
	}
}

function draw(){
	if (canvas.getContext) {
		var context = canvas.getContext("2d");
		for(var i = 0; i < shapes.length; i++){
			drawObject(context,shapes[i]);
			updateShape(i);
			if(shapes[i].r1 > 500){
				shapes.splice(i,i);
			}
		}
		updateRadius();
		addAlpha(context);
		shapes.push({x:c_x, y:c_y, v_x:0, v_y:0,shapeType: 'arc', strokeStyle: 'rgb(0,0,200)', r1: 50, r2: 0, v_r: 10});
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


$(function(){
	$canvas = $('#main')
	canvas = $canvas.get(0);
	height = $canvas.attr('height');
	width = $canvas.attr('width');
	rows = height/20;
	cols = width/20;
	$canvas.on('mousemove', function(e){
			c_x = (e.pageX-$(this).offset().left);
    	c_y = (e.pageY-$(this).offset().top);
  	});
	init();
});
