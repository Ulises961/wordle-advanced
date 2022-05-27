import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';
import uuid from 'react-native-uuid';
import Gameboard from '../components/Board';
import GameOverView from '../components/GameOver';
import { Keyboard } from '../components/Keyboard';
import InputRow from '../elements/InputRow';
import {
  emptyWord,
  processInput,
  playGame,
  querty,
  colorKeyboard,
} from '../utils/lib';
import { Game, mode, Letter, Reset } from '../utils/types';

const GameScreen = ({
  passedGames,
  setGames,
  quitGame,
  startNewGames,
  addToHistory,
}: {
  passedGames: Game[];
  setGames: React.Dispatch<React.SetStateAction<Game[]>>;
  quitGame: () => void;
  startNewGames: (gameMode: mode) => void;
  addToHistory: (passedGame: Game) => void;
}) => {
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;

  const [gameAttempt, setGameAttempt] = useState<Letter[]>(emptyWord);
  const [localKeyboard, setLocalKeyBoard] = useState<Letter[]>(querty);
  const [localKeyboard2, setLocalKeyBoard2] = useState<Letter[]|undefined>(undefined);
  const currentIndex = gameAttempt.findIndex((slot) => {
    return slot.character.localeCompare(' ') === 0;
  });

  const [currentSlot, setCurrentSlot] = useState<number>(currentIndex);

  const keyPressHandler = (letter: Letter) => {
    switch (letter.character) {
      //backspace
      case '\u232B':
        deleteLetter();
        break;
      //return key
      case '\u23CE':
        const isInputOk = processInput(gameAttempt);
        setGameAttempt(emptyWord);
        setCurrentSlot(0);
        const updatedPassedGames = [...passedGames];
        if (isInputOk) {
          updatedPassedGames[0] = playGame(gameAttempt, updatedPassedGames[0]);
          if (
            updatedPassedGames[0].numberOfAttempts > 5 ||
            updatedPassedGames[0].guessed
          ) {
            addToHistory(updatedPassedGames[0]);
          }
          if (updatedPassedGames.length > 1) {
            updatedPassedGames[1] = playGame(
              gameAttempt,
              updatedPassedGames[1]
            );

            if (
              updatedPassedGames[1].numberOfAttempts > 5 ||
              updatedPassedGames[1].guessed
            ) {
              addToHistory(updatedPassedGames[1]);
            }
          }
          setGames([...updatedPassedGames]);
        }
        setGames([...updatedPassedGames]);
        updatedPassedGames.forEach((eachGame, index) => {
          index === 0 ?
          setLocalKeyBoard(colorKeyboard(localKeyboard, eachGame.lettersUsed)):null;   
          index > 0 ? 
            setLocalKeyBoard2(
              colorKeyboard(querty, eachGame.lettersUsed)
            ):null;
          
          eachGame.lettersUsed;
        });
        break;
      default:
        insertLetter(letter);
    }
  };
  const deleteLetter = () => {
    if (currentSlot < 0) {
      return;
    }
    const updatedAttempt = [...gameAttempt];
    if (currentSlot > 0) {
      setCurrentSlot(currentSlot - 1);
      updatedAttempt[currentSlot - 1] = {
        character: ' ',
        index: 0,
        color: Reset,
      };
    } else {
      updatedAttempt[currentSlot] = {
        character: ' ',
        index: 0,
        color: Reset,
      };
    }
    setGameAttempt(updatedAttempt);
  };
  const insertLetter = (letter: Letter): void => {
    if (currentSlot >= 5) {
      return;
    }

    const letterWithIndex: Letter = { ...letter, index: currentSlot };
    const updatedAttempt = [...gameAttempt];
    updatedAttempt[currentSlot] = letterWithIndex;
    setGameAttempt(updatedAttempt);
    setCurrentSlot(currentSlot + 1);
  };

  const portrait = screenHeight > screenWidth;
  const portraitStyle: ViewStyle = {
    flexDirection: portrait ? 'column' : 'row',
  };
  const gameOverFlex: ViewStyle = { flex: portrait ? 6 : 4 };
  const mainflex: ViewStyle = { flex: portrait ? 20 : 5 };

  return (
    <View style={styles.screen}>
       
      <View style={[styles.main, mainflex]}>
        <View style={[styles.game, portraitStyle]}>
          {passedGames.map((passedGame: Game) => {
            return (
              <View style={[styles.game]} key={uuid.v4().toString()}>
                <Gameboard
                  attempts={passedGame.attempts}
                  leftAttempts={6 - passedGame.attempts.length}
                />
                 
              </View>
            );
          })}
        </View>
      </View>

      <View style={[styles.gameOver, gameOverFlex]}>
    
        {(passedGames[0].guessed &&
          (passedGames[1] === undefined ||
            passedGames[1].guessed ||
            passedGames[1].numberOfAttempts > 5)) ||
        passedGames[0].numberOfAttempts > 5 ? (
          <View style={[styles.gameOver, gameOverFlex]}>
            <GameOverView
              quitGame={quitGame}
              startNewGame={startNewGames}
              gamesOver={passedGames}
            />
          </View>
        ) : (
          <View style={{ height: '100%' }}>
            <InputRow
              key={uuid.v4().toString()}
              currentAttempt={gameAttempt}
              style={styles.input}
            />
            <Keyboard
              onKeyPress={keyPressHandler}
              lettersUsed={[localKeyboard, localKeyboard2]}
              style={styles.keyboard}
            />
              
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 2,
  },
  main: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  keyboard: {
    flex: 2,
    width: '100%',
    justifySelf: 'flex-end',
  },
  gameOver: { width: '100%' },

  input: {
    flex: 1,
    width: '75%',
    alignSelf: 'center',
  },
  game: {
    flex: 1,
    width: '80%',
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default GameScreen;
