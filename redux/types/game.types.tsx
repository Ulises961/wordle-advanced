import { Game, Letter } from '../../utils/types';

export interface GameState {
  currentGame: Game[] | [undefined];
  gameHistory: (Game|undefined)[];
  keyboard: Letter[];
  secondKeyboard?: Letter[];
  isDordle: boolean;
}

export interface AppState {}
