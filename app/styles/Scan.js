import {StyleSheet} from 'react-native';
import {GlobalStyle, Colors} from './Global';
import {screenWidth} from '../utils/Measurements';

export default styles = StyleSheet.create({
  modalContent: {
    backgroundColor: Colors.mainFirst,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    color: Colors.mainContrast,
  },
  popupBackground: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.95)',
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  popupWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  popupContainer: {
    borderRadius: GlobalStyle.borderRadius,
    overflow: 'hidden',
    backgroundColor: Colors.mainSecond,
    width: screenWidth - 80,
  },
  popupText: {
    backgroundColor: Colors.mainFourth,
    color: Colors.mainContrast,
    fontSize: GlobalStyle.fontSmall,
    padding: 10,
  },
  popupButtonWrapper: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  popupButton: {
    height: 50,
    backgroundColor: Colors.accentSecond,
    justifyContent: 'center',
    alignItems: 'center',
    width: (screenWidth - 80) / 2 - 30,
    marginLeft: 20,
    marginTop: 20,
    borderRadius: GlobalStyle.borderRadius,
  },
  popupButtonText: {
    fontSize: GlobalStyle.fontMedium,
    fontWeight: 'bold',
    color: Colors.accentContrast,
  },
  input: {
    height: 50,
    paddingLeft: 14,
    paddingRight: 14,
    fontSize: GlobalStyle.fontSmall,
    backgroundColor: Colors.mainSecond,
    width: screenWidth - 40,
    marginLeft: 20,
    marginTop: 20,
    borderRadius: GlobalStyle.borderRadius,
  },
  button: {
    height: 50,
    backgroundColor: Colors.accentSecond,
    width: screenWidth - 40,
    marginLeft: 20,
    marginTop: 20,
    borderRadius: GlobalStyle.borderRadius,
    overflow: 'hidden',
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: GlobalStyle.fontMedium,
    fontWeight: 'bold',
    color: Colors.accentContrast,
  },
});
