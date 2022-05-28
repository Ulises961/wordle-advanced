import { Game, Letter } from '../../utils/types';
import { gameEnum } from './action.types';

export interface GameState {
  currentGame: Game[] | [undefined];
  gameHistory: (Game | undefined)[];
  isDordle: boolean;
}

export interface AppState {
  drawerOpen: boolean;
  viewOpen: boolean;
  currentSlot: number;
  keyboard: Letter[];
  secondKeyboard: Letter[] | undefined;
  attempt: Letter[];
  gameType: gameEnum;
}
