import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Dordle from './screens/Dordle';
import Wordle from './screens/Wordle';

import {Game} from './utils/types';

const App = () => {
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;
  const styles = StyleSheet.create({
    text: {
      fontSize: 30,
      textAlign: 'center',
      color: 'white',
    },
    button: {
      backgroundColor: '#2196F3',
      width: '75%',
      alignSelf: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 5,
      padding: 5,
    },
    h1: {
      fontWeight: 'bold',
      fontSize: 35,
      flex: 2,
      textAlign: 'center',
    },
    empty: {
      flex: 2,
    },
    main: {
      height: screenHeight > screenWidth ? screenHeight : screenWidth,
      margin: 20,
      flex: 1,
      justifyContent: 'space-around',
    },
  });

  const [gamesPlayed, setGamesPlayed] = useState<Game[]>([]);

  const [play, setPlay] = useState<string>('');
  const keepPlayingHandler = (value: string) => {
    setPlay(value);
  };
  const addToHistoryHandler = (playedGame: Game) => {
    if (
      gamesPlayed.find((game: Game): boolean => game.id === playedGame.id) ===
      undefined
    ) {
      setGamesPlayed([...gamesPlayed, playedGame]);
    }
  };
  // console.log('app.js');
  switch (play) {
    case 'wordle':
      return (
        <Wordle
          keepPlaying={keepPlayingHandler}
          gamesPlayed={gamesPlayed}
          addToHistory={addToHistoryHandler}
        />
      );
    case 'dordle':
      return (
        <Dordle
          keepPlaying={keepPlayingHandler}
          gamesPlayed={gamesPlayed}
          addToHistory={addToHistoryHandler}
        />
      );
    default:
      return (
        <View style={styles.main}>
          <Text style={styles.h1}>Welcome to Wordle</Text>
          <TouchableOpacity
            onPress={() => keepPlayingHandler('wordle')}
            style={styles.button}>
            <View>
              <Text style={styles.text}>Play a Wordle</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => keepPlayingHandler('dordle')}
            style={styles.button}>
            <View>
              <Text style={styles.text}>Play a Dordle</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.empty} />
        </View>
      );
  }
};
export default App;
