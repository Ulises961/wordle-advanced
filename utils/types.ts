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
  arg3: predicateFunction<A, A>,
) => A[];

export enum mode {
  'hard',
  'normal',
}
