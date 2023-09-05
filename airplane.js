const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext('2d');
const scoreContainer = document.getElementById("score");
const resetButton = document.getElementById("resetGame");
const gameOverConatiner = document.getElementById("gameOver");

resetButton.addEventListener("click", resetGame);

canvas.width = 800;
canvas.height = 800;

const airplane = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    speed: 15
};

const enemies = [];
const bullets = [];

let score = 0;
scoreContainer.innerHTML = "Score: " + score;

let gameOver = false;

setInterval(() => {
    const enemy = {
        x: Math.random() * (canvas.width - 20),
        y: 0,
        width: 20,
        height: 20,
        speed: 2
    };
    enemies.push(enemy);
}, 1000);


function drawAirplane() {

    ctx.beginPath();

    ctx.moveTo(airplane.x,airplane.y - 70);
    ctx.lineTo(airplane.x - 5, airplane.y - 60);
    ctx.moveTo(airplane.x,airplane.y - 70);
    ctx.lineTo(airplane.x + 5, airplane.y - 60);
    
    //left part
    ctx.moveTo(airplane.x - 5,airplane.y - 60);
    ctx.lineTo(airplane.x - 5,airplane.y - 40);
    ctx.moveTo(airplane.x - 5,airplane.y - 40);
    ctx.lineTo(airplane.x - 39,airplane.y - 25);
    ctx.moveTo(airplane.x - 39,airplane.y - 25);
    ctx.lineTo(airplane.x - 39,airplane.y - 18);
    ctx.moveTo(airplane.x - 39,airplane.y - 18);
    ctx.lineTo(airplane.x - 3,airplane.y - 25);
    ctx.moveTo(airplane.x - 3,airplane.y - 25);
    ctx.lineTo(airplane.x - 3,airplane.y - 5);
    
    //right part
    ctx.moveTo(airplane.x + 5,airplane.y - 60);
    ctx.lineTo(airplane.x + 5,airplane.y - 40);
    ctx.moveTo(airplane.x + 5,airplane.y - 40);
    ctx.lineTo(airplane.x + 39,airplane.y - 25);
    ctx.moveTo(airplane.x + 39,airplane.y - 25);
    ctx.lineTo(airplane.x + 39,airplane.y - 18);
    ctx.moveTo(airplane.x + 39,airplane.y - 18);
    ctx.lineTo(airplane.x + 3,airplane.y - 25);
    ctx.moveTo(airplane.x + 3,airplane.y - 25);
    ctx.lineTo(airplane.x + 3,airplane.y - 5);
    
    //tail left
    ctx.moveTo(airplane.x - 3,airplane.y - 5);
    ctx.lineTo(airplane.x - 14,airplane.y + 2);
    ctx.moveTo(airplane.x - 14,airplane.y + 2);
    ctx.lineTo(airplane.x - 14,airplane.y + 5);
    ctx.moveTo(airplane.x - 14,airplane.y + 5);
    ctx.lineTo(airplane.x - 3,airplane.y + 3);
    
    //right tail
    ctx.moveTo(airplane.x + 3,airplane.y - 5);
    ctx.lineTo(airplane.x + 14,airplane.y + 2);
    ctx.moveTo(airplane.x + 14,airplane.y + 2);
    ctx.lineTo(airplane.x + 14,airplane.y + 5);
    ctx.moveTo(airplane.x + 14,airplane.y + 5);
    ctx.lineTo(airplane.x + 3,airplane.y + 3);
    
    //center tail
    ctx.moveTo(airplane.x - 3,airplane.y + 3);
    ctx.lineTo(airplane.x - 1,airplane.y + 6);
    ctx.moveTo(airplane.x + 3,airplane.y + 3);
    ctx.lineTo(airplane.x + 1,airplane.y + 6);
    ctx.moveTo(airplane.x - 1,airplane.y + 6);
    ctx.lineTo(airplane.x + 1,airplane.y + 6);
    ctx.stroke();

}


function game() {

    if(!gameOver){

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawAirplane();

        ctx.fillStyle = 'red';
        for (let enemy of enemies) {
            enemy.y += enemy.speed;
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        }

        ctx.fillStyle = 'blue';
        for (let bullet of bullets) {
            bullet.y -= 5;
            ctx.fillRect(bullet.x, bullet.y, 4, 10);
        }

        for (let enemy of enemies) {
            for (let bullet of bullets) {
                if (
                    bullet.x < enemy.x + enemy.width &&
                    bullet.x + 4 > enemy.x && 
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + 10 > enemy.y
                ) {
                    score++;
                    scoreContainer.innerHTML = "Score: " + score;
                    for (let i = 0; i < enemies.length; ++i) {
                        if (enemies[i] == enemy) {
                            enemies.splice(i, 1);
                        }
                    }
                    for (let i = 0; i < bullets.length; ++i) {
                        if (bullets[i] == bullet) {
                            bullets.splice(i, 1);
                        }
                    }
                }
            }
        }

        for (let enemy of enemies) {
            if (
                airplane.x - 39 < enemy.x + enemy.width &&
                airplane.x + 72 > enemy.x &&
                airplane.y - 70 < enemy.y + enemy.height &&
                airplane.y + 76 > enemy.y
            ) {
                gameOver = true;
                gameOverConatiner.innerHTML = "GAME OVER!";
                ctx.clearRect(airplane.x - 40, airplane.y - 70, 80, 80);
            }
        }
        //the airplane is treated like it is contained in a transparent square 
    }
    requestAnimationFrame(game);
}

window.addEventListener('keydown', e => {
    if (e.key == 'ArrowLeft') {
        airplane.x -= airplane.speed;
        if (airplane.x + 39 < 0) {
            airplane.x = canvas.width;
        }
    } else if (e.key == 'ArrowRight') {
        airplane.x += airplane.speed;
        if (airplane.x + 39 > canvas.width) {
            airplane.x = - 39;
        }
    } else if (e.key == ' ') {
        bullets.push({x: airplane.x - 39, y: airplane.y - 30}, {x: airplane.x + 39, y: airplane.y - 30});
    }
});

game();

function resetGame() {
    score = 0;
    gameOver = false;
    scoreContainer.innerHTML = "Score: " + score;
    enemies.splice(0, enemies.length);
    bullets.splice(0, bullets.length);
    gameOverConatiner.innerHTML = "";
}
