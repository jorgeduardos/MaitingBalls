var balls = [];

function setup (){
	createCanvas(500, 500);
	for (var i = 0; i < 9; i++) {
		balls[i] = new Ball;
	}
	console.log(balls);
}

function draw(){
	background(0);
	// atomicBomb(balls);
	for (var i = 0; i < balls.length; i++) {
		balls[i].display(i);
		balls[i].move();
		balls[i].bounce();
		// balls[i].reproduce(balls);
		balls[i].fussion(balls);
		// balls[i].lifespan(i);
	}
	// console.log(balls.length);

}

function mousePressed(){
	// balls.push(new Ball);
	noLoop();
}

function Ball(){
	this.id = 0;
	this.size = random(1,45);
	//colors 
	this.r = random(0,255);
	this.g = random(0,255);
	this.b = random(0,255);
	// this.alpha = 255;

	this.x = random(50,450);
	this.y = random(50,450);
	this.velX = random (-5,5);
	this.velY = random(-5,5);
	this.onTop = true;
	this.reproduced = false;
	this.age = 1;

	this.display = function(id){
		// rectMode(CENTER);
		noStroke();
		fill(this.r, this.g, this.b);
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
				this.onTop = collideCircleCircle(this.x, this.y, this.size, objArray[i].x, objArray[i].y, objArray[i].size); //colliding with anything?
				if(this.onTop == true){ // if we ever get a true we have to try again, this works since we iterate down through the objects one by one.
					if(!this.reproduced && !objArray[i].reproduced){
						// console.log("reproducing!")
						for (var i = 0; i < Math.ceil(random(2)); i++) {
							balls.push(new Ball);
						}
						this.reproduced = true;
						objArray[i].reproduced = true;
					}
				}	
			
			}
		}
	}
	this.fussion = function(objArray, current){
		for(i=0;i<objArray.length;i++){
			if(this.id != i){ //dont do the check if it is looking at itself
				this.onTop = collideCircleCircle(this.x, this.y, this.size, objArray[i].x, objArray[i].y, objArray[i].size); //colliding with anything?
				if(this.onTop == true){ // if we ever get a true we have to try again, this works since we iterate down through the objects one by one.
					if(this.size > objArray[i].size){
						this.size += objArray[i].size;
						balls.splice(i, 1);
						console.log(balls);
					}else{
						objArray[i].size += this.size;
						balls.splice(current, 1);
						console.log(balls);
					}
				}	
			}
		}
	}
	this.lifespan = function(i){
		if(this.age == 350){
			balls.splice(i, 1);
		}else{
			this.age++;
		}
	}
}

function atomicBomb(objArray){
	if(objArray.length > 100){
		objArray.splice(0, objArray.length);
	}
}


function collideCircleCircle(x, y,d, x2, y2, d2) {
  if( this.dist(x,y,x2,y2) <= (d/2)+(d2/2) ){
    return true;
  }
  return false;
};