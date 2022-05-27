import { Alert } from 'react-native';
import { allwords } from '../assets/allwords';
import { answers } from '../assets/answers';
import uuid from 'react-native-uuid';
import {
  BgCyan,
  BgGreen,
  BgRed,
  BgYellow,
  filterFunction,
  Game,
  Letter,
  mode,
  predicateFunction,
  Reset,
  Stats,
} from './types';

const randIndex = (): number => Math.floor(Math.random() * answers.length);

export const generateCharArray = (word: string, color: string): Letter[] => {
  return word.split('').map((char, index) => {
    return { character: char, index: index, color: color };
  });
};

export const querty: Letter[] = generateCharArray(
  'QWERTYUIOPASDFGHJKLZXCVBNM',
  Reset
);

export const commandDescriptions = [
  { command: 'Stat', desc: 'print some statistics.' },
  { command: 'Choose answer', desc: 'print the solution to the current game' },
  { command: 'Hard', desc: 'restart a game, in hard mode' },
  { command: 'Easy', desc: 'restart a game, in normal mode' },
];

export const emptyWord: Letter[] = generateCharArray('     ', BgCyan);
export const emptyNumber: Letter[] = generateCharArray('    ', BgCyan);

export const isvalidInput = (guess: Letter[]): Boolean => {
  return (
    guess.find((letter: Letter) => {
      return letter.character.localeCompare(' ') === 0;
    }) === undefined
  );
};

export const guessIsInWords = (words: string[], guess: Letter[]): Boolean => {
  let parsedGuess = '';
  guess.forEach((letterInGuess) => {
    parsedGuess = parsedGuess.concat(letterInGuess.character);
  });

  return words.some((word) => parsedGuess === word);
};

const SameCharSameIndex = (letter1: Letter, letter2: Letter): Boolean => {
  return (
    letter1.character === letter2.character && letter1.index === letter2.index
  );
};
const SameCharDiffIndex = (letter1: Letter, letter2: Letter): Boolean => {
  return (
    letter1.character === letter2.character && letter1.index !== letter2.index
  );
};
const sortAlphabetically = (word: Letter[]): Letter[] => {
  return [
    ...word.sort((letter1: Letter, letter2: Letter) => {
      return letter1.character.localeCompare(letter2.character);
    }),
  ];
};

export const missingLettersAlert = () =>
  Alert.alert('There are empty slots', 'Words are 5 letters long!', [
    { text: 'OK', onPress: () => {} },
  ]);
export const nonExistingWordAlert = () =>
  Alert.alert('Inexistent word', 'Come on! \tReally?', [
    { text: 'OK', onPress: () => {} },
  ]);
export const hardModeAlert = () =>
  Alert.alert(
    'Unused valid letters',
    'You must use the letters colored in green or yellow.\nWe are not buying this word! Yet you loose an attempt...',
    [{ text: 'OK', onPress: () => {} }]
  );

export const processInput = (input: Letter[]): boolean => {
  if (!isvalidInput(input)) {
    missingLettersAlert();
    return false;
  }
  if (!guessIsInWords(allwords, input)) {
    nonExistingWordAlert();
    return false;
  }
  return true;
};

export const markLetterAsTried = (
  word: Letter[],
  lettersUsed: Letter[]
): Letter[] => {
  let updatedLettersUsed = [...lettersUsed];
  word.forEach((letterInWord) => {
    const newlyColoredLetter = copyColor(letterInWord, lettersUsed);
    const foundIndex = lettersUsed.findIndex((letterUsed) =>
      compareEquality(letterUsed, newlyColoredLetter)
    );
    if (foundIndex === -1) {
      updatedLettersUsed = [...updatedLettersUsed, newlyColoredLetter];
    }
    else{
      updatedLettersUsed.splice(foundIndex,1,newlyColoredLetter)
    }
  });

  console.log(updatedLettersUsed);
  
  return updatedLettersUsed;
};

