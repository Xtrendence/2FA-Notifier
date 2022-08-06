import {StyleSheet} from 'react-native';
import {Colors, GlobalStyle} from './Global';

export default styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.mainSecond,
    marginBottom: 20,
    borderRadius: GlobalStyle.borderRadius,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  title: {
    color: Colors.mainContrast,
    fontSize: GlobalStyle.fontLarge,
    backgroundColor: Colors.mainThird,
    fontWeight: 'bold',
    padding: 10,
    marginBottom: 6,
  },
  subsection: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  subtitle: {
    color: Colors.mainContrast,
    fontSize: GlobalStyle.fontSmall,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: Colors.accentSecond,
    padding: 12,
    marginRight: 10,
    marginTop: 10,
    borderRadius: GlobalStyle.borderRadius,
    overflow: 'hidden',
  },
  choiceButton: {
    backgroundColor: Colors.accentThird,
  },
  choiceButtonActive: {
    backgroundColor: Colors.accentSecond,
  },
  buttonText: {
    fontSize: GlobalStyle.fontSmall,
    fontWeight: 'bold',
    color: Colors.accentContrast,
  },
});
