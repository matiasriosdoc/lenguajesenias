import * as React from 'react';
import { StyleSheet } from 'react-native';
import ImageBackground from '../shared/ImageBackground';

const styles = StyleSheet.create({
  containterTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logoTransferencia: {
    flex: 2,
    height: '100%',
    width: '100%',
  },
  logoTINC: {
    flex: 1.5,
    width: '75%',
    height: '100%',
  },
  proyecto: {
    flex: 0.3,
  },
  imageContainer: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fundasor: {
    flex: 1,
    height: '50%',
  },
  hexacta: {
    flex: 1,
    marginHorizontal: 15,
  },
});

export default function DaneSplashScreen() {
  return (
    <ImageBackground
      src={require('../../res/image/dane-splash.png')}
      resizeMode="cover"
      style={styles.containterTop}
    />
  );
}