export const colorKeyboard = (
  keyboard: Letter[],
  lettersUsed: Letter[]
): Letter[] => {
  return keyboard.map((key) => {
    const letterToReplace = lettersUsed.find((letterUsed) =>
      compareEquality(letterUsed, key)
    );
    return letterToReplace === undefined ? key : letterToReplace;
  });
};

export const sortByIndex = (word: Letter[]): Letter[] => {
  return word.sort((letter1: Letter, letter2: Letter) => {
    return letter1.index - letter2.index;
  });
};
/**
 *
 * @param letter each letter of the querty keyboard
 * @param word the guess of the user that has already been colored against the answer of the current game
 * @returns the updated querty with the colors of the new guess added
 */
export const copyColor = (letter: Letter, lettersUsed: Letter[]): Letter => {
  const [head, ...tail] = lettersUsed;
  if (lettersUsed.length === 0) {
    return letter;
  } else if (head.character.localeCompare(letter.character) === 0) {
    console.log(
      head.character,
      'head.color',
      head.color,
      'letter.color',
      letter.color
    );

    if (head.color === BgYellow && letter.color === BgGreen) {
      console.log('returning letter', letter);
      return letter;
    }
    if (
      head.color === BgRed &&
      (letter.color === BgGreen || letter.color === BgYellow)
    )
      return letter;
    else return { ...letter, color: head.color };
  }
  return copyColor(letter, tail);
};

/**
 *
 * @param guess the guess made by user
 * @returns true if the game is guessed false otherwise
 */
const checkIfGuessed = (guess: Letter[]): Boolean => {
  return guess.every((letter) => letter.color === BgGreen);
};
/**
 *
 * @param lastWord the letters used so far during the current game
 * @returns a new array of letters with the updated letters used
 */
const getUsedLetters = (lastWord: Letter[]): Letter[] => {
  return lastWord.filter((letter) => {
    return letter.color === BgGreen || letter.color === BgYellow;
  });
};

const guessContainsUsedLetters = (
  validLetters: Letter[],
  guess: Letter[]
): Boolean => {
  return validLetters.every((letter) =>
    guess.some((letterInGuess) =>
      letter.character.localeCompare(letterInGuess.character) === 0
        ? true
        : false
    )
  );
};
/**
 *
 * @param game the current game on which we are controlling the guess of the user
 * @param parsedGuess the new input of the user converted as an array of Letter objects
 * @returns the updated game played in the mode set for the current game
 */
const playInMode = (game: Game, parsedGuess: Letter[]): Game => {
  return game.mode === mode.normal
    ? updateGame(game, parsedGuess)
    : updateGameStrict(game, parsedGuess);
};
/**
 *
 * @param game the current game
 * @param parsedGuess the guess of the user
 * @returns the updated game with the new guess colored as part of the attempts
 */
export const updateGame = (game: Game, parsedGuess: Letter[]): Game => {
  const colorMarkedWord =
    game.mode === mode.hard
      ? parsedGuess.map((letterInGuess: Letter): Letter => {
          return colorLetter(game.answer, letterInGuess);
        })
      : colorLetterStrict(parsedGuess, game.answer);
  const reorderedWord = sortByIndex(colorMarkedWord);
  const updatedLettersUsed = markLetterAsTried(reorderedWord, game.lettersUsed);
 
  const isGuessed = checkIfGuessed(reorderedWord);

  const updatedNumberOfAttempts = game.numberOfAttempts + 1;
  const updatedAttempts = [...game.attempts, reorderedWord];

  return {
    ...game,
    attempts: updatedAttempts,
    lettersUsed: updatedLettersUsed,
    numberOfAttempts: updatedNumberOfAttempts,
    guessed: isGuessed,
  };
};
/**
 *
 * @param game the current game we are playing
 * @param parsedGuess the guess the user has provided
 * @returns Game the updated game with the guess of the user
 * if the guess does not use valid letters previously inserted returns an @emptyWord
 */
