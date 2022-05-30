import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';
import uuid from 'react-native-uuid';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Gameboard from '../components/Board';
import GameOverView from '../components/GameOver';
import { Keyboard } from '../components/Keyboard';
import InputRow from '../elements/InputRow';
import {
  deleteLetter,
  insertLetter,
  setClearInput,
} from '../redux/actions/app.actions';
import { dispatchEnter } from '../redux/actions/game.actions';
import { RootState } from '../redux/combineReducer';
import { gameToString } from '../utils/lib';
import { Game, Letter, gameEnum } from '../utils/types';

const GameScreen = () => {
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;

  const dispatch = useDispatch();

  const { attempt, gameType, keyboard, secondKeyboard, currentSlot } =
    useSelector((state: RootState) => state.app);

  const { currentGame } = useSelector((state: RootState) => state.game);
  console.log(currentGame);

  const isDordle = gameType === gameEnum.dordle;
  useEffect(() => {
    return () => {
      dispatch(setClearInput());
    };
  }, []);

  const keyPressHandler = (letter: Letter) => {
    switch (letter.character) {
      //backspace
      case '\u232B':
        dispatch(deleteLetter(currentSlot, attempt));
        break;
      //return key
      case '\u23CE':
        dispatch(dispatchEnter(attempt, currentGame, isDordle));

        break;
      default:
        dispatch(insertLetter(letter, currentSlot, attempt));
    }
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
          {currentGame.map((eachGame: Game) => {
            return (
              <View style={[styles.game]} key={uuid.v4().toString()}>
                <Gameboard
                  attempts={eachGame.attempts}
                  leftAttempts={6 - eachGame.attempts.length}
                />
              </View>
            );
          })}
        </View>
      </View>

      <View style={[styles.gameOver, gameOverFlex]}>
        {(currentGame[0].guessed &&
          (currentGame[1] === undefined ||
            currentGame[1].guessed ||
            currentGame[1].numberOfAttempts > 5)) ||
        currentGame[0].numberOfAttempts > 5 ? (
          <View style={[styles.gameOver, gameOverFlex]}>
            <GameOverView />
          </View>
        ) : (
          <View style={{ height: '100%' }}>
            <InputRow key={uuid.v4().toString()} style={styles.input} />

            <Keyboard
              onKeyPress={keyPressHandler}
              lettersUsed={[keyboard, secondKeyboard]}
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
