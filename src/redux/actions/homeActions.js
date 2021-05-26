import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  GET_DATA_MOVIE_FROM_STORAGE_REQUEST,
  GET_DATA_MOVIE_FROM_STORAGE_REQUEST_FAIL,
  GET_DATA_MOVIE_FROM_STORAGE_REQUEST_SUCCESS,
  GET_MOVIE_LIST_REQUEST,
  GET_MOVIE_LIST_REQUEST_FAIL,
  GET_MOVIE_LIST_REQUEST_SUCCESS,
} from '../constants';

export const getMovieList = () => {
  return async dispatch => {
    console.log(GET_MOVIE_LIST_REQUEST);
    dispatch({
      type: GET_MOVIE_LIST_REQUEST,
    });

    return new Promise(function (resolve, reject) {
      axios
        .get(
          'https://api.themoviedb.org/3/discover/movie?api_key=f7b67d9afdb3c971d4419fa4cb667fbf',
        )
        .then(res => {
          // SET DATA TO LOCAL STORAGE
          AsyncStorage.setItem('movies', JSON.stringify(res.data.results));
          console.log(GET_MOVIE_LIST_REQUEST_SUCCESS);
          dispatch({
            type: GET_MOVIE_LIST_REQUEST_SUCCESS,
            payload: {isLoadingMovieList: false},
          });
          resolve();
        })
        .catch(err => {
          console.log(GET_MOVIE_LIST_REQUEST_FAIL, err);
          dispatch({
            type: GET_MOVIE_LIST_REQUEST_FAIL,
            payload: {isLoadingMovieList: false},
          });
          reject();
        });
    });
  };
};

export const getMovieDataFromStorage = () => {
  return async dispatch => {
    dispatch({
      type: GET_DATA_MOVIE_FROM_STORAGE_REQUEST,
      payload: {moviesList: []},
    });
    console.log(GET_DATA_MOVIE_FROM_STORAGE_REQUEST);

    return new Promise(async function (resolve, reject) {
      try {
        console.log(GET_DATA_MOVIE_FROM_STORAGE_REQUEST_SUCCESS);
        const localMovieList = await AsyncStorage.getItem('movies');
        resolve(JSON.parse(localMovieList));
      } catch (error) {
        console.log(GET_DATA_MOVIE_FROM_STORAGE_REQUEST_FAIL, error);
        reject(error);
      }
    });
    // dispatch({
    //   type: GET_DATA_MOVIE_FROM_STORAGE_REQUEST_SUCCESS,
    //   payload: {moviesList: JSON.parse(localMovieList)},
    // });

    // } catch (error) {
    //   console.log(GET_DATA_MOVIE_FROM_STORAGE_REQUEST_FAIL);
    //   dispatch({
    //     type: GET_DATA_MOVIE_FROM_STORAGE_REQUEST_FAIL,
    //   });
    // }
  };
};
