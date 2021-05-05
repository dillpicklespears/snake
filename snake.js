/*
This program is clone of the classic snake game, where the user 
where press either the WASD keys or the arrow keys to control
the snake moving across the screen to collect apples, as you collect
apples you snake grows in increments of one block and you attempt
to eat more and more apples without running into yourself or the wall
*/ 

//universal framerate of whole program
var uspeed = 10; 

//determine if game has ended
var gameOver = false; 

//variable to determine size of each tile or square 
var d = 26; 

//variable for amount of tiles per row
var tiles = 26;

//score variables
var score = 0; 
var scoreBoard = document.getElementById("score"); 

//setting up canvas as board
var canvas = document.getElementById("canvas"); 
var ctx = canvas.getContext("2d"); 
canvas.width = tiles * d; 
canvas.height = tiles * d; 
ctx.fillStyle = "grey"; 
ctx.fillRect(0, 0, canvas.width, canvas.height); 

//snake img canvas 
var snakedimensions = d-2; 
var snakecanvas = document.createElement("canvas");
var sctx = snakecanvas.getContext("2d"); 
snakecanvas.width = snakedimensions; 
snakecanvas.height = snakedimensions; 
sctx.fillStyle = "lime"; 
sctx.fillRect(0, 0, snakecanvas.width, snakecanvas.height); 

var snakeTail = []; 

//apple img canvas
var appledimensions = d-2; 
var applecanvas = document.createElement("canvas"); 
var actx = applecanvas.getContext("2d"); 
applecanvas.width = appledimensions; 
applecanvas.height = appledimensions; 
actx.fillStyle = "red"; 
actx.fillRect(0, 0, applecanvas.width, applecanvas.height); 

//handles player input
var keysPressed = {};

addEventListener("keydown", function (e) {
	keysPressed[e.key] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysPressed[e.key];
}, false);

//snake variable 
var snake = { 
    speed: 20000, 
    x: canvas.width/2, 
    y: canvas.height/2,
    //d = dimensions, its a square so height and length are the same
    d: snakedimensions, 
    img: snakecanvas,
    facing: ""
};

//apple variable 
var apple = {
    x: 0, 
    y: 0,
    d: appledimensions,
    img: applecanvas
}; 

//draw function draws objects 
function draw()
{

    //draw snake
    ctx.drawImage(snake.img, snake.x, snake.y);  

    //draw snake tail 
    for(var i = 0; i<score; i++)  
    {
        ctx.drawImage(snake.img, snakeTail[i].x, snakeTail[i].y); 
    }

    //draw apple
    ctx.drawImage(apple.img, apple.x, apple.y); 
}

//moves snake
function moveSnake(direction) 
{
    if(direction == "n") 
    {
        snake.y -= d; 
    }
    if(direction == "s") 
    {
        snake.y += d; 
    }
    if(direction == "e")
    {
        snake.x += d;
    }
    if(direction == "w")
    {
        snake.x -= d; 
    }
}

//update function, called a lot
function update() 
{
    //changes the direction of the snake based on input
    if(keysPressed.length > 1)
    {
        keysPressed.shift(); 
    }

    if((keysPressed["w"] || keysPressed["ArrowUp"]) && snake.facing != "s")
    {
        snake.facing = "n"; 
        keysPressed = []; 
    }

    if((keysPressed["a"] || keysPressed["ArrowLeft"]) && snake.facing != "e")
    {
        snake.facing = "w"; 
        keysPressed = [];
    }

    if((keysPressed["s"] || keysPressed["ArrowDown"]) && snake.facing != "n")
    {
        snake.facing = "s"; 
        keysPressed = [];
    }

    if((keysPressed["d"] || keysPressed["ArrowRight"]) && snake.facing != "w")
    {
        snake.facing = "e"; 
        keysPressed = [];
    }

    //ensures the tail follows the heads path
    snakeTail.push({x: snake.x, y: snake.y}); 

    if(snakeTail.length > score) 
    {
        snakeTail.shift(); 
    }

    //moves snake in facing direction
    moveSnake(snake.facing); 

    //keeps score with apples
    if(snake.x == apple.x && snake.y == apple.y)
    {
        score++; 
        reset(); 
    }

    scoreBoard.innerText = "Score: " + score; 

    //stops game if snake hits a wall
    if(snake.x == canvas.width || snake.x < 0 || snake.y == canvas.height || snake.y < 0)
    {
        kill(); 
    }

    //stops game if snake hits itself 
    for(var i = 0; i<snakeTail.length; i++)
    {
        if(snake.x == snakeTail[i].x && snake.y == snakeTail[i].y)
        {
            kill(); 
        }
    }
}

//reset affects apple position 
function reset() 
{
    var applex = Math.floor(Math.random() * tiles) * d;
    var appley = Math.floor(Math.random() * tiles) * d;

    //ensures apple doesnt spawn on tail
    for(var i = 0; i<snakeTail.length; i++)
    {
        if(snakeTail[i].x == applex && snakeTail[i].y == appley)
        {
            applex = Math.floor(Math.random() * tiles) * d;
            appley = Math.floor(Math.random() * tiles) * d;
            i = 0;
        }
    }

    apple.x = applex; 
    apple.y = appley; 
}
function kill()
{
    gameOver = true; 
    cancelAnimationFrame(play); 
    snake.facing = ""; 
}

//function to clear entire canvas
function clear() 
{
    ctx.fillStyle = "grey"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
}

//function for restart button
function restart()
{
    requestAnimationFrame(animate); 
    gameOver = false; 
    score = 0; 
    snakeTail = []; 
    snake.facing = ""; 
    snake.x = canvas.width/2; 
    snake.y = canvas.height/2; 
    reset(); 
}

//assigning restart to the button
document.getElementById("restart").onclick = function() 
{
    restart(); 
}

//function for just about everything
function main() 
{
	update(); 
    clear(); 
	draw(); 
}

//function called to start the whole app 
function start() 
{
    reset(); 
    draw(); 
    startAnimating(uspeed);
}

//
//slowing down the framerate of the game 
//
var fpsInterval, now, then, elapsed;
  
    function startAnimating(fps) {
        fpsInterval = 1000 / fps;
        then = Date.now();
        animate();
    }
  
    function animate() {
        if(!gameOver)
        {
            // request another frame
    
            var play = requestAnimationFrame(animate);
    
            // calc elapsed time since the last loop
    
            now = Date.now();
            elapsed = now - then;
    
            // if enough time has elapsed, draw the next frame
    
            if (elapsed > fpsInterval) {
                then = now - (elapsed % fpsInterval);

            // draw animating objects here...

                main();
            }
        }
    }
//
//
//

start(); 

