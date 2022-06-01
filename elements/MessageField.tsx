import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Message = ({
  heading,
  content,
}: {
  heading: string;
  content?: string;
}) => {
  return (
    <View>
      <Text style={styles.backButtonText}>{heading}</Text>
      <Text style={styles.backButtonText}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft: 10,
    textAlign: 'center',
  },
});
export default Message;
