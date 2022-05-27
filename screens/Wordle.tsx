import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import GameScreen from './GameScreen';
import {newGame} from '../utils/lib';
import Settings from '../components/Settings';
import {Game, mode} from '../utils/types';

const Wordle = ({
  keepPlaying,
  gamesPlayed,
  addToHistory,
}: {
  keepPlaying: (value: string) => void;
  gamesPlayed: Game[];
  addToHistory: (game: Game) => void;
}) => {
  const game = newGame(mode.normal);
  const [currentGame, setCurrentGame] = useState<Game[]>([game]);

  const setNewGame = (gameMode: mode, index?: number) => {
    const createdGame = newGame(gameMode, index);
    setCurrentGame([createdGame]);
  };

  const [openSettings, setOpenSettings] = useState<boolean>(false);
  // console.log('Wordle component');

  return openSettings ? (
    <View style={[styles.container, styles.navigationContainer]}>
      <Settings
        closeSettings={() => setOpenSettings(false)}
        startNewGame={setNewGame}
        gamesPlayed={gamesPlayed}
        quitGame={() => keepPlaying('No')}
        isWordle={true}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setOpenSettings(true)}>
          <Text style={styles.hamburger}>≡</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <GameScreen
          passedGames={currentGame}
          setGames={setCurrentGame}
          quitGame={() => keepPlaying('No')}
          startNewGames={setNewGame}
          addToHistory={addToHistory}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  hamburger: {
    fontSize: 60,
    alignSelf: 'flex-end',
    marginRight: 5,
  },
  header: {
    flex: 1,
    alignSelf: 'flex-end',
  },
  main: {
    flex: 9,
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
});

export default Wordle;
