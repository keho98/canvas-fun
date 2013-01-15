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
	var strokeStyle = 'rgb(40,40,40)';
	var rows = height/20;
	var cols = width/20;
	var defaultColor = 'rgba(10,40,200, 1)';

	var grid = new Array();
	var gridBuffer = new Array();

	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function init(){
		//Initialize grids
		for(var i = 0; i < cols; i++){
			grid.push(new Array());
			gridBuffer.push(new Array());
			for(var j = 0; j < rows; j++){
				if(Math.random() > .75) grid[i][j] = defaultColor;
				else grid[i][j] = 'empty';
				gridBuffer[i][j] = 'empty';
			}
		}
		if (canvas.getContext) {
		  var context = canvas.getContext("2d");
		  for(var i = 0; i < cols; i++){
		  	for(var j = 0; j < rows; j++){
		  		context.beginPath();
					context.rect(i*cellWidth,j*cellHeight,cellWidth,cellHeight);
					if(grid[i][j] === 'empty') context.fillStyle = 'rgb(256,256,256)';
					else context.fillStyle = grid[i][j];
					context.fill();
					context.strokeStyle = 'rgb(40,40,40)';
					context.lineWidth = strokeWidth;
					context.stroke();
		  	}
		  }
		}
		setInterval(draw, 500);
	}

	function draw(){
		console.log("Drawing");
		if (canvas.getContext) {
		  var context = canvas.getContext("2d");
		  for(var i = 0; i < cols; i++){
		  	for(var j = 0; j < rows; j++){
		  		gridBuffer[i][j] = getNextState(i,j,grid);
		  	}
		  }
		  for(var i = 0; i < cols; i++){
		  	for(var j = 0; j < rows; j++){
		  		context.beginPath();
					context.rect(i*cellWidth,j*cellHeight,cellWidth,cellHeight);
					if(gridBuffer[i][j] === 'empty') context.fillStyle = 'rgb(256,256,256)';
					else context.fillStyle = gridBuffer[i][j];
					context.fill();
					context.strokeStyle = strokeStyle;
					context.lineWidth = strokeWidth;
					context.stroke();
		  	}
		  }
		  var tmp = grid;
		  grid = gridBuffer;
		  gridBuffer = tmp;
		}
	}

	function inBounds(x,y){
		return (x > 0 && y > 0 && x < cols && y < rows);
	}

	function getNextState(x,y, currentGrid){
		var neighbors = new Array();
		for(var i = -1; i < 2; i++){
			for(var j = -1; j < 2; j++){
				if(inBounds(i+x,j+y) && !(i === 0 && j === 0)){
					if(currentGrid[i+x][j+y] != 'empty') neighbors.push(currentGrid[i+x][j+y]);
				}
			}
		}
		switch(neighbors.length){
			case 2:
				if(currentGrid[x][y] === 'empty') return 'empty'; 
				else return defaultColor;
				break;
			case 3:
				return defaultColor;
				break;
			default:
				return 'empty';
		}
	}

	init();
});
