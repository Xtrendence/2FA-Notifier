import React from "react";
import { View, StyleSheet } from "react-native";
import Navigator from "./Navigator";
import * as TransparentStatusAndNavigationBar from "react-native-transparent-status-and-navigation-bar";
import { statusBarHeight } from "./NavigationBar";

TransparentStatusAndNavigationBar.init();
TransparentStatusAndNavigationBar.setBarsStyle(true, "light-content");

export default function App() {
	return (
		<View style={styles.container}>
			<Navigator/>
		</View>
	);
}

let styles = StyleSheet.create({
	container: {
		height: "100%", 
		width: "100%", 
		paddingTop: statusBarHeight
	}
});