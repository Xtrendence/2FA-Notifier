import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import Login from '../screens/Login';
import Accounts from '../screens/Accounts';
import ViewAccount from '../screens/ViewAccount';
import Settings from '../screens/Settings';
import Scan from '../screens/Scan';
import toastConfig from '../utils/ToastConfig';
import Edit from '../screens/Edit';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false, animation: 'fade_from_bottom'}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Accounts" component={Accounts} />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="View"
          component={ViewAccount}
          options={{animation: 'fade_from_bottom'}}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="Scan"
          component={Scan}
          options={{animation: 'slide_from_bottom'}}
        />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}
