import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import Button from '../elements/Button';
import {GameResultMsg} from '../elements/ResultMessage';
import {Game, mode} from '../utils/types';

const GameOverView = ({
  quitGame,
  startNewGame,
  gamesOver,
}: {
  quitGame: () => void;
  startNewGame: (gameMode: mode) => void;
  gamesOver: Game[];
}) => {
  const screenWidth = useWindowDimensions().width;
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: screenWidth,
    },

    normalButton: {
      marginBottom: 20,
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#44AACC',
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

    options: {
      flex: 2,
      flexDirection: 'row',
      alignContent: 'center',
    },
    quit: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      textAlignVertical: 'center',
      textAlign: 'center',
    },
    quitOption: {
      flex: 1,
      borderRadius: 8,
      backgroundColor: '#94BFD2',
    },
  });
  // console.log('GameOverView');

  return (
    <View style={styles.main}>
      <GameResultMsg gameResults={gamesOver} />
      {
        <View style={styles.options}>
          <Button
            pressHandler={() => startNewGame(mode.normal)}
            content={'Play Again'}
            extraContent={'Normal'}
            style={styles.normalButton}
          />

          <Button
            pressHandler={() => startNewGame(mode.hard)}
            content={'Play Again'}
            extraContent={'Hard'}
            style={styles.hardButton}
          />
        </View>
      }
      <View style={styles.quitOption}>
        <Button
          pressHandler={quitGame}
          content={"That's enough"}
          style={styles.quit}
        />
      </View>
    </View>
  );
};

export default GameOverView;
