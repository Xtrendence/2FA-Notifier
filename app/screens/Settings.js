import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Page from '../components/common/Page';
import styles from '../styles/Settings';
import {useDispatch} from 'react-redux';
import {setUserPassword} from '../store/reducers/password';
import {Colors} from '../styles/Global';

export default function Settings({navigation}) {
  const dispatch = useDispatch();

  return (
    <Page
      title="Settings"
      gradient={5}
      onPressBack={() => navigation.navigate('Accounts')}
      noIcon>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{padding: 20}}>
        <View style={styles.section}>
          <Text style={styles.title}>Performance</Text>
          <View style={styles.subsection}>
            <Text style={styles.subtitle}>
              Show remaining 2FA code time on "Accounts" page.
            </Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.choiceButton,
                  styles.choiceButtonActive,
                ]}>
                <Text style={styles.buttonText}>Show</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.choiceButton]}>
                <Text style={styles.buttonText}>Hide</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Account</Text>
          <View style={styles.subsection}>
            <Text style={styles.subtitle}>User Data</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Import</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Export</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.subsection}>
            <Text style={styles.subtitle}>Actions</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Use Biometrics</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: Colors.negativeFirst}]}
                onPress={() => logout()}>
                <Text style={styles.buttonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Page>
  );

  function logout() {
    dispatch(setUserPassword({password: ''}));
    navigation.popToTop();
  }
}
