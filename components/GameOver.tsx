import React from 'react';
import { StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Button from '../elements/Button';
import { GameResultMsg } from '../elements/ResultMessage';
import { chooseGame, chooseGameType } from '../redux/actions/app.actions';
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
            style={[styles.button, styles.normalButton]}
          />

          {isWordle && (
            <Button
              pressHandler={() => dispatch(startGame(isWordle, mode.hard))}
              content={'Play Again'}
              extraContent={'Hard'}
              style={[styles.button, styles.hardButton]}
            />
          )}

          <Button
            pressHandler={() => dispatch(chooseGameType(gameEnum.quit))}
            content={"That's enough"}
            style={[styles.button, styles.quit]}
          />
        </View>
      }
    </View>
  );
};

export default GameOverView;

const styles = StyleSheet.create({
  normalButton: {
    backgroundColor: '#44AACC',
  },

  hardButton: {
    backgroundColor: '#338899',
  },

  options: {
    flex: 2,
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  quit: {
    backgroundColor: '#94BFD2',
  },
  button: {
    margin: 5,
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    flex:1
  },
});
