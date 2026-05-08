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
	shirt.drag = 10;

	pants = new Sprite();
	pants.img = pantsImage;
	pants.scale = 0.5;
	pants.position = createVector(500, 350);
	pants.drag = 10;

	torsoVector = createVector(191, 207);
	legsVector = createVector(200, 355);
}

function draw() {
	background(backgroundImage);

	if (shirt.mouse.dragging()) {
		shirt.moveTowards(
			mouse.x + shirt.mouse.x,
			mouse.y + shirt.mouse.y,
			1
		);
	}

	if (pants.mouse.dragging()) {
		pants.moveTowards(
			mouse.x + pants.mouse.x,
			mouse.y + pants.mouse.y,
			1
		);
	}

	if (dist(shirt.x, shirt.y, torsoVector.x, torsoVector.y) < 20) {
		shirt.position = torsoVector;
	}

	if (dist(pants.x, pants.y, legsVector.x, legsVector.y) < 20) {
		pants.position = legsVector;
	}
}