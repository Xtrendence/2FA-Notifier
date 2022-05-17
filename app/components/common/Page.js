import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { statusBarHeight } from "./NavigationBar";
import LinearGradient from "react-native-linear-gradient";
import { empty } from "../../utils/Utils";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Colors, GlobalStyle, Gradients } from "../../styles/Global";
import TouchableScale from "./TouchableScale";

export default function Page(props) {
	let gradient = !empty(props?.gradient) ? props.gradient : 0;
	let angle = !empty(props?.angle) ? props.angle : 45;

	return (
		<View style={styles.page}>
			{ !empty(props?.title) &&
				<View style={styles.top}>
					<View style={styles.left}>
						<LinearGradient style={styles.titleCard} colors={Gradients[gradient]} angle={angle} useAngle={true}>
							<Text style={styles.title}>{props.title}</Text>
						</LinearGradient>
					</View>
					<View style={styles.right}>
						<TouchableScale style={styles.settings}>
							<Icon name="cog" size={32} color={Colors.mainContrast}/>
						</TouchableScale>
					</View>
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
		paddingTop: statusBarHeight + 20
	},
	top: {
		alignItems: "flex-start",
		flexDirection: "row",
		paddingLeft: 20,
		paddingBottom: 10,
		borderBottomWidth: 2,
		borderColor: Colors.mainThird
	},
	right: {
		flexGrow: 1,
		alignItems: "flex-end",
		paddingRight: 20,
	},
	titleCard: {
		height: 50,
		paddingLeft: 30,
		paddingTop: 10,
		paddingRight: 30,
		paddingBottom: 10,
		borderRadius: GlobalStyle.borderRadius,
		shadowColor: GlobalStyle.shadowColor,
		shadowOffset: GlobalStyle.shadowOffset,
		shadowOpacity: GlobalStyle.shadowOpacity,
		shadowRadius: GlobalStyle.shadowRadius,
		elevation: GlobalStyle.shadowElevation,
	},
	title: {
		color: Colors.accentContrast,
		fontSize: GlobalStyle.fontLarge,
		fontWeight: "bold"
	},
	settings: {
		justifyContent: "center",
		height: 50
	}
});