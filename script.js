var canvas = document.querySelector("canvas"); 
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 
var cx = canvas.getContext("2d"); 
cx.fillStyle = "grey"; 
cx.fillRect(0, 0, canvas.width, canvas.height); 

cx.strokeStyle = "white"; 

var mouseX = 0; 
var mouseY = 0; 

class Agent
{
    constructor(c, color = "white", randColor = false){
        this.lX = c.width/2;
        this.lY = c.height/2;
        this.x = c.width/2;
        this.y = c.height/2; 
        this.c = c; 
        this.color = color; 
        this.cx = c.getContext("2d"); 
        this.randColor = randColor; 

        this.r = Math.floor(Math.random()*255);
        this.g = Math.floor(Math.random()*255);
        this.b = Math.floor(Math.random()*255); 

        this.h = 0; //hue, 0-360, 360 = red, 120 = green, 240 = blue
        this.s = 0; //saturation, percentage value, 0-grey 100-full color
        this.l = 0; //lightness, percentage value, 0-black 100-white, 50-regular color
    }

    draw()
    {
        // rgb color values
        this.b = 0;
        this.g = this.x/this.c.width * 255; 
        this.r = this.y/this.c.height * 255; 

        //this.cx.strokeStyle = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")"; 

        // hsl color values
        //this.h = (this.x/this.c.width)/(this.y/this.c.height) * 360; 
        this.h = (this.y/this.c.height) * 360
        this.s = 100; 
        //this.l = (this.y/(this.c.height+200))/(this.x/(this.c.width+200)) *100; 
        this.l = 50;

        this.cx.strokeStyle = "hsl(" + this.h + ", " + this.s + "%, " + this.l + "%)"; 
        
        this.cx.beginPath()
        this.cx.moveTo(this.lX, this.lY); 
        this.cx.quadraticCurveTo(Math.floor(Math.random()*this.c.width), Math.floor(Math.random()*this.c.height) , this.x, this.y); 
        //this.cx.quadraticCurveTo(this.c.width/2, this.c.height/2, this.x, this.y); 
        //this.cx.quadraticCurveTo(0, this.c.height/2, this.x, this.y); 
        //this.cx.quadraticCurveTo(this.x, this.lY, this.x, this.y); 
        this.cx.stroke(); 
        this.lX = this.x;
        this.lY = this.y; 
    }

    move(list, str = 1, lambda = 1)
    {
        var randPower = 10;

        var mX = 0;
        var mY = 0;

        var prob = Math.random(); 

        for(var i = 0; i < list.length; i++)
        {
            mX = list[i].x; 
            mY = list[i].y; 

            if(prob < lambda)
            {
                if(Math.random() > 0.5)
                {
                    this.x += Math.random()*randPower;
                }
                else
                {
                    this.x -= Math.random()*randPower;
                }

                if(Math.random() > 0.5)
                {
                    this.y += Math.random()*randPower; 
                }
                else
                {
                    this.y -= Math.random()*randPower; 
                }
            }
            else
            {
                this.x += (this.x - mX);
                this.y += (this.y - mY);
            }
        }

        if(this.x >= this.c.width - 10)
        {
            this.x -= 10; 
        }
        if(this.x <= 10)
        {
            this.x += 10; 
        }
        if(this.y >= this.c.height - 10)
        {
            this.y -= 10; 
        }
        if(this.y <= 10)
        {
            this.y += 10; 
        }
    }

    log()
    {
        console.log(this.x + " ," + this.y); 
    }
}

var agent = new Agent(canvas); 
var agent2 = new Agent(canvas, "black"); 
var agent3 = new Agent(canvas, "blue"); 
var agent4 = new Agent(canvas, "green"); 
var agent5 = new Agent(canvas, "red"); 

var agents = [agent, agent2, agent3, agent4, agent5];

function happen()
{
    agent.move(agents); 
    agent2.move(agents); 
    agent3.move(agents);
    agent4.move(agents); 
    agent4.move(agents); 
    agent5.move(agents); 
    

    agent.draw(); 
    agent2.draw(); 
    agent3.draw();
    agent4.draw();
    agent5.draw(); 
    requestAnimationFrame(happen); 
}
happen(); 


document.addEventListener('mousemove', (event) => {

	mouseX = event.clientX; 
    mouseY = event.clientY; 

});






