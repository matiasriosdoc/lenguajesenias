import React, { useState } from 'react';
import {
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import NativeVideo from 'react-native-video';

const margin = 12;
const playIconSize = 100;

const styles = StyleSheet.create({
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: margin,
    marginBottom: margin,
    backgroundColor: 'white',
  },
  video: {
    //backgroundColor: 'transparent',
  },
  playIcon: {
    height: playIconSize,
    width: playIconSize,
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  button: {
    marginBottom: 5,
  },
  slowButtonImage:{
    width: 109,
    height: 40,
    resizeMode: 'contain',
  },
  normalButtonImage:{
    width: 91,
    height: 41,
    resizeMode: 'contain',
  },
});

const playIcon = require('../../res/icon/play-icon.png');
const normalVelocityIcon = require('../../res/image/conejo-velocidad-normal.png');
const slowVelocityIcon = require('../../res/image/tortuga-velocidad-lenta.png');
const videoRatio = 352 / 288;

export default function Video({ uri, onEnd, onLoadStart, onReady, autoPlay, style}) {
  const [paused, setPaused] = useState(!autoPlay);
  const videoRef = null;
  const [speed, setSpeed] = useState(1.0);

  const handleSpeedChange = newSpeed => {
    setSpeed(newSpeed);
    videoRef?.current.setNativeProps({ rate: newSpeed });
  };

  const _onEnd = () => {
    onEnd && onEnd();
  };

  const _onLoadStart = () => {
    onLoadStart && onLoadStart();
  };

  const _onReady = () => {
    onReady && onReady();
  };

  const videoWidth = Dimensions.get('window').width - 2 * margin;
  const videoHeight = Math.round(videoWidth / videoRatio);

  return (
    <TouchableOpacity
      style={{...styles.videoContainer,
       marginHorizontal: margin,
       width: videoWidth,
       height: videoHeight,
       ...style,
        }}
      onPress={() => {
        videoRef?.seek(0);
        setPaused(!paused);
      }}>
      {paused ? (
        <Image style={styles.playIcon} source={playIcon} />
      ) : (
        <>
          <NativeVideo
            ref={videoRef}
            source={{ uri }}

            style={{...styles.video,
                width: videoWidth,
                height: videoHeight,
                ...style,
                }}
            rate={speed}
            paused={paused}
            muted
            resizeMode="contain"
            repeat={true}
            onEnd={_onEnd}
            onLoadStart={_onLoadStart}
            onReadyForDisplay={_onReady}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={() => handleSpeedChange(0.5)}>
              <Image style={styles.slowButtonImage} source={slowVelocityIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleSpeedChange(1.0)}>
              <Image style={styles.normalButtonImage} source={normalVelocityIcon} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}
