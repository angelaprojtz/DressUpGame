// Reference: https://github.com/FSUdigitalmedia/p5play_dolldemo/tree/main
let backgroundImage;
let dressupDollImage;
let finishButtonImage, savePresetButtonImage, loadPreInactiveImage, loadPreActiveImage;
let decorImage1, decorImage2, startOverButtonImage;
let doll, shirt, pants, shoes, head;
let finish;
let isOnPlayScreen = true;
let presetNeedReset = false;

const clothingArticles = [ //all clothing articles with their respective info
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
let currentlyWearing = []; //articles currently snapped on doll
let clothingSprites = []; //stores clothing sprite objects
let preset = []; //stores preset articles

function preload() {
	backgroundImage = loadImage("assets/background.png");
	dressupDollImage = loadImage("assets/doll.png");
	finishButtonImage = loadImage("assets/finishbutton.png");
	savePresetButtonImage = loadImage("assets/saveprebutton1.png");
	loadPreInactiveImage = loadImage("assets/loadprenotactive2.png");
	loadPreActiveImage = loadImage("assets/loadpreactive2.png");
	startOverButtonImage = loadImage("assets/startover.png");

	decorImage1 = loadImage("assets/decor1.png");
	decorImage2 = loadImage("assets/decor2.png");

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
	//-------DECOR--------
	decor1 = new Sprite();
	decor1.img = decorImage1;
	decor1.scale = 0.7;
	decor1.position = createVector(200, 350);
	decor1.collider = "none";

	decor2 = new Sprite();
	decor2.img = decorImage2;
	decor2.scale = 0.7;
	decor2.position = createVector(800, 350);
	decor2.collider = "none";	
	// ------BUTTONS-------
	finish = new Sprite();
	finish.img = finishButtonImage;
	finish.position = createVector(190, 50);
	finish.scale = 0.4;
	finish.collider = "static"; //button stays in place, can't be blocked by clothing articles

	savePreset = new Sprite();
	savePreset.img = savePresetButtonImage;
	savePreset.position = createVector(720, 50);
	savePreset.scale = 0.4;
	savePreset.collider = "static"; 

	inactivePreset = new Sprite();
	inactivePreset.img = loadPreInactiveImage;
	inactivePreset.position = createVector(880, 50);
	inactivePreset.scale = 0.4;
	inactivePreset.collider = "static"; 
	
	activePreset = new Sprite();
	activePreset.img = loadPreActiveImage;
	activePreset.position = createVector(880, 50);
	activePreset.scale = 0.4;
	activePreset.collider = "static"; 

	startOver = new Sprite();
	startOver.img = startOverButtonImage;
	startOver.position = createVector(350, 50);
	startOver.scale = 0.4;
	startOver.collider = "static"; 

	startOverFinished = new Sprite();
	startOverFinished.img = startOverButtonImage;
	startOverFinished.position = createVector(190, 50);
	startOverFinished.scale = 0.4;
	startOverFinished.collider = "static"; 
	//----------------------
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

	// overlap fixes so items don't slip and slide during collision-----
	clothingSprites = [shirt, pants, shoes, head];

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
	//----------------------------------------------------------------
}

function draw() { //runs every frame
	background(backgroundImage); // clears canvas every frame (play + finish)

	if (isOnPlayScreen) {

		shirt.visible = true;
		pants.visible = true;
		shoes.visible = true;
		head.visible = true;
		finish.visible = true;
		startOver.visible = true;
		savePreset.visible = true;
		startOverFinished.visible = false;
		finish.collider = "static";
		startOverFinished.collider = "none";

		decor1.visible = false;
		decor2.visible = false;

		if (preset.length == 0) { //checks if preset has anything stored or not, if yes, change the button sprite
			inactivePreset.visible = true;
			activePreset.visible = false;
		} else {
			inactivePreset.visible = false;
			activePreset.visible = true;
		}

		doll.position = createVector(200, 350);

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

		if (savePreset.mouse.pressing()) {
			preset = [...currentlyWearing]; // copy array
		}

		if (activePreset.mouse.pressing()) {
			currentlyWearing = [...preset];

			//snap onto doll
			for (const sprite of clothingSprites) {
				const id = sprite.articleData.id;
				const snap = sprite.articleData.snapPosition;
				const start = sprite.articleData.startPosition;

				if (preset.includes(id)) {
					sprite.position = createVector(snap.x, snap.y);
					sprite.vel.x = 0;
					sprite.vel.y = 0;
				} else {
					sprite.position = createVector(start.x, start.y);
					sprite.vel.x = 0;
					sprite.vel.y = 0;
				}
			}

			//preset.length = 0;
			presetNeedReset = true;
			activePreset.visible = false;
			inactivePreset.visible = true;
		}

		if (startOver.mouse.pressing()) {
			currentlyWearing = [];

			for (const sprite of clothingSprites) {
				const start = sprite.articleData.startPosition;
				sprite.position = createVector(start.x, start.y);
				sprite.vel.x = 0;
				sprite.vel.y = 0;
			}
		}

		if (finish.mouse.pressing()) { // this takes you to the final finish screen

			isOnPlayScreen = false;

		}
	} else {
		doll.position = createVector(200 + 310, 350);
		doll.visible = true;
		finish.visible = false;
		inactivePreset.visible = false;
		activePreset.visible = false;
		savePreset.visible = false;
		startOver.visible = false;
		startOverFinished.visible = true;
		finish.collider = "none";
		startOverFinished.collider = "static";

		decor1.visible = true;
		decor2.visible = true;

		for (const sprite of clothingSprites) {
			const id = sprite.articleData.id;
			const snap = sprite.articleData.snapPosition;

			if (currentlyWearing.includes(id)) {
				sprite.visible = true;
				sprite.position = createVector(snap.x + 310, snap.y);
				sprite.vel.x = 0;
				sprite.vel.y = 0;
			} else {
				sprite.visible = false;
			}
		}

		if (startOverFinished.mouse.pressing()) {
			isOnPlayScreen = true;

			currentlyWearing = [];

			for (const sprite of clothingSprites) {
				const start = sprite.articleData.startPosition;
				sprite.position = createVector(start.x, start.y);
				sprite.vel.x = 0;
				sprite.vel.y = 0;
			}
		}
	}
}

function mouseReleased() {
	if (!isOnPlayScreen) {
		return;
	}

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

	if (presetNeedReset) {
		preset.length = 0;
		presetNeedReset = false;
	}
}

function mousePressed() { //for getting coordinates
  console.log("click:", Math.round(mouseX), Math.round(mouseY));
}