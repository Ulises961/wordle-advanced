import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
const Button = ({
  style,
  pressHandler,
  content,
  extraContent,
  contentStyle,
}: {
  style?: StyleProp<ViewStyle>;
  pressHandler: () => void;
  content: string;
  extraContent?: string;
  contentStyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <TouchableOpacity onPress={pressHandler} style={style}>
      <View style={styles.backButton}>
        <Text style={[styles.backButtonText, contentStyle]}>
          {content}{'\n'}
          {extraContent ? (
            <Text style={styles.regularText}> {extraContent}</Text>
          ) : null}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    padding: 1,
  },

  backButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign:'center',
  },
  regularText: {
    fontSize: 15,
  },
});

export default Button;
