import React from 'react';
import { StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Button from '../elements/Button';
import { GameResultMsg } from '../elements/ResultMessage';
import { chooseGame } from '../redux/actions/app.actions';
import { startGame } from '../redux/actions/game.actions';
import { RootState } from '../redux/combineReducer';
import { gameEnum, mode } from '../utils/types';

const GameOverView = () => {
  const screenWidth = useWindowDimensions().width;
  const main: ViewStyle = {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
  };
  // console.log('GameOverView');
  const dispatch = useDispatch();
  const { gameType } = useSelector((state: RootState) => state.app);
  const isWordle = gameType === gameEnum.wordle;
  return (
    <View style={main}>
      <GameResultMsg />
      {
        <View style={styles.options}>
          <Button
            pressHandler={() => dispatch(startGame(isWordle, mode.normal))}
            content={'Play Again'}
            extraContent={'Normal'}
            style={styles.normalButton}
          />

          {isWordle && (
            <Button
              pressHandler={() => dispatch(startGame(isWordle, mode.hard))}
              content={'Play Again'}
              extraContent={'Hard'}
              style={styles.hardButton}
            />
          )}
        </View>
      }
      <View style={styles.quitOption}>
        <Button
          pressHandler={() => dispatch(chooseGame(gameEnum.quit))}
          content={"That's enough"}
          style={styles.quit}
        />
      </View>
    </View>
  );
};

export default GameOverView;

const styles = StyleSheet.create({
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
