var balls = [];

function setup (){
	createCanvas(500, 500);
	for (var i = 0; i < 3; i++) {
		balls[i] = new Ball;
	}
}

function draw(){
	background(0);
	for (var i = 0; i < balls.length; i++) {
		balls[i].display(i);
		balls[i].move();
		balls[i].bounce();
		balls[i].reproduce(balls);
	}

}

function mousePressed(){

}

function Ball(){
	this.id = 0;
	this.size = 55;
	this.x = random(50,450);
	this.y = random(50,450);
	this.velX = random (-13,10);
	this.velY = random(-13,10);
	toReproduce = true;
	reproduced = false;
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
	this.reproduce = function(objArray){
		for(i=0;i<objArray.length;i++){
			if(this.id != i){ //dont do the check if it is looking at itself
				this.toReproduce = collideCircleCircle(this.x, this.y, this.size, objArray[i].x, objArray[i].y, objArray[i].size); //colliding with anything?
				if(this.toReproduce == true){ // if we ever get a true we have to try again, this works since we iterate down through the objects one by one.
					if(!this.reproduced || !objArray[i].reproduced){
						console.log("reproducing!")
						balls.push(new Ball);
						this.reproduced = true;
						objArray.reproduced =true;
					}
				}	
			
			}
		}
	}
}


function collideCircleCircle(x, y,d, x2, y2, d2) {
  if( this.dist(x,y,x2,y2) <= (d/2)+(d2/2) ){
    return true;
  }
  return false;
};