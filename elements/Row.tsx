import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import uuid from 'react-native-uuid';

const Row = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <View key={uuid.v4().toString()} style={[styles.row, style]}>
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
  },
});
export default Row;
