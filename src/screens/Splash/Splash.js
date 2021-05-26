import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from '../../components/Toast';
import {Colors, Layout} from '../../constants/theme';
import {getNetInfo} from '../../redux/actions/startActions';

const Splash = () => {
  const dispatch = useDispatch();

  const {error} = useSelector(state => state.start);

  React.useEffect(() => {
    // SHOW SPLASHSCREEN FOR 3s
    const timeout = setTimeout(() => dispatch(getNetInfo()), 3000);
    return () => clearTimeout(timeout);
  }, [dispatch]);
  return (
    <SafeAreaView style={styles.containerStyle}>
      {/* App title */}
      <Text style={[styles.title]}>Terravin Movie</Text>
      {/* Toast message */}
      {error && <Toast text1={error} type="error" />}
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.white,
  },
  containerStyle: {
    ...Layout.centered,
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
  },
});
