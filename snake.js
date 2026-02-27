// Create sound effects using Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playEatSound() {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.frequency.setValueAtTime(600, audioContext.currentTime);
  osc.frequency.setValueAtTime(800, audioContext.currentTime + 0.1);
  gain.gain.setValueAtTime(0.3, audioContext.currentTime);
  gain.gain.setValueAtTime(0, audioContext.currentTime + 0.1);
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.1);
}

function playGameOverSound() {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.frequency.setValueAtTime(400, audioContext.currentTime);
  osc.frequency.setValueAtTime(200, audioContext.currentTime + 0.5);
  gain.gain.setValueAtTime(0.3, audioContext.currentTime);
  gain.gain.setValueAtTime(0, audioContext.currentTime + 0.5);
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.5);
}

const canvas = document.getElementById('game');
const ctx    = canvas.getContext('2d');
const size   = 40;             // grid cell size
const cols   = canvas.width/size;
const rows   = canvas.height/size;

// Ask for player name
let userName = 'Player';
let gameStarted = false;

function startGame() {
  const nameInput = document.getElementById('playerName');
  userName = nameInput.value.trim() || 'Player';
  document.getElementById('nameInputContainer').style.display = 'none';
  
  // Show mobile controls if on mobile
  if (window.innerWidth <= 1024) {
    document.querySelectorAll('#controls').forEach(ctrl => ctrl.style.display = 'flex');
  }
  
  gameStarted = true;
  loop();
}

// Mobile touch controls
let touchStartX = 0;
let touchStartY = 0;

function moveUp() {
  if (dir.y === 0) dir = {x:0, y:-1};
}

function moveDown() {
  if (dir.y === 0) dir = {x:0, y:1};
}

function moveLeft() {
  if (dir.x === 0) dir = {x:-1, y:0};
}

function moveRight() {
  if (dir.x === 0) dir = {x:1, y:0};
}

// Touch/Swipe detection
document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].screenX;
  const touchEndY = e.changedTouches[0].screenY;
  
  const diffX = touchEndX - touchStartX;
  const diffY = touchEndY - touchStartY;
  const threshold = 50;
  
  // Determine swipe direction
  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > threshold) moveRight();
    else if (diffX < -threshold) moveLeft();
  } else {
    if (diffY > threshold) moveDown();
    else if (diffY < -threshold) moveUp();
  }
}, false);

let snake = [
  {x:5,y:5},
  {x:4,y:5},
  {x:3,y:5}
];       // initial snake with 3 segments
let dir   = {x:1,y:0};         // moving right
let obstacles = [
  {x:2,y:2},
  {x:8,y:4},
  {x:6,y:7},
  {x:12,y:3},
  {x:15,y:9},
  {x:4,y:12},
  {x:10,y:15},
  {x:18,y:12},
  {x:3,y:18},
  {x:14,y:6},
  {x:7,y:14},
  {x:1,y:10}
];       // obstacle positions - more trees throughout the board
let apple = randomPos();
let gameOver = false;

// game loop
function loop() {
  if (!gameStarted) return;
  if (gameOver) {
    playGameOverSound();
    document.getElementById('finalMessage').textContent = userName + ', your score is ' + (snake.length-1);
    document.getElementById('gameOverScreen').style.display = 'flex';
    return;
  }
  update();
  draw();
  setTimeout(loop, 350);
}

function update() {
  // move head
  const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};
  // wall & self collisions
  if (head.x < 0 || head.x >= cols ||
      head.y < 0 || head.y >= rows ||
      snake.some(s => s.x===head.x && s.y===head.y) ||
      obstacles.some(o => o.x===head.x && o.y===head.y)) {
    gameOver = true;
    return;
  }
  snake.unshift(head);
  // eat apple?
  if (head.x === apple.x && head.y === apple.y) {
    playEatSound();
    apple = randomPos();
  } else {
    snake.pop();              // remove tail
  }
}

