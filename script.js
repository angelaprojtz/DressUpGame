//https://github.com/FSUdigitalmedia/p5play_dolldemo/tree/main
let backgroundImage;
let dressupDollImage, shirtImage, pantsImage, shoesImage;
let doll, shirt, pants;
let torsoVector, legsVector;

function preload() {
	backgroundImage = loadImage("assets/background.png");
	dressupDollImage = loadImage("assets/doll.png");
	shirtImage = loadImage("assets/shirt.png");
	pantsImage = loadImage("assets/pants.png");
	shoesImage = loadImage("assets/shoes.png");
}

function setup() {
	new Canvas(1000, 700);
	rectMode(CENTER);
	allSprites.rotationLock = true;

	doll = new Sprite();
	doll.img = dressupDollImage;
	doll.scale = 0.5;
	doll.position = createVector(200, 350);
	doll.collider = "none";

	shirt = new Sprite();
	shirt.img = shirtImage;
	shirt.scale = 0.5;
	shirt.position = createVector(520, 160);
	shirt.collider = "dynamic";
	shirt.drag = 10;

	pants = new Sprite();
	pants.img = pantsImage;
	pants.scale = 0.5;
	pants.position = createVector(520, 320);
	pants.collider = "dynamic";
	pants.drag = 10;

	shoes = new Sprite();
	shoes.img = shoesImage;
	shoes.scale = 0.5;
	shoes.position = createVector(520, 470);
	shoes.collider = "dynamic";
	shoes.drag = 10;

	// Keep colliders for mouse hit detection, but disable physical blocking.
	shirt.overlaps(pants);
	shirt.overlaps(doll);
	pants.overlaps(shoes)
	pants.overlaps(doll);
	shoes.overlaps(doll);

	torsoVector = createVector(195, 417);
	legsVector = createVector(195, 486);
	feetVector = createVector(195, 547);

}

function draw() {
	background(backgroundImage);

	if (shirt.mouse.dragging()) {
		shirt.moveTowards(
			mouse.x + shirt.mouse.x,
			mouse.y + shirt.mouse.y,
			1.7
		);
	}

	if (pants.mouse.dragging()) {
		pants.moveTowards(
			mouse.x + pants.mouse.x,
			mouse.y + pants.mouse.y,
			1.7
		);
	}

	if (shoes.mouse.dragging()) {
		shoes.moveTowards(
			mouse.x + shoes.mouse.x,
			mouse.y + shoes.mouse.y,
			1.7
		);
	}
}

function mouseReleased(){
	if (dist(shirt.x, shirt.y, torsoVector.x, torsoVector.y) < 225) {
		shirt.position = torsoVector;
		shirt.vel.x = 0;
		shirt.vel.y = 0;
	}

	if (dist(pants.x, pants.y, legsVector.x, legsVector.y) < 225) {
		pants.position = legsVector;
		pants.vel.x = 0;
		pants.vel.y = 0;
	}	

	if (dist(shoes.x, shoes.y, feetVector.x, feetVector.y) < 225) {
		shoes.position = feetVector;
		shoes.vel.x = 0;
		shoes.vel.y = 0;
	}	
}

function mousePressed() { //for getting coordinates
  console.log("click:", Math.round(mouseX), Math.round(mouseY));
}