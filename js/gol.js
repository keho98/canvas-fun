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

	var cellHeight = 30;
	var cellWidth = 30;
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
				gridBuffer[i][j] = 'empty';
				grid[i][j] = 'empty';
			}
		}
		if (canvas.getContext) {
		  var context = canvas.getContext("2d");
		  renderGrid(context, gridBuffer);
		  var tmp = grid;
		  grid = gridBuffer;
		  gridBuffer = tmp;
		}
	}

	function draw(){
		if (canvas.getContext) {
		  var context = canvas.getContext("2d");
		  for(var i = 0; i < cols; i++){
		  	for(var j = 0; j < rows; j++){
		  		gridBuffer[i][j] = getNextState(i,j,grid);
		  	}
		  }
		  renderGrid(context, gridBuffer);
		  var tmp = grid;
		  grid = gridBuffer;
		  gridBuffer = tmp;
		}
	}

	function renderGrid(context, dataGrid){
	  for(var i = 0; i < cols; i++){
	  	for(var j = 0; j < rows; j++){
	  		context.beginPath();
				context.rect(i*cellWidth,j*cellHeight,cellWidth,cellHeight);
				if(dataGrid[i][j] === 'empty') context.fillStyle = 'rgb(256,256,256)';
				else context.fillStyle = dataGrid[i][j];
				context.fill();
				context.strokeStyle = strokeStyle;
				context.lineWidth = strokeWidth;
				context.stroke();
	  	}
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

	function start(){
		setInterval(draw, 500);
	}

	//Add event listeners
	$('#start').on('click', function(){
		console.log(gridBuffer)
		start();

	});

	$canvas.on('click', function(e){
		var x = Math.floor((e.pageX-$(this).offset().left) / cellWidth);
    var y = Math.floor((e.pageY-$(this).offset().top) / cellHeight);
    gridBuffer[x][y] = (gridBuffer[x][y] === 'empty')? defaultColor : 'empty';
    grid[x][y] = gridBuffer[x][y]
    if(canvas.getContext){
    	var context = canvas.getContext("2d");
    	renderGrid(context, gridBuffer);
 		  var tmp = grid;
		  grid = gridBuffer;
		  gridBuffer = tmp;
  	}
	});

	init();
});
