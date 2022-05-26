import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import Toast, { BaseToast } from "react-native-toast-message";
import Accounts from "../screens/Accounts";
import ViewAccount from "../screens/ViewAccount";
import Settings from "../screens/Settings";
import Scan from "../screens/Scan";
import { Colors, GlobalStyle } from "../styles/Global";

const Stack = createNativeStackNavigator();

const toastConfig = {
	success: (props) => (
		<BaseToast
			{...props}
			style={{ 
				borderLeftColor: Colors.accentFirst,
				borderTopColor: Colors.mainFirst,
				borderTopWidth: 2,
				borderBottomColor: Colors.mainFirst,
				borderBottomWidth: 2,
				borderRightColor: Colors.accentFirst,
				borderRightWidth: 5,
			}}
			contentContainerStyle={{ 
				paddingHorizontal: 15,
				backgroundColor: Colors.mainSecond,
				borderWidth: 0,
			}}
			text1Style={{
				fontSize: 16,
				fontWeight: "bold",
				color: Colors.mainContrast
			}}
			text2Style={{
				fontSize: 14,
				color: Colors.mainContrast
			}}
		/>
	),
}

export default function Navigator() {
	return (
		<NavigationContainer theme={DarkTheme}>
			<Stack.Navigator initialRouteName="Accounts" screenOptions={{ headerShown:false, animation:"fade_from_bottom" }}>
				<Stack.Screen name="Accounts" component={Accounts}/>
				<Stack.Screen name="Settings" component={Settings} options={{ animation:"slide_from_right" }}/>
				<Stack.Screen name="View" component={ViewAccount} options={{ animation:"fade_from_bottom" }}/>
				<Stack.Screen name="Scan" component={Scan} options={{ animation:"slide_from_bottom" }}/>
			</Stack.Navigator>
			<Toast config={toastConfig}/>
		</NavigationContainer>
	);
}