'use strict';
import PopUp from './popup.js';
import GameBuilder from './game.js';

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

const game = new GameBuilder()
  .WithGameDuration(10)
  .WithCarrotCount(7)
  .WithBugCount(7)
  .build();

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
