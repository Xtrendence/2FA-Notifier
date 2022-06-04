import React from "react";
import { LogBox } from "react-native";
import Navigator from "./Navigator";
import * as TransparentStatusAndNavigationBar from "react-native-transparent-status-and-navigation-bar";

LogBox.ignoreLogs(["ViewPropTypes"]);

TransparentStatusAndNavigationBar.init();
TransparentStatusAndNavigationBar.setBarsStyle(true, "light-content");

export default function App() {
	return (
		<Navigator/>
	);
}