import * as Progress from 'react-native-progress';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Dimensions, View, Image, ScrollView } from 'react-native';
import ImageBackground from '../shared/ImageBackground';
import RNFS from 'react-native-fs';
import Video from '../shared/Video';
import { getCardWidth, getCardPadding } from './../../util/layoutUtil';
import { styles } from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PAGES } from './../../constants/';

import categoriesIndex from './../../categoriesIndex';

// Analytics
import analytics from '@react-native-firebase/analytics';
import { BaseHeader } from '../shared/BaseHeader';
const Analytics = analytics();

export const NavigationOptions = {
  ...BaseHeader,
  headerTruncatedBackTitle: '',
  //headerTruncatedBackTitle: I18n.t('back'), //https://github.com/react-navigation/react-navigation/issues/8594
  title: 'Testing',
};

export function VideoPlayer({ navigation, route }) {
  const video = route.params.video;
  const videoName = video.video.split('/').pop();
  const videoPath = `${RNFS.DocumentDirectoryPath}/${videoName}`;
  const videoCategory = categoriesIndex.categories.find(cat =>
    cat.videos.some(cvideo => cvideo.video === video.video),
  );
  const videoIndex = videoCategory.videos.findIndex(
    v => v.video === video.video,
  );

  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  const _onEnd = () => {
    Analytics.logEvent('video_played', { video: videoName });
  };

  useEffect(() => {
    navigation.setOptions({ title: video.name_es });
  }, [navigation, video.name_es]);

  useFocusEffect(
    React.useCallback(() => {
      RNFS.exists(videoPath).then(existingFile => {
        if (!existingFile) {
          setShow(false);
          RNFS.downloadFile({
            fromUrl: video.video,
            toFile: videoPath,
            begin: () => {}, //https://github.com/itinance/react-native-fs/issues/905
            progress: res => {
              const percent = res.bytesWritten / res.contentLength;
              setProgress(percent);
            },
          }).promise.then(() => {
            setProgress(0);
            setShow(true);
          });
        } else {
          setShow(true);
        }
      });
    }, [video.video, videoPath]),
  );

  const _goToPreviousVideo = () => {
    const prevVideo = videoCategory.videos[videoIndex - 1];
    navigation.navigate(PAGES.PAGE_VIDEO_PLAYER, { video: prevVideo });
  };

  const _goToNextVideo = () => {
    const nextVideo = videoCategory.videos[videoIndex + 1];
    navigation.navigate(PAGES.PAGE_VIDEO_PLAYER, { video: nextVideo });
  };

  const _checkIfLastVideo = () => {
    const nextVideo = videoCategory.videos[videoIndex + 1];
    return nextVideo !== undefined;
  };

  return show ? (
    <View style={styles.full}>
      <ImageBackground
        src={require('./../../res/background/fondo-amarillo.jpg')}>
        <ScrollView>
          <Video uri={`file://${videoPath}`} onEnd={_onEnd} autoPlay={true} />
          <View style={styles.content}>
            <View style={[styles.arrow, styles.arrowLeft]}>
              {videoIndex !== 0 && (
                <MaterialCommunityIcons
                  name="arrow-left-bold-circle"
                  size={60}
                  style={styles.arrowColor}
                  onPress={_goToPreviousVideo}
                />
              )}
            </View>
            <View
              style={[
                styles.cardContainer,
                {
                  width: getCardWidth(),
                  height: getCardWidth(),
                  padding: getCardPadding(),
                  marginLeft:
                    (Dimensions.get('window').width - getCardWidth()) / 2,
                  marginBottom: getCardPadding() * 2,
                },
              ]}>
              <Image
                style={[
                  styles.cardImage,
                  {
                    width: getCardWidth() - 2 * getCardPadding(),
                    height: getCardWidth() - 2 * getCardPadding(),
                  },
                ]}
                source={video.image}
              />
            </View>
            <View style={[styles.arrow, styles.arrowRight]}>
              {_checkIfLastVideo() && (
                <MaterialCommunityIcons
                  name="arrow-right-bold-circle"
                  size={60}
                  style={styles.arrowColor}
                  onPress={_goToNextVideo}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  ) : (
    <View style={styles.loader}>
      <Progress.Circle color="green" progress={progress} size={150} showsText />
    </View>
  );
}
