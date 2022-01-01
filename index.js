const moves = {
    ArrowRight: 'ArrowRight',
    ArrowLeft: 'ArrowLeft',
    ArrowUp: 'ArrowUp',
    ArrowDown: 'ArrowDown'
};
let snake = [];
let round = 1;
let firstPlay = true;
let snakeHeadPos, score, direction, foodPos, gameInterval;
const movementHandler = (move) => {
    const isMoveValid = (move) => {
        switch (move) {
            case 'ArrowUp':
                {
                    if (Math.floor(snakeHeadPos / 10) < 1 || snake.some(value => value === snakeHeadPos - 10)) return false;
                    snakeHeadPos -= 10;
                    break;
                }
            case 'ArrowDown':
                {
                    if (Math.floor(snakeHeadPos / 10) > 8 || snake.some(value => value === snakeHeadPos + 10)) return false;
                    snakeHeadPos += 10;
                    break;
                }
            case 'ArrowRight':
                {
                    if (snakeHeadPos % 10 > 8 || snake.some(value => value === snakeHeadPos + 1)) return false;
                    snakeHeadPos += 1;
                    break;
                }
            case 'ArrowLeft':
                {
                    if (snakeHeadPos % 10 < 1 || snake.some(value => value === snakeHeadPos - 1)) return false;
                    snakeHeadPos -= 1;
                    break;
                }
            default:
                {}
        }
        direction = move;
        return true;
    }
    if (isMoveValid(move || direction)) {
        snake.unshift(snakeHeadPos);
        classHandler(snakeHeadPos, 'snake', '+');
        if (snakeHeadPos !== foodPos) {
            classHandler(snake.pop(), 'snake');
            return;
        }
        classHandler(snakeHeadPos, 'food');
        scoreBoard.innerText = ++score;
        if (score % 3 === 0) {
            roundBoard.innerText = ++round;
            clearInterval(gameInterval);
            gameInterval = setInterval(movementHandler, 1000 - (round * 50));
        }
        randomFoodPos();
        return;
    }
    ctrlBtn.click();
    alert(`game over you achieved ${score} points`);
    init();
}
window.addEventListener('keydown', (e) => { gameInterval && moves[e.key] && movementHandler(e.key) });
ctrlBtn.addEventListener('click', (e) => {
    if (e.target.innerText === 'START') {
        gameInterval = setInterval(movementHandler, 1000);
        e.target.innerText = 'PAUSE'
        return;
    }
    clearInterval(gameInterval);
    gameInterval = null;
    e.target.innerText = 'START';
});
for (let i = 0; i < 100; i++) {
    playground.innerHTML += `<div class="square" id=${i}></div>`;
}
const classHandler = (node, name, add) => { add ? document.getElementById(node).classList.add(name) : document.getElementById(node).classList.remove(name); }
const randomFoodPos = () => {
    do { foodPos = Math.floor(Math.random() * 100); } while (snake.some((value) => value === foodPos));
    classHandler(foodPos, 'food', '+');
}
const init = () => {
    if (!firstPlay) {
        snake.forEach((value => { classHandler(value, 'snake') }));
        classHandler(foodPos, 'food');
    }
    firstPlay = false;
    direction = 'ArrowRight';
    score = 0;
    scoreBoard.innerText = score;
    round = 1;
    roundBoard.innerText = round;
    snake = [53, 52, 51, 50];
    snakeHeadPos = snake[0];
    snake.forEach((value => { classHandler(value, 'snake', '+') }));
    randomFoodPos();
}
init();