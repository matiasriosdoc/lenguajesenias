import { StyleSheet } from 'react-native';

const margin = 12;

const styles = StyleSheet.create({
  full: {
    flex: 1,
    paddingVertical: 15,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  tincImage: {
    height: 100,
    width: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  daneImage: {
    height: 150,
    width: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  coordinacionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 10,
  },
  textLink: {
    color: 'blue',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
});

export { styles, margin };