export const updateGameStrict = (game: Game, parsedGuess: Letter[]): Game => {
  if (game.attempts.length > 0) {
    const validLettersUsed = getUsedLetters(game.lettersUsed);

    if (guessContainsUsedLetters(validLettersUsed, parsedGuess)) {
      return updateGame(game, parsedGuess);
    } else {
      hardModeAlert();
      return updateGame(game, emptyWord);
    }
  }
  return updateGame(game, parsedGuess);
};
/**
 *
 * @param answer
 * @param letter
 * @returns coloredLetter
 * This method allows doubled letters and marks them as yellow if they are valid
 */
const colorLetter = (answer: Letter[], letter: Letter): Letter => {
  if (answer.length === 0) {
    return letter.color === BgYellow
      ? { ...letter }
      : { ...letter, color: BgRed };
  }
  const [head, ...tail] = answer;
  if (SameCharSameIndex(head, letter)) {
    return { ...letter, color: BgGreen };
  }
  if (SameCharDiffIndex(head, letter)) {
    return colorLetter(tail, { ...letter, color: BgYellow });
  }

  return colorLetter(tail, letter);
};

const compareEquality = (letter1: Letter, letter2: Letter): Boolean => {
  return letter1.character.localeCompare(letter2.character) === 0;
};
const firsSmallerThanSecond = (letter1: Letter, letter2: Letter): Boolean => {
  return letter1.character.localeCompare(letter2.character) < 0;
};
/**
 *
 * @param letter a letter to compare against each letter of input word
 * @param word the word from which we will compare to check letters against
 * @param compare a function that contains a specific predicate
 * @returns a filtered array of letters based on the result of the compare function
 */
const filterLetterByChar: filterFunction<Letter, Letter[]> = (
  letter: Letter,
  word: Letter[],
  compare: predicateFunction<Letter, Letter>
): Letter[] => {
  return word.filter((letterOfWord) => compare(letterOfWord, letter));
};
/**
 *
 * @param word1 from which we check each letter as a fixed point
 * @param word2 from which we compare the repeated letters that word1 contains
 * @returns an array of letters from word 2 that are found in word1
 */
const reduceDifferentLetters = (word1: Letter[], word2: Letter[]): Letter[] => {
  return word1.filter((letter: Letter) =>
    word2.every((w2Letter) => w2Letter.index !== letter.index)
  );
};

/**
 *
 * @param word it is an array of letters that might have same index and character
 * @returns a new array containing only unique letters belonging to the word given as input
 */
const getUniqueIndexLetters = (word: Letter[]): Letter[] => {
  const coloredWord: Letter[] = [];
  return word.reduce((accWord: Letter[], letter: Letter): Letter[] => {
    if (accWord.length === 0) {
      accWord.push(letter);
    } else {
      if (!accWord.some((accLetter) => accLetter.index === letter.index)) {
        accWord.push(letter);
      }
    }
    return accWord;
  }, coloredWord);
};

const reduceWord = (
  word1: Letter[],
  word2: Letter[],
  doubledLetters: Letter[],
  inspectedLetters: string
): [Letter[], string] => {
  const [head, ...tail] = word1;
  if (word1.length === 0) {
    return [doubledLetters, inspectedLetters];
  }
  if (inspectedLetters.includes(head.character)) {
    return reduceWord(tail, word2, doubledLetters, inspectedLetters);
  } else {
    inspectedLetters = inspectedLetters.concat(head.character);
    const newDoubleLetters = getUniqueIndexLetters([
      ...doubledLetters,
      ...filterLetterByChar(head, word2, compareEquality),
    ]);

    return reduceWord(tail, word2, newDoubleLetters, inspectedLetters);
  }
};

/**
 *
 * @param guess the user guess
 * @param answer the answer of the current game
 * @param coloredWord the accumulator that will be returned at the end of the method
 * @returns coloredWord
 * Sorts the words alphabetically and check for equality between characters,
 * if character and index in a word match the letter is green, yellow if it only matches in charcter
 * red if it does not match at all.
 * This method marks doubled letters that have no match as red.
 */

