import { ENTER, START_NEW_DORDLE, START_NEW_WORDLE } from '../../utils/types';
import { GameAction } from '../types/action.types';
import { GameState } from '../types/state.types';

const initialGameState: GameState = {
  currentGame: [undefined],
  gameHistory: [],
  isDordle: false,
};

export function reducer(
  state: GameState = initialGameState,
  action: GameAction
): GameState {
  switch (action.type) {
    case START_NEW_WORDLE:
      return {
        currentGame: [action.payload],
        gameHistory: [...state.gameHistory, ...state.currentGame],

        isDordle: false,
      };
    case START_NEW_DORDLE:
      return {
        currentGame: [...action.payload],
        gameHistory: [...state.gameHistory, ...state.currentGame],
        isDordle: true,
      };
    case ENTER:
      const toHistory = action.payload.toHistory
        ? [...action.payload.toHistory]
        : [undefined];
      return {
        ...state,
        gameHistory: [...state.gameHistory, ...toHistory],
        currentGame: [...action.payload.games],
      };
    default:
      return { ...state };
  }
}