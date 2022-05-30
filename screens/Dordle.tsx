import React, { useEffect, useState } from 'react';
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
import { newGame } from '../utils/lib';
import Settings from '../components/Settings';
import { Game, gameEnum, mode } from '../utils/types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/combineReducer';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../redux/actions/app.actions';

const Dordle = () => {
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;
  const mainFlex: ViewStyle = { flex: screenWidth > screenHeight ? 6 : 11 };
  const { drawerOpen } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  // console.log('Dordle component');


  return drawerOpen ? (
    <View style={styles.container}>
      <Settings />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => dispatch(toggleDrawer(!drawerOpen))}>
          <Text style={styles.hamburger}>≡</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.main, mainFlex]}>
        <GameScreen />
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
