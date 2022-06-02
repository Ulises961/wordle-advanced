import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  return (
    <View style={styles.hints}>
      <View>
        <Button
          pressHandler={() => hintHandler(index)}
          content={'Hint'}
          style={styles.hintButton}
        />
        <Text>
          {showHints[index]
            ? `The word to guess is a(n) ${game.partOfSpeech}`
            : ''}
        </Text>
      </View>
      {1 - game.attempts.length === 1 && (
        <View>
          <Button
            pressHandler={() => desperateHintHandler(index)}
            content={'Desperate hint'}
            style={styles.hintButton}
          />
          <Text>
            {desperateHints[index] ? `The word to guess is ${game.hint}` : ''}
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
    marginBottom: 10,
    maxWidth:250
  },
  hints: {
    width: '90%',
  },
});
export default Hints;
