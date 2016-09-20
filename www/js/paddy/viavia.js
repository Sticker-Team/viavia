//grid width and height
var gWidth = 560;
var gHeight = 560;
var bHeight = 80;
var bWidth = 80;
//padding around grid
var p = 0;
//size of canvas
var cWidth = gWidth + (p*2);
var cHeight = gHeight + (p*2);

var img = new Image();
var div = document.getElementById('tram');



function drawBoard(context){
    context.save();
    for (var x = 0; x <= gWidth; x += bWidth) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, gHeight + p);
    }

    for (var x = 0; x <= gHeight; x += bHeight) {
        context.moveTo(p, 0.5 + x + p);
        context.lineTo(gWidth + p, 0.5 + x + p);
    }

    context.strokeStyle = "black";
    context.stroke();
    context.restore();
}

function drawCircle(context, color, row, column)
{
	var x = (column - 1) * bWidth + bWidth/2;
	var y = (row - 1) * bHeight + bHeight/2;
	var radius = (bHeight+bWidth)/5;
    context.save();
  	context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    //context.lineWidth = 2;
    //context.strokeStyle = '#003300';
    context.restore();
    //context.stroke();
}

var level = 
{
	1: 
	{
		1: {type:0, color:0},
		2: {type:'node', color:'#63BA06'},
		3: {type:0, color:0}, 
		4: {type:0, color:0},
		5: {type:0, color:0},
		6: {type:0, color:0},
                7: {type:0, color:0},
	},

	2:
	{
		1: {type:0, color:0},
		2: {type:'node', color:'#FFC433'},
		3: {type:0, color:0},
		4: {type:0, color:0},
		5: {type:0, color:0},
		6: {type:0, color:0},
                7: {type:0, color:0},
	},

	3: 
	{
		1: {type:0, color:0},
		2: {type:0, color:0},
		3: {type:0, color:0},
		4: {type:0, color:0},
		5: {type:'node', color:'#06BAB7'},
		6: {type:0, color:0},
                7: {type:0, color:0},
	},

	4: 
	{
		1: {type:0, color:0},
		2: {type:0, color:0},
		3: {type:0, color:0},
		4: {type:0, color:0},
		5: {type:0, color:0},
		6: {type:0, color:0},
                7: {type:0, color:0},
	},

	5: 
	{
		1: {type:'node', color:'#63BA06'},
		2: {type:0, color:0}, 
		3: {type:0, color:0},
		4: {type:0, color:0},
		5: {type:0, color:0},
		6: {type:0, color:0},
                7: {type:0, color:0},
	},

	6: 
	{
		1: {type:'node', color:'pink'},
		2: {type:0, color:0},
		3: {type:0, color:0}, 
		4: {type:0, color:0},
		5: {type:0, color:0},
		6: {type:'node', color:'#BA0609'},
                7: {type:0, color:0},
	},
	7: 
	{
		1: {type:'node', color:'#06BAB7'},
		2: {type:0, color:0}, 
		3: {type:0, color:0},
		4: {type:'node', color:'pink'},
		5: {type:'node', color:'#BA0609'},
		6: {type:'node', color:'#FFC433'},
                7: {type:0, color:0},
	},
}

function checkComplete(level, paths)
{
	var complete = true, count = 0;

	for(path in paths)
	{
		count++;
		console.log(paths);

		if(!paths[path].checkComplete())
		{
			complete = false;
			console.log(path);
		}
	
	}

	for(var i = 1; i <= 7; i++)
		for (var j = 1; j <= 7; j++) 
			if(!level[i][j].type)
				complete = false;
	
	return (complete && count === 5);
}

function drawLevel(context)
{
	//console.log(level);
	for(var i = 1; i <= 7; i++)
		for(var j = 1; j <= 7; j++)
			if(level[i][j].type === "node")
				drawCircle(context, level[i][j].color, i, j);
}

function getClickedTile(pageX, pageY)
{
	var column = Math.floor(pageX/bWidth);
	var row = Math.floor(pageY/bHeight);

	return {row: row+1, column: column+1};

}

