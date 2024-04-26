const field = document.querySelector('.gameField');
const fieldRect = field.getBoundingClientRect();

const CARROT_SIZE = 80;

function initGame() {
  // 벌레와 당근을 생성한 뒤 field에 추가해줌
  addItem('carrot', 5, 'img/carrot.png');
  addItem('bug', 5, 'img/bug.png');
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

initGame();

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
