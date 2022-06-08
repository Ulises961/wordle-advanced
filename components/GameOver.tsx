import React, { useEffect } from 'react';
import {
  Share,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Button from '../elements/Button';
import { GameResultMsg } from '../elements/ResultMessage';
import { chooseGameType } from '../redux/actions/app.actions';
import { quit, startGame } from '../redux/actions/game.actions';
import { RootState } from '../redux/combineReducer';
import { Game, gameEnum, Letter, mode } from '../utils/types';
import * as Haptics from 'expo-haptics';
import { gameToShare } from '../utils/game.lib';
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
  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch((e) =>
      console.error(e)
    );
  }, []);

  const dispatch = useDispatch();
  const { gameType } = useSelector((state: RootState) => state.app);
  const currentGame = useSelector((state: RootState) => state.game.currentGame);
  const attempts = currentGame.flatMap((eachGame: Game) => eachGame.attempts);
  const isWordle = gameType === gameEnum.wordle;

  const onShare = async (attempts: Letter[][]) => {
    try {
      const result = await Share.share({
        message: gameToShare(attempts),
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const quiteGameHandler = () => {
    dispatch(quit());
    dispatch(chooseGameType(gameEnum.quit));
  };
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
            pressHandler={quiteGameHandler}
            content={"That's enough"}
            style={[styles.button, styles.quit]}
          />
          <Button
            pressHandler={() => onShare(attempts)}
            content={'Share your Game!'}
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
    flex: 1,
    maxHeight: 50,
  },
});
