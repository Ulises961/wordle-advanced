import {
  CLOSE_DRAWER,
  CLOSE_VIEW,
  CURSOR_TO_START,
  ENTER,
  Game,
  gameEnum,
  GAME_TYPE,
  INS_DEL,
  Letter,
  SET_NUMBER,
  SET_SECOND_NUMBER,
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
export interface SetNumber {
  type: typeof SET_NUMBER;
  payload: {currentNumber: Letter[], slot: number};
}
export interface SetSecondNumber {
  type: typeof SET_SECOND_NUMBER;
  payload: {currentNumber: Letter[], slot: number};
}
export interface SetCursorToStart {
  type: typeof CURSOR_TO_START;
  payload: number;
}

export type GameAction =
  | PressEnterAction
  | InsertDeleteLetterAction
  | StartNewDordleAction
  | StartNewWordleAction
  | CloseDrawerAction
  | CloseSettingAction
  | GameType
  | SetNumber
  | SetSecondNumber
  | SetCursorToStart
  | UpdateKeyboardAction;
