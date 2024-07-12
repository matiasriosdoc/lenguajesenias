import { StyleSheet, Platform } from 'react-native';
import Colors from './../../res/colors';

const searchInputMaginLeft = 10;
const searchIconSize = 26;
const searchIconMaginRight = searchInputMaginLeft;
const searchInputMaginRight =
  searchIconMaginRight + searchIconSize + searchInputMaginLeft;
const noResultsMessageHorizontalMargin = 30;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 15,
  },
  searchInput: {
    marginVertical: 10,
    marginLeft: searchInputMaginLeft,
    marginRight: searchInputMaginRight,
    height: 30,
    paddingBottom: Platform.OS === 'android' ? 6 : 0,
    paddingHorizontal: 5,
    fontSize: 14,
    color: 'black',
    backgroundColor: 'whitesmoke',
  },
  videosMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  videosFoundMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.THEME_PRIMARY,
    marginLeft: noResultsMessageHorizontalMargin,
    marginRight: noResultsMessageHorizontalMargin,
    fontFamily: 'nunito',
  },
  searchIcon: {
    color: Colors.THEME_SECONDARY,
    marginRight: searchIconMaginRight,
  },
  full: {
    flex: 1,
  },
});

export { styles, searchInputMaginLeft, searchInputMaginRight };
