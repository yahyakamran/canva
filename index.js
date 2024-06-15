const canvas = document.getElementById("canvas");

const ROWS = 32;
const COLUMNS = ROWS;

canvas.width = 640 ;
canvas.height = canvas.width ;

const CELL_WIDTH = canvas.width / COLUMNS;

var ctx = canvas.getContext("2d");

ctx.rect( 0 , 0 , canvas.width , canvas.height);
ctx.fillStyle = "gray";
ctx.fill();

for(let i = 0 ; i < ROWS ; i++){
    for(let j = 0 ; j < COLUMNS ; j++){
	if(i == j){
	    let x = i * CELL_WIDTH;
	    let y = j * CELL_WIDTH;
	    ctx.beginPath();
    	    ctx.fillStyle = "red"
    	    ctx.rect(x, y, CELL_WIDTH , CELL_WIDTH);
    	    ctx.fill();
	}
    }
}
