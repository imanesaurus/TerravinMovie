import {
  GET_DATA_MOVIE_FROM_STORAGE_REQUEST,
  GET_DATA_MOVIE_FROM_STORAGE_REQUEST_FAIL,
  GET_DATA_MOVIE_FROM_STORAGE_REQUEST_SUCCESS,
  GET_MOVIE_LIST_REQUEST,
  GET_MOVIE_LIST_REQUEST_FAIL,
  GET_MOVIE_LIST_REQUEST_SUCCESS,
} from '../constants';

const initialState = {
  moviesList: [],
  isLoadingMovieList: true,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_MOVIE_LIST_REQUEST:
      return {...state, ...payload};
    case GET_MOVIE_LIST_REQUEST_SUCCESS:
      return {...state, ...payload};
    case GET_MOVIE_LIST_REQUEST_FAIL:
      return {...state, ...payload};
    case GET_DATA_MOVIE_FROM_STORAGE_REQUEST:
      return {...state, ...payload};
    case GET_DATA_MOVIE_FROM_STORAGE_REQUEST_SUCCESS:
      return {...state, ...payload};
    case GET_DATA_MOVIE_FROM_STORAGE_REQUEST_FAIL:
      return {...state, ...payload};

    default:
      return state;
  }
};
