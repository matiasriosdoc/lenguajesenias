import { StyleSheet } from 'react-native';
import Colors from './../../res/colors';

const noResultsMessageHorizontalMargin = 30;

const styles = StyleSheet.create({
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
});

export { styles };
