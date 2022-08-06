import {StyleSheet} from 'react-native';
import {Colors, GlobalStyle} from './Global';

export default styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  code: {
    fontWeight: 'bold',
    fontSize: 32,
    marginTop: 20,
    color: Colors.mainContrast,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    color: Colors.mainContrast,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.mainSecond,
    padding: 20,
    borderRadius: GlobalStyle.borderRadius,
  },
  buttonCopied: {
    backgroundColor: Colors.accentSecond,
  },
  buttonText: {
    color: Colors.mainContrast,
    fontWeight: 'bold',
    fontSize: GlobalStyle.fontMedium,
  },
  buttonTextCopied: {
    color: Colors.accentContrast,
  },
});
