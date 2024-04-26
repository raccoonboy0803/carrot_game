const field = document.querySelector('.gameField');
const fieldRect = field.getBoundingClientRect();
const startButton = document.querySelector('.gameButton');
const gameTimer = document.querySelector('.gameTimer');
const gameScore = document.querySelector('.gameScore');

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

let started = false;
let score = 0;
let timer = undefined;

startButton.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

function startGame(params) {
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function stopGame(params) {}

function showStopButton() {
  const icon = startButton.querySelector('.fa-play');
  icon.classList.remove('fa-play');
  icon.classList.add('fa-stop');
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainSecond = GAME_DURATION_SEC;
  updateTimerText(remainSecond);

  timer = setInterval(() => {
    if (remainSecond === 0) {
      clearInterval(timer);
      return;
    }
    updateTimerText(--remainSecond);
  }, 1000);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}
console.log('test::', Math.floor(5 / 60));

function initGame() {
  field.innerHTML = '';
  // const imgs = field.querySelectorAll('img');
  // imgs.forEach((img) => {
  //   img.remove();
  // });
  gameScore.innerText = CARROT_COUNT;
  // 벌레와 당근을 생성한 뒤 field에 추가해줌
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startTimer() {}
