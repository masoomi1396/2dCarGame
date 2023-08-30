const hero = document.getElementById('Hero');
const enemy = document.getElementById('Enemy');
const boardGame = document.getElementById('Board');
let timeCounter = 0;
let time = 0;
let looseGameFlag = false;
let flagRightEnemy = false;
let flagRightHero = false;
const gameInit = () => {
    let positonX = Math.abs(hero.offsetLeft - enemy.offsetLeft);
    let positonY = Math.abs(hero.offsetTop - enemy.offsetTop);

    if (enemy.offsetTop < 5 && timeCounter <= 0.5) {
        enemyReady();
    }
    if ((flagRightEnemy == flagRightHero) && positonY <= 1) {
        console.log("Postion X : " + positonX);
        console.log("Postion Y : " + positonY);
        console.log("You Loose");
        looseGame();
    }
}
document.addEventListener("keydown", (event) => {
    let name = event.key;
    switch (name) {
        case "ArrowRight":
            hero.style.transform = "translateX(15px)";
            flagRightHero = true;
            break;
        case "ArrowLeft":
            flagRightHero = false;
            hero.style.transform = "translateX(-15px)"
            break;
        default:
            break;
    }
})
const looseGame = () => {
    const box = document.createElement('div');
    const button = document.createElement('h2');
    const text = document.createElement('h3');
    button.innerText = "Restart";
    box.classList = "looseBox";
    button.addEventListener("click", () => {
        location.reload();
    })
    looseGameFlag = true;
    box.append(button);
    boardGame.appendChild(box);
    enemy.remove();
}
const enemyReady = () => {
    const randomNumber = randomIntFromInterval(1, 2);
    const speedOfEnemy = randomIntFromInterval(1, 6);
    enemy.style.animationDuration = `${speedOfEnemy}s`;
    timeCounter = speedOfEnemy;;
    if (randomNumber == 1)
    {
        enemy.style.transform = "translateX(15px) rotateX(180deg)"
        flagRightEnemy = true;
    }       
    else
    {
        flagRightEnemy = false;
        enemy.style.transform = "translateX(-15px) rotateX(180deg)"
    }
        
}
const gameTime = () => {
    time++;
    document.getElementById('Score').innerText = `Score: ${time}`;
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
if (looseGameFlag != true) {
    setInterval(() => { gameTime() }, 1000);
    setInterval(() => { timeCounter--; }, 990);
    setInterval(() => { gameInit() }, 0);
}
