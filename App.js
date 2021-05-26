import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Colors} from './src/constants/theme';
import MainNavigator from './src/navigation/MainNavigator';
import homeReducers from './src/redux/reducers/homeReducers';
import startReducers from './src/redux/reducers/startReducers';

const rootReducer = combineReducers({
  start: startReducers,
  home: homeReducers,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
