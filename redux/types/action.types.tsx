import {
  CLOSE_DRAWER,
  CLOSE_VIEW,
  DELETE,
  ENTER,
  Game,
  INSERT,
  Letter,
  START_NEW_DORDLE,
  START_NEW_WORDLE,
  UPDATE_KEYBOARD,
} from '../../utils/types';

export interface CloseDrawerAction {
  type: typeof CLOSE_DRAWER;
  payload: undefined;
}
export interface CloseSettingAction {
  type: typeof CLOSE_VIEW;
  payload: undefined;
}
export interface StartNewDordleAction {
  type: typeof START_NEW_DORDLE;
  payload: Game[];
}

export interface StartNewWordleAction {
  type: typeof START_NEW_WORDLE;
  payload: Game;
}
export interface InsertLetterAction {
  type: typeof INSERT;
  payload: Letter;
}

export interface DeleteLetterAction {
  type: typeof DELETE;
  payload: Letter;
}

export interface PressEnterAction {
  type: typeof ENTER;
  payload: {
    games: Game[];
    toHistory: Game[] | undefined;
    keyboard: Letter[];
    secondKeyboard: Letter[] | undefined;
  };
}

export interface UpdateKeyboardAction {
  type: typeof UPDATE_KEYBOARD;
  payload: {
    keyboard: Letter[];
    secondKeyboard: Letter[] | undefined;
  };
}

export type GameAction =
  | PressEnterAction
  | DeleteLetterAction
  | InsertLetterAction
  | StartNewDordleAction
  | StartNewWordleAction
  | CloseDrawerAction
  | CloseSettingAction
  | UpdateKeyboardAction;
