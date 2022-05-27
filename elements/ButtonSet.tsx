import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Game, mode} from '../utils/types';

export const ButtonSet = ({
  startNewGame,
}: {
  keepPlaying: (value: string) => void;
  startNewGame: (gameMode: mode) => void;
  gamesOver: Game[];
}): JSX.Element => {
  const styles = StyleSheet.create({
    button: {
      marginBottom: 20,
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#2196F3',
      justifyContent: 'center',
    },
    hardButton: {
      marginBottom: 20,
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#338899',
      borderRadius: 2,
      justifyContent: 'center',
    },
    backButton: {
      alignItems: 'flex-start',
      padding: 1,
    },
    backButtonText: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 15,
      paddingLeft: 10,
    },
    regularText: {
      fontSize: 15,
    },
    options: {
      flex: 2,
      flexDirection: 'row',
      alignContent: 'center',
    },
  });
  return (
    <View style={styles.options}>
      <TouchableOpacity
        onPress={() => startNewGame(mode.normal)}
        style={styles.button}>
        <View style={styles.backButton}>
          <Text style={styles.backButtonText}>
            Play again -<Text style={styles.regularText}> Normal</Text>
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => startNewGame(mode.hard)}
        style={[styles.hardButton]}>
        <View style={styles.backButton}>
          <Text style={styles.backButtonText}>
            Play again - <Text style={styles.regularText}>Hard</Text>
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
