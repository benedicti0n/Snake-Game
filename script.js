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
let yVelocity = 0;
let xFood;
let yFood;
let score = 0;

let snake = [
    {x: unitSize*3, y:0},
    {x: unitSize*2, y:0},
    {x: unitSize, y:0},
    {x: 0, y:0}
]

window.addEventListener("keydown", changeDirection);

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
function checkGameOver(){
    switch(true){
        case(snake[0].x <0):
            running = false;
            break;
        case(snake[0].x >=gameWidth):
            running = false;
            break;
        case(snake[0].y <0):
            running = false;
            break;
        case(snake[0].y >= gameHeight):
            running = false;
            break;
    }

    for(let i =1; i< snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y) running = false;
    }
};
function displayGameOver(){
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText("Game Over!", gameWidth/2, gameHeight/2);
    running = false;
}; 

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
        score+=1
        scoreText.textContent = score;
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
function changeDirection(event){
    const keyPressed = event.keyCode;
    const UP = 38;
    const DOWN = 40;
    const LEFT = 37;
    const RIGHT = 39;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
            
    }
};