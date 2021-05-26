import React, {useRef} from 'react';
import {Button, StyleSheet, Text, Animated} from 'react-native';
import {Colors, Sizes} from '../constants/theme';

const Toast = ({text1, button, type, buttonLabel, buttonOnpress}) => {
  const slideAnim = useRef(new Animated.Value(50)).current;

  Animated.spring(slideAnim, {
    toValue: 0,
    duration: 2000,
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: type === 'success' ? Colors.green : Colors.secondary,
          transform: [{translateY: slideAnim}],
        },
      ]}>
      <Text style={{color: Colors.white}}>{text1}</Text>
      {button && (
        <Button
          title={buttonLabel}
          color={Colors.secondary}
          onPress={buttonOnpress}
        />
      )}
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingVertical: Sizes.padding / 2,
  },
});
