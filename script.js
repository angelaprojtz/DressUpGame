//https://github.com/FSUdigitalmedia/p5play_dolldemo/tree/main
let backgroundImage;
let dressupDollImage, shirtImage, pantsImage;
let doll, shirt, pants;
let torsoVector, legsVector;

function preload() {
	backgroundImage = loadImage("assets/background.png");
	dressupDollImage = loadImage("assets/doll.png");
	shirtImage = loadImage("assets/shirt.png");
	pantsImage = loadImage("assets/pants.png");
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
	shirt.position = createVector(500, 100);
	shirt.collider = "dynamic";
	shirt.drag = 10;

	pants = new Sprite();
	pants.img = pantsImage;
	pants.scale = 0.5;
	pants.position = createVector(500, 350);
	pants.collider = "dynamic";
	pants.drag = 10;

	// Keep colliders for mouse hit detection, but disable physical blocking.
	shirt.overlaps(pants);
	shirt.overlaps(doll);
	pants.overlaps(doll);

	torsoVector = createVector(195, 417);
	legsVector = createVector(194, 486);

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
}

function mousePressed() {
  console.log("click:", Math.round(mouseX), Math.round(mouseY));
}