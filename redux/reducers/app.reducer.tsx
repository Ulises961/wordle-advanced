import { emptyNumber, emptyWord, qwerty } from '../../utils/lib';
import {
  CLOSE_DRAWER,
  INS_DEL,
  GAME_TYPE,
  gameEnum,
  SET_NUMBER,
  CURSOR_TO_START,
  SET_SECOND_NUMBER,
  CLEAR_INPUT,
} from '../../utils/types';
import { GameAction } from '../types/action.types';
import { AppState } from '../types/state.types';

const initialAppState: AppState = {
  drawerOpen: false,
  currentSlot: 0,
  keyboard: qwerty,
  secondKeyboard: undefined,
  attempt: [],
  gameType: gameEnum.quit,
  answerIndex: emptyNumber,
  secondAnswerIndex: emptyNumber,
};

export default function appReducer(
  state: AppState = initialAppState,
  action: GameAction
): AppState {
  switch (action.type) {
    case INS_DEL:
      return {
        ...state,
        currentSlot: action.payload.slot,
        attempt: [...action.payload.attempt],
      };

    case CLOSE_DRAWER:
      return {
        ...state,
        drawerOpen: action.payload.isOpen,
      };

    case GAME_TYPE:
      return {
        ...state,
        gameType: action.payload,
      };
    case SET_NUMBER:
      return {
        ...state,
        attempt: [...action.payload.currentNumber],
        answerIndex: [...action.payload.currentNumber],
        currentSlot: action.payload.slot,
      };

    case SET_SECOND_NUMBER:
      return {
        ...state,
        attempt: [...action.payload.currentNumber],
        answerIndex: [...action.payload.currentNumber],
        currentSlot: action.payload.slot,
      };

    case CURSOR_TO_START:
      return {
        ...state,
        currentSlot: action.payload,
      };
    case CLEAR_INPUT:
      return {
        ...state,
        attempt: [...emptyWord],
      };
    default:
      return { ...state };
  }
}
