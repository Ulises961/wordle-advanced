import {
  CLOSE_DRAWER,
  CLOSE_VIEW,
  ENTER,
  Game,
  gameEnum,
  GAME_TYPE,
  INS_DEL,
  Letter,
  START_NEW_DORDLE,
  START_NEW_WORDLE,
  UPDATE_KEYBOARD,
} from '../../utils/types';

export interface CloseDrawerAction {
  type: typeof CLOSE_DRAWER;
  payload: { isOpen: boolean };
}
export interface CloseSettingAction {
  type: typeof CLOSE_VIEW;
  payload: { isOpen: boolean };
}
export interface StartNewDordleAction {
  type: typeof START_NEW_DORDLE;
  payload: Game[];
}
export interface StartNewWordleAction {
  type: typeof START_NEW_WORDLE;
  payload: Game;
}
export interface InsertDeleteLetterAction {
  type: typeof INS_DEL;
  payload: { attempt: Letter[]; slot: number };
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

export interface GameType {
  type: typeof GAME_TYPE;
  payload: gameEnum;
}


export type GameAction =
  | PressEnterAction
  | InsertDeleteLetterAction
  | StartNewDordleAction
  | StartNewWordleAction
  | CloseDrawerAction
  | CloseSettingAction
  | GameType
  | UpdateKeyboardAction;
