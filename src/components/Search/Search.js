import React, { useState, useRef, useCallback } from 'react';
import { useFocusEffect, useScrollToTop } from '@react-navigation/native';
import { searchVideos } from '../../util/searchUtil';
import { Message } from '../Message/Message';
import {
  Dimensions,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PAGES } from './../../constants/';
import Colors from '../../res/colors';
import I18n from '../../res/i18n/i18n';
import { styles, searchInputMaginLeft, searchInputMaginRight } from './styles';
import ImageBackground from '../shared/ImageBackground';
import { Card } from '../shared/Card';
import List from '../shared/List';
import { BaseHeader } from '../shared/BaseHeader';
const searchVideosBackground = require('../../res/background/fondo-verde.jpg');

export const NavigationOptions = ({ navigation, route, ref }) => ({
  ...BaseHeader,
  headerLeft: () => (
    <TextInput
      style={[
        styles.searchInput,
        {
          width:
            Dimensions.get('window').width -
            searchInputMaginLeft -
            searchInputMaginRight,
        },
      ]}
      autoCapitalize="characters"
      underlineColorAndroid="transparent"
      placeholder={I18n.t('search_video').toUpperCase()}
      placeholderTextColor={Colors.THEME_SECONDARY}
      autoFocus={true}
      onChangeText={text => navigation.setParams({ searchQuery: text })}
      value={route.params?.searchQuery || ''}
      ref={innerRef => (this.myTextInput = innerRef)}
    />
  ),
  headerRight: () => (
    <Ionicons
      name={
        route.params?.searchQuery
          ? 'ios-close-circle-outline'
          : 'ios-search-outline'
      }
      size={26}
      style={styles.searchIcon}
      onPress={() => {
        navigation.setParams({ searchQuery: '' });
        this.myTextInput.focus();
      }}
    />
  ),
});

export function Search({ navigation, route }) {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const scrollRef = useRef(null);

  useScrollToTop(scrollRef);

  const updateSearchQuery = useCallback(() => {
    const searchQuery = (route.params?.searchQuery || '').toUpperCase();
    setQuery(searchQuery);
    setVideos(searchVideos(searchQuery));
  }, [route.params]);

  useFocusEffect(updateSearchQuery);

  const _navigateToVideo = video => {
    navigation.navigate(PAGES.PAGE_VIDEO_PLAYER, { video });
  };

  return (
    <View style={styles.full}>
      <TouchableWithoutFeedback
        style={styles.mainContainer}
        onPressIn={() => Keyboard.dismiss()}>
        {query !== '' && videos.length > 0 ? (
          <ImageBackground src={searchVideosBackground}>
            <List
              data={videos}
              scrollRef={scrollRef}
              renderItem={({ item }) => (
                <Card
                  key={item.name_es}
                  src={item.image}
                  onPress={() => _navigateToVideo(item)}
                  name={item.name_es}
                />
              )}
            />
          </ImageBackground>
        ) : (
          <ImageBackground src={searchVideosBackground}>
            {query.length < 1 ? (
              <Message>{I18n.t('find_a_video').toUpperCase()}</Message>
            ) : (
              query.length > 1 &&
              videos.length === 0 && (
                <Message>{I18n.t('no_videos_found').toUpperCase()}</Message>
              )
            )}
          </ImageBackground>
        )}
      </TouchableWithoutFeedback>
    </View>
  );
}

/*
  if (searchString && searchString.length > 1) {
    searchString = removeAccents(searchString);
    const {categories} = CATEGORIES_INDEX;
    const foundVideos = [];
    for (let i = 0; i < categories.length; i++) {
      for (let j = 0; j < categories[i].videos.length; j++) {
        if (
          categories[i].videos[j].search_name_es.indexOf(searchString) !== -1
        ) {
          foundVideos.push(categories[i].videos[j]);
        }
      }
    }
    return foundVideos;
  } else {
    return [];
  }
};*/
