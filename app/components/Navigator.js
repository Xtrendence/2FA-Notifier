import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Accounts from "../screens/Accounts";

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
			</Stack.Navigator>
		</NavigationContainer>
	);
}