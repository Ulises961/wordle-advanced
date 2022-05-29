import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { BackSpaceKey, ReturnKey } from '../utils/specialKeys';
import React from 'react';
import { Letter } from '../utils/types';
export const Key = ({
  letter,
  secondLetter,
  onPress,
}: {
  letter: Letter;
  secondLetter?: Letter;
  onPress: (letter: Letter) => void;
  style?: StyleProp<ViewStyle>;
}) => {

  const box1: ViewStyle = {
    backgroundColor: letter.color,
    flex: 1,
  };
  const box2: ViewStyle = {
    backgroundColor: secondLetter ? secondLetter.color : letter.color,
    flex: 1,
  };
  return (
    <View style={keyStyle.box}>
      <TouchableOpacity
        onPress={() => onPress(letter)}
        style={keyStyle.touchableArea}
      >
        <View style={keyStyle.container}>
          <View style={box1} />
          {letter.character === ReturnKey.character ||
          letter.character === BackSpaceKey.character ? (
            <View style={[box2, { backgroundColor: letter.color }]} />
          ) : (
            <View style={box2} />
          )}
        </View>
        <Text style={[keyStyle.key]}>{letter.character}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Key;
const keyStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
  },
  key: {
    fontSize: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  touchableArea: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
