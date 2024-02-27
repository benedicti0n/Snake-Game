const snakeField = document.getElementById('snakeField');
const scoreText = document.getElementById('scoreText');
const ctx = snakeField.getContext('2d');

const gameWidth = snakeField.width;
const gameHeight = snakeField.height;
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
    {x: 3, y:3},
    {x: 2, y:2},
    {x: 1, y:1},
    {x: 0, y:0}
]

reset();

function gameStart(){};
function resetGame(){};
function checkGameOver(){};
function displayGameOver(){};

function nextTick(){};
function clearBoard(){};

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
    ctx.fillRect(xFood, yFood, unitSize, unitSize)
};

function moveSnake(){};
function drawSnake(){};
function changeDirection(){};