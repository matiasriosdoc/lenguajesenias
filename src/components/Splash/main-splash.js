import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import ImageBackground from '../shared/ImageBackground';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flex: 0.45,
  },
});

export default function SplashScreen() {
  return (
    <ImageBackground
      src={require('../../res/background/fondo-amarillo.jpg')}
      style={styles.container}
      resizeMode="cover">
      <Image
        style={styles.logo}
        source={require('../../res/icon/logo-app.png')}
        resizeMode="contain"
      />
    </ImageBackground>
  );
}
