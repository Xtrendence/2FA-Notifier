import React from 'react';
import {BaseToast} from 'react-native-toast-message';
import {Colors} from '../styles/Global';

export default toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: Colors.positiveFirst,
        borderTopColor: Colors.mainSecond,
        borderTopWidth: 2,
        borderBottomColor: Colors.mainSecond,
        borderBottomWidth: 2,
        borderRightColor: Colors.positiveFirst,
        borderRightWidth: 5,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: Colors.mainSecond,
        borderWidth: 0,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.mainContrast,
      }}
      text2Style={{
        fontSize: 14,
        color: Colors.mainContrast,
      }}
    />
  ),
  error: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: Colors.negativeFirst,
        borderTopColor: Colors.mainSecond,
        borderTopWidth: 2,
        borderBottomColor: Colors.mainSecond,
        borderBottomWidth: 2,
        borderRightColor: Colors.negativeFirst,
        borderRightWidth: 5,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: Colors.mainSecond,
        borderWidth: 0,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.mainContrast,
      }}
      text2Style={{
        fontSize: 14,
        color: Colors.mainContrast,
      }}
    />
  ),
};
