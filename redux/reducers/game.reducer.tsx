import {
  CLOSE_VIEW,
  ENTER,
  START_NEW_DORDLE,
  START_NEW_WORDLE,
} from '../../utils/types';
import {
  GameAction,
  PressEnterAction,
  DeleteLetterAction,
  InsertLetterAction,
  StartNewDordleAction,
  StartNewWordleAction,
  CloseDrawerAction,
  CloseSettingAction,
} from '../types/action.types';
import { GameState } from '../types/game.types';

const initialGameState: GameState = {
  currentGame: [undefined],
  gameHistory: [],
  keyboard: [],
  secondKeyboard: undefined,
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
        keyboard: [],
        isDordle: false,
      };
    case START_NEW_DORDLE:
      return {
        currentGame: [...action.payload],
        gameHistory: [...state.gameHistory, ...state.currentGame],
        keyboard: [],
        secondKeyboard: [],
        isDordle: true,
      };
    case ENTER:
      const secondKeyboard = action.payload.secondKeyboard
        ? [...action.payload.secondKeyboard]
        : undefined;
      const toHistory = action.payload.toHistory
        ? [...action.payload.toHistory]
        : [undefined];
      return {
        ...state,
        keyboard: [...action.payload.keyboard],
        secondKeyboard: secondKeyboard,
        gameHistory: [...state.gameHistory, ...toHistory],
        currentGame: [...action.payload.games],
      };
    default:
      return { ...state };
  }
}
