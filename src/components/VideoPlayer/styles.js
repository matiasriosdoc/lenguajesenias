import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  cardImage: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  full: {
    flex: 1,
    paddingVertical: 15,
  },
  content: {
    alignContent: 'space-between',
  },
  arrow: {
    position: 'absolute',
    bottom: 40,
  },
  arrowLeft: {
    left: 30,
  },
  arrowRight: {
    right: 30,
  },
  arrowColor: {
    color: '#5D5D5D',
  },
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export { styles };
