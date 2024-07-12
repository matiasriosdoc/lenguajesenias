import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export const Message = props => (
  <View pointerEvents="none" style={styles.videosMessageContainer}>
    <Text style={styles.videosFoundMessage}>{props.children}</Text>
  </View>
);
