import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

export function CloseButton(props) {
  const { onPress, text } = props;
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    backgroundColor: '#01A0C6',
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'nunito',
    fontSize: Dimensions.get('window').width / 20,
    color: '#FFFFFF',
  },
});
