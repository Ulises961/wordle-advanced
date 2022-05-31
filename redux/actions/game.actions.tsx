import {
  colorKeyboard,
  newGame,
  playGame,
  processInput,
  qwerty,
  retrieveDefinition,
} from '../../utils/lib';
import {
  Definition,
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
import { isRejectedWithValue } from '@reduxjs/toolkit';

const StartNewWordle: ActionCreator<GameAction> = (game: Game) => {
  return {
    type: START_NEW_WORDLE,
    payload: game,
  };
};

export const StartNewDordle: ActionCreator<GameAction> = (games: Game[]) => {
  console.log('starting new wordle in mode', mode);

  return {
    type: START_NEW_DORDLE,
    payload: games,
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
  return (dispatch: Dispatch<GameAction>) => {
    dispatch(toggleDrawer(false));
    dispatch(setUpdateKeyboard(qwerty, undefined));

    if (isWordle) {
      createGames(gameMode, isWordle, index).then((game) =>
        dispatch(StartNewWordle(game[0]))
      );
    }
    createGames(gameMode, isWordle, index, secondIndex).then((game) =>
      dispatch(StartNewDordle(game))
    );
  };
}

const createGames = async (
  gameMode: mode,
  isWordle: boolean,
  index?: number,
  secondIndex?: number
): Promise<Game[]> => {
  const game = newGame(gameMode, index);
  const completeGameOne = await retrieveDefinition(game.answer).then(
    (definition) => complementGame(definition, game)
  );
  if (isWordle) {
    return [completeGameOne];
  } else {
    const gameTwo = newGame(mode.normal, secondIndex);
    const completeGameTwo = await retrieveDefinition(gameTwo.answer).then(
      (definition) => complementGame(definition, gameTwo)
    );
    return [completeGameOne, completeGameTwo];
  }
};

const complementGame = (definition: Definition, game: Game): Game => {
  return {
    ...game,
    hint: definition.definition,
    partOfSpeech: definition.partOfSpeech,
  };
};
