import {
  colorKeyboard,
  gameToString,
  newGame,
  playGame,
  processInput,
  qwerty,
} from '../../utils/game.lib';
import {
  ENTER,
  FullDefinition,
  Game,
  Letter,
  mode,
  QUIT,
  SET_HISTORY,
  START_NEW_DORDLE,
  START_NEW_WORDLE,
} from '../../utils/types';
import { ActionCreator } from 'redux';
import { GameAction } from '../types/action.types';
import { Dispatch } from 'react';
import { clearInput, openCloseDrawer, updateKeyboard } from './app.actions';
import { retrieveDefinition } from '../../utils/api.requests';
import { getHistory, setHistory } from '../../utils/asyncStorage';
import * as Haptics from 'expo-haptics';
import { useSelector } from 'react-redux';
import { RootState } from '../combineReducer';
const StartNewWordle: ActionCreator<GameAction> = (game: Game) => {
  return {
    type: START_NEW_WORDLE,
    payload: game,
  };
};

export const StartNewDordle: ActionCreator<GameAction> = (games: Game[]) => {
  // console.log('starting new wordle in mode', mode);

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

export const setSavedHistory: ActionCreator<GameAction> = (history: Game[]) => {
  return { type: SET_HISTORY, payload: history };
};
export const quit: ActionCreator<GameAction> = (
) => {
  return {
    type: QUIT,
  };
};


export function dispatchEnter(
  attempt: Letter[],
  currentGame: Game[],
  gameHistory:Game[],
  isDordle: boolean
) {
  return (dispatch: Dispatch<GameAction>) => {
    const isInputOk = processInput(attempt);
    let history: Game[] =[...gameHistory];
    const updatedGame: Game[] = [];


    if (isInputOk) {
      updatedGame[0] = playGame(attempt, currentGame[0]);

      if ((updatedGame[0].numberOfAttempts > 5 || updatedGame[0].guessed) && !findInHistory(currentGame[0].id,history) ) {
        history = [...history, updatedGame[0]];
      }

      if (isDordle) {
        updatedGame[1] = playGame(attempt, currentGame[1]);

        if ((updatedGame[1].numberOfAttempts > 5 || updatedGame[1].guessed)&& !findInHistory(currentGame[1].id,history)) {
          history = [...history, updatedGame[1]];
        }
      }

      const keyboard = colorKeyboard(qwerty, updatedGame[0].lettersUsed);

      const secondKeyboard = isDordle
        ? colorKeyboard(qwerty, updatedGame[1].lettersUsed)
        : undefined;

      dispatch(updateKeyboard(keyboard, secondKeyboard));
    
      
      return dispatch(PressEnter(updatedGame, history));
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    return dispatch(clearInput())
  };
}

export function startGame(
  isWordle: boolean,
  gameMode: mode,
  index?: number,
  secondIndex?: number
) {
  return async (dispatch: Dispatch<GameAction>) => {
    dispatch(updateKeyboard(qwerty, undefined));
    dispatch(openCloseDrawer(false))
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (isWordle) {
      const game = await createGames(gameMode, isWordle, index);
      return dispatch(StartNewWordle(game[0]));
    }
    const game_1 = await createGames(gameMode, isWordle, index, secondIndex);
    return dispatch(StartNewDordle(game_1));
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

const complementGame = (definition: FullDefinition, game: Game): Game => {
  return {
    ...game,
    hint: definition.definition,
    partOfSpeech: definition.partOfSpeech,
    extraInfo: definition.extraInfo,
  };
};
const findInHistory = (id:string, history:Game[]):boolean=>{
  return history.some((game:Game)=> game.id === id)
}