import { ActionCreator } from 'redux';
import {
  UPDATE_KEYBOARD,
  Letter,
  INS_DEL,
  Reset,
  CLOSE_DRAWER,
  GAME_TYPE,
  gameEnum,
} from '../../utils/types';
import { GameAction } from '../types/action.types';

export const UpdateKeyboard: ActionCreator<GameAction> = ({
  keyboard,
  secondKeyboard,
}: {
  keyboard: Letter[];
  secondKeyboard: Letter[] | undefined;
}) => {
  return {
    type: UPDATE_KEYBOARD,
    payload: { keyboard: keyboard, secondKeyboard: secondKeyboard },
  };
};

const InsertDeleteLetter: ActionCreator<GameAction> = (
  currentSlot: number,
  currentAttempt: Letter[]
) => {
  return {
    type: INS_DEL,
    payload: { slot: currentSlot, attempt: currentAttempt },
  };
};

const OpenCloseDrawer: ActionCreator<GameAction> = (isOpen: boolean) => {
  return {
    type: CLOSE_DRAWER,
    payload: { isOpen },
  };
};

const chooseGameType: ActionCreator<GameAction> = (gametype: gameEnum) => {
  return {
    type: GAME_TYPE,
    payload: gametype,
  };
};
export function insertLetter(
  letter: Letter,
  currentSlot: number,
  attempt: Letter[]
) {
  return (dispatch) => {
    if (currentSlot >= 5) {
      return;
    }
    // const letterWithIndex: Letter = { ...letter, index: currentSlot }; // PERHAPS IS USEFUL FOR OTHER FUNCTIONS DOWN THE TREE
    const updatedAttempt = [...attempt];
    updatedAttempt[currentSlot] = letter;

    return dispatch(InsertDeleteLetter(currentSlot + 1, updatedAttempt));
  };
}
export function toggleDrawer(isOpen: boolean) {
  return (dispatch) => {
    return dispatch(OpenCloseDrawer(isOpen));
  };
}

export function deleteLetter(
  letter: Letter,
  currentSlot: number,
  attempt: Letter[]
) {
  return (dispatch) => {
    if (currentSlot < 0) {
      return;
    }
    const updatedAttempt = [...attempt];
    let updatedSlot = currentSlot;
    if (currentSlot >= 1) {
      updatedSlot = updatedSlot - 1;
      updatedAttempt[updatedSlot] = {
        character: ' ',
        index: 0,
        color: Reset,
      };
    } else {
      updatedAttempt[updatedSlot] = {
        character: ' ',
        index: 0,
        color: Reset,
      };
    }

    return dispatch(InsertDeleteLetter(updatedSlot, updatedAttempt));
  };
}
export function chooseGame(gameType: gameEnum) {
  return (dispatch) => {
    dispatch(chooseGameType(gameType));
  };
}
