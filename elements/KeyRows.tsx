import Key from './Key';
import { Letter } from '../utils/types';
import Row from './Row';
import uuid from 'react-native-uuid';
import React from 'react';
import { StyleSheet, View } from 'react-native';
const KeyRows = ({
  rows,
  onKeyPress,
  localKeyboard2,
}: {
  rows: Letter[][];
  onKeyPress: (letter: Letter) => void;
  localKeyboard2?: Letter[];
}) => {
  return (
    <View style={styles.main}>
      {rows.map((row: Letter[]): JSX.Element => {
        return (
          <Row key={uuid.v4().toString()}>
            {row.map((letter: Letter) => {
              return (
                <Key
                  key={uuid.v4().toLocaleString()}
                  letter={letter}
                  secondLetter={localKeyboard2?.find((secondLetter: Letter) => {
                    return letter.character === secondLetter.character;
                  })}
                  onPress={() => onKeyPress(letter)}
                />
              );
            })}
          </Row>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  main: { flex: 1 },
});
export default KeyRows;
