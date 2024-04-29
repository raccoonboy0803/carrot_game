'use strict';
import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';

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
  let message;
  switch (reason) {
    case Reason.cancel:
      message = 'Replay❓';
      break;
    case Reason.win:
      message = 'You Win 👍';
      break;
    case Reason.lose:
      message = 'You Lose 😂';
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});
