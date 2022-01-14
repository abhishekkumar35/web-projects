const startScreen = document.getElementById("startScreen");
const gameArea = document.getElementById("gameArea");
let score = document.getElementById("score");
let subScore = document.getElementById("subScore");
subScore.textContent = "";
let prevScore = document.getElementById("prevScore");
let resetBtn = document.getElementById("resetBtn");
let gameAreaGeometry;

let player = { shift: 8,shiftcar:10,score:0 };  // shiftcar is for enemyCar, shift is for player.
function resetScore(){
    localStorage.clear("highestScore");
    prevScore.textContent = "";
}

resetBtn.addEventListener("click",resetScore);

startScreen.addEventListener("click", start);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
};
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
    if (Object.keys(keys).includes(e.key)) {
        e.preventDefault();
        keys[e.key] = true;
    }
    // console.log(keys);
}
function keyUp(e) {
    if (Object.keys(keys).includes(e.key)) {
        e.preventDefault();
        keys[e.key] = false;
    }
}

function start() {
    startScreen.classList.add("hide");
    gameArea.textContent = "";

    
    prevScore.textContent = JSON.parse(localStorage.getItem("highestScore"));
    subScore.textContent = "";
    player.score = 0;
    createLines();
    createEnemyCars();

    player.start = true;
    let car = document.createElement("div");
    car.setAttribute("class", "car");
    car.id = "car";
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    gameAreaGeometry = gameArea.getBoundingClientRect();
    console.log(gameAreaGeometry);

    window.requestAnimationFrame(gamePlay);
}

function createLines() {
    for (let x = 0; x < 4; x++) {
        let roadLine = document.createElement("div");
        roadLine.setAttribute("class", "lines");
        roadLine.y = (x * 170);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);

    }
}
function getArbitraryColor(){
    let color = ()=>{
       return  ("0"+ (Math.ceil(Math.random()*255)).toString(16)).substr(-2).toString();
    }
    return "#"+ color()+color()+color();
}
function moveLines() {
    let lines = document.querySelectorAll(".lines");
    lines.forEach(function (item) {
        if (item.y >= 650) {
            item.y -= 700;
        }
        item.y += player.shift;
        item.style.top = item.y + "px";
    })
}
function createEnemyCars() {
    for (let x = 0; x < 4; x++) {

        let enemyCar = document.createElement("div");
        enemyCar.setAttribute("class", "enemyCar");
        enemyCar.y = (x * 170);
        enemyCar.style.backgroundColor = getArbitraryColor();
        console.log(typeof(getArbitraryColor()))
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.left = (Math.floor(Math.random()*348)) + "px";
        gameArea.appendChild(enemyCar);

    }
}
function endGame(){
    player.start = false;
    let brEl = document.createElement("br");
    let pEl = document.createElement("p");
    startScreen.classList.remove("hide");
    startScreen.style.paddingTop = "40px";
    startScreen.textContent =  `Your Score : ${(Number(subScore.textContent)) } `;
    startScreen.appendChild(brEl);
    startScreen.appendChild(pEl)
    pEl.textContent = "Play Again!"
    let subScore_score = JSON.stringify(Number(subScore.textContent));
    let highscore = JSON.parse(localStorage.getItem("highestScore"));

    if(highscore < JSON.parse(subScore_score) || highscore===none){
        localStorage.setItem("highestScore",subScore_score);
    }
    
}

function moveEnemyCars(car){
    let cars = document.querySelectorAll(".enemyCar");
    cars.forEach(function (item) {
        if(isCollide(car,item)){
            endGame();
        }
        
        if (item.y >= 650) {
            item.y -= 700;
            item.style.left = (Math.floor(Math.random()*348)) + "px";
            item.style.backgroundColor = getArbitraryColor();
            console.log(getArbitraryColor());
        }
        item.y += player.shiftcar;
        
        item.style.top = item.y + "px";
    })
}
function isCollide(playerCar,enemyCar){
        rect1 = playerCar.getBoundingClientRect();
        rect2 = enemyCar.getBoundingClientRect();
        return (rect1.left < rect2.left + rect2.width &&
rect1.left + rect1.width > rect2.left &&
rect1.top < rect2.top + rect2.height &&
rect1.height + rect1.top > rect2.top); 
}

function gamePlay() {

    if (player.start) {
    
        let car = document.getElementById("car");
        moveLines();
        moveEnemyCars(car);
        if (keys.ArrowDown && player.y < gameAreaGeometry.height - 200) {
            player.y = player.y + player.shift;
        }
        if (keys.ArrowUp && player.y > 100) {
            player.y = player.y - player.shift;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x = player.x - player.shift;
        }
        if (keys.ArrowRight && player.x < gameAreaGeometry.width - 60) {
            player.x = player.x + player.shift;
        }
        // console.log(player.x);
        // console.log(player.y);
        // console.log(car);

        car.style.left = `${player.x}px`;
        car.style.top = `${player.y}px`;

        
        player.score = player.score + 1;
        subScore.textContent = player.score;
        requestAnimationFrame(gamePlay);
        

    }
}
