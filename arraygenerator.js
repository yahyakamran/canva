const canvas = document.getElementById("canvas");
const btn = document.getElementById("btn");
const p = document.getElementById("para");

const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = canvas.width;

const ROWS = 160;
const COLS = ROWS;

const CELL_WIDTH = canvas.width / COLS;
const CELL_HEIGHT = canvas.height / ROWS;

const scene = [];

for(let i = 0 ; i < ROWS ; ++i){
    scene.push(new Array(COLS).fill(0))
}

ctx.scale(CELL_WIDTH , CELL_HEIGHT);


function render(){
   for(let i = 0 ; i < ROWS ; ++i){
        for(let j = 0 ; j < COLS ; ++j){
	   ctx.beginPath();
	      if(scene[i][j] === 1){
    	          ctx.fillStyle = "red"
    	      }else{
    	          ctx.fillStyle = "#77b300"
    	      }
    	   ctx.rect(i , j , 1 , 1);
    	   ctx.fill();
       }
    }
}

function write(){
    let empty = document.createTextNode(" ");
    p.appendChild(empty);
    p.textContent += "[";
    for(let i = 0 ; i < ROWS ; ++i){
	p.textContent += "[";
        for(let j = 0 ; j < COLS ; ++j){
	   if(j + 1 < COLS){
		p.textContent += `${scene[i][j]},`;
	   }else{
		p.textContent += `${scene[i][j]}`;
	   }
        }
	p.textContent += `],`;
    }
    p.textContent += "]";
}

canvas.addEventListener("mousedown" , (e)=>{
    const X = Math.floor(e.offsetX / CELL_WIDTH);
    const Y = Math.floor(e.offsetY / CELL_HEIGHT);
    scene[X][Y] = 1;
    render();
});

btn.addEventListener("click",()=>{
    write();
});


render();



