/*
 * Game of Life
 * Game of life with a twist
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
	var rows = height/20;
	var cols = width/20;


	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function init(){
		draw();
	}

	function draw(){
		if (canvas.getContext) {
		  var context = canvas.getContext("2d");
		  for(var i = 0; i < cols; i++){
		  	for(var j = 0; j < rows; j++){
		  		context.beginPath();
					context.rect(i*cellWidth,j*cellHeight,cellWidth,cellHeight);
					context.fillStyle = 'rgb(256,256,256)';
					context.fill();
					context.strokeStyle = 'rgb(40,40,40)';
					context.lineWidth = strokeWidth;
					context.stroke();
		  	}
		  }

		}
	}

	init();
});
