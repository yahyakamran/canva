const canvas = document.getElementById("canvas");
const button = document.getElementById("next");
const clear = document.getElementById("clear");

const ctx = canvas.getContext("2d");

canvas.width = 640;
canvas.height = canvas.width;

const ROWS = 32;
const COLS = ROWS;
const CELL_WIDTH = canvas.width / COLS;

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
    ctx.fillStyle = "grey";
    ctx.fill();

    for(let i = 0 ; i < ROWS ; ++i){
        for(let j = 0 ; j < ROWS ; ++j){
	    if(current_board[i][j] === 1){
	        let x = i*CELL_WIDTH;
	        let y = j*CELL_WIDTH;
	        ctx.beginPath();
    	        ctx.rect( x , y , CELL_WIDTH , CELL_WIDTH);
    	        ctx.fillStyle = "red";
    	        ctx.fill();
    	    }
        }
    }
}

button.addEventListener("click",()=>{
    current_board = comp_next_board(current_board);
    render();
})

clear.addEventListener("click",()=>{
    current_board = generate_board();
    render();
})

canvas.addEventListener("mousedown",(e)=>{
    let X = Math.floor(e.offsetX / CELL_WIDTH);
    let Y = Math.floor(e.offsetY / CELL_WIDTH);
    current_board[X][Y] = 1;
    render();
})

render();
