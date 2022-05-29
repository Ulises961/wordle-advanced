import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import BackButton from '../elements/BackButton';
import Button from '../elements/Button';
import { chooseGame, toggleDrawer } from '../redux/actions/app.actions';
import { RootState } from '../redux/combineReducer';
import { Game, gameEnum, mode } from '../utils/types';
import AnswerSetter from './AnswerSetter';
import Help from './Help';
import Stats from './Stats';

const Settings = () => {
  const screenWidth = useWindowDimensions().width;
  const [showSetting, setShowSetting] = useState<string>('');
  const chooseSettingHandler = (value: string) => {
    setShowSetting(value);
  };
  const screen: ViewStyle = {
    flex: 1,
    maxWidth: screenWidth,
  };

  const dispatch = useDispatch();
  const { drawerOpen, gameType } = useSelector((state: RootState) => state.app);

  const isWordle = gameType === gameEnum.wordle;
  // console.log('Settings component');

  switch (showSetting) {
    case 'stats':
      return <Stats onClose={() => chooseSettingHandler('')} />;
    case 'help':
      return <Help onClose={() => chooseSettingHandler('')} />;
    case 'setAnswer':
      return <AnswerSetter onClose={() => chooseSettingHandler('')} />;
    default:
      return (
        <View style={screen}>
          <BackButton
            pressHandler={() => dispatch(toggleDrawer(!drawerOpen))}
          />
          <View style={styles.main}>
            <ScrollView contentContainerStyle={styles.scrollviewStyle}>
              <Button
                style={styles.button}
                pressHandler={() => chooseSettingHandler('stats')}
                content={'Stats'}
                contentStyle={styles.buttonText}
              />
              <Button
                style={styles.button}
                pressHandler={() => chooseSettingHandler('setAnswer')}
                content={'Choose Answer'}
                contentStyle={styles.buttonText}
              />
              {isWordle && (
                <View>
                  <Button
                    style={styles.button}
                    pressHandler={() => {
                      startNewGame(mode.normal);
                      dispatch(toggleDrawer(!drawerOpen));
                    }}
                    content={'Easy'}
                    contentStyle={styles.buttonText}
                  />
                  <Button
                    style={styles.button}
                    pressHandler={() => {
                      startNewGame(mode.hard);
                      dispatch(toggleDrawer(!drawerOpen));
                    }}
                    content={'Hard'}
                    contentStyle={styles.buttonText}
                  />
                </View>
              )}
              <Button
                style={styles.button}
                pressHandler={() => chooseSettingHandler('help')}
                content={'Help'}
                contentStyle={styles.buttonText}
              />
              <Button
                style={styles.button}
                pressHandler={() => dispatch(chooseGame(gameEnum.quit))}
                content={'Quit'}
                contentStyle={styles.buttonText}
              />
            </ScrollView>
          </View>
        </View>
      );
  }
};

export default Settings;
const styles = StyleSheet.create({
  main: {
    flex: 2,
  },
  scrollviewStyle: { alignItems: 'center', justifyContent: 'center' },

  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },

  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
});
