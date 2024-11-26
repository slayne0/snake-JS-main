const gameContainer = document.getElementById("gameContainer");
const speedDisplay = document.getElementById("speedDisplay");
const scoreDisplay = document.getElementById("score");
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let apple = { x: 5, y: 5 };
let direction = { x: 0, y: 0 };
let speed = 200;
let game = false;
let keys_pressed = [];

function createGrid() {
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    gameContainer.appendChild(cell);
  }
}

function draw() {
  gameContainer.childNodes.forEach((cell) => {
    cell.className = "";
  });
  gameContainer.childNodes[apple.y * 20 + apple.x].classList.add("apple");
  for (let i = 0; i < snake.length - 1; i++) {
    gameContainer.childNodes[snake[i].y * 20 + snake[i].x].classList.add(
      "snake"
    );
  }
  gameContainer.childNodes[
    snake[snake.length - 1].y * 20 + snake[snake.length - 1].x
  ].classList.add("snake-head");
}

function gameOver() {
  alert(`Game Over\nscore: ${snake.length - 1}\nspeed: ${Math.floor(speed)}`);
  snake = [{ x: 10, y: 10 }];
  apple = { x: 5, y: 5 };
  direction = { x: 0, y: 0 };
  game = false;
  speed = 200;
}

function update() {
  if (!game) {
    return;
  }

  if (keys_pressed.length > 0) {
    key = keys_pressed[0];
    keys_pressed.shift();
    console.log(key);
    switch (key) {
      case "z":
        if (direction.y === 0) direction = { x: 0, y: -1 };
        break;
      case "s":
        if (direction.y === 0) direction = { x: 0, y: 1 };
        break;
      case "q":
        if (direction.x === 0) direction = { x: -1, y: 0 };
        break;
      case "d":
        if (direction.x === 0) direction = { x: 1, y: 0 };
        break;
    }
  }

  const head = snake[snake.length - 1];
  const newHead = { x: head.x + direction.x, y: head.y + direction.y };
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === newHead.x && snake[i].y === newHead.y) {
      gameOver();
      return;
    }
  }

  if (
    gridSize - 1 < newHead.x ||
    newHead.x < 0 ||
    gridSize - 1 < newHead.y ||
    newHead.y < 0
  ) {
    gameOver();
    return;
  }

  snake.push(newHead);
  if (newHead.x !== apple.x || newHead.y !== apple.y) {
    snake.shift();
  } else {
    console.log((gridSize * gridSize - snake.length) / (gridSize * gridSize));
    speed = speed - speed * 0.04 * ((gridSize * gridSize - snake.length) / (gridSize * gridSize));
    speedDisplay.textContent = Math.floor(speed);
    scoreDisplay.textContent = snake.length - 1;
    apple.x = Math.floor(Math.random() * gridSize);
    apple.y = Math.floor(Math.random() * gridSize);
  }
}

function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, speed);
}

function handleKey(event) {
  if (!game) {
    game = true;
  }
  keys_pressed.push(event.key);
}

document.addEventListener("keydown", handleKey);
createGrid();
gameLoop();
