import React, { useState } from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { answers } from '../assets/answers';
import BackButton from '../elements/BackButton';
import InputRow from '../elements/InputRow';
import Key from '../elements/Key';
import { LeftArrow, ReturnKey, RightArrow } from '../utils/specialKeys';
import { emptyNumber, parseNumber } from '../utils/lib';
import { mode, Letter, Reset, gameEnum, CLOSE_DRAWER } from '../utils/types';
import { Keypad } from './Keyboard';
import { useSelector } from 'react-redux';
import rootReducer, { RootState } from '../redux/combineReducer';
import { useDispatch } from 'react-redux';
import {
  clearNumberInput,
  deleteNumber,
  insertNumber,
  setCursorToStart,
} from '../redux/actions/app.actions';
import { startGame, StartNewDordle } from '../redux/actions/game.actions';

const AnswerSetter = ({ onClose }: { onClose: () => void }): JSX.Element => {
  const screenWidth = useWindowDimensions().width;
  const keypad: ViewStyle = { flex: 8, width: screenWidth };
  const [isFirst, setIsFirst] = useState<boolean>(true);

  const {
    currentSlot,
    gameType,
    attempt,
    answerIndex,
    secondAnswerIndex,
  } = useSelector((state: RootState) => state.app);

  console.log('current slot in Answer Setter', currentSlot);
  
  const dispatch = useDispatch();
  const isWordle = gameType === gameEnum.wordle;
  const keyPressHandler = (letter: Letter) => {
    switch (letter.character) {
      //backspace
      case '\u232B':
        dispatch(deleteNumber(currentSlot, attempt, isFirst));
        break;
      //return key
      case '\u23CE':
        dispatch(
          startGame(isWordle,parseNumber(answerIndex), parseNumber(secondAnswerIndex))
        );
        break;

      case 'Next':
        setIsFirst(false);
        dispatch(setCursorToStart());
        break;

      case 'Previous':
        setIsFirst(true);
        dispatch(clearNumberInput());
        dispatch(setCursorToStart());
        break;

      default:
        dispatch(insertNumber(letter, currentSlot, attempt, isFirst));
    }
  };

  const [difficultyMode, setDifficultyMode] = useState<mode>(mode.normal);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  
  const setModeHandler = (value: boolean): void => {
    setIsEnabled(value);
    if (value) {
      setDifficultyMode(mode.hard);
    } else {
      setDifficultyMode(mode.normal);
    }
  };
  // console.log('answerStter');

  return (
    <View style={styles.main}>
      <BackButton pressHandler={onClose} />
      {isWordle && (
        <View style={styles.switchGroup}>
          <Text style={styles.label}>Hard Mode</Text>
          <Switch
            onValueChange={(value) => setModeHandler(value)}
            value={isEnabled}
            accessibilityLabel="hardmode"
            style={styles.switch}
          />
        </View>
      )}
      <InputRow currentAttempt={attempt} />
      <View>
        {answers[parseNumber(attempt)] === undefined ? (
          <Text style={styles.bold}>
            No such index, we will choose a random answer
          </Text>
        ) : (
          <View>
            <Text style={styles.regularText}>
              The answer you are choosing is{' '}
            </Text>
            <Text style={styles.bold}>{answers[parseNumber(attempt)]}</Text>
          </View>
        )}
      </View>
      <Keypad style={keypad} onKeyPress={keyPressHandler} />

      {isWordle ? (
        <Key
          letter={ReturnKey}
          onPress={() => keyPressHandler(ReturnKey)}
          style={styles.box}
        />
      ) : isFirst ? (
        <View style={styles.cursors}>
          <Key
            letter={ReturnKey}
            onPress={() => keyPressHandler(ReturnKey)}
            style={styles.box}
          />
          <Key
            letter={RightArrow}
            onPress={() => keyPressHandler(RightArrow)}
            style={styles.box}
          />
        </View>
      ) : (
        <View style={styles.cursors}>
          <Key
            letter={LeftArrow}
            onPress={() => keyPressHandler(LeftArrow)}
            style={styles.box}
          />
          <Key
            letter={ReturnKey}
            onPress={() => keyPressHandler(ReturnKey)}
            style={styles.box}
          />
        </View>
      )}
    </View>
  );
};

export default AnswerSetter;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  regularText: {
    fontSize: 25,
    textAlign: 'center',
  },
  switchGroup: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    flexDirection: 'row',
  },
  switch: {
    margin: 10,
    padding: 10,
  },
  label: {
    margin: 10,
    padding: 10,
  },
  box: {
    flex: 1,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  cursors: {
    flex: 1,
    flexDirection: 'row',
  },
});
