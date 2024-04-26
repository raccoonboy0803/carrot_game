const field = document.querySelector('.gameField');
const fieldRect = field.getBoundingClientRect();
const startButton = document.querySelector('.gameButton');
const gameTimer = document.querySelector('.gameTimer');
const gameScore = document.querySelector('.gameScore');
const popUp = document.querySelector('.popUp');
const popUpText = popUp.querySelector('.popUpMessage');
const popUpRefresh = popUp.querySelector('.popUpRefresh');

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches('.carrot')) {
    target.remove();
    playSound(carrotSound);
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches('.bug')) {
    stopGameTimer();
    playSound(bugSound);
    finishGame(false);
    stopSound(bgSound);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound) {
  sound.pause();
}

function finishGame(win) {
  if (win === true) {
    playSound(winSound);
  }
  stopSound(bgSound);
  started = false;
  startButton.classList.add('btnHidden');
  popUpText.innerText = win ? 'YOU WON ' : 'YOU LOSE ';
  popUp.classList.remove('popUp--hide');
  stopGameTimer(timer);
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

startButton.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popUpRefresh.addEventListener('click', () => {
  startGame();
  score = 0;
  popUp.classList.add('popUp--hide');
  showStartButton();
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  startButton.classList.add('btnHidden');
  popUp.classList.remove('popUp--hide');
  popUpText.innerText = 'Replay?';
  stopSound(bgSound);
}

function showStopButton() {
  const icon = startButton.querySelector('.fa-solid');
  icon.classList.remove('fa-play');
  icon.classList.add('fa-stop');
}
function showStartButton() {
  const icon = startButton.querySelector('.fa-solid');
  icon.classList.add('fa-play');
  icon.classList.remove('fa-stop');
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
      if (started) {
        finishGame(CARROT_COUNT === score);
        return;
      }
    }

    updateTimerText(--remainSecond);

    if (remainSecond <= 3) {
      playSound(alertSound);
    }
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function initGame() {
  field.innerHTML = '';
  gameScore.innerText = CARROT_COUNT;
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE - 40;

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
  return Math.floor(Math.random() * (max - min));
}

function startTimer() {}
