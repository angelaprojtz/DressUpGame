//https://github.com/FSUdigitalmedia/p5play_dolldemo/tree/main
let backgroundImage;
let dressupDollImage;
let doll, shirt, pants, shoes, head;

// List of all clothing pieces. Order matters for the numbers below:
// [0] = shirt, [1] = pants, [2] = shoes, [3] = head
const clothingArticles = [
	{	id: "shirt_1",
		slot: "shirt",
		imgPath: "assets/shirt.png",
		startPosition: { x: 520, y: 320 },
		snapPosition: { x: 195, y: 417 },
	},
	{	id: "pants_1",
		slot: "pants",
		imgPath: "assets/pants.png",
		startPosition: { x: 520, y: 470 },
		snapPosition: { x: 195, y: 486 },
	},
	{	id: "shoes_1",
		slot: "shoes",
		imgPath: "assets/shoes.png",
		startPosition: { x: 520, y: 570 },
		snapPosition: { x: 195, y: 547 },
	},
	{	id: "head_1",
		slot: "head",
		imgPath: "assets/head.png",
		startPosition: { x: 520, y: 200 },
		snapPosition: { x: 195, y: 198 },
	},
];
const currentlyWearing = [];

function preload() {
	backgroundImage = loadImage("assets/background.png");
	dressupDollImage = loadImage("assets/doll.png");

	for (const article of clothingArticles) {
		article.image = loadImage(article.imgPath);
	}
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

	const shirtData = clothingArticles[0];
	shirt = new Sprite();
	shirt.img = shirtData.image;
	shirt.def = shirtData;
	shirt.scale = 0.5;
	shirt.position = createVector(shirtData.startPosition.x, shirtData.startPosition.y);
	shirt.collider = "dynamic";
	shirt.drag = 10;

	const pantsData = clothingArticles[1];
	pants = new Sprite();
	pants.img = pantsData.image;
	pants.def = pantsData;
	pants.scale = 0.5;
	pants.position = createVector(pantsData.startPosition.x, pantsData.startPosition.y);
	pants.collider = "dynamic";
	pants.drag = 10;

	const shoesData = clothingArticles[2];
	shoes = new Sprite();
	shoes.img = shoesData.image;
	shoes.def = shoesData;
	shoes.scale = 0.5;
	shoes.position = createVector(shoesData.startPosition.x, shoesData.startPosition.y);
	shoes.collider = "dynamic";
	shoes.drag = 10;

	const headData = clothingArticles[3];
	head = new Sprite();
	head.img = headData.image;
	head.def = headData;
	head.scale = 0.5;
	head.position = createVector(headData.startPosition.x, headData.startPosition.y);
	head.collider = "dynamic";
	head.drag = 10;

	// Keep colliders for mouse hit detection, but disable physical blocking.
	shirt.overlaps(pants);
	shirt.overlaps(doll);

	pants.overlaps(shoes)
	pants.overlaps(doll);

	shoes.overlaps(doll);

	head.overlaps(doll);
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

	if (head.mouse.dragging()) {
		head.moveTowards(
			mouse.x + head.mouse.x,
			mouse.y + head.mouse.y,
			1.7
		);
	}
}

function mouseReleased() {
	// Small helper: "when I drop this sprite, snap it to the doll or back to the tray."
	function snapClothingSprite(clothingSprite) {
		const clothingData = clothingSprite.def;
		const snap = clothingData.snapPosition;
		const start = clothingData.startPosition;

		if (dist(clothingSprite.x, clothingSprite.y, snap.x, snap.y) < 225) {
			clothingSprite.position = createVector(snap.x, snap.y);
		} else {
			clothingSprite.position = createVector(start.x, start.y);
		}
		clothingSprite.vel.x = 0;
		clothingSprite.vel.y = 0;
	}

	snapClothingSprite(shirt);
	snapClothingSprite(pants);
	snapClothingSprite(shoes);
	snapClothingSprite(head);
}

function mousePressed() { //for getting coordinates
  console.log("click:", Math.round(mouseX), Math.round(mouseY));
}