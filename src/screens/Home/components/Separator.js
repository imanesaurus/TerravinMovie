import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Sizes} from '../../../constants/theme';

const Separator = () => {
  // Separator components
  return <View style={styles.separatorStyle} />;
};

export default Separator;

const styles = StyleSheet.create({
  separatorStyle: {
    width: '100%',
    height: Sizes.radius,
    backgroundColor: 'white',
    marginVertical: Sizes.radius,
  },
});
