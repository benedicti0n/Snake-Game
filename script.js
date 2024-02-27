const snakeField = document.getElementById('snakeField');
const scoreText = document.getElementById('scoreText');
const ctx = snakeField.getContext('2d');

const gameWidth = snakeField.width;
const gameHeight = snakeField.height;
const boardBackground = 'white';
const snakeColor = "lightgreen";
const snakeBorder= "black";
const foodColor = "red";
const unitSize = 25;

let running = false;
let xVelocity = unitSize;
let yVelocity = unitSize;
let xFood;
let yFood;
let score = 0;

let snake = [
    {x: unitSize*3, y:0},
    {x: unitSize*2, y:0},
    {x: unitSize, y:0},
    {x: 0, y:0}
]

gameStart();
// reset();
createFood();
drawFood();

function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function resetGame(){};
function checkGameOver(){};
function displayGameOver(){}; 

function nextTick(){
    if(running){
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 100);
    } else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameHeight, gameWidth);
};

function randomFood(min, max){
    const randomNum = Math.round((Math.random() * (max-min) + min) /unitSize) * unitSize;
    return randomNum;
}
function createFood(){
    xFood = randomFood(0, gameWidth-unitSize);
    yFood = randomFood(0, gameHeight-unitSize);
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(xFood, yFood, unitSize, unitSize);
};

function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity
                }

    snake.unshift(head);

    if(snake[0].x == xFood && snake[0].y == yFood){
        scoreText.textContent = score+1;
        createFood();
    } else{
        snake.pop();
    }
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;

    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(){};