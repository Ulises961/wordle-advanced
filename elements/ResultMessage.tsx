import { StyleSheet, Text, View } from 'react-native';
import { sortByIndex, toString } from '../utils/lib';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/combineReducer';

export const GameResultMsg = (): JSX.Element => {
  const { currentGame } = useSelector((state: RootState) => state.game);

  if (currentGame.length > 1) {
    if (currentGame[0].guessed && currentGame[1].guessed) {
      return (
        <View>
          <Text style={styles.backButtonText}>
            You have won the dordle challenge!
          </Text>
        </View>
      );
    } else if (
      (currentGame[0].guessed && !currentGame[1].guessed) ||
      (!currentGame[0].guessed && currentGame[1].guessed)
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
            {toString(sortByIndex(currentGame[0].answer))}
            and to the second {toString(sortByIndex(currentGame[0].answer))}
          </Text>
        </View>
      );
    }
  } else {
    if (currentGame[0].guessed) {
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
            The answer was {toString(sortByIndex(currentGame[0].answer))}
          </Text>
        </View>
      );
    }
  }
};
const styles = StyleSheet.create({
  backButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft: 10,
    textAlign: 'center',
  },
});
