import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import BackButton from '../elements/BackButton';
import Button from '../elements/Button';
import { setSavedHistory } from '../redux/actions/game.actions';
import { RootState } from '../redux/combineReducer';
import { setHistory } from '../utils/asyncStorage';
import { gameToString, gameWonIn, generateStats } from '../utils/game.lib';

const Stats = ({ onClose }: { onClose: () => void }): JSX.Element => {
  const { gameHistory } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();
  // gameHistory.map((game) => {
  //   console.log('Stats:', gameToString(game));
  // });

  const stats = generateStats(gameHistory);

  return (
    <View style={styles.main}>
      <BackButton pressHandler={onClose} />
      <View style={styles.stats}>
        {gameHistory.length > 0 ? (
          <View style={styles.values}>
            {Object.entries(stats).map(([key, value]) => {
              // console.log(key, value);

              return (
                <GameStat
                  key={key}
                  header={key}
                  content={
                    key.includes('Total')
                      ? value
                      : `${gameWonIn(value, stats['Total Won'])}%`
                  }
                />
              );
            })}
          </View>
        ) : (
          <View style={styles.stats}>
            <Text style={styles.normalText}>No stats gathered so far...</Text>
          </View>
        )}
      </View>
      <Button
        content="Reset history"
        pressHandler={() => {
          dispatch(setSavedHistory([]));
          setHistory([]);
        }}
      />
    </View>
  );
};
export default Stats;

const GameStat = ({
  header,
  content,
}: {
  header: string;
  content: string;
}): JSX.Element => {
  return (
    <View style={styles.section}>
      <Text style={styles.normalText}>
        {header + ' '} <Text style={styles.value}>{content}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    borderBottomWidth: 1,
    borderColor: 'black',
    borderStyle: 'dashed',
    padding: 10,
    margin: 2,
    
  },
  value: {
    padding: 16,
    fontSize: 20,
    fontWeight: 'bold',

  },
  main: {
    flex: 1,
    marginTop: 40,
    width:'100%'

  },

  normalText: {
    fontSize: 18,
  },

  stats: {
    flex: 9,
    justifyContent: 'center',
    width:'100%'
    

  },
  values: {
    marginBottom: 10,
    width:'100%'

  },
});
