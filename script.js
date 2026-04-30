let winWidth = 1000;
let winHeight = 700;

let backgroundImage;
let dressupDollImage, shirtImage, pantsImage, shoesImage, earmuffsImage;

let doll, shirt, pants, shoes, earmuffs;

let headVector, torsoVector, legsVector, feetVector;

function preload(){
    backgroundImage = loadImage('/assets/background.png');
    dressupDollImage = loadImage('/assets/doll.png');
    shirtImage = ('/assets/shirt.png');
    pantsImage = ('/assets/pants.png');
    shoesImage = ('/assets/shoes.png');
    earmuffsImage = ('/assets/earmuffs.png');
}

function setup() {
  let canvas = createCanvas(winWidth, winHeight);
  
  image (backgroundImage, 0, 0);
  allSprites.rotationLock = true;
  

  doll = new Sprite();
  doll.image = dressupDollImage;
  doll.scale = 0.5; 
  doll.position  = createVector(200, 350);
  doll.collider = 'none';

  shirt = new Sprite();
  shirt.image = shirtImage;
  shirt.scale = 0.5; 
  shirt.position  = createVector(500, 100);
  shirt.drag = 10;

  pants = new Sprite();
  pants.image = pantsImage;
  pants.scale = 0.5; 
  pants.position  = createVector(500, 350);

  shoes = new Sprite();
  shoes.image = shoesImage;
  shoes.scale = 0.5; 
  shoes.position  = createVector(500, 600);

  earmuffs = new Sprite();
  earmuffs.image = earmuffsImage;
  earmuffs.scale = 0.5; 
  earmuffs.position  = createVector(700, 300);

  torsoVector = createVector(191, 207);

}

function draw() {

    background(backgroundImage);

    console.log(`x: ${mouseX}  y: ${mouseY}`);

    if (shirt.mouse.dragging()) {
        shirt.moveTowards(
            mouse.x + shirt.mouse.x,
            mouse.y + shirt.mouse.y,
            1 // a lower number will track the mouse slower
        );
    }

    if (dist(shirt.x,shirt.y,torsoVector.x,torsoVector.y) < 10) {
        shirt.position = torsoVector;
    } else { 
       shirt.position = createVector(500, 100);
    }
}