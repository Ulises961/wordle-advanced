import {ScrollView, StyleSheet, Text, View, ViewStyle} from 'react-native';
import Row from '../elements/Row';
import React from 'react';
import {generateEmptyRows} from '../utils/lib';
import uuid from 'react-native-uuid';
import {Letter} from '../utils/types';

const Gameboard = ({
  attempts,
  leftAttempts,
}: {
  attempts: Letter[][];
  leftAttempts: number;
}) => {
  const emptyArray = new Array<Letter[]>(0);
  const emptyRows = generateEmptyRows(leftAttempts, 0, emptyArray);
  const emptyBox: ViewStyle = {backgroundColor: '#D3D3D3'};

  return (
    <ScrollView style={styles.stack} key={uuid.v4().toString()}>
      {attempts.map(word => {
        return (
          <Row key={uuid.v4().toString()}>
            {word.map(letter => {
              return (
                <View
                  key={letter.character + uuid.v4()}
                  style={[styles.letterBox, {backgroundColor: letter.color}]}>
                  <Text>{letter.character}</Text>
                </View>
              );
            })}
          </Row>
        );
      })}

      {leftAttempts >= 0 ? (
        <View>
          {emptyRows.map(blankWord => {
            return (
              <Row key={uuid.v4().toString()}>
                {blankWord.map(letter => {
                  return (
                    <View
                      key={letter.character + uuid.v4()}
                      style={[styles.letterBox, emptyBox]}>
                      <Text>{letter.character}</Text>
                    </View>
                  );
                })}
              </Row>
            );
          })}
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    width: '90%',
    marginBottom: 1,
  },
  letterBox: {
    flex: 1,
    minHeight: 35,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 5,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    fontSize: 20,
  },
});
export default Gameboard;
