import { gameToString, newGame } from '../../utils/lib';
import {
  ENTER,
  mode,
  START_NEW_DORDLE,
  START_NEW_WORDLE,
} from '../../utils/types';
import { GameAction } from '../types/action.types';
import { GameState } from '../types/state.types';

const initialGameState: GameState = {
  currentGame: [
    //   {
    //   "numberOfAttempts": 0,
    //   "answer": [
    //     {
    //       "character": "A",
    //       "index": 0,
    //       "color": "cyan"
    //     },
    //     {
    //       "character": "G",
    //       "index": 1,
    //       "color": "cyan"
    //     },
    //     {
    //       "character": "O",
    //       "index": 2,
    //       "color": "cyan"
    //     },
    //     {
    //       "character": "R",
    //       "index": 3,
    //       "color": "cyan"
    //     },
    //     {
    //       "character": "A",
    //       "index": 4,
    //       "color": "cyan"
    //     }
    //   ],
    //   "guessed": false,
    //   "lettersUsed": [],
    //   "attempts": [],
    //   "mode": 1,
    //   "id": "2182321e-b485-4f5d-abe0-128decd1a4e7",
    //   "hint": "a place of assembly for the people in ancient Greece",
    //   "partOfSpeech": "noun"
    // },
    {
      numberOfAttempts: 0,
      answer: [
        {
          character: 'A',
          index: 0,
          color: 'cyan',
        },
        {
          character: 'G',
          index: 1,
          color: 'cyan',
        },
        {
          character: 'O',
          index: 2,
          color: 'cyan',
        },
        {
          character: 'R',
          index: 3,
          color: 'cyan',
        },
        {
          character: 'A',
          index: 4,
          color: 'cyan',
        },
      ],
      guessed: true,
      lettersUsed: [],
      attempts: [],
      mode: 1,
      id: '2182321e-b485-4f5d-abe0-128decd1a4e7',
      hint: 'a place of assembly for the people in ancient Greece',
      partOfSpeech: 'noun',
      extraInfo:'Oh no, no extra info available'
    },
  ],
  gameHistory: [],
};

export function gameReducer(
  state: GameState = initialGameState,
  action: GameAction
): GameState {
  switch (action.type) {
    case START_NEW_WORDLE:
      console.log('game reducer new wordle', action.payload);

      return {
        currentGame: [action.payload],
        gameHistory: [...state.gameHistory, ...state.currentGame],
      };
    case START_NEW_DORDLE:
      return {
        currentGame: [...action.payload],
        gameHistory: [...state.gameHistory, ...state.currentGame],
      };
    case ENTER:
      return {
        ...state,
        gameHistory: [...state.gameHistory, ...action.payload.toHistory],
        currentGame: [...action.payload.games],
      };
    default:
      return { ...state };
  }
}
