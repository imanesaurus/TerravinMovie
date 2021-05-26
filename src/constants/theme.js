import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const Colors = {
  primary: '#231e1f',
  secondary: '#ed1d24',
  gray: '#909297',
  white: '#fcfcfc',
  green: '#1ded35',
};

export const Layout = {
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export const Sizes = {
  h1: 30,
  h2: 20,

  width,
  height,

  padding: 20,
  radius: 5,
};

export const Fonts = {
  h1: {fontFamily: 'Roboto-Black', fontSize: Sizes.h1, lineHeight: 36},
  h2: {fontFamily: 'Roboto-Bold', fontSize: Sizes.h2, lineHeight: 30},

  body1: {
    fontFamily: 'Roboto-Regular',
    fontSize: Sizes.h1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'Roboto-Regular',
    fontSize: Sizes.h2,
    lineHeight: 30,
  },
};
