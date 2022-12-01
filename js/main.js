class Player {
  constructor() {
    this.width = 20;
    this.height = 5;

    this.positionX = 50 - this.width / 2;
    this.positionY = 0;

    this.domElement = null;

    this.createDomElement();
  }

  createDomElement() {
    // step1: create the element
    this.domElement = document.createElement("div");

    // step2: add content or modify (ex. innerHtml)
    this.domElement.id = "player";
    // viewpoint width
    this.domElement.style.width = this.width + "vw";
    // viewpoint height
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.left = this.positionX + "vw";

    // step3: append to the dom: `parentElm.appendChild()`
    const boardElement = document.getElementById("board");
    boardElement.appendChild(this.domElement);
  }
  doSomething() {}

  moveLeft() {
    this.positionX--;
    this.domElement.style.left = this.positionX + "vw";
  }

  moveRight() {
    this.positionX++;
    this.domElement.style.left = this.positionX + "vw";
  }
}

class Obstacle {
  constructor() {
    this.width = 20;
    this.height = 10;
    this.positionX = 50 - this.width / 2;
    this.positionY = 80;

    this.domElement = null;
    this.createDomElement();
  }
  createDomElement() {
    // step1: create the element
    this.domElement = document.createElement("div");

    // step2: add content or modify (ex. innerHtml)
    this.domElement.className = "obstacle";
    // viewpoint width
    this.domElement.style.width = this.width + "vw";
    // viewpoint height
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.left = this.positionX + "vw";

    // step3: append to the dom: `parentElm.appendChild()`
    const boardElement = document.getElementById("board");
    boardElement.appendChild(this.domElement);
  }
  moveDown() {
    this.positionY--;
    this.domElement.style.bottom = this.positionY + "vh";
  }
}

const player = new Player();
const obstacles = [];

// attack event listeners
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    player.moveRight();
  } else if (event.key === "ArrowLeft") {
    player.moveLeft();
  }
});
// create obstacles
setInterval(() => {
  const newObstacle = new Obstacle();
  obstacles.push(newObstacle);
}, 3000);

// move obstacle every 200ms & detect collision
setInterval(() => {
  obstacles.forEach((obstacleInstance) => {
    // move current obstacles
    obstacleInstance.moveDown();

    // detect if there's a collision between player
    // and current obstacle
    // player vs. obstacleInstance
    // collision detection:
    if (
        player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
        player.positionX + player.width > obstacleInstance.positionX &&
        player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
        player.height + player.positionY > obstacleInstance.positionY
    ) {
        console.log("collision detected!!");
    }
  });

  //collision detection
}, 50);

// remove obstacles from array and from dom
// when they reach bottom
