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
let gameDurationInProcess;
let positoinX;
let positoinY;

const gameFirstInit = () => {
    gameOver = false;
    flagRightHero = true;
    flagRightEnemy = false;
    timeGame = 0;
    speed = randomIntFromInterval(2, 6);
    gameDurationInProcess = speed;
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
    enemyCar.style.animationDuration = speed + "s";
    if (randomNumber == 1) {
        if (enemyPosition <= basePostion)
            enemyPosition = moveRight();
        console.log("Right : " + enemyPosition);
        enemyCar.style.left = enemyPosition + "px";
    }
    else if (randomNumber == 2) {
        if (enemyPosition >= basePostion)
            enemyPosition = moveLeft();
        console.log("Left : " + enemyPosition);
        enemyCar.style.left = enemyPosition + "px";
    }
    else {
        console.log("Erorr_1_Enemy");
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

    enemyCar.remove();
    button.addEventListener("click", () => {
        location.reload();
    })

}
const gameOverChecked = ()=>{
    positoinX = Math.abs(parseInt(heroCar.offsetLeft) - parseInt(enemyCar.offsetLeft));
    positoinY = Math.abs(heroCar.offsetTop - enemyCar.offsetTop);
    if (positoinX < 5 && positoinY < 5) {
        looseGame();
    }
}
const updateEnemy = () => {
    if (!gameOver) {
        scoreGame.innerText = "Score: "+timeGame;
        if (gameDurationInProcess <= 0) {
            speed = randomIntFromInterval(2, 6);
            gameDurationInProcess = speed;

            moveOfEnemy();
        }
    }
}
gameFirstInit()
setInterval(gameOverChecked,0)
setInterval(() => {
    
    gameDurationInProcess--;
    timeGame++;
    document.addEventListener("keydown", (event) => {
        if (event.key == 'ArrowLeft') {
            heroCar.style.left = moveLeft() + "px";
        }
        if (event.key == 'ArrowRight') {
            heroCar.style.left = moveRight() + "px";
        }
    })
}, 1000);
setInterval(() => {
    updateEnemy();
}, 0);