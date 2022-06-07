import React, { useState } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Button from '../elements/Button';
import { Game } from '../utils/types';

const Hints = ({ game, index }: { game: Game; index: number }) => {
  const [showHints, setShowHints] = useState<boolean[]>([false, false]);
  const [desperateHints, setShowDesperateHints] = useState<boolean[]>([
    false,
    false,
  ]);
  const hintHandler = (index: number) => {
    const hint = showHints[index];
    const udpdatedShowHints = [...showHints];
    udpdatedShowHints.splice(index, 1, !hint);
    setShowHints(udpdatedShowHints);
  };
  const desperateHintHandler = (index: number) => {
    const updatedDesperateHints = [...desperateHints];
    const desperateHint = desperateHints[index];
    updatedDesperateHints.splice(index, 1, !desperateHint);
    setShowDesperateHints(updatedDesperateHints);
  };
  // console.log('Game hint', game.partOfSpeech);
  // console.log('Game desperate hint', game.extraInfo);

  const hiddenHint: ViewStyle = { height: showHints[index] ? undefined : 0 };
  const hiddenDesperateHint: ViewStyle = {
    height: desperateHints[index] ? undefined : 0,
  };
  return (
    <View style={styles.hints}>
      <View>
        <Button
          pressHandler={() => hintHandler(index)}
          content={'Hint'}
          style={styles.hintButton}
        />
        <Text style={hiddenHint}>
          {showHints[index]
            ? `The word to guess is a(n): ${game.partOfSpeech}`
            : ''}
        </Text>
      </View>
      {6 - game.attempts.length === 1 && (
        <View>
          <Button
            pressHandler={() => desperateHintHandler(index)}
            content={'Desperate hint'}
            style={styles.hintButton}
          />
          <Text style={hiddenDesperateHint}>
            {desperateHints[index] ? `${game.extraInfo}` : ''}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  hintButton: {
    width: '50%',
    alignContent: 'flex-start',
    backgroundColor: '#2196F3',
    fontWeight: 'bold',
    borderRadius: 5,
    maxWidth: 250,
  },
  hints: {
    width: '90%',
  },
});
export default Hints;
