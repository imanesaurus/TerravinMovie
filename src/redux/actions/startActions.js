import NetInfo from '@react-native-community/netinfo';
import {
  GET_NET_INFO_REQUEST,
  GET_NET_INFO_REQUEST_FAIL,
  GET_NET_INFO_REQUEST_SUCCESS,
} from '../constants';

export const getNetInfo = () => {
  return async dispatch => {
    console.log(GET_NET_INFO_REQUEST);
    NetInfo.fetch().then(state => {
      // CHECK INTERNET STATE
      // console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected);
      if (state.isInternetReachable === true) {
        console.log(GET_NET_INFO_REQUEST_SUCCESS);
        dispatch({
          type: GET_NET_INFO_REQUEST_SUCCESS,
          payload: {isLoading: false, isConnected: true},
        });
      } else {
        console.log(GET_NET_INFO_REQUEST_FAIL);
        dispatch({
          type: GET_NET_INFO_REQUEST_FAIL,
          payload: {
            isLoading: false,
            isConnected: false,
            error: 'No Internet Connection. Please check your connection',
          },
        });
      }
    });
  };
};
