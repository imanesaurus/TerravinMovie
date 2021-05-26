import {
  GET_NET_INFO_REQUEST,
  GET_NET_INFO_REQUEST_FAIL,
  GET_NET_INFO_REQUEST_SUCCESS,
} from '../constants';

const initialState = {
  isConnected: false,
  isLoading: false,
  error: null,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_NET_INFO_REQUEST:
      return {...state, ...payload};
    case GET_NET_INFO_REQUEST_SUCCESS:
      return {...state, ...payload};
    case GET_NET_INFO_REQUEST_FAIL:
      return {...state, ...payload};

    default:
      return state;
  }
};
