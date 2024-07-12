import React from 'react';
import { View } from 'react-native';
import CategoriesDownload from './DownloadComponents';
import { BaseHeader } from '../shared/BaseHeader';
import I18n from '../../res/i18n/i18n';
import styles from './styles';

export const NavigationOptions = {
  ...BaseHeader,
  title: I18n.t('download_tab_title').toUpperCase(),
};

export const Download = ({ navigation }) => (
  <View style={styles.full}>
    <CategoriesDownload navigation={navigation} />
  </View>
);
