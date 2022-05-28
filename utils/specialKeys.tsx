import {Letter, Reset} from './types';

export const BackSpaceKey: Letter = {
  character: '\u232B',
  index: 0,
  color: '#ef476f',
};

export const ReturnKey: Letter = {
  character: '\u23CE',
  index: 0,
  color: '#06d6a0',
};
export const LeftArrow: Letter = {
  character: 'Previous',
  index: 0,
  color: '#10EEC6',
};
export const RightArrow: Letter = {
  character: 'Next',
  index: 0,
  color: '#10EEC6',
};
export const EmptyKey: Letter = {character: ' ', index: -1, color: Reset};
