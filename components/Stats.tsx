import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import BackButton from '../elements/BackButton';
import { RootState } from '../redux/combineReducer';
import { gameWonIn, generateStats } from '../utils/lib';

const Stats = ({ onClose }: { onClose: () => void }): JSX.Element => {
  const { gameHistory } = useSelector((state: RootState) => state.game);
  const stats = generateStats(gameHistory);

  return (
    <View style={styles.main}>
      <BackButton pressHandler={onClose} />
      <View style={styles.stats}>
  
        {gameHistory.length > 0 ? (
          <View style={styles.values}>
            {Object.entries(stats).map(([key, value]) => {
              return (
                <GameStat
                  key={key}
                  header={key}
                  content={
                    key.includes('Total')
                      ? value
                      : `${gameWonIn(value, gameHistory.length)}%`
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
    textAlign: 'center',
  },
  main: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },

  normalText: {
    fontSize: 18,
  },

  stats: {
    flex: 9,
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  values: {
    marginBottom: 10,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
});
