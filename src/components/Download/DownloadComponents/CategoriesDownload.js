import * as Progress from 'react-native-progress';
import React, { PureComponent } from 'react';
import { Alert, Text, View, TouchableOpacity, Modal } from 'react-native';
import ImageBackground from '../../shared/ImageBackground';
import { SelectableCard } from '../../shared/Card';
import List from '../../shared/List';
import _ from 'lodash';
import RNFS from 'react-native-fs';
import CATEGORIES_INDEX from '../../../categoriesIndex';
import styles from './styles';

export class CategoriesDownload extends PureComponent {
  state = {
    amountSelected: 0,
    categories: CATEGORIES_INDEX.categories.map(c => ({
      ...c,
      selected: false,
    })),
    showDownloadDialog: false,
    showDownloadModal: false,
    initialAmount: 0,
    modifiedAmount: 0,
    videosToModify: [],
    showBar: false,
    showDeleteAlert: false,
    showDeleteBar: false,
  };

  _selectCategory = category => {
    const categories = [...this.state.categories];
    const foundIndex = this.state.categories.findIndex(
      c => c.name_es === category.name_es,
    );
    category.selected = !category.selected;
    categories[foundIndex] = category;
    category.selected
      ? this.setState(prevState => ({
          categories,
          amountSelected: prevState.amountSelected + 1,
        }))
      : this.setState(prevState => ({
          categories,
          amountSelected: prevState.amountSelected - 1,
        }));
  };

  _renderCategory = ({ item }) => (
    <SelectableCard
      src={item.icon}
      name={item.name_es}
      onPress={() => this._selectCategory(item)}
      key={item.name_es}
      selected={item.selected}
      color={'#FFB44B'}
    />
  );

  _onLayout = () => {
    this.forceUpdate();
  };

  _getVideoPath = video => `${RNFS.DocumentDirectoryPath}/${video.name}`;

  /**
   * Return the videos to download or delete, each video has a downloaded flag
   */
  _getVideos = () => {
    const selectedCategories = this.state.categories.filter(c => c.selected);
    const videos = _.flatten(
      selectedCategories
        .map(c => c.videos)
        .map(video =>
          video.map(v => ({ ...v, name: v.video.split('/').pop() })),
        ),
    );
    return Promise.all(
      videos.map(video => {
        return RNFS.exists(this._getVideoPath(video)).then(existingFile => ({
          ...video,
          downloaded: existingFile,
        }));
      }),
    );
  };

  _onPressDownloadVideos = () => {
    this._getVideos().then(result => {
      const videosToDownload = result.filter(v => !v.downloaded);
      this.setState({
        initialAmount: videosToDownload.length,
        modifiedAmount: result.length,
        showDownloadDialog: true,
        videosToModify: videosToDownload,
      });
    });
  };

  _onPressDeleteVideos = () => {
    this._getVideos().then(result => {
      const videosToDelete = result.filter(v => v.downloaded);
      this.setState({
        initialAmount: videosToDelete.length,
        showDeleteAlert: true,
        videosToModify: videosToDelete,
      });
    });
  };

  /**
   * Perform an action on a bunch of videos such as delete or download
   * @param {Function} action a function that will act on each video
   * @param {boolean} downloadedFlag whether to set each video downloaded flag to true or false
   */
  _actOnVideos = (action, downloadedFlag) => {
    Promise.all(
      this.state.videosToModify.map((video, index) => {
        return action(video).then(() => {
          const changingVideos = [...this.state.videosToModify];
          changingVideos[index].downloaded = downloadedFlag;
          this.setState(prevState => ({
            initialAmount: prevState.initialAmount - 1,
            videosToModify: changingVideos,
          }));
        });
      }),
    ).then(() => {
      this.setState(prevState => ({
        showBar: false,
        showDeleteBar: false,
        categories: prevState.categories.map(c => ({ ...c, selected: false })),
      }));
    });
  };

  _downloadVideos = () => {
    this._actOnVideos(
      video =>
        RNFS.downloadFile({
          fromUrl: video.video,
          toFile: this._getVideoPath(video),
        }).promise,
      true,
    );
  };

