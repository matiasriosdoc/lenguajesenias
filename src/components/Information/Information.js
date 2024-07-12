import React, { useRef } from 'react';
import Video from '../shared/Video';
import { Text, Image, View, ScrollView, Linking } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import I18n from '../../res/i18n/i18n';
import TextEs from '../../res/i18n/es';
import { styles, margin } from './styles';
import { BaseHeader } from '../shared/BaseHeader';

const tincSource = require('../../res/image/tinc.png');
const fundasorSource = require('../../res/image/fundasor.png');
const hexactaSource = require('../../res/image/hexacta.png');

export const NavigationOptions = {
  ...BaseHeader,
  title: I18n.t('info_tab_title').toUpperCase(),
};

export function Information() {
  const scrollRef = useRef(null);

  useScrollToTop(scrollRef);

  return (
    <ScrollView ref={scrollRef} style={styles.full}>
      <View style={{ marginHorizontal: margin }}>
        <Image
          style={styles.daneImage}
          source={require('../../res/icon/dane_logo_transparencia.png')}
        />
        <Text style={styles.title}>DANE</Text>
        <Text style={styles.text}>{TextEs.info_description.toUpperCase()}</Text>
        <Text style={styles.coordinacionTitle}>COORDINACIÓN DEL PROYECTO</Text>
        <Image style={styles.tincImage} source={tincSource} />
        <Text style={styles.title}>IDEA Y CONTENIDO</Text>
        <Image style={styles.tincImage} source={fundasorSource} />
        <Text style={styles.title}>DESARROLLO</Text>
        <Image style={styles.tincImage} source={hexactaSource} />
        <Text style={styles.title}>AGRADECIMIENTOS</Text>
        <Text style={styles.subtitle}>
          {'A quienes forman parte de Fundasor: '.toUpperCase()}
        </Text>
        <Text>
          {'Anahí Alesso, Mariana Reuter, Patricio A. Cabezas y Cristina Alesso.'.toUpperCase()}
        </Text>
        <Text>{'A Elisa Nudman.'.toUpperCase()}</Text>
        <Text style={styles.subtitle}>
          {'A los señantes sordos: '.toUpperCase()}
        </Text>
        <Text>
          {'Lisandro Rodríguez, Mateo Rodríguez García, Olivia Rodríguez García, Lucía Fauve, Ivana Paola Navarro, Damián Alejandro Scigliano, Sebastián Ariel Cáceres, Rocío María Vidiella, Paula Silvina Costa Gil '.toUpperCase()}
        </Text>
        <Text style={styles.subtitle}>
          {'Al staff de Hexacta: '.toUpperCase()}
        </Text>
        <Text>
          {'Luis Broeders, Esteban Sopetto, Verónica Vignoni, Javier Ocampo, Diego Pedro, Jesica Taira, Gerardo Cabrera, Javier Fernández, Julieta Fernández, Tomás Franco, Macarena Iriarte, Ezequiel Meijomil, Mariela Morel, Juan Ignacio Bernal, Julieta Juarez, Nicolas Gallinal, Marcos García, Luciano Faletti y Julián Bolaño.'.toUpperCase()}
        </Text>
        <Text style={styles.title}>LICENCIA GNU V3</Text>
        <Text
          style={styles.textLink}
          onPress={() => Linking.openURL('https://tinc.org.ar/licencias/')}>
          https://tinc.org.ar/licencias/
        </Text>
      </View>
      <Video
        uri={
          'https://dane-videos.s3.us-east-2.amazonaws.com/presentacion_LSA.mp4'
        }
      />
    </ScrollView>
  );
}
