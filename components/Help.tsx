import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BackButton from '../elements/BackButton';
import {commandDescriptions} from '../utils/lib';

const Help = ({onClose}: {onClose: () => void}): JSX.Element => {
  return (
    <View style={styles.main}>
      <BackButton pressHandler={onClose} />
      <View style={styles.commands}>
        {commandDescriptions.map(command => {
          return (
            <View
              key={command.command + command.desc}
              style={styles.singularCommand}>
              <Text style={styles.bold}>{command.command}</Text>
              <Text style={styles.regularText}>{command.desc}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Help;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },

  bold: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'left',
    marginBottom: 3,
  },
  regularText: {
    fontSize: 25,
    textAlign: 'left',
  },
  commands: {
    flex: 9,
    alignContent: 'space-between',
    padding: 9,
  },
  singularCommand: {
    flex: 1,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
  },
});
