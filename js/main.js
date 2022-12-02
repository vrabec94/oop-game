class Game {
  constructor() {
      this.player = null;
      this.obstacles = []; //will hold instances of the class Obstacle
  }

  start() {

      this.player = new Player();
      this.attachEventListeners();

      // Create obstacles
      setInterval(() => {
          const newObstacle = new Obstacle();
          this.obstacles.push(newObstacle);
      }, 3000);


      //Update obstacles
      setInterval(() => {
          this.obstacles.forEach((obstacleInstance) => {

              //move current obstacle
              obstacleInstance.moveDown();

              //detect if there's a collision between player and current obstacle
              this.detectCollision(obstacleInstance);

              //check if we need to remove current obstacle
              this.removeObstacleIfOutside(obstacleInstance);
              
          });
      }, 50)
  }

  attachEventListeners() {
      document.addEventListener('keydown', (event) => {
          if (event.key === "ArrowRight") {
              this.player.moveRight();
          } else if (event.key === "ArrowLeft") {
              this.player.moveLeft();
          }
      });
  }

  detectCollision(obstacleInstance){
      if (
          this.player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
          this.player.positionX + this.player.width > obstacleInstance.positionX &&
          this.player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
          this.player.height + this.player.positionY > obstacleInstance.positionY
      ) {
          console.log("collision detected!!");
          // location.href = 'gameover.html';
      }
  }

  removeObstacleIfOutside(obstacleInstance){
      if (obstacleInstance.positionY <= 0 - obstacleInstance.height) {
          obstacleInstance.domElement.remove(); //remove dom element
          this.obstacles.shift(); //remove from the array
      }
  }

}

class Player {
  constructor() {
      this.width = 10;
      this.height = 10;
      this.positionX = 50 - (this.width / 2);
      this.positionY = 0;

      this.domElement = null;
      this.createDomElement();
  }

  createDomElement() {
      // step1: create the element:
      this.domElement = document.createElement('div');

      // step2: add content or modify (ex. innerHTML...)
      this.domElement.id = "player";
      this.domElement.style.width = this.width + "vw";
      this.domElement.style.height = this.height + "vh";
      this.domElement.style.bottom = this.positionY + "vh";
      this.domElement.style.left = this.positionX + "vw";

      //step3: append to the dom: `parentElm.appendChild()`
      const boardElm = document.getElementById("board");
      boardElm.appendChild(this.domElement);
  }

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
      this.positionX = 50 - (this.width / 2);
      this.positionY = 80;

      this.domElement = null;
      this.createDomElement();
  }
  createDomElement() {
      // step1: create the element:
      this.domElement = document.createElement('div');

      // step2: add content or modify (ex. innerHTML...)
      this.domElement.className = "obstacle";
      this.domElement.style.width = this.width + "vw";
      this.domElement.style.height = this.height + "vh";
      this.domElement.style.bottom = this.positionY + "vh";
      this.domElement.style.left = this.positionX + "vw";

      //step3: append to the dom: `parentElm.appendChild()`
      const boardElm = document.getElementById("board");
      boardElm.appendChild(this.domElement);
  }
  moveDown() {
      this.positionY--;
      this.domElement.style.bottom = this.positionY + "vh";
  }
}



const game = new Game();
game.start();

