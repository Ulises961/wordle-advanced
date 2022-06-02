import React, {  } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import {
  generateCharArray,
} from '../utils/game.lib';
import { BackSpaceKey, EmptyKey, ReturnKey } from '../utils/specialKeys';
import { Letter, Reset } from '../utils/types';
import KeyRows from '../elements/KeyRows';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/combineReducer';

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});

export const Keyboard = ({
  lettersUsed,
  onKeyPress,
  style,
}: {
  lettersUsed: [Letter[], Letter[]] | [Letter[], undefined];
  onKeyPress: (letter: Letter) => void;
  style: StyleProp<ViewStyle>;
}) => {
  const [localKeyboard, localKeyboard2] = lettersUsed;
  const {keyboard,secondKeyboard} = useSelector((state:RootState)=> state.app)
  
  const first = keyboard.slice(0, 10);
  const second = keyboard.slice(10, 19).concat(BackSpaceKey);
  const third = [EmptyKey]
    .concat(keyboard.slice(19, 26))
    .concat(ReturnKey);

  return (
    <View style={[styles.stack, style]}>
      <KeyRows
        rows={[first, second, third]}
        localKeyboard2={secondKeyboard}
        onKeyPress={onKeyPress}
      />
    </View>
  );
};

export const Keypad = ({
  style,
  onKeyPress,
}: {
  style: StyleProp<ViewStyle>;
  onKeyPress: (letter: Letter) => void;
}) => {
  const fourth = [EmptyKey]
    .concat(generateCharArray('0', Reset))
    .concat([BackSpaceKey]);
  const third = generateCharArray('123', Reset);
  const second = generateCharArray('456', Reset);
  const first = generateCharArray('789', Reset);

  return (
    <View style={[styles.stack, style]}>
      <KeyRows rows={[first, second, third, fourth]} onKeyPress={onKeyPress} />
    </View>
  );
};
