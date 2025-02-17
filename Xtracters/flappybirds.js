const bird = document.getElementById('bird');
const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');

let birdY = 300;
let velocity = 0;
let gravity = 0.5;
let isGameOver = false;
let score = 0;
let pipes = [];
let gameLoop;
let pipeLoop;

// Constants for better maintainability
const JUMP_FORCE = -8;
const PIPE_SPEED = 2;
const PIPE_GAP = 150;
const PIPE_WIDTH = 60;
const BIRD_SIZE = 40;

function jump() {
    if (isGameOver) return;
    velocity = JUMP_FORCE;
}

function updateGame() {
    if (isGameOver) return;

    // Update bird physics
    velocity += gravity;
    birdY += velocity;
    birdY = Math.max(0, Math.min(birdY, gameContainer.offsetHeight - BIRD_SIZE));
    bird.style.top = ${birdY}px;

    // Update pipes
    pipes.forEach((pipe, index) => {
        pipe.x -= PIPE_SPEED;
        pipe.element.style.left = ${pipe.x}px;

        // Remove off-screen pipes
        if (pipe.x < -PIPE_WIDTH) {
            pipe.element.remove();
            pipes.splice(index, 1);
        }

        // Check collisions
        if (!pipe.passed && pipe.x + PIPE_WIDTH < bird.offsetLeft) {
            score++;
            scoreElement.textContent = score;
            pipe.passed = true;
        }

        if (checkCollision(bird.getBoundingClientRect(), pipe.element.getBoundingClientRect())) {
            gameOver();
        }
    });

    // Check boundaries
    if (birdY <= 0 || birdY >= gameContainer.offsetHeight - BIRD_SIZE) {
        gameOver();
    }
}

function checkCollision(birdRect, pipeRect) {
    return !(birdRect.right < pipeRect.left || 
            birdRect.left > pipeRect.right || 
            birdRect.bottom < pipeRect.top || 
            birdRect.top > pipeRect.bottom);
}

function createPipe() {
    if (isGameOver) return;

    const gapPosition = Math.random() * (gameContainer.offsetHeight - PIPE_GAP - 100);
    const pipePair = document.createElement('div');
    
    // Create pipe pair
    pipePair.innerHTML = `
        <div class="pipe" style="height: ${gapPosition}px; top: 0; left: 100%;"></div>
        <div class="pipe" style="height: ${gameContainer.offsetHeight - gapPosition - PIPE_GAP}px; bottom: 0; left: 100%;"></div>
    `;

    gameContainer.appendChild(pipePair);
    
    pipes.push({
        element: pipePair,
        x: gameContainer.offsetWidth,
        passed: false
    });
}

function gameOver() {
    isGameOver = true;
    clearInterval(gameLoop);
    clearInterval(pipeLoop);
    pipes.forEach(pipe => pipe.element.remove());
    setTimeout(() => alert(Game Over! Score: ${score}\nClick OK to restart), 10);
    resetGame();
}

function resetGame() {
    birdY = 300;
    velocity = 0;
    score = 0;
    pipes = [];
    isGameOver = false;
    scoreElement.textContent = '0';
    bird.style.top = '300px';
    gameLoop = setInterval(updateGame, 20);
    pipeLoop = setInterval(createPipe, 1500);
}

// Event listeners
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') jump();
});
document.addEventListener('click', jump);

// Start game
resetGame();