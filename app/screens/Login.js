import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, TextInput, BackHandler} from 'react-native';
import Wave from '../components/Wave';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/Login';
import {Gradients, Colors} from '../styles/Global';
import Loading from '../components/common/Loading';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {empty, wait} from '../utils/Utils';
import bcrypt from 'react-native-bcrypt';
import isaac from 'isaac';
import {setUserPassword} from '../store/reducers/password';
import {useDispatch} from 'react-redux';
import TouchableScale from '../components/common/TouchableScale';
import Crypto from '../utils/Crypto';

export default function Login({navigation}) {
  const dispatch = useDispatch();

  const gradient = 0;

  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading...');

  const [register, setRegister] = useState(false);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  useCallback(() => {
    function onBackPress() {
      BackHandler.exitApp();
      return true;
    }

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);

  useEffect(() => {
    checkUser();

    navigation.addListener('focus', () => {
      if (navigation.isFocused()) {
        checkUser();
      }
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      <Loading loading={loading} text={loadingText} />
      <Wave gradient={gradient} />
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>2FA Notifier</Text>
        <Text style={styles.subtitle}>by Xtrendence</Text>
      </View>
      <View style={styles.container}>
        {!register && (
          <View style={{alignItems: 'center'}}>
            <View style={styles.inputWrapper}>
              <LinearGradient
                useAngle={true}
                angle={45}
                style={styles.border}
                colors={[Gradients[gradient][0], Gradients[gradient][1]]}
              />
              <TextInput
                value={password}
                spellCheck={false}
                keyboardType="default"
                autoCorrect={false}
                placeholder="Password..."
                selectionColor={Colors.accentFirst}
                placeholderTextColor={Colors.mainContrastDark}
                style={styles.input}
                onChangeText={value => setPassword(value)}
                secureTextEntry
              />
            </View>
            <TouchableScale
              style={styles.button}
              onPress={() => login(password)}>
              <LinearGradient
                useAngle={true}
                angle={45}
                style={styles.buttonGradient}
                colors={[Gradients[gradient][0], Gradients[gradient][1]]}>
                <Text style={styles.text}>Log In</Text>
              </LinearGradient>
            </TouchableScale>
          </View>
        )}
        {register && (
          <View style={{alignItems: 'center'}}>
            <View style={styles.inputWrapper}>
              <LinearGradient
                useAngle={true}
                angle={45}
                style={styles.border}
                colors={[Gradients[gradient][0], Gradients[gradient][1]]}
              />
              <TextInput
                value={newPassword}
                spellCheck={false}
                keyboardType="default"
                autoCorrect={false}
                placeholder="Password..."
                selectionColor={Colors.accentFirst}
                placeholderTextColor={Colors.mainContrastDark}
                style={styles.input}
                onChangeText={value => setNewPassword(value)}
                secureTextEntry
              />
            </View>
            <View style={styles.inputWrapper}>
              <LinearGradient
                useAngle={true}
                angle={45}
                style={styles.border}
                colors={[Gradients[gradient][0], Gradients[gradient][1]]}
              />
              <TextInput
                value={repeatPassword}
                spellCheck={false}
                keyboardType="default"
                autoCorrect={false}
                placeholder="Repeat Password..."
                selectionColor={Colors.accentFirst}
                placeholderTextColor={Colors.mainContrastDark}
                style={styles.input}
                onChangeText={value => setRepeatPassword(value)}
                secureTextEntry
              />
            </View>
            <TouchableScale
              style={styles.button}
              onPress={() => registerUser(newPassword, repeatPassword)}>
              <LinearGradient
                useAngle={true}
                angle={45}
                style={styles.buttonGradient}
                colors={[Gradients[gradient][0], Gradients[gradient][1]]}>
                <Text style={styles.text}>Confirm Password</Text>
              </LinearGradient>
            </TouchableScale>
          </View>
        )}
      </View>
      <View style={styles.animationWrapper}>
        <LottieView
          style={styles.animation}
          source={require('../assets/animations/security.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  );

  async function login(password) {
    try {
      if (empty(password)) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `Password cannot be empty.`,
          position: 'bottom',
        });

        return;
      }

      setLoading(true);
      setLoadingText('This might take a moment...');

      let userPassword = await AsyncStorage.getItem('userPassword');

      if (!bcrypt.compareSync(password, userPassword)) {
        Toast.show({
          type: 'error',
          text1: 'Wrong Password',
          text2: `That password is incorrect.`,
          position: 'bottom',
        });

        setLoading(false);
        setLoadingText('Loading...');

        return;
      }

      setLoading(false);
      setLoadingText('Loading...');

      dispatch(setUserPassword({password: password}));

      clearInputs();

      navigation.navigate('Accounts');
    } catch (error) {
      console.log(error);

      Toast.show({
        type: 'error',
        text1: 'Error Fetching Account',
        text2: `Couldn't fetch user data.`,
        position: 'bottom',
      });
    }
  }

  async function registerUser(newPassword, repeatPassword) {
    try {
      if (empty(newPassword) || empty(repeatPassword)) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `Password cannot be empty.`,
          position: 'bottom',
        });

        return;
      }
      if (newPassword !== repeatPassword) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `Passwords don't match.`,
          position: 'bottom',
        });

        return;
      }

      setLoading(true);
      setLoadingText('This might take a moment...');

      await wait(500);

      bcrypt.setRandomFallback(length => {
        let buffer = new Uint8Array(length);
        return buffer.map(() => Math.floor(isaac.random() * 256));
      });

      let hash = bcrypt.hashSync(newPassword, 8);

      let key = await Crypto.generateAESKey();
      let encryptedKey = Crypto.encryptAES(key, newPassword);

      await AsyncStorage.setItem('userPassword', hash);
      await AsyncStorage.setItem('userKey', encryptedKey);

      await wait(1000);

      setLoading(false);
      setLoadingText('Loading...');

      Toast.show({
        type: 'success',
        text1: 'Password Saved',
        text2: `Your password has been saved.`,
        position: 'bottom',
      });

      dispatch(setUserPassword({password: newPassword}));

      clearInputs();

      navigation.navigate('Accounts');
    } catch (error) {
      console.log(error);

      Toast.show({
        type: 'error',
        text1: 'User Registration Failed',
        text2: `Couldn't register user.`,
        position: 'bottom',
      });
    }
  }

  function clearInputs() {
    setPassword('');
    setNewPassword('');
    setRepeatPassword('');
  }

  async function checkUser() {
    try {
      setLoading(true);

      let userPassword = (await AsyncStorage.getItem('userPassword')) || '';

      setRegister(empty(userPassword));

      await wait(2000);

      setLoading(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error Fetching Account',
        text2: `Couldn't fetch user data.`,
        position: 'bottom',
      });
    }
  }
}
