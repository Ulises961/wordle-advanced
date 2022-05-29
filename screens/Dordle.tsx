import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  //   useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import GameScreen from './GameScreen';
import {newGame} from '../utils/lib';
import Settings from '../components/Settings';
import {Game, mode} from '../utils/types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/combineReducer';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../redux/actions/app.actions';

const Dordle = ({
  keepPlaying,
  gamesPlayed,
  addToHistory,
}: {
  keepPlaying: (value: string) => void;
  gamesPlayed: Game[];
  addToHistory: (currentGame: Game) => void;
}) => {
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;
  const mainFlex: ViewStyle = {flex: screenWidth > screenHeight ? 6 : 11};
  const game = newGame(mode.normal);
  const game2 = newGame(mode.normal);
  const [currentGames, setCurrentGames] = useState<Game[]>([game, game2]);

  const setNewGames = (gameMode: mode, index1?: number, index2?: number) => {
    const createdGame1 = newGame(gameMode, index1);
    const createdGame2 = newGame(gameMode, index2);
    setCurrentGames([createdGame1, createdGame2]);
  };


  const {drawerOpen} = useSelector((state:RootState)=> state.app)
  const dispatch = useDispatch();
  // console.log('Dordle component');

  return drawerOpen ? (
    <View style={styles.container}>
      <Settings
        startNewGame={setNewGames}
        gamesPlayed={gamesPlayed}
        isWordle={false}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() =>dispatch(toggleDrawer(!drawerOpen))}>
          <Text style={styles.hamburger}>≡</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.main, mainFlex]}>
        <GameScreen
          passedGames={currentGames}
          setGames={setCurrentGames}
          quitGame={() => keepPlaying('No')}
          startNewGames={setNewGames}
          addToHistory={addToHistory}
        />
      </View>
    </View>
  );
};

export default Dordle;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  hamburger: {
    fontSize: 60,
    alignSelf: 'flex-end',
  },
  header: {
    flex: 1,
    alignSelf: 'flex-end',

    width: '100%',
  },
  main: {
    flexDirection: 'row',
    width: '100%',
  },
});
