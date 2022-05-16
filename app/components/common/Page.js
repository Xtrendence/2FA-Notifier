import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { statusBarHeight } from "./NavigationBar";
import LinearGradient from "react-native-linear-gradient";
import { empty } from "../../utils/Utils";
import { GlobalStyle, Gradients } from "../../styles/Global";

export default function Page(props) {
	let gradient = !empty(props?.gradient) ? props.gradient : 0;
	let angle = !empty(props?.angle) ? props.angle : 45;

	return (
		<View style={styles.page}>
			{ !empty(props?.title) &&
				<View style={styles.titleWrapper}>
					<LinearGradient style={styles.titleCard} colors={Gradients[gradient]} angle={angle} useAngle={true}>
						<Text style={styles.title}>{props.title}</Text>
					</LinearGradient>
				</View>
			}
			{props.children}
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		width: "100%",
		height: "100%",
		paddingTop: statusBarHeight + 20,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 20,
	},
	titleWrapper: {
		alignItems: "flex-start",
	},
	titleCard: {
		padding: 20,
		borderRadius: GlobalStyle.borderRadius,
		shadowColor: GlobalStyle.shadowColor,
		shadowOffset: GlobalStyle.shadowOffset,
		shadowOpacity: GlobalStyle.shadowOpacity,
		shadowRadius: GlobalStyle.shadowRadius,
		elevation: GlobalStyle.shadowElevation,
	},
	title: {
		color: "rgb(255,255,255)",
		fontSize: GlobalStyle.fontLarge,
		fontWeight: "bold"
	}
});