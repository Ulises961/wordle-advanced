import { gameToString, toString } from '../utils/game.lib';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/combineReducer';
import MessageField from './MessageField';

export const GameResultMsg = (): JSX.Element => {
  const { currentGame } = useSelector((state: RootState) => state.game);
  const guessedBoth = currentGame[0].guessed && currentGame[1]?.guessed;

  const guessedOnlyOne =
    (currentGame[0].guessed && (!currentGame[1]?.guessed || currentGame[1]?.numberOfAttempts>5)) ||
    ((!currentGame[0].guessed || currentGame[0].numberOfAttempts>5) && currentGame[1]?.guessed);
 
  
  const firstAnswer = toString(currentGame[0].answer);
  const secondAnswer = toString(currentGame[0]?.answer);
  const firstAnswerMeaning = currentGame[0].hint;
  const secondAnswerMeaning = currentGame[1]?.hint;
  if (currentGame.length > 1) {
    if (guessedBoth) {
      return <MessageField heading=" You have won the dordle challenge!" />;
    } else if (guessedOnlyOne) {
      return (
        <MessageField
          heading="Not so bad!"
          content={` One out of two is still a success! The missing answer was ${
             secondAnswer 
          },  ${firstAnswer}`}
        />
      );
    } else {
      return (
        <MessageField
          heading="You have lost!"
          content={`The answer to the first one was ${firstAnswer}
       . Its meaning: ${firstAnswerMeaning}
        and to the second ${secondAnswer}. Its meaning: ${secondAnswerMeaning}`}
        />
      );
    }
  } else {
    if (currentGame[0].guessed) {
      return <MessageField heading="You have won!" />;
    } else {
      return (
        <MessageField
          heading="You have lost!"
          content={`The answer was ${firstAnswer}. Its meaning: ${firstAnswerMeaning}`}
        />
      );
    }
  }
};
