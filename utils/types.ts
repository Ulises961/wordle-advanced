export const Reset = 'transparent';
export const BgRed = 'red';
export const BgGreen = 'lightgreen';
export const BgYellow = 'yellow';
export const BgBlue = 'blue';
export const BgMagenta = 'magenta';
export const BgCyan = 'cyan';
export const BgWhite = 'white';

export interface Letter {
  character: string;
  index: number;
  color: string;
}

export interface Game {
  numberOfAttempts: number;
  answer: Letter[];
  guessed: Boolean;
  lettersUsed: Letter[];
  attempts: Letter[][];
  mode: mode;
  id: string;
}
export interface Stats {
  'Guessed in 1': number;
  'Guessed in 2': number;
  'Guessed in 3': number;
  'Guessed in 4': number;
  'Guessed in 5': number;
  'Guessed in 6': number;
  'Total Attempts': number;
  'Total Won': number;
  'Total Lost': number;
}

export type predicateFunction<A, B> = (arg1: A, arg2: B) => Boolean;
export type filterFunction<A, B> = (
  arg1: A,
  arg2: B,
  arg3: predicateFunction<A, A>
) => A[];

export enum mode {
  'hard',
  'normal',
}

export enum gameEnum {
  'wordle',
  'dordle',
  'quit',
}
export const UPDATE_GAME = 'UPDATE_GAME';
export const START_NEW_WORDLE = 'START_NEW_WORDLE';
export const START_NEW_DORDLE = 'START_NEW_DORDLE';
export const GAME_TYPE = 'GAME_TYPE';
export const ENTER = 'ENTER';
export const INS_DEL = 'INSERT_DELETE_LETTER';
export const CLOSE_VIEW = 'CLOSE_VIEW';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';
export const UPDATE_KEYBOARD = 'UPDATE_KEYBOARD';
