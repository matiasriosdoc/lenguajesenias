import { StyleSheet } from 'react-native';
import Colors from '../../res/colors';

const infoIconMagin = 10;
export default StyleSheet.create({
  full: {
    flex: 1,
    paddingVertical: 15,
  },
  infoIcon: {
    color: Colors.THEME_SECONDARY,
    margin: infoIconMagin,
  },
});
