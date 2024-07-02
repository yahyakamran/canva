const canvas = document.getElementById("canvas");
const button = document.getElementById("next");
const clear = document.getElementById("clear");
const eraseBtn = document.getElementById("eraseBtn");
const run = document.getElementById("run");

const ctx = canvas.getContext("2d");

canvas.width = 640;
canvas.height = canvas.width;

const ROWS = 16;
const COLS = ROWS;
const CELL_WIDTH = canvas.width / COLS;
let ERASE = false;
let AnimationFrame;

const BG_COLOR = "#f1f3f2"
const BORDER_COLOR = "grey"
const CELL_COLOR = "black"

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function generate_board(){
    let board = [];
    for(let i = 0 ; i < ROWS ; ++i){
        board.push(new Array(COLS).fill(0));
    }
    return board;
}

let current_board = generate_board();

function isValidPos(i, j, n, m) {
    if (i < 0 || j < 0 || i > n - 1 || j > m - 1)
        return 0;
    return 1;
}

function count_nbors(i , j){
    let n = current_board.length;
    let m = current_board[0].length;

    let nbors = 0;

    if(isValidPos(i - 1 , j - 1 , n , m)){
	if(current_board[i - 1][j - 1] === 1){
	    nbors++;
	}
    }

    if(isValidPos(i - 1 , j , n , m)){
	if(current_board[i - 1][j] === 1){
	    nbors++;
	}
    }

    if(isValidPos(i - 1 , j + 1 , n , m)){
	if(current_board[i - 1][j + 1] === 1){
	    nbors++;
	}
    }

    if(isValidPos(i , j - 1 , n , m)){
	if(current_board[i][j - 1] === 1){
	    nbors++;
	}
    }

    if(isValidPos(i , j + 1 , n , m)){
	if(current_board[i][j + 1] === 1){
	    nbors++;
	}
    }

    if(isValidPos(i + 1 , j - 1 , n , m)){
	if(current_board[i + 1][j - 1] === 1){
	    nbors++;
	}
    }
    if(isValidPos(i + 1 , j + 1 , n , m)){
	if(current_board[i + 1][j + 1] === 1){
	    nbors++;
	}
    }
    if(isValidPos(i + 1 , j , n , m)){
	if(current_board[i + 1][j] === 1){
	    nbors++;
	}
    }
    return nbors;
}

function comp_next_board(curren_board){
    let next_board = generate_board();
    for(let i = 0 ; i < ROWS ; ++i){
	for(let j = 0 ; j < COLS ; ++j){
	    let nbors = count_nbors(i , j);
	    switch(curren_board[i][j]){
		case 1 :
		    if(2 > nbors && nbors > 3){
			next_board[i][j] = 0;
		    }else if(nbors === 2 || nbors === 3){
			next_board[i][j] = 1;
		    }
		    break;
		case 0 :
		    if(nbors === 3){
			next_board[i][j] = 1;
		    }
		    break;
	    }
	}
    }
    return next_board;
}

function render(){
    ctx.rect( 0 , 0 , canvas.width , canvas.height);
    ctx.fillStyle = BG_COLOR;
    ctx.fill();

    for(let i = 0 ; i < ROWS ; ++i ){
	for(let j = 0 ; j < COLS ; ++j ){
	    ctx.lineWidth = 2;
	    ctx.beginPath();
	    ctx.strokeStyle = BORDER_COLOR
	    ctx.moveTo(i*CELL_WIDTH , 0);
	    ctx.lineTo(i*CELL_WIDTH , canvas.height);
	    ctx.stroke();
	    ctx.beginPath();
	    ctx.strokeStyle = BORDER_COLOR
	    ctx.moveTo(0 , j*CELL_WIDTH);
	    ctx.lineTo(canvas.width , j*CELL_WIDTH );
	    ctx.stroke();
	}
    }

    for(let i = 0 ; i < ROWS ; ++i){
        for(let j = 0 ; j < COLS ; ++j){
	    if(current_board[i][j] === 1){
	        let x = i*CELL_WIDTH;
	        let y = j*CELL_WIDTH;
	        ctx.beginPath();
    	        ctx.rect( x , y , CELL_WIDTH , CELL_WIDTH);
    	        ctx.fillStyle = CELL_COLOR;
    	        ctx.fill();
    	    }
        }
    }
}

run.addEventListener("click",()=>{
    let start , elapsed;
    function frame(timestamp){
	timestamp /= 1000;
	if(start === undefined){
	    start = timestamp;
	}
	elapsed = timestamp - start;
	current_board = comp_next_board(current_board);
    	render();
	console.log("still running" , timestamp);
	if(elapsed < 20){
	    sleep(69 + 69);
	    AnimationFrame = window.requestAnimationFrame(frame);
	}
    }
    AnimationFrame = window.requestAnimationFrame(frame);
});

button.addEventListener("click",()=>{
    current_board = comp_next_board(current_board);
    render();
})

clear.addEventListener("click",()=>{
    window.cancelAnimationFrame(AnimationFrame);
    current_board = generate_board();
    render();
})

canvas.addEventListener("mousedown",(e)=>{
    window.cancelAnimationFrame(AnimationFrame);
    let X = Math.floor(e.offsetX / CELL_WIDTH);
    let Y = Math.floor(e.offsetY / CELL_WIDTH);
    if(ERASE){
	current_board[X][Y] = 0;
    }else{
	current_board[X][Y] = 1;
    }
    render();
})

eraseBtn.addEventListener('change',(e)=>{
    ERASE = e.explicitOriginalTarget.checked;
});

render();
