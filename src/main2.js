'use strict';
import PopUp from './popup.js';
import Game from './game.js';

// const CARROT_COUNT = 20;
// const BUG_COUNT = 20;
// const GAME_DURATION_SEC = 20;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

const game = new Game(5, 2, 2);
game.setGameStopListener((reason) => {
  console.log(reason);
  let message;
  switch (reason) {
    case 'cancel':
      message = 'Replay❓';
      break;
    case 'win':
      message = 'You Win 👍';
      break;
    case 'lose':
      message = 'You Lose 😂';
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});
