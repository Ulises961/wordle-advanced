import { ActionCreator } from 'redux';
import { UPDATE_KEYBOARD, Letter } from '../../utils/types';
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
