import React, {useState} from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {answers} from '../assets/answers';
import BackButton from '../elements/BackButton';
import InputRow from '../elements/InputRow';
import Key from '../elements/Key';
import {LeftArrow, ReturnKey, RightArrow} from '../utils/specialKeys';
import {emptyNumber, parseNumber} from '../utils/lib';
import {mode, Letter, Reset} from '../utils/types';
import {Keypad} from './Keyboard';

const AnswerSetter = ({
  onClose,
  onChooseAnswer,
  onCloseDrawerAltogether,
  isWordle,
}: {
  onClose: () => void;
  onCloseDrawerAltogether: () => void;
  onChooseAnswer: (
    difficultyMode: mode,
    index: number,
    secondIndex?: number,
  ) => void;
  isWordle: boolean;
}): JSX.Element => {
  const screenWidth = useWindowDimensions().width;
  const keypad: ViewStyle = {flex: 8, width: screenWidth};

  const [numberEntered, setNumberEntered] = useState<Letter[]>(emptyNumber);
  const [secondNumberEntered, setSecondNumberEntered] =
    useState<Letter[]>(emptyNumber);

  const [isFirst, setIsFirst] = useState<boolean>(true);

  const currentIndex = numberEntered.findIndex(slot => {
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
        onChooseAnswer(
          difficultyMode,
          parseNumber(numberEntered),
          parseNumber(secondNumberEntered),
        );

        onClose();
        onCloseDrawerAltogether();

        break;
      case 'Next':
        setIsFirst(false);
        setCurrentSlot(0);
        break;
      case 'Previous':
        setIsFirst(true);
        setSecondNumberEntered(emptyNumber);
        setCurrentSlot(0);
        break;
      default:
        insertLetter(letter);
    }
  };
  const deleteLetter = () => {
    if (currentSlot < 0) {
      return;
    }
    const updatedAttempt = isFirst
      ? [...numberEntered]
      : [...secondNumberEntered];
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

    isFirst
      ? setNumberEntered(updatedAttempt)
      : setSecondNumberEntered(updatedAttempt);
  };

  const insertLetter = (letter: Letter): void => {
    if (currentSlot >= 4) {
      return;
    }
    const letterWithIndex: Letter = {...letter, index: currentSlot};
    const updatedAttempt = isFirst
      ? [...numberEntered]
      : [...secondNumberEntered];
    updatedAttempt[currentSlot] = letterWithIndex;
    isFirst
      ? setNumberEntered(updatedAttempt)
      : setSecondNumberEntered(updatedAttempt);
    setCurrentSlot(currentSlot + 1);
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
            onValueChange={value => setModeHandler(value)}
            value={isEnabled}
            accessibilityLabel="hardmode"
            style={styles.switch}
          />
        </View>
      )}
      <InputRow
        currentAttempt={isFirst ? numberEntered : secondNumberEntered}
      />
      <View>
        {answers[parseNumber(isFirst ? numberEntered : secondNumberEntered)] ===
        undefined ? (
          <Text style={styles.bold}>
            No such index, we will choose a random answer
          </Text>
        ) : (
          <View>
            <Text style={styles.regularText}>
              The answer you are choosing is{' '}
            </Text>
            <Text style={styles.bold}>
              {
                answers[
                  parseNumber(isFirst ? numberEntered : secondNumberEntered)
                ]
              }
            </Text>
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
