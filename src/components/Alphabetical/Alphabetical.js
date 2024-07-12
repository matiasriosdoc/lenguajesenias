import React, { useRef } from 'react';
import { View, Alert } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import ImageBackground from '../shared/ImageBackground';
import { Card } from '../shared/Card';
import List from '../shared/List';
import { BaseHeader } from '../shared/BaseHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PAGES } from '../../constants/';
import I18n from '../../res/i18n/i18n';

import CATEGORIES_INDEX from '../../categoriesIndex';
import { ALPHABETICAL_CATEGORY_NAME_ES } from '../../constants/index';

import styles from './styles';

export const NavigationOptions = ({ navigation }) => ({
  ...BaseHeader,
  title: I18n.t('alphabetical_tab_title'),
  headerRight: () => (
    <Ionicons
      name="ios-help-circle-outline"
      size={26}
      style={styles.infoIcon}
      onPress={() => navigation.setParams({ showDialog: true })}
    />
  ),
});

export function Alphabetical({ navigation, route }) {
  const videos = CATEGORIES_INDEX.categories.find(category => {
    return category.name_es === ALPHABETICAL_CATEGORY_NAME_ES;
  }).videos;

  const scrollRef = useRef(null);

  useScrollToTop(scrollRef);

  const _navigateToVideo = video => {
    navigation.navigate(PAGES.PAGE_VIDEO_PLAYER, { video });
  };

  const renderItem = ({ item }) => (
    <Card
      key={item.name_es}
      src={item.image}
      onPress={() => _navigateToVideo(item)}
      name={item.name_es}
    />
  );

  return (
    <View style={styles.full}>
      <ImageBackground src={require('../../res/background/fondo-amarillo.jpg')}>
        <List data={videos} scrollRef={scrollRef} renderItem={renderItem} />
        {route.params?.showDialog &&
          Alert.alert(
            I18n.t('alphabetical_tab_title').toUpperCase(),
            I18n.t('alphabetical_dialog_description').toUpperCase(),
            [
              {
                text: 'OK',
                onPress: () => navigation.setParams({ showDialog: false }),
              },
            ],
            { cancelable: false },
          )}
      </ImageBackground>
    </View>
  );
}
