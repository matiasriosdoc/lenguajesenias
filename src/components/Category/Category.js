import * as Progress from 'react-native-progress';
import React, { PureComponent } from 'react';
import {
  View,
  Alert,
  ScrollView,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import ImageBackground from '../shared/ImageBackground';
import { SelectableCard } from '../shared/Card';
import List from '../shared/List';
import { BaseHeader } from '../shared/BaseHeader';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';
import { PAGES } from './../../constants';
import { styles } from './styles';
import { CloseButton } from '../shared/Buttons';
// Analytics
import analytics from '@react-native-firebase/analytics';
const Analytics = analytics();

const categoryVideosBackground = require('./../../res/background/fondo-amarillo.jpg');
const listaSlider = [
  require('./../../res/wizard-ios/1-text.jpg'),
  require('./../../res/wizard-ios/2-text.jpg'),
  require('./../../res/wizard-ios/3-text.jpg'),
  require('./../../res/wizard-ios/4-text.jpg'),
  require('./../../res/wizard-ios/5-text.jpg'),
  require('./../../res/wizard-ios/6-text.jpg'),
];

export class Category extends PureComponent {
  static navigationOptions = ({ navigation, route }) => ({
    ...BaseHeader,
    title: route.params.category.name_es,
    headerTruncatedBackTitle: '',
    //headerTruncatedBackTitle: I18n.t('back'),
    headerRight: () =>
      !route.params.categoryFull ? (
        <MaterialIcons
          name="cloud-download"
          size={30}
          style={styles.downloadIcon}
          onPress={() => navigation.setParams({ showDialog: true })}
        />
      ) : (
        <MaterialIcons
          name="delete"
          size={30}
          style={styles.downloadIcon}
          onPress={() => navigation.setParams({ deleteDialog: true })}
        />
      ),
  });

  state = {
    activeSlide: 0,
    downloadedVideos: 0,
    showBar: false,
    videos: [],
    initialAmount: 0,
    refresh: false,
    firstCategory: false,
    showDownloadModal: false,
  };

  _isFirstCategory = async () => {
    const isFirstCategory = await AsyncStorage.getItem('firstCategory');
    isFirstCategory === 'false'
      ? this.setState({ firstCategory: false })
      : this.setState({ firstCategory: true });
  };

  componentDidMount() {
    this._isFirstCategory();
    this.props.navigation.addListener('focus', payload => {
      this.reload();
    });
    this.reload();
  }

  reload() {
    const { navigation, route } = this.props;
    const videos = route.params.category.videos.map(video => ({
      ...video,
      name: video.video.split('/').pop(),
    }));
    Promise.all(this._checkVideos(videos)).then(result => {
      const amount = result.filter(v => !v.downloaded).length;
      const downloaded = result.filter(v => v.downloaded).length;
      if (videos.length === downloaded) {
        navigation.setParams({ categoryFull: true });
      }
      this.setState({
        videos: result,
        initialAmount: amount,
        downloadedVideos: downloaded,
      });
    });
  }

  _checkVideos(videos) {
    return videos.map(video => {
      const path = `${RNFS.DocumentDirectoryPath}/${video.name}`;
      return RNFS.exists(path).then(existingFile => ({
        ...video,
        downloaded: existingFile,
      }));
    });
  }

  _deleteVideos = () => {
    const { navigation } = this.props;
    this.state.videos.forEach(video => {
      if (video.downloaded) {
        const videoFile = `${RNFS.DocumentDirectoryPath}/${video.name}`;
        RNFS.unlink(videoFile);
      }
    });
    navigation.setParams({ categoryFull: false });

    this.setState({ initialAmount: 0, downloadedVideos: 0 });

    this.reload();
  };

  _downloadVideos = () => {
    const { navigation, route } = this.props;
    const { name_es } = route.params.category;
    this.setState({ showBar: true });

    this.state.videos.forEach((video, index) => {
      if (!video.downloaded) {
        RNFS.downloadFile({
          fromUrl: video.video,
          toFile: `${RNFS.DocumentDirectoryPath}/${video.name}`,
        }).promise.then(() => {
          const changingVideos = [...this.state.videos];
          changingVideos[index].downloaded = true;
          this.setState(prevState => {
            if (
              (prevState.initialAmount === 0 &&
                changingVideos.length === prevState.downloadedVideos) ||
              (prevState.initialAmount === 1 &&
                changingVideos.length ===
                  prevState.downloadedVideos + prevState.initialAmount)
            ) {
              navigation.setParams({ categoryFull: true });
              Analytics.logEvent('category_download', { category: name_es });
              return {
                downloadedVideos: changingVideos.length,
                initialAmount: 0,
                showBar: false,
              };
            }
            return {
              downloadedVideos: prevState.downloadedVideos + 1,
              initialAmount: prevState.initialAmount - 1,
              videos: changingVideos,
            };
          });
        });
      } else {
        this.setState(prevState => ({
          downloadedVideos: prevState.downloadedVideos + 1,
          initialAmount: prevState.initialAmount - 1,
        }));
      }
    });
  };
  _onLayout = () => this.forceUpdate();
  _onChangeSlide = ({ nativeEvent }) => {
    const slide = Math.floor(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== this.state.activeSlide) {
      this.setState({ activeSlide: slide });
    }
  };
  _onCloseModal = async () => {
    await AsyncStorage.setItem('firstCategory', 'false');
    this.setState({ firstCategory: false });
  };
  _getTutorialLayout = () => {
    return (
      <View style={styles.full} onLayout={this._onLayout}>
        <Modal style={styles.categoryModal} onRequestClose={this._onCloseModal}>
          <View style={styles.categoryScrollContainer}>
            <ScrollView
              horizontal
              pagingEnabled
              onScroll={this._onChangeSlide}
              showsHorizontalScrollIndicator={false}>
              {listaSlider.map((i, k) => (
                <ImageBackground
                  src={i}
                  style={styles.sliderImage}
                  key={k}
                  resizeMode="contain"
                />
              ))}
            </ScrollView>
          </View>
          <View style={styles.sliderButtonsContainer}>
            <View style={styles.sliderButtons}>
              {listaSlider.map((i, k) => (
                <Text
                  style={
                    k === this.state.activeSlide
                      ? styles.activeCircle
                      : styles.inactiveCircle
                  }
                  key={k}>
                  ⬤
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.categoryCloseButtonContainer}>
            <CloseButton onPress={this._onCloseModal} text="Saltar Intro" />
          </View>
        </Modal>
      </View>
    );
  };

  _navigateToVideo(video) {
    const { navigation } = this.props;
    navigation.navigate(PAGES.PAGE_VIDEO_PLAYER, { video });
  }

  _renderVideo = ({ item }) => (
    <SelectableCard
      key={item.name_es}
      onPress={() => this._navigateToVideo(item)}
      src={item.image}
      name={item.name_es}
      selected={item.downloaded}
      color={'#1AA299'}
    />
  );

  render() {
    const { navigation, route } = this.props;
    const params = route.params;
    const videosAmount = params.category.videos.length;
    const amount = this.state.downloadedVideos;
    return this.state.firstCategory ? (
      this._getTutorialLayout()
    ) : (
      <View style={styles.full} onLayout={this._onLayout}>
        <ImageBackground src={categoryVideosBackground}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              {amount} VIDEOS DESCARGADOS DE {videosAmount}
            </Text>
          </View>
          <List renderItem={this._renderVideo} data={this.state.videos} />

          {params.showDialog && (
            <Modal transparent={true} visible={true}>
              <View style={styles.opacityModal}>
                <View style={styles.modalMessageDownload}>
                  <Text style={styles.textBoldModal}>DESCARGA VIDEOS</Text>
                  <Text style={styles.textNormalModal}>
                    VAS A DESCARGAR {this.state.initialAmount} DE {videosAmount}{' '}
                    VIDEOS.
                  </Text>
                  <Text style={styles.textNormalModal}>
                    ESTA ACCION PUEDE DEMORAR Y LA DESCARGA DE LOS VIDEOS SERÁ
                    INTERRUMPIDA SI SE CIERRA LA APLICACION.
                  </Text>
                  <View style={styles.buttonPosition}>
                    <TouchableOpacity
                      style={styles.buttonCancel}
                      onPress={() => {
                        navigation.setParams({ showDialog: false });
                      }}>
                      <Text style={styles.textButton}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonOk}
                      onPress={() => {
                        navigation.setParams({ showDialog: false });
                        this._downloadVideos();
                      }}>
                      <Text style={styles.textButton}>OK</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}

          {params.deleteDialog &&
            Alert.alert(
              'BORRAR VIDEOS DE LA CATEGORÍA',
              'VAS A BORRAR LOS VIDEOS DE ESTA CATEGORÍA. ESTA ACCIÓN PUEDE DEMORAR.',
              [
                {
                  text: 'CANCELAR',
                  onPress: () => navigation.setParams({ deleteDialog: false }),
                },
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.setParams({ deleteDialog: false });
                    this._deleteVideos();
                  },
                },
              ],
              { cancelable: false },
            )}
          {this.state.showBar && (
            <View>
              <Progress.Bar
                color="green"
                width={null}
                progress={this.state.downloadedVideos / videosAmount}
              />
              <Text style={styles.downloadText}>{`${
                this.state.downloadedVideos
              } de ${videosAmount}`}</Text>
            </View>
          )}
        </ImageBackground>
      </View>
    );
  }
}
