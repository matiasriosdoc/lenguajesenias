export const measurements = uri => ({
  name_es: 'MEDIDAS',
  icon: require('../res/icon/medidas.png'),
  videos: [
    {
      name_es: 'CANTIDAD',
      search_name_es: 'CANTIDAD',
      image: require('../res/image/cantidad.png'),
      video: `${uri}/cantidad.mp4`,
      downloaded: false,
    },
    {
      name_es: 'KILO',
      search_name_es: 'KILO',
      image: require('../res/image/kilo.png'),
      video: `${uri}/kilo.mp4`,
      downloaded: false,
    },
    {
      name_es: 'LITRO',
      search_name_es: 'LITRO',
      image: require('../res/image/litro.png'),
      video: `${uri}/litro.mp4`,
      downloaded: false,
    },
    {
      name_es: 'MILLÓN',
      search_name_es: 'MILLON',
      image: require('../res/image/millon.png'),
      video: `${uri}/millon.mp4`,
      downloaded: false,
    },
    {
      name_es: 'PESO',
      search_name_es: 'PESO',
      image: require('../res/image/peso.png'),
      video: `${uri}/peso.mp4`,
      downloaded: false,
    },
    {
      name_es: 'PORCENTAJE',
      search_name_es: 'PORCENTAJE',
      image: require('../res/image/porcentaje.png'),
      video: `${uri}/porcentaje.mp4`,
      downloaded: false,
    },
  ],
});
