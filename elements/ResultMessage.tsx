import {StyleSheet, Text, View} from 'react-native';
import {sortByIndex, toString} from '../utils/lib';
import React from 'react';
import {Game} from '../utils/types';

export const GameResultMsg = ({
  gameResults,
}: {
  gameResults: Game[];
}): JSX.Element => {
  const styles = StyleSheet.create({
    backButtonText: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 15,
      paddingLeft: 10,
      textAlign: 'center',
    },
  });
  if (gameResults.length > 1) {
    if (gameResults[0].guessed && gameResults[1].guessed) {
      return (
        <View>
          <Text style={styles.backButtonText}>
            You have won the dordle challenge!
          </Text>
        </View>
      );
    } else if (
      (gameResults[0].guessed && !gameResults[1].guessed) ||
      (!gameResults[0].guessed && gameResults[1].guessed)
    ) {
      return (
        <View>
          <Text style={styles.backButtonText}>Not so bad!</Text>
          <Text style={styles.backButtonText}>
            One out of two is still a success!
          </Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.backButtonText}>You have lost!</Text>
          <Text style={styles.backButtonText}>
            The answer to the first one was{' '}
            {toString(sortByIndex(gameResults[0].answer))}
            and to the second {toString(sortByIndex(gameResults[0].answer))}
          </Text>
        </View>
      );
    }
  } else {
    if (gameResults[0].guessed) {
      return (
        <View>
          <Text style={styles.backButtonText}>You have won!</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.backButtonText}>You have lost!</Text>
          <Text style={styles.backButtonText}>
            The answer was {toString(sortByIndex(gameResults[0].answer))}
          </Text>
        </View>
      );
    }
  }
};
