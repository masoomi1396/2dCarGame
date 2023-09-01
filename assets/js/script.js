const enemyCar = document.getElementById('Enemy');
const heroCar = document.getElementById('Hero');
const boardGame = document.getElementById('Board');
const scoreGame = document.getElementById('Score');

let gameOver;
let flagRightHero;
let flagRightEnemy;
let timeGame;
let speed;
let basePostion;
let positoinX;
let positoinY;
let checkSpeed;

const updateSpeed = ()=>{
    if(checkSpeed == speed)
    {
        speed = randomIntFromInterval(2,5);
        checkSpeed=0;
        enemyCar.style.animationDuration = speed + "s";
    }
    else{
        checkSpeed++;
    }
        

}
const gameFirstInit = () => {
    gameOver = false;
    timeGame = 0;
    speed = randomIntFromInterval(2, 6);
    checkSpeed = 0;
    enemyCar.style.animationDuration = "5s";
    basePostion = parseInt(window.screen.width / 2);
    getPositioStylenInit();
}
const getPositioStylenInit = () => {
    heroCar.style.left = basePostion + "px";
    enemyCar.style.transform = "rotateX(180deg) translateX(-50%)";
    enemyCar.style.left = basePostion + "px";
}
const moveOfEnemy = () => {
    const randomNumber = randomIntFromInterval(1, 2);
    let enemyPosition = parseInt(enemyCar.style.left);
    if (randomNumber == 1) {
        if (enemyPosition <= basePostion)
            enemyPosition = moveRight();
        // console.log("Right : " + enemyPosition);
        enemyCar.style.left = enemyPosition + "px";
    }
    else if (randomNumber == 2) {
        if (enemyPosition >= basePostion)
            enemyPosition = moveLeft();
        console.log("Left : " + enemyPosition);
        enemyCar.style.left = enemyPosition + "px";
    }

}
const moveLeft = () => {
    return basePostion - 17;
}
const moveRight = () => {
    return basePostion + 17;
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
const looseGame = () => {
    gameOver = true;

    const div = document.createElement('div');
    const score = document.createElement('h3');
    const button = document.createElement('h2');

    score.innerText = "Score : " + timeGame;
    button.innerText = "Restart";
    div.className = "looseBox";
    scoreGame.innerText = "";

    div.appendChild(score);
    div.appendChild(button);
    boardGame.appendChild(div);

    enemyCar.style.display="none";
    button.addEventListener("click", () => {
        location.reload();
    })

}
function getPostion(Element){
    const {top,left,width,height} = Element.getBoundingClientRect();
    return {x: left+width/2,y:top+height/2};
}
const gameOverChecked = () => {
    let positionHero = getPostion(heroCar);
    let positionEnemy = getPostion(enemyCar);
    if (Math.hypot(positionHero.x - positionEnemy.x,positionHero.y-positionEnemy.y) < 15) {
        looseGame();
    }
}
const updateEnemy = () => {
    if (!gameOver) {
        positoinY = Math.abs(heroCar.offsetTop - enemyCar.offsetTop);
        scoreGame.innerText = "Score: " + timeGame;
        updateSpeed();
        if(positoinY > 15)
            moveOfEnemy();
    }
}

gameFirstInit()
setInterval(gameOverChecked, 10);
setInterval(() => {
    timeGame++;
    document.addEventListener("keydown", (event) => {
        if (event.key == 'ArrowLeft') {
            heroCar.style.left = moveLeft() + "px";
        }
        if (event.key == 'ArrowRight') {
            heroCar.style.left = moveRight() + "px";
        }
        
    })
    updateEnemy();
}, 1000);