import I18n from 'react-native-i18n';
import es from './es';
import pt from './pt';

I18n.fallbacks = true;
I18n.defaultLocale = 'es';

I18n.translations = {
  es,
  pt,
};

module.exports = I18n;
