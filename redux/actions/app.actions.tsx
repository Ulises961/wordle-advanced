import { Dispatch } from 'react';
import { ActionCreator } from 'redux';
import { emptyNumber } from '../../utils/lib';
import {
  UPDATE_KEYBOARD,
  Letter,
  INS_DEL,
  Reset,
  CLOSE_DRAWER,
  GAME_TYPE,
  gameEnum,
  SET_NUMBER,
  CURSOR_TO_START,
  SET_SECOND_NUMBER,
  CLEAR_INPUT,
} from '../../utils/types';
import { GameAction } from '../types/action.types';

export const updateKeyboard: ActionCreator<GameAction> = (
  keyboard: Letter[],
  secondKeyboard: Letter[] | undefined
) => {

  return {
    type: UPDATE_KEYBOARD,
    payload: { keyboard: keyboard, secondKeyboard: secondKeyboard },
  };
};

const insertDeleteLetter: ActionCreator<GameAction> = (
  currentSlot: number,
  currentAttempt: Letter[]
) => {
  return {
    type: INS_DEL,
    payload: { slot: currentSlot, attempt: currentAttempt },
  };
};

const openCloseDrawer: ActionCreator<GameAction> = (isOpen: boolean) => {
  return {
    type: CLOSE_DRAWER,
    payload: { isOpen },
  };
};

const setNumber: ActionCreator<GameAction> = (
  currentNumber: Letter[],
  currentSlot: number
) => {
  return {
    type: SET_NUMBER,
    payload: { currentNumber: currentNumber, slot: currentSlot },
  };
};
const setSecondNumber: ActionCreator<GameAction> = (
  currentNumber: Letter[],
  currentSlot: number
) => {
  return {
    type: SET_SECOND_NUMBER,
    payload: { currentNumber: currentNumber, slot: currentSlot },
  };
};

const cursorToStart: ActionCreator<GameAction> = () => {
  return {
    type: CURSOR_TO_START,
    payload: 0,
  };
};

const chooseGameType: ActionCreator<GameAction> = (gametype: gameEnum) => {
  return {
    type: GAME_TYPE,
    payload: gametype,
  };
};

const clearInput: ActionCreator<GameAction> = () => {
  return {
    type: CLEAR_INPUT,
  };
};

export function insertLetter(
  letter: Letter,
  currentSlot: number,
  attempt: Letter[]
) {
  return (dispatch: Dispatch<GameAction>) => {
    if (currentSlot >= 5) {
      return;
    }
    const letterWithIndex: Letter = { ...letter, index: currentSlot }; // PERHAPS IS USEFUL FOR OTHER FUNCTIONS DOWN THE TREE
    const updatedAttempt = [...attempt];
    updatedAttempt[currentSlot] = letterWithIndex;
    const updatedSlot = currentSlot + 1;
    return dispatch(insertDeleteLetter(updatedSlot, updatedAttempt));
  };
}

export function toggleDrawer(isOpen: boolean) {
  return (dispatch: Dispatch<GameAction>) => {
    return dispatch(openCloseDrawer(isOpen));
  };
}

export function deleteLetter(currentSlot: number, attempt: Letter[]) {
  return (dispatch: Dispatch<GameAction>) => {
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

    return dispatch(insertDeleteLetter(updatedSlot, updatedAttempt));
  };
}

export function deleteNumber(
  currentSlot: number,
  attempt: Letter[],
  isFirst: boolean
) {
  return (dispatch: Dispatch<GameAction>) => {
    if (currentSlot < 0) {
      return;
    }

    const updatedAttempt = [...attempt];
    let updatedSlot = currentSlot;
    if (updatedSlot >= 1) {
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
    return isFirst
      ? dispatch(setNumber(updatedAttempt, updatedSlot))
      : dispatch(setSecondNumber(updatedAttempt, updatedSlot));
  };
}
export function insertNumber(
  letter: Letter,
  currentSlot: number,
  attempt: Letter[],
  isFirst: boolean
) {
  return (dispatch: Dispatch<GameAction>) => {
    if (currentSlot >= 4) {
      return;
    }
    // const letterWithIndex: Letter = { ...letter, index: currentSlot }; // PERHAPS IS USEFUL FOR OTHER FUNCTIONS DOWN THE TREE
    const updatedAttempt = [...attempt];
    updatedAttempt[currentSlot] = letter;
    const updatedSlot = currentSlot + 1;
    return isFirst
      ? dispatch(setNumber(updatedAttempt, updatedSlot))
      : dispatch(setSecondNumber(updatedAttempt, updatedSlot));
  };
}

export function chooseGame(gameType: gameEnum) {
  return (dispatch: Dispatch<GameAction>) => {
    dispatch(chooseGameType(gameType));
  };
}

export function clearNumberInput() {
  return (dispatch: Dispatch<GameAction>) => {
    dispatch(setNumber(emptyNumber,0));
   
  };
}

export function setCursorToStart() {
  return (dispatch: Dispatch<GameAction>) => {
    dispatch(cursorToStart());
  };
}

export function setClearInput() {
  return (dispatch: Dispatch<GameAction>) => {
    dispatch(clearInput());
  };
}

export function setUpdateKeyboard(
  keyboard: Letter[],
  secondKeyboard: Letter[] | undefined
) {
  return (dispatch: Dispatch<GameAction>) => {
    dispatch(updateKeyboard(keyboard, secondKeyboard));
  };
}