function draw() {
  ctx.fillStyle = '#FFF8DC';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // update score display
  document.getElementById('score').textContent = 'Score: ' + (snake.length - 1);

  // draw apple with shine
  ctx.fillStyle = '#FF4500';
  ctx.beginPath();
  ctx.arc(apple.x*size + size/2, apple.y*size + size/2, size/2.2, 0, Math.PI*2);
  ctx.fill();
  // apple shine
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.arc(apple.x*size + size/3.5, apple.y*size + size/3.5, size/8, 0, Math.PI*2);
  ctx.fill();

  // draw obstacles (trees)
  obstacles.forEach(o => {
    // draw tree trunk (brown)
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(o.x*size + size/3.5, o.y*size + size/1.8, size/3.5, size/2.2);
    
    // draw tree foliage - main circle
    ctx.fillStyle = '#2d5016';
    ctx.beginPath();
    ctx.arc(o.x*size + size/2, o.y*size + size/3, size/2.3, 0, Math.PI*2);
    ctx.fill();
    
    // draw tree foliage - secondary circle (upper)
    ctx.fillStyle = '#3a6b2a';
    ctx.beginPath();
    ctx.arc(o.x*size + size/2, o.y*size + size/5, size/2.5, 0, Math.PI*2);
    ctx.fill();
    
    // draw tree foliage - side circles for fullness
    ctx.fillStyle = '#228B22';
    ctx.beginPath();
    ctx.arc(o.x*size + size/4, o.y*size + size/2.5, size/2.8, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(o.x*size + 3*size/4, o.y*size + size/2.5, size/2.8, 0, Math.PI*2);
    ctx.fill();
    
    // tree highlight
    ctx.fillStyle = '#50C878';
    ctx.beginPath();
    ctx.arc(o.x*size + size/2.5, o.y*size + size/3.5, size/5.5, 0, Math.PI*2);
    ctx.fill();
  });

  // draw snake
  snake.forEach((s,i) => {
    if (i === 0) {
      // draw head with gradient and eyes
      ctx.fillStyle = '#6A0DAD';
      ctx.beginPath();
      ctx.arc(s.x*size + size/2, s.y*size + size/2, size/2.2, 0, Math.PI*2);
      ctx.fill();
      // draw eyes
      ctx.fillStyle = '#FFFF00';
      ctx.beginPath();
      ctx.arc(s.x*size + size/3, s.y*size + size/3, size/8, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(s.x*size + 2*size/3, s.y*size + size/3, size/8, 0, Math.PI*2);
      ctx.fill();
      // eye pupils
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(s.x*size + size/3, s.y*size + size/3, size/16, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(s.x*size + 2*size/3, s.y*size + size/3, size/16, 0, Math.PI*2);
      ctx.fill();
    } else {
      // draw body segments with rounded appearance
      ctx.fillStyle = i % 2 === 0 ? '#8B00FF' : '#A020F0';
      ctx.beginPath();
      ctx.arc(s.x*size + size/2, s.y*size + size/2, size/2.5, 0, Math.PI*2);
      ctx.fill();
    }
  });
}

function randomPos() {
  let pos;
  let isValid = false;
  
  // Keep generating positions until we find one that's not on obstacles or snake
  while (!isValid) {
    pos = { x: Math.floor(Math.random()*cols), y: Math.floor(Math.random()*rows) };
    
    // Check if position is on an obstacle
    const onObstacle = obstacles.some(o => o.x === pos.x && o.y === pos.y);
    // Check if position is on the snake
    const onSnake = snake.some(s => s.x === pos.x && s.y === pos.y);
    
    if (!onObstacle && !onSnake) {
      isValid = true;
    }
  }
  
  return pos;
}

// input
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp'    && dir.y===0) dir = {x:0,y:-1};
  if (e.key === 'ArrowDown'  && dir.y===0) dir = {x:0,y:1};
  if (e.key === 'ArrowLeft'  && dir.x===0) dir = {x:-1,y:0};
  if (e.key === 'ArrowRight' && dir.x===0) dir = {x:1,y:0};
});

loop();