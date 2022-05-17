import { StyleSheet } from "react-native";
import { barHeight, screenHeight, screenWidth, statusBarHeight, wrapperHeight } from "../components/common/NavigationBar";
import { Colors, GlobalStyle } from "./Global";

export default styles = StyleSheet.create({
	list: {
		minHeight: wrapperHeight - 20,
		maxHeight: wrapperHeight - 20
	},
	addCard: {
		alignItems: "center",
		justifyContent: "center",
		height: 100,
		marginTop: 20,
		marginRight: 20,
		marginLeft: 20,
		borderWidth: 2,
		marginBottom: 10,
		borderColor: Colors.mainContrast,
		borderStyle: "dashed",
		backgroundColor: Colors.mainSecond,
		borderRadius: GlobalStyle.borderRadius,
		shadowColor: GlobalStyle.shadowColor,
		shadowOffset: GlobalStyle.shadowOffset,
		shadowOpacity: GlobalStyle.shadowOpacity,
		shadowRadius: GlobalStyle.shadowRadius,
		elevation: GlobalStyle.shadowElevation,
	},
	addText: {
		fontSize: GlobalStyle.fontMedium,
		fontWeight: "bold",
		color: Colors.mainContrast
	},
	cardContainer: {
		padding: 4,
		alignItems: "center",
		justifyContent: "center",
		height: 100,
		marginTop: 10,
		marginBottom: 10,
		marginRight: 20,
		marginLeft: 20,
		backgroundColor: Colors.mainThird,
		borderRadius: GlobalStyle.borderRadius,
		shadowColor: GlobalStyle.shadowColor,
		shadowOffset: GlobalStyle.shadowOffset,
		shadowOpacity: GlobalStyle.shadowOpacity,
		shadowRadius: GlobalStyle.shadowRadius,
		elevation: GlobalStyle.shadowElevation,
	},
	card: {
		flexDirection: "row",
		justifyContent: "center",
		width: "100%",
		height: "100%",
		backgroundColor: Colors.mainSecond,
		borderRadius: GlobalStyle.borderRadius - 2,
		shadowColor: GlobalStyle.shadowColor,
		shadowOffset: GlobalStyle.shadowOffset,
		shadowOpacity: GlobalStyle.shadowOpacity,
		shadowRadius: GlobalStyle.shadowRadius,
		elevation: GlobalStyle.shadowElevation,
	},
	cardLeft: {
		width: 80,
		alignItems: "center",
		justifyContent: "center"
	},
	cardCenter: {
		flexGrow: 1,
		justifyContent: "center"
	},
	cardCounter: {
		width: 50,
		alignItems: "center",
		justifyContent: "center"
	},
	cardRight: {
		width: 80,
		alignItems: "center",
		justifyContent: "center"
	},
	cardText: {
		fontSize: GlobalStyle.fontMedium,
		fontWeight: "bold",
		color: Colors.mainContrast
	},
	cardName: {
		maxWidth: screenWidth - 40 - 80 - 50 - 80 - 24,
	},
	searchWrapper: {
		paddingTop: 20,
		paddingBottom: 20,
		height: 90,
		borderTopWidth: 2,
		borderColor: Colors.mainThird,
		backgroundColor: Colors.mainFirst
	},
	input: {
		height: 50,
		paddingLeft: 14,
		paddingRight: 14,
		fontSize: GlobalStyle.fontSmall,
		backgroundColor: Colors.mainSecond,
		width: screenWidth - 40,
		marginLeft: 20,
		borderRadius: GlobalStyle.borderRadius
	}
});