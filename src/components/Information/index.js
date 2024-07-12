import React, { useRef } from 'react';
import Video from '../shared/Video';
import {
  Text,
  Image,
  View,
  ScrollView,
  Linking,
  Dimensions,
} from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import i18n from '../../res/i18n/i18n';
import TextEs from '../../res/i18n/es';
import { styles, margin } from './styles';
import { BaseHeader } from '../shared/BaseHeader';

const tincSource = require('../../res/image/tinc.png');
const fundasorSource = require('../../res/image/fundasor.png');
const hexactaSource = require('../../res/image/hexacta.png');

export const InformationNavigationOptions = {
  ...BaseHeader,
  title: i18n.t('info_tab_title').toUpperCase(),
};

export function Information() {
  const scrollRef = useRef(null);

  const { width, height } = Dimensions.get('window');

  const videoRatio = 350 / 625;
  const videoWidth = Dimensions.get('window').width - 2 * margin;
  const videoHeight = Math.round(videoWidth / videoRatio);

  useScrollToTop(scrollRef);

  return (
    <ScrollView ref={scrollRef} style={styles.full}>
      <View style={{ marginHorizontal: margin, flex: 1 }}>
        <Image
          style={styles.daneImage}
          source={require('../../res/icon/dane_logo_transparencia.png')}
        />
        <Text style={styles.title}>DANE</Text>
        <Text style={styles.text}>{TextEs.info_description}</Text>
        <Text style={styles.coordinacionTitle}>COORDINACIÓN DEL PROYECTO</Text>
        <Image style={styles.tincImage} source={tincSource} />
        <Text style={styles.title}>IDEA Y CONTENIDO</Text>
        <Image style={styles.tincImage} source={fundasorSource} />
        <Text style={styles.title}>DESARROLLO</Text>
        <Image style={styles.tincImage} source={hexactaSource} />
        <Text style={styles.title}>AGRADECIMIENTOS</Text>
        <Text style={styles.subtitle}>
          {'A QUIENES FORMAN PARTE DE FUNDASOR: '}
        </Text>
        <Text>
          {
            'ANAHÍ ALESSO, MARIANA REUTER, PATRICIO A. CABEZAS Y CRISTINA ALESSO.'
          }
        </Text>
        <Text>{'A ELISA NUDMAN.'}</Text>
        <Text style={styles.subtitle}>{'A LOS SEÑANTES SORDOS: '}</Text>
        <Text>
          {
            'LISANDRO RODRÍGUEZ, MATEO RODRÍGUEZ GARCÍA, OLIVIA RODRÍGUEZ GARCÍA, LUCÍA FAUVE, IVANA PAOLA NAVARRO, DAMIÁN ALEJANDRO SCIGLIANO, SEBASTIÁN ARIEL CÁCERES, ROCÍO MARÍA VIDIELLA, PAULA SILVINA COSTA GIL '
          }
        </Text>
        <Text style={styles.subtitle}>{'AL STAFF DE HEXACTA: '}</Text>
        <Text>
          {
            'JESICA TAIRA, VERÓNICA VIGNONI, AGUSTINA ISLA, CAMILA MAMANI, FRANKLIN LEAL, LEANDRO LOPEZ, LUCIANO FALETTI, JULIÁN BOLAÑO, LUIS BROEDERS, ESTEBAN SOPETTO, JAVIER OCAMPO, DIEGO PEDRO, GERARDO CABRERA, JAVIER FERNÁNDEZ, JULIETA FERNÁNDEZ, TOMÁS FRANCO, MACARENA IRIARTE, EZEQUIEL MEIJOMIL, MARIELA MOREL, JUAN IGNACIO BERNAL, JULIETA JUAREZ, NICOLAS GALLINAL, MARCOS GARCÍA Y DIEGO GAGLIARDI.'
          }
        </Text>
        <Text style={styles.title}>LICENCIA GNU V3</Text>
        <Text
          style={styles.textLink}
          onPress={() => Linking.openURL('https://tinc.org.ar/licencias/')}>
          https://tinc.org.ar/licencias/
        </Text>
      </View>
      <View style={styles.container}>
        <Video
          uri={
            'https://lsa-argentina-videos.s3.sa-east-1.amazonaws.com/presentacion_LSA.mp4'
          }
          style={{ width: width * 0.9, height: height * 0.7 }}
          controls={true}
        />
      </View>
    </ScrollView>
  );
}
