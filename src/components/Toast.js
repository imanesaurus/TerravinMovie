import React, {useRef} from 'react';
import {Button, StyleSheet, Text, Animated} from 'react-native';
import {Colors, Sizes} from '../constants/theme';

const Toast = ({
  text1,
  button,
  type,
  buttonLabel,
  buttonOnpress,
  setToastShow,
}) => {
  const slideAnim = useRef(new Animated.Value(50)).current;

  const slideIn = () =>
    Animated.spring(slideAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();

  const slideOut = () =>
    Animated.spring(slideAnim, {
      toValue: 60,
      duration: 2000,
      useNativeDriver: true,
    }).start();

  React.useEffect(() => {
    slideIn();
    if (button) {
      // slideout after 5s
      setTimeout(() => slideOut(), 5000);
      setTimeout(() => setToastShow(), 6000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