const colorLetterStrict = (guess: Letter[], answer: Letter[]): Letter[] => {
  const sortedGuess = sortAlphabetically(guess);
  const sortedAnswer = sortAlphabetically(answer);

  const [sameLettersInGuess, controlString]: [Letter[], string] = reduceWord(
    sortedAnswer,
    sortedGuess,
    [],
    ''
  );

  const differentLettersInGuess = reduceDifferentLetters(
    sortedGuess,
    sameLettersInGuess
  );
  const coloredWord: Letter[] = [];
  generateCharArray(controlString, Reset).map((letter) => {
    const guessSubArray = filterLetterByChar(
      letter,
      sortedGuess,
      compareEquality
    );
    const answerSubArray = filterLetterByChar(
      letter,
      sortedAnswer,
      compareEquality
    );
    coloredWord.push(...colorDoubleLetters(guessSubArray, answerSubArray, []));
  });

  return [...coloredWord, ...differentLettersInGuess];
};
/**
 *
 * @param guess the guess from the user converted in array of Letter objects
 * @param answer the answer from the user converted in array of Letter objects
 * @param coloredWord the resulting coloredWord to print on screen
 * @returns a colored word to display on screen
 */
const colorDoubleLetters = (
  guess: Letter[],
  answer: Letter[],
  coloredWord: Letter[]
): Letter[] => {
  const [gHead, ...gTail] = guess;
  const [aHead, ...aTail] = answer;

  if (answer.length === 0 && guess.length === 0) {
    return coloredWord;
  }
  if (answer.length === 0) {
    return colorDoubleLetters(gTail, answer, [...coloredWord, gHead]);
  }
  if (guess.length === 0) {
    return colorDoubleLetters(guess, aTail, coloredWord);
  }
  if (gHead.index === aHead.index && compareEquality(gHead, aHead)) {
    return colorDoubleLetters(gTail, aTail, [
      ...coloredWord,
      { ...gHead, color: BgGreen },
    ]);
  } else if (compareEquality(gHead, aHead)) {
    if (guess.length > answer.length) {
      if (gHead.index < aHead.index) {
        return colorDoubleLetters(gTail, answer, [...coloredWord, gHead]);
      }
      return colorDoubleLetters(gTail, aTail, [
        ...coloredWord,
        findBestMatch(gHead, aTail, { ...gHead, color: BgYellow }),
      ]);
    } else {
      return colorDoubleLetters(gTail, aTail, [
        ...coloredWord,
        findBestMatch(gHead, aTail, { ...gHead, color: BgYellow }),
      ]);
    }
  } else {
    if (firsSmallerThanSecond(gHead, aHead)) {
      return colorDoubleLetters(gTail, answer, [...coloredWord, gHead]);
    }
    return colorDoubleLetters(guess, aTail, coloredWord);
  }
};

//
/**
 *
 * @param letter the letter of the guess we are looking to match against each letter of the answer
 * @param wordToSearch the answer of this game
 * @param coloredLetter the accumulator letter that will be returned at the end of the recursion
 * @returns the colored letter with the best fitting color
 */
const findBestMatch = (
  letter: Letter,
  wordToSearch: Letter[],
  coloredLetter: Letter
): Letter => {
  const [wHead, ...wTail] = wordToSearch;
  if (wordToSearch.length === 0) {
    return coloredLetter;
  } else {
    if (letter.index === wHead.index && compareEquality(letter, wHead)) {
      return {
        ...letter,
        color: BgGreen,
      };
    }
    // same character same index => green
    else {
      return findBestMatch(letter, wTail, { ...letter, color: BgYellow });
    } // we color yellow but continue search for better match
  }
};

/**
 *
 * @param index the possible number inserted by the user to select an arbitrary answer among the possible ones
 * @returns the answer that will be used in the current game, if no index is provided it is a random number generated by @randIndex
 */
export const generateAnswer = (index?: number): Letter[] => {
  const randomAnswer = answers[randIndex() - 1];
  const chosenAnswer = answers[index];

  return chosenAnswer === undefined
    ? generateCharArray(randomAnswer, BgCyan)
    : generateCharArray(chosenAnswer, BgCyan);
};

/**
 *
 * @param mode normal|hard
 * @param index (optional) if given by user it sets the mode in which the new game will be played
 * @returns the new game to play
 */
