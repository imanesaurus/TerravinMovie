import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from '../../components/Toast';
import {Colors, Fonts, Sizes} from '../../constants/theme';
import {
  getMovieDataFromStorage,
  getMovieList,
} from '../../redux/actions/homeActions';
import {Separator} from './components';

moment.locale('id');

const Home = () => {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);

  const [reload, setIsReload] = useState(false);
  const [dataIsUpdate, setDataIsUpdate] = useState(false);

  const {isLoadingMovieList} = useSelector(state => state.home);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();

  React.useEffect(() => {
    async function getData() {
      try {
        dispatch(getMovieDataFromStorage()).then(data => {
          setMovies(data);
        });

        setTimeout(() => setIsReload(false), 1000);
      } catch (error) {
        console.log('Fetch data fail', error);
      }
    }

    // Check if reload update data from storage
    // if isn't just fetch data from API
    if (reload) {
      getData();
    } else {
      dispatch(getMovieList()).then(() => getData());
    }

    const interval = setInterval(async () => {
      // Get movie list from api and set data to local
      // every 60s
      await dispatch(getMovieList());
      await setDataIsUpdate(true);
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch, reload]);

  function renderMovieList() {
    return (
      <FlatList
        data={movies?.slice(0, 10)}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <Animated.View
              style={[styles.cardContainer, {opacity: fadeAnim}]}
              key={index}>
              <View style={styles.contentWrapper}>
                <Text style={styles.textNumber}>{index + 1}</Text>
                <View style={styles.contentTextWrapper}>
                  <Text style={styles.textJudul}>{item.original_title}</Text>
                  <Text style={styles.textTanggal}>{item.release_date}</Text>
                </View>
              </View>
              <Separator />
            </Animated.View>
          );
        }}
      />
    );
  }

  const toastHandler = async () => {
    setIsReload(true);
    await AsyncStorage.clear();
    setDataIsUpdate(false);
    // try {
    //   await fetchMovies();
    //   setDataIsUpdate(false);
    //   setIsReload(true);
    // } catch (error) {}

    // setTimeout(() => setIsReload(false), 2000);
  };

  return (
    <View style={styles.containerStyle}>
      {/* List Movie  */}
      {reload || isLoadingMovieList ? (
        <ActivityIndicator size={40} color={Colors.secondary} />
      ) : (
        renderMovieList()
      )}
      {dataIsUpdate && (
        <Toast
          type="success"
          text1="Penyimpanan lokal telah diperbarui"
          button
          buttonLabel="TAMPILKAN"
          buttonOnpress={toastHandler}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  contentTextWrapper: {
    flex: 1,
    paddingRight: Sizes.padding,
  },
  textNumber: {
    fontSize: Sizes.h1 * 2,
    color: Colors.white,
    paddingRight: 10,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    width: Sizes.width,
    paddingVertical: Sizes.padding,
  },
  textTanggal: {
    color: Colors.secondary,
    ...Fonts.body2,
  },
  textJudul: {
    color: Colors.white,
    ...Fonts.h1,
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingTop: Sizes.padding,
    paddingLeft: Sizes.padding,
  },
});
