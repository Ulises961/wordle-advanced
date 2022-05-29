import {
  colorKeyboard,
  newGame,
  playGame,
  processInput,
  querty,
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
import { toggleDrawer } from './app.actions';

export const StartNewWordle: ActionCreator<GameAction> = ({
  mode,
  index,
}: {
  mode: mode;
  index?: number;
}) => {
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
  keyboard: Letter[],
  history?: Game[],
  secondKeyboard?: Letter[]
) => {
  return {
    type: ENTER,
    payload: {
      games: updatedGame,
      toHistory: history,
      keyboard: keyboard,
      secondKeyboard: secondKeyboard,
    },
  };
};

export function dispatchEnter(
  attempt: Letter[],
  currentGame: Game[],
  isDordle: boolean
) {
  return (dispatch:Dispatch<GameAction>) => {
    const isInputOk = processInput(attempt);
    let history: Game[] = [];
    const updatedGame = [...currentGame];

    if (isInputOk) {
      updatedGame[0] = playGame(attempt, updatedGame[0]);

      if (updatedGame[0].numberOfAttempts > 5 || updatedGame[0].guessed) {
        history = [...history, updatedGame[0]];
      }

      if (isDordle) {
        updatedGame[1] = playGame(attempt, updatedGame[1]);

        if (updatedGame[1].numberOfAttempts > 5 || updatedGame[1].guessed) {
          history = [...history, updatedGame[1]];
        }
      }
    }

    const keyboard = colorKeyboard(querty, updatedGame[0].lettersUsed);
    const secondKeyboard = isDordle
      ? colorKeyboard(querty, updatedGame[1].lettersUsed)
      : undefined;
    dispatch(keyboard, secondKeyboard);
    return dispatch(PressEnter(updatedGame, history, keyboard, secondKeyboard));
  };
}

export function startGame(isDordle:boolean, index?:number, secondIndex?:number){
  return (dispatch:Dispatch<GameAction>)=>{
  dispatch(toggleDrawer(false))
  isDordle? 
  dispatch(StartNewDordle(index, secondIndex)):
  dispatch(StartNewWordle(index))
}

}