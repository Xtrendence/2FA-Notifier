import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../utils/Measurements';
import {GlobalStyle, Colors} from './Global';

export default styles = StyleSheet.create({
  wrapper: {
    height: screenHeight,
    width: screenWidth,
    alignItems: 'center',
  },
  titleWrapper: {
    position: 'absolute',
    top: (screenHeight * 0.25) / 2 + 8,
  },
  title: {
    fontFamily: 'Arkhip',
    fontSize: 34,
    color: Colors.accentContrast,
  },
  subtitle: {
    fontFamily: 'Arkhip',
    fontSize: 14,
    color: Colors.accentContrast,
    alignSelf: 'flex-end',
    marginRight: -20,
  },
  animationWrapper: {
    width: screenWidth - 120,
    height: 300,
    position: 'absolute',
    bottom: 40,
  },
  container: {
    position: 'absolute',
    top: screenHeight * 0.25 + 100,
    flexDirection: 'column',
  },
  inputWrapper: {
    width: screenWidth - 100,
    height: 80,
    position: 'relative',
  },
  border: {
    height: 58,
    width: screenWidth - 100,
    position: 'absolute',
    zIndex: 1,
    borderRadius: GlobalStyle.borderRadius + 2,
  },
  input: {
    zIndex: 2,
    position: 'absolute',
    height: 50,
    paddingLeft: 14,
    paddingRight: 14,
    fontSize: GlobalStyle.fontSmall,
    backgroundColor: Colors.mainSecond,
    width: screenWidth - 100 - 8,
    marginLeft: 4,
    marginTop: 4,
    borderRadius: GlobalStyle.borderRadius,
  },
  button: {
    height: 50,
    backgroundColor: Colors.accentSecond,
    justifyContent: 'center',
    alignItems: 'center',
    width: 210,
    borderRadius: GlobalStyle.borderRadius,
    overflow: 'hidden',
  },
  buttonGradient: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: GlobalStyle.fontMedium,
    fontWeight: 'bold',
    color: Colors.accentContrast,
  },
});
