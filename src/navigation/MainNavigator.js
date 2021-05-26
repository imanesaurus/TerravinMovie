import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {Home, Splash} from '../screens';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const {isConnected} = useSelector(state => state.start);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isConnected ? (
        <Stack.Screen name="Splash" component={Splash} />
      ) : (
        <Stack.Screen name="Home" component={Home} />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
