const canvas = document.getElementById("canvas");

const ROWS = 16;
const COLUMNS = ROWS;
let DY = 0;

canvas.width = 640 ;
canvas.height = canvas.width ;

const CELL_WIDTH = canvas.width / COLUMNS;

var ctx = canvas.getContext("2d");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generate_board(){
    let board = [];
    for(let i = 0 ; i < ROWS ; ++i){
        board.push(new Array(COLUMNS).fill(0));
    }
    return board;
}

let current_board = generate_board();

function comp_next_board(current_board){
    let next_board = generate_board();
    for(let i = 0 ; i < ROWS ; ++i){
	for(let j = 0 ; j < COLUMNS ; ++j){
	    if(current_board[i][j] == 1){
		if(j*CELL_WIDTH < canvas.height - CELL_WIDTH && current_board[i][j+1] === 0){
		    next_board[i][j] = 0;
		    next_board[i][j + 1] = 1;
		}else{
		    next_board[i][j] = 1;
		}
	    }
	}
    }
    return next_board;
}

const render = async() => {
    ctx.rect( 0 , 0 , canvas.width , canvas.height);
    ctx.fillStyle = "gray";
    ctx.fill();

    for(let i = 0 ; i < ROWS ; ++i){
        for(let j = 0 ; j < COLUMNS ; ++j){
	   if(current_board[i][j] === 1){
    	       let x = i * CELL_WIDTH;
    	       let y = j * CELL_WIDTH;
    	       ctx.beginPath();
               ctx.fillStyle = "red"
               ctx.rect(x, y, CELL_WIDTH , CELL_WIDTH);
               ctx.fill();
	   }
	}
    }
    current_board = comp_next_board(current_board);
    await sleep(40);
    window.requestAnimationFrame(render);
}

let mouseX , mouseY;
canvas.addEventListener("mousedown",(e)=>{
    x = Math.floor(e.offsetX/CELL_WIDTH);
    y = Math.floor(e.offsetY/CELL_WIDTH);
    current_board[x][y] = 1;
})

window.requestAnimationFrame(render)


