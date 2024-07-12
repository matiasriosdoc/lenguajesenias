import { Dimensions } from 'react-native';

export const deviceIsInLandscapeMode = () => {
  return Dimensions.get('window').width > Dimensions.get('window').height;
};

export const deviceIsTablet = () => {
  return Dimensions.get('window').width > 600;
};
