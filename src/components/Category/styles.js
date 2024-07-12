import { StyleSheet, Dimensions } from 'react-native';
import Colors from './../../res/colors';
import { getScreenHeight } from '../../util/layoutUtil';

const downloadIconMaginRight = 10;

const styles = StyleSheet.create({
  full: {
    flex: 1,
    paddingVertical: 15,
  },
  categoryModal: {
    flex: 1,
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.TAB_BAR_ACTIVE_ICON,
  },
  headerText: {
    zIndex: 100,
    fontFamily: 'nunito',
    color: Colors.THEME_SECONDARY,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlign: 'center',
  },
  downloadIcon: {
    color: Colors.THEME_SECONDARY,
    marginRight: downloadIconMaginRight,
    fontWeight: 'bold',
  },
  downloadText: {
    textAlign: 'center',
    fontFamily: 'nunito',
  },
  image: {
    width: Dimensions.get('window').width,
    height: getScreenHeight() - 150,
    backgroundColor: '#757575',
  },
  inactiveCircle: {
    fontSize: Dimensions.get('window').width / 20,
    color: '#FFF',
    margin: 3,
  },
  activeCircle: {
    fontSize: Dimensions.get('window').width / 20,
    color: '#FFB54C',
    margin: 3,
  },
  sliderButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: Dimensions.get('window').width,
  },
  sliderButtonsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E0E0E0',
  },
  categoryScrollContainer: {
    flex: 11,
  },
  sliderImage: {
    width: Dimensions.get('window').width,
    backgroundColor: '#757575',
    flex: 1,
  },
  categoryCloseButtonContainer: {
    flex: 1,
  },
  iconStyle: {
    position: 'absolute',
    right: 15,
    top: 40,
  },
  buttonPosition: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#FFFFFF',
    marginLeft: 70,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonOk: {
    backgroundColor: '#FFFFFF',
    marginLeft: 90,
    marginBottom: 10,
    marginTop: 10,
  },
  modalMessageDownload: {
    borderColor: '#000000',
    borderWidth: 1.5,
    borderStyle: 'solid',
    backgroundColor: '#FFFFFF',
    marginTop: 200,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
  },
  textBoldModal: {
    fontSize: 20,
    marginTop: 20,
    marginLeft: 15,
    color: '#000000',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  textNormalModal: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    color: '#000000',
    textAlign: 'left',
    fontWeight: '100',
  },
  opacityModal: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  textButton: {
    fontSize: 20,
    color: '#1AA299',
    fontWeight: 'bold',
  },
});

export { styles };
