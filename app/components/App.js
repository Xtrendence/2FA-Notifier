import React from "react";
import { LogBox } from "react-native";
import Navigator from "./Navigator";
import * as TransparentStatusAndNavigationBar from "react-native-transparent-status-and-navigation-bar";
import { Provider } from "react-redux";
import store from "../store/store";

LogBox.ignoreLogs(["ViewPropTypes", "PRNG"]);

TransparentStatusAndNavigationBar.init();
TransparentStatusAndNavigationBar.setBarsStyle(true, "light-content");

export default function App() {
	return (
		<Provider store={store}>
			<Navigator/>
		</Provider>
	);
}