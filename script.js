//https://github.com/FSUdigitalmedia/p5play_dolldemo/tree/main
let backgroundImage;
let dressupDollImage;
let finishButtonImage;
let doll, shirt, pants, shoes, head;

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

//might need to move into preload?
const currentlyWearing = [];

function preload() {
	backgroundImage = loadImage("assets/background.png");
	dressupDollImage = loadImage("assets/doll.png");
	finishButtonImage = loadImage("assets/finishbutton.png");

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

	finish = new Sprite();
	finish.img = finishButtonImage;
	finish.position = createVector(190, 50);
	finish.scale = 0.4;
	finish.collider = "none";

	const shirtData = clothingArticles[0];
	shirt = new Sprite();
	shirt.img = shirtData.image;
	shirt.articleData = shirtData;
	shirt.scale = 0.5;
	shirt.position = createVector(shirtData.startPosition.x, shirtData.startPosition.y);
	shirt.collider = "dynamic";
	shirt.drag = 10;

	const pantsData = clothingArticles[1];
	pants = new Sprite();
	pants.img = pantsData.image;
	pants.articleData = pantsData;
	pants.scale = 0.5;
	pants.position = createVector(pantsData.startPosition.x, pantsData.startPosition.y);
	pants.collider = "dynamic";
	pants.drag = 10;

	const shoesData = clothingArticles[2];
	shoes = new Sprite();
	shoes.img = shoesData.image;
	shoes.articleData = shoesData;
	shoes.scale = 0.5;
	shoes.position = createVector(shoesData.startPosition.x, shoesData.startPosition.y);
	shoes.collider = "dynamic";
	shoes.drag = 10;

	const headData = clothingArticles[3];
	head = new Sprite();
	head.img = headData.image;
	head.articleData = headData;
	head.scale = 0.5;
	head.position = createVector(headData.startPosition.x, headData.startPosition.y);
	head.collider = "dynamic";
	head.drag = 10;

	// overlap fixes so items don't slip and slide during collision
	const clothingSprites = [shirt, pants, shoes, head];
	for (const sprite of clothingSprites) {
		sprite.overlaps(doll);
	}

	for (const spriteA of clothingSprites) {
		for (const spriteB of clothingSprites) {
			if (spriteA !== spriteB) {
				spriteA.overlaps(spriteB);
			}
		}
	}
}

function draw() { //runs every frame
	background(backgroundImage); //we have this here so clothes don't leave a trail

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

	function snapClothingSprite(clothingSprite) {
		const clothingData = clothingSprite.articleData;
		const snap = clothingData.snapPosition;
		const start = clothingData.startPosition;

		if (dist(clothingSprite.x, clothingSprite.y, snap.x, snap.y) < 225) {
			clothingSprite.position = createVector(snap.x, snap.y);

			if (!currentlyWearing.includes(clothingData.id)){
				currentlyWearing.push(clothingData.id);
			}
			
			/*
			for (const id of currentlyWearing) {
				console.log("currentlyWearing:", id);
			}*/

		} else {
			clothingSprite.position = createVector(start.x, start.y);

			const arrayIndex = currentlyWearing.indexOf(clothingData.id);
			if (arrayIndex > -1){ // only splice array when item is found
				currentlyWearing.splice(arrayIndex, 1); // 2nd parameter means remove one item only
			}
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