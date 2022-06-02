import { getHistory } from '../../utils/asyncStorage';
import { gameToString, newGame } from '../../utils/game.lib';
import {
  ENTER,
  mode,
  SET_HISTORY,
  START_NEW_DORDLE,
  START_NEW_WORDLE,
} from '../../utils/types';
import { GameAction } from '../types/action.types';
import { GameState } from '../types/state.types';

const initialGameState: GameState = {
  currentGame: [],
  gameHistory: [],
};

export function gameReducer(
  state: GameState = initialGameState,
  action: GameAction
): GameState {
  switch (action.type) {
    case SET_HISTORY:
      return {
        ...state,
        gameHistory: [...action.payload],
      };
    case START_NEW_WORDLE:
      return {
        currentGame: [action.payload],
        gameHistory: [...state.gameHistory, ...state.currentGame],
      };
    case START_NEW_DORDLE:
      return {
        currentGame: [...action.payload],
        gameHistory: [...state.gameHistory, ...state.currentGame],
      };
    case ENTER:
      return {
        ...state,
        gameHistory: [...state.gameHistory, ...action.payload.toHistory],
        currentGame: [...action.payload.games],
      };
    default:
      return { ...state };
  }
}
