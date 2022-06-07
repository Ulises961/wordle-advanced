import React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import Button from './Button';
const BackButton = ({pressHandler}: {pressHandler: () => void}) => {
  const screenWidth = useWindowDimensions().width;
  const styles = StyleSheet.create({
    backButton: {
      width: screenWidth,
      alignSelf:'flex-start',

    },
    backButtonText: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 25,
      padding: 10,
      textAlign: 'left',
      alignSelf:'flex-start'
    },

  });
  return (
    <Button
      style={styles.backButton}
      pressHandler={pressHandler}
      content={'<- Back'}
      contentStyle={styles.backButtonText}
    />
  );
};

export default BackButton;
