var balls = [];

function setup (){
	createCanvas(500, 500);
	for (var i = 0; i < 5; i++) {
		balls[i] = new Ball;
	}
}

function draw(){
	background(0);
	for (var i = 0; i < balls.length; i++) {
		balls[i].display(i);
		balls[i].move();
		balls[i].bounce();
		balls[i].reproduce(balls[i]);
	}

}

function mousePressed(){
	noLoop();
}

function Ball(){
	this.id = 0;
	this.size = 60;
	this.x = random(50,450);
	this.y = random(50,450);
	this.velX = random (-13,10);
	this.velY = random(-13,10);

	this.display = function(id){
		// rectMode(CENTER);
		ellipse(this.x, this.y, this.size, this.size);
		this.id = id;
	}
	this.move = function(){
		this.x += this.velX;
		this.y += this.velY;
	}
	this.bounce = function(){
		if(this.x > 0 && this.x < width && this.y > height){
			this.velY = this.velY * -1;
		}else if(this.x > width && this.y > 0 && this.y < height){
			this.velX = this.velX * -1;
		}else if(this.x > 0 && this.x < width && this.y < 0){
			this.velY = this.velY * -1;
		}else if(this.x < 0 && this.y > 0 && this.y < height){
			this.velX = this.velX * -1;
		}
	}
	this.reproduce = function(ball){
		for (var i = 0; i < balls.length; i++) {
			if(ball.id != balls[i].id && ball.x == balls[i].x && ball.y == balls[i].y){
				balls.push(new Ball);
			}
		}
	}
}
