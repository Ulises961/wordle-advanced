import {
  CLOSE_VIEW,
  CLOSE_DRAWER,
  INS_DEL,
  GAME_TYPE,
  gameEnum,
} from '../../utils/types';
import { GameAction } from '../types/action.types';
import { AppState } from '../types/state.types';

const initialAppState: AppState = {
  drawerOpen: false,
  viewOpen: false,
  currentSlot: 0,
  keyboard: [],
  secondKeyboard: undefined,
  attempt: [],
  gameType: gameEnum,
};

export function reducer(
  state: AppState = initialAppState,
  action: GameAction
): AppState {
  switch (action.type) {
    case INS_DEL:
      return {
        ...state,
        currentSlot: action.payload.slot,
        attempt: action.payload.attempt,
      };

    case CLOSE_VIEW:
      return {
        ...state,
        viewOpen: action.payload.isOpen,
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        drawerOpen: action.payload.isOpen,
        viewOpen: action.payload.isOpen,
      };

    case GAME_TYPE:
      return {
        ...state,
        gameType: action.payload,
      };
    default:
      return { ...state };
  }
}
