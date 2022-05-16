import React from "react";
import Navigator from "./Navigator";
import * as TransparentStatusAndNavigationBar from "react-native-transparent-status-and-navigation-bar";

TransparentStatusAndNavigationBar.init();
TransparentStatusAndNavigationBar.setBarsStyle(true, "light-content");

export default function App() {
	return (
		<Navigator/>
	);
}