export const newGame = (newGameMode: mode, index?: number): Game => {
  const answer = generateAnswer(index);
  const id = uuid.v4().toString();
  return {
    numberOfAttempts: 0,
    answer: answer,
    guessed: false,
    lettersUsed: [],
    attempts: [],
    mode: newGameMode,
    id: id,
  };
};

/**
 *
 * @param guess a string to guess, must be within possible answers
 * @param currentGame the current state of the game we are playing
 * @returns the updated current game
 */
export const playGame = (guess: Letter[], currentGame: Game): Game => {
  const preColoredGuess = guess.map((letter) => {
    return { ...letter, color: BgRed };
  });
  if (currentGame.numberOfAttempts < 6 && !currentGame.guessed) {
    return playInMode(currentGame, preColoredGuess);
  }
  return currentGame;
};

export const generateStats = (gamesPlayed: Game[]): Stats => {
  const stats: Stats = {
    'Total Attempts': 0,
    'Total Won': 0,
    'Total Lost': 0,
    'Guessed in 1': 0,
    'Guessed in 2': 0,
    'Guessed in 3': 0,
    'Guessed in 4': 0,
    'Guessed in 5': 0,
    'Guessed in 6': 0,
  };

  return gamesPlayed.reduce((total: Stats, game: Game): Stats => {
    if (game.guessed) {
      total['Total Won'] = total['Total Won'] + 1;
      switch (game.numberOfAttempts) {
        case 1:
          total['Guessed in 1'] = stats['Guessed in 1'] + 1;
          break;
        case 2:
          total['Guessed in 2'] = stats['Guessed in 2'] + 1;
          break;
        case 3:
          total['Guessed in 3'] = stats['Guessed in 3'] + 1;
          break;
        case 4:
          total['Guessed in 4'] = stats['Guessed in 4'] + 1;
          break;
        case 5:
          total['Guessed in 5'] = stats['Guessed in 5'] + 1;
          break;
        case 6:
          total['Guessed in 6'] = stats['Guessed in 6'] + 1;
          break;
      }
    } else {
      total['Total Lost'] = total['Total Lost'] + 1;
    }
    const totalAttempts = total['Total Attempts'] + game.numberOfAttempts;

    return { ...total, 'Total Attempts': totalAttempts };
  }, stats);
};

export const toString = (word: Letter[]): string => {
  let st = '';
  word.map((letter) => {
    st = st.concat(letter.character);
  });
  return st;
};
export const gameToString = (game: Game): string => {
  let attemptsString = '';
  return `Answer: ${toString(sortByIndex(game.answer))},
  Letters used: ${toString(sortByIndex(game.lettersUsed))},
  Atempts tried: ${game.attempts.map(
    (attempt) =>
      (attemptsString = attemptsString
        .concat(toString(sortByIndex(attempt)))
        .concat(',\n'))
  )},
  Guessed ${game.guessed ? 'Yes' : 'No'},
  Mode: ${game.mode === 0 ? 'Hard' : 'Easy'}
  `;
};
export const parseNumber = (word: Letter[]) => {
  let numberToParse = '';
  word.map((letter) => {
    numberToParse = numberToParse.concat(letter.character);
  });
  return Number.parseInt(numberToParse, 10);
};

export const generateEmptyRows = (
  attemptsLeft: number,
  printedLines: number,
  emptyRows: Letter[][]
): Letter[][] => {
  if (printedLines >= attemptsLeft) {
    return emptyRows;
  } else {
    return generateEmptyRows(attemptsLeft, printedLines + 1, [
      ...emptyRows,
      emptyWord,
    ]);
  }
};

export const mergeLettersUsed = (arra1: Letter[], arr2: Letter[]): Letter[] => {
  return [...arra1, ...arr2];
};
export const gameWonIn = (guessedIn: number, gamesPlayed: number) => {
  return isNaN(guessedIn / gamesPlayed)
    ? 0
    : ((guessedIn / gamesPlayed) * 100).toFixed(1);
};
