const gameContainer = document.getElementById('game-container');
const paddle = document.getElementById('paddle');
const ball = document.getElementById('ball');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');

let paddleX = (gameContainer.clientWidth - paddle.clientWidth) / 15;
let ballX = Math.random() * (gameContainer.clientWidth - ball.clientWidth);
let ballY = 0;
let ballSpeedY = 2;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

highScoreDisplay.textContent = `High Score: ${highScore}`;

document.addEventListener('mousemove', (e) => {
    movePaddle(e.clientX - gameContainer.getBoundingClientRect().left);
});

document.addEventListener('touchmove', (e) => {
    movePaddle(e.touches[0].clientX - gameContainer.getBoundingClientRect().left);
});

function movePaddle(x) {
    paddleX = x - paddle.clientWidth / 15;
    if (paddleX < 0) paddleX = 0;
    if (paddleX + paddle.clientWidth > gameContainer.clientWidth + 150) {
        paddleX = gameContainer.clientWidth + 150 - paddle.clientWidth;
    }
    paddle.style.left = `${paddleX}px`;
}



function updateBall() {
    ballY += ballSpeedY;
    if (ballY + ball.clientHeight > gameContainer.clientHeight) {

        if (ballX + ball.clientWidth + 45 > paddleX && ballX < paddleX + paddle.clientWidth - 50) {
            paddle.style.backgroundColor = '#bbff00';
            ballY = 0;
            ballX = Math.random() * (gameContainer.clientWidth - ball.clientWidth);
            score++;
            ballSpeedY += 0.5;
            scoreDisplay.textContent = `Score: ${score}`;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore);
                highScoreDisplay.textContent = `High Score: ${highScore}`;
            }
            setTimeout(() => { paddle.style.backgroundColor = '#ff6347'; }, 100);

        } else {
            alert(`Game Over! Your score: ${score}`);
            ballY = 0;
            ballX = Math.random() * (gameContainer.clientWidth - ball.clientWidth);
            ballSpeedY = 2;
            score = 0;
            scoreDisplay.textContent = `Score: ${score}`;
        }
    }
    ball.style.top = `${ballY}px`;
    ball.style.left = `${ballX}px`;
}

function gameLoop() {
    updateBall();
    requestAnimationFrame(gameLoop);
}

gameLoop();
