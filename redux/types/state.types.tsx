import { Game, gameEnum, Letter } from '../../utils/types';

export interface GameState {
  currentGame: Game[] | [undefined];
  gameHistory: (Game | undefined)[];
}

export interface AppState {
  drawerOpen: boolean;
  currentSlot: number;
  keyboard: Letter[];
  secondKeyboard: Letter[] | undefined;
  attempt: Letter[];
  gameType: gameEnum;
  answerIndex: Letter[];
  secondAnswerIndex: Letter[];
}
