import {
  colorKeyboard,
  newGame,
  playGame,
  processInput,
  qwerty,
} from '../../utils/lib';
import {
  ENTER,
  Game,
  Letter,
  mode,
  START_NEW_DORDLE,
  START_NEW_WORDLE,
} from '../../utils/types';
import { ActionCreator } from 'redux';
import { GameAction } from '../types/action.types';
import { Dispatch } from 'react';
import {
  setClearInput,
  setCursorToStart,
  setUpdateKeyboard,
  toggleDrawer,
} from './app.actions';

export const StartNewWordle: ActionCreator<GameAction> = (
  mode: mode,
  index?: number
) => {
  console.log('start new wordle index', index);
  return {
    type: START_NEW_WORDLE,
    payload: newGame(mode, index),
  };
};

export const StartNewDordle: ActionCreator<GameAction> = ({
  mode,
  index,
  secondIndex,
}: {
  mode: mode;
  index?: number;
  secondIndex?: number;
}) => {
  return {
    type: START_NEW_DORDLE,
    payload: [newGame(mode, index), newGame(mode, secondIndex)],
  };
};

export const PressEnter: ActionCreator<GameAction> = (
  updatedGame: Game[],
  history: Game[]
) => {
  return {
    type: ENTER,
    payload: {
      games: updatedGame,
      toHistory: history,
    },
  };
};

export function dispatchEnter(
  attempt: Letter[],
  currentGame: Game[],
  isDordle: boolean
) {

  return (dispatch: Dispatch<GameAction>) => {
    const isInputOk = processInput(attempt);
    let history: Game[] = [];
    const updatedGame: Game[] = [];

    if (isInputOk) {
      updatedGame[0] = playGame(attempt, currentGame[0]);

      if (updatedGame[0].numberOfAttempts > 5 || updatedGame[0].guessed) {
        history = [...history, updatedGame[0]];
      }

      if (isDordle) {
        updatedGame[1] = playGame(attempt, currentGame[1]);

        if (updatedGame[1].numberOfAttempts > 5 || updatedGame[1].guessed) {
          history = [...history, updatedGame[1]];
        }
      }
    }

    const keyboard = colorKeyboard(qwerty, updatedGame[0].lettersUsed);

    const secondKeyboard = isDordle
      ? colorKeyboard(qwerty, updatedGame[1].lettersUsed)
      : undefined;
    // dispatch(setClearInput());
    dispatch(setUpdateKeyboard(keyboard, secondKeyboard));
    return dispatch(PressEnter(updatedGame, history));
  };
}

export function startGame(
  isWordle: boolean,
  gameMode: mode,
  index?: number,
  secondIndex?: number
) {
  console.log('starting new game');
  return (dispatch: Dispatch<GameAction>) => {

    
    dispatch(toggleDrawer(false));
    dispatch(setUpdateKeyboard(qwerty, undefined));
    isWordle
      ? dispatch(StartNewWordle(gameMode, index))
      : dispatch(StartNewDordle(mode.normal, index, secondIndex));
  };
}