//Path
function Path(begin, end, color)
{
	this.begin = begin;
	this.end = end;
	this.path = new Array(this.begin);
	this.color = color;
	this.complete = false;

	this.checkComplete = function()
	{
		return (this.path[this.path.length-1].row === this.end.row && this.path[this.path.length-1].column === this.end.column);
	};

	this.breakPath = function(context, tile, brokenPath)
	{
		var i =0;
		var color = this.color;
		//this.path.pop();
		//console.log(this.path.length);
		//console.log(tile.row + "," + tile.column);
					//console.log(brokenPath.end);
		while((tile.row !== this.path[this.path.length-1].row || tile.column !== this.path[this.path.length-1].column))
		{
			//console.log(this.path.length);
			//console.log(this.path.length);
			//console.log(this.path[this.path.length-1].row +"," + this.path[this.path.length-1].column);
			context.fillStyle = "white";
			console.log("erasing" + this.path[this.path.length-1].row + "," +this.path[this.path.length-1].column + "inloop");

			context.fillRect((this.path[this.path.length-1].column-1) * bWidth + 1, (this.path[this.path.length-1].row-1) * bHeight + 1, bWidth - 1, bHeight - 1);
			if(level[this.path[this.path.length-1].row][this.path[this.path.length-1].column].type ==="path")
			{
				level[this.path[this.path.length-1].row][this.path[this.path.length-1].column].type = 0;
				level[this.path[this.path.length-1].row][this.path[this.path.length-1].column].color = 0;
			}
			//console.log(level);
			this.path.pop();

		}
		context.fillStyle = "white";
		console.log("erasing" + this.path[this.path.length-1].row + "," +this.path[this.path.length-1].column);
		context.fillRect((this.path[this.path.length-1].column-1) * bWidth + 1, (this.path[this.path.length-1].row-1) * bHeight + 1, bWidth - 1, bHeight - 1);

		level[this.path[this.path.length-1].row][this.path[this.path.length-1].column].type = 0;
		level[this.path[this.path.length-1].row][this.path[this.path.length-1].column].color = 0;
		this.path.pop();

		if(level[this.path[this.path.length-1].row][this.path[this.path.length-1].column].type !== "node")
			document.location = "index.html";
		else
			level[this.path[this.path.length-1].row][this.path[this.path.length-1].column].type = "broken node";

		console.log(level);
                drawCircle(context, this.color, this.end.row, this.end.column);

		this.color = color;
		drawBoard(context);
		this.complete = false;

		console.log(this.path.length);
	};

	this.drawPath = function(context, currTile, breakPath)
	{
		if(!breakPath)
			this.path.push(currTile);

		var lastTile = this.path[this.path.length-2];
		//console.log(this.path);
		var x;// = (lastTile.column-1) * bWidth + bWidth/2 - bWidth/8;
		var y;// = (lastTile.row -1) * bHeight + bHeight/2;
		var width, height;
		//console.log(lastTile);
		//console.log(currTile);
		if(lastTile.row === currTile.row)
		{
			x = (lastTile.column-1) * bWidth + bWidth/2;
			y = (lastTile.row -1) * bHeight + bHeight/2 - bHeight/8;
			width = (currTile.column - lastTile.column) * 9/8 * bWidth;
			height =  bHeight/4; 
		}

		else
		{
			x = (lastTile.column-1) * bWidth + bWidth/2 - bWidth/8;
			y = (lastTile.row -1) * bHeight + bHeight/2;
			width = bWidth/4;
			height =  (currTile.row - lastTile.row) * bHeight * 9/8;
		}
		console.log("drawing" + currTile.row +"," + currTile.column);

		context.fillStyle = this.color;
		context.fillRect(x, y, width, height);

		this.complete = this.checkComplete();
	};
}

function drawPath(context, lastTile, currTile, color)
{
	var x;// = (lastTile.column-1) * bWidth + bWidth/2 - bWidth/8;
	var y;// = (lastTile.row -1) * bHeight + bHeight/2;
	var width, height;

	if(lastTile.row === currTile.row)
	{
		x = (lastTile.column-1) * bWidth + bWidth/2;
		y = (lastTile.row -1) * bHeight + bHeight/2 - bHeight/8;
		width = (currTile.column - lastTile.column) * 9/8 * bWidth;
		height = bHeight/4; 
	}

	else
	{
		x = (lastTile.column-1) * bWidth + bWidth/2 - bWidth/8;
		y = (lastTile.row -1) * bHeight + bHeight/2;
		width = bWidth/4;
		height = (currTile.row - lastTile.row) * bHeight * 9/8;
	}

	context.fillStyle = color;
	context.fillRect(x, y, width, height);

}


function checkComplete(level, paths)
{
	var complete = true, count = 0;

	for(path in paths)
	{
		count++;
		console.log(paths);

		if(!paths[path].checkComplete())
		{
			complete = false;
			console.log(path);
		}
	
	}

	for(var i = 1; i <= 7; i++)
		for (var j = 1; j <= 7; j++) 
			if(!level[i][j].type)
				complete = false;
	
	return (complete && count === 5);
}


function findTarget(tile)
{
	for(var i = 1; i <= 7; i++)
		for(var j = 1; j <= 7; j++)
		{
			if(level[i][j].color === level[tile.row][tile.column].color && (i !== tile.row || j !== tile.column))
				return {row:i, column: j};
		}
}


