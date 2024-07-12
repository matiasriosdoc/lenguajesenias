import React, { useRef } from 'react';
import { View } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import ImageBackground from '../shared/ImageBackground';
import { Card } from '../shared/Card';
import List from '../shared/List';
import CATEGORIES_INDEX from '../../categoriesIndex';
import { PAGES } from '../../constants/';
import { BaseHeader } from '../shared/BaseHeader';
import I18n from '../../res/i18n/i18n';
import styles from './styles';

// Analytics
import analytics from '@react-native-firebase/analytics';
const Analytics = analytics();

export const NavigationOptions = {
  ...BaseHeader,
  title: I18n.t('home_tab_title').toUpperCase(),
};

export function Home({ navigation }) {
  const scrollRef = useRef(null);

  useScrollToTop(scrollRef);

  const _navigateToCategory = category => {
    Analytics.logEvent('category_view', { category: category.name_es });
    navigation.navigate(PAGES.PAGE_CATEGORY, { category });
  };

  const renderItem = ({ item }) => (
    <Card
      key={item.name_es}
      src={item.icon}
      onPress={() => _navigateToCategory(item)}
      name={item.name_es}
    />
  );

  return (
    <View style={styles.full}>
      <ImageBackground src={require('../../res/background/fondo-amarillo.jpg')}>
        <List
          data={CATEGORIES_INDEX.categories}
          scrollRef={scrollRef}
          renderItem={renderItem}
        />
      </ImageBackground>
    </View>
  );
}
