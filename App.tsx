import { Dispatch } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { chooseGame, chooseGameType } from './redux/actions/app.actions';
import { startGame } from './redux/actions/game.actions';
import { RootState } from './redux/combineReducer';
import store from './redux/store';
import { GameAction } from './redux/types/action.types';

import Dordle from './screens/Dordle';
import Wordle from './screens/Wordle';

import { Game, gameEnum, mode } from './utils/types';

const App = () => {
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;
  const main: ViewStyle = {
    height: screenHeight > screenWidth ? screenHeight : screenWidth,
    margin: 20,
    flex: 1,
    justifyContent: 'space-around',
  };

  const dispatch = useDispatch<Dispatch<GameAction>>();
  const { gameType } = useSelector((state: RootState) => state.app);
  // console.log('app.js');
  const isWordle = true;

  // switch (gameType) {
  // case gameEnum.wordle:
  return <Wordle />;
  // case gameEnum.dordle:
  // return <Dordle />;
  // default:
  //   return (
  //     <View style={main}>
  //       <Text style={styles.h1}>Welcome to Wordle</Text>
  //       <TouchableOpacity
  //         onPress={() => {
  //           console.log(gameEnum.wordle);

  //           dispatch(startGame(isWordle, mode.normal));
  //           dispatch(chooseGameType(gameEnum.wordle));
  //         }}
  //         style={styles.button}
  //       >
  //         <View>
  //           <Text style={styles.text}>Play a Wordle</Text>
  //         </View>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         onPress={() => {
  //           console.log(gameEnum.dordle);

  //           dispatch(startGame(!isWordle, mode.normal));
  //           dispatch(chooseGameType(gameEnum.dordle));
  //         }}
  //         style={styles.button}
  //       >
  //         <View>
  //           <Text style={styles.text}>Play a Dordle</Text>
  //         </View>
  //       </TouchableOpacity>
  //       <View style={styles.empty} />

  //     </View>
  //   );
  // }
};

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
});

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default AppWrapper;
