class Player {
    constructor(){
        this.width = 20;
        this.height = 5;

        this.positionX = 50 - (this.width / 2);
        this.positionY = 0;

        this.domElement = null;
        
        this.createDomElement();
    }
 
    createDomElement(){
        // step1: create the element
        this.domElement = document.createElement('div');

        // step2: add content or modify (ex. innerHtml)
        this.domElement.id = 'player';
        // viewpoint width
        this.domElement.style.width = this.width + 'vw';
        // viewpoint height
        this.domElement.style.height = this.height + 'vh';
        this.domElement.style.bottom = this.positionY + 'vh';
        this.domElement.style.left = this.positionX + 'vw';

        // step3: append to the dom: `parentElm.appendChild()`
        const boardElement = document.getElementById('board');
        boardElement.appendChild(this.domElement);
    }
    doSomething() {
    }

    moveLeft() {
        this.positionX = this.positionX - 5;
        this.domElement.style.left = this.positionX + "vw";
    }

    moveRight() {
        this.positionX = this.positionX + 5;
        this.domElement.style.left = this.positionX + "vw";
    }
}

const player = new Player();

document.addEventListener('keydown', (event) => {
    if(event.key === 'ArrowRight') {
        player.moveRight();
    } else if (event.key === 'ArrowLeft') {
        player.moveLeft();
    }
});