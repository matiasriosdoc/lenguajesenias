import React from 'react';
import {
  Dimensions,
  ImageBackground as NatImgBack,
  StyleSheet,
  Platform,
} from 'react-native';

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  backgroundImageStyle: {
    resizeMode: Platform.OS === 'ios' ? 'repeat' : 'stretch',
  },
});

export default function ImageBackground(props) {
  return (
    <NatImgBack
      style={props.style || styles.full}
      imageStyle={
        props.style
          ? []
          : [
              styles.backgroundImageStyle,
              {
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
              },
            ]
      }
      resizeMode={props.resizeMode}
      source={props.src}>
      {props.children}
    </NatImgBack>
  );
}