  _deleteVideos = () => {
    this._actOnVideos(video => RNFS.unlink(this._getVideoPath(video)), false);
  };

  render() {
    return (
      <View style={styles.full} onLayout={this._onLayout}>
        <ImageBackground
          src={require('../../../res/background/fondo-amarillo.jpg')}>
          <List
            data={this.state.categories}
            renderItem={this._renderCategory}
          />
        </ImageBackground>
        {this.state.categories.some(c => c.selected) &&
          !this.state.showBar &&
          !this.state.showDeleteBar && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.redButton]}
                onPress={this._onPressDeleteVideos}>
                <Text style={[styles.textColor, styles.buttonText]}>
                  BORRAR
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.greenButton]}
                onPress={this._onPressDownloadVideos}>
                <Text style={[styles.textColor, styles.buttonText]}>
                  DESCARGAR
                </Text>
              </TouchableOpacity>
            </View>
          )}

        {this.state.showDownloadDialog && (
          <Modal transparent={true} visible={true}>
            <View style={styles.opacityModal}>
              <View style={styles.modalMessageDownload}>
                <Text style={styles.textBoldModal}>DESCARGA VIDEOS</Text>
                <Text style={styles.textNormalModal}>
                  VAS A DESCARGAR {this.state.initialAmount} DE{' '}
                  {this.state.modifiedAmount} VIDEOS.
                </Text>
                <Text style={styles.textNormalModal}>
                  ESTA ACCION PUEDE DEMORAR Y LA DESCARGA DE LOS VIDEOS SERÁ
                  INTERRUMPIDA SI SE CIERRA LA APLICACION.
                </Text>
                <View style={styles.buttonPosition}>
                  <TouchableOpacity
                    style={styles.buttonCancel}
                    onPress={() => {
                      this.setState({ showDownloadDialog: false });
                    }}>
                    <Text style={styles.textButton}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonOk}
                    onPress={() => {
                      if (this.state.videosToModify.length) {
                        this.setState({
                          showDownloadDialog: false,
                          showBar: true,
                        });
                        this._downloadVideos();
                      } else {
                        this.setState(prevState => ({
                          showDownloadDialog: false,
                          categories: prevState.categories.map(c => ({
                            ...c,
                            selected: false,
                          })),
                        }));
                      }
                    }}>
                    <Text style={styles.textButton}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}

        {this.state.showDeleteAlert &&
          Alert.alert(
            'BORRAR VIDEOS DE LA CATEGORÍA',
            'VAS A BORRAR LOS VIDEOS DE ESTA CATEGORÍA. ESTA ACCIÓN PUEDE DEMORAR.',
            [
              {
                text: 'CANCELAR',
                onPress: () => this.setState({ showDeleteAlert: false }),
              },
              {
                text: 'OK',
                onPress: () => {
                  if (this.state.videosToModify.length) {
                    this.setState({
                      showDeleteAlert: false,
                      showDeleteBar: true,
                    });
                    this._deleteVideos();
                  } else {
                    this.setState(prevState => ({
                      showDeleteAlert: false,
                      categories: prevState.categories.map(c => ({
                        ...c,
                        selected: false,
                      })),
                    }));
                  }
                },
              },
            ],
            { cancelable: false },
          )}
        {this.state.showBar && (
          <ProgressBar
            videos={this.state.videosToModify}
            color={'green'}
            predicate={v => v.downloaded}
          />
        )}
        {this.state.showDeleteBar && (
          <ProgressBar
            videos={this.state.videosToModify}
            color={'red'}
            predicate={v => !v.downloaded}
          />
        )}
      </View>
    );
  }
}

function ProgressBar({ videos, color, predicate }) {
  const current = videos.filter(predicate).length;
  const total = videos.length;
  return (
    <View style={styles.progressBar}>
      <Progress.Bar color={color} width={null} progress={current / total} />
      <Text style={styles.downloadText}>{`${current} de ${total}`}</Text>
    </View>
  );
}
