import { gameToString, newGame } from '../../utils/lib';
import {
  ENTER,
  mode,
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
    case START_NEW_WORDLE:
      console.log('game reducer new wordle', gameToString(action.payload));
      
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
