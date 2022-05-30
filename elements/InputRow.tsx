import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import uuid from 'react-native-uuid';
import Row from './Row';
import { BgCyan, Letter, Reset } from '../utils/types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/combineReducer';

const InputRow = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  const { attempt } = useSelector((state: RootState) => state.app);

  return (
    <Row key={uuid.v4().toString()} style={style}>
      {attempt.map((letter) => {
        return (
          <View
            key={letter.character + uuid.v4()}
            style={[
              styles.letterBox,
              { backgroundColor: letter.character === ' ' ? BgCyan : Reset },
            ]}
          >
            <Text>{letter.character}</Text>
          </View>
        );
      })}
    </Row>
  );
};

export default InputRow;
const styles = StyleSheet.create({
  letterBox: {
    flex: 1,
    height: 45,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
