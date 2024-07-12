import { Dimensions, Platform, StatusBar } from 'react-native';
import { deviceIsInLandscapeMode } from './deviceUtil';

export const getCardPadding = () => {
  return 6;
};

export const getCardsPerRow = () => {
  if (deviceIsInLandscapeMode()) {
    return 4;
  }
  return 2;
};

export const getCardWidth = () => {
  return (
    (Dimensions.get('window').width - 2 * getCardPadding()) / getCardsPerRow()
  );
};

export const getStackNavigatorBarHeight = () => {
  if (Platform.OS === 'ios') {
    return 64;
  }
  return 67;
};

export const getTabNavigatorBarHeight = () => {
  if (Platform.OS === 'ios') {
    return 113;
  }
  return 129;
};

export const getScreenHeight = () => {
  if (Platform.OS === 'android') {
    return Dimensions.get('screen').height !==
      Dimensions.get('window').height && StatusBar.currentHeight > 24
      ? Dimensions.get('screen').height - StatusBar.currentHeight
      : Dimensions.get('window').height;
  }
  return Dimensions.get('window').height;
};
