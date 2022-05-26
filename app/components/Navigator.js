import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Accounts from "../screens/Accounts";
import View from "../screens/View";
import Settings from "../screens/Settings";

const Stack = createNativeStackNavigator();

const screenOptions = {
	headerShown: false, 
	cardStyleInterpolator: ({ current }) => ({
		cardStyle: {
			opacity: current.progress,
		},
	})
};

export default function Navigator() {
	return (
		<NavigationContainer theme={DarkTheme}>
			<Stack.Navigator initialRouteName="Accounts" screenOptions={screenOptions}>
				<Stack.Screen name="Accounts" component={Accounts}/>
				<Stack.Screen name="Settings" component={Settings}/>
				<Stack.Screen name="View" component={View}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}