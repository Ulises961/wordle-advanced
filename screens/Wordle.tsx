import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GameScreen from './GameScreen';
import Settings from '../components/Settings';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/combineReducer';
import { openCloseDrawer } from '../redux/actions/app.actions';

const Wordle = () => {
  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state: RootState) => state.app);


  //  console.log('Wordle component');

  return drawerOpen ? (
    <View style={[styles.container, styles.navigationContainer]}>
      <Settings />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => dispatch(openCloseDrawer(true))}>
          <Text style={styles.hamburger}>≡</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <GameScreen />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:40
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
