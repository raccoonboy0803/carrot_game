'use strict';
import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as sound from './sound.js';

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
      sound.playAlert();
      break;
    case Reason.win:
      message = 'You Win 👍';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'You Lose 😂';
      sound.playBug();
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});
