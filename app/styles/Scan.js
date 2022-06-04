import { StyleSheet } from "react-native";
import { GlobalStyle, Colors } from "./Global";
import { screenWidth } from "../utils/Measurements";

export default styles = StyleSheet.create({
	modalContent: {
		backgroundColor: Colors.mainFirst,
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	modalText: {
		color: Colors.mainContrast
	},
	input: {
		height: 50,
		paddingLeft: 14,
		paddingRight: 14,
		fontSize: GlobalStyle.fontSmall,
		backgroundColor: Colors.mainSecond,
		width: screenWidth - 40,
		marginLeft: 20,
		marginTop: 20,
		borderRadius: GlobalStyle.borderRadius
	},
	button: {
		height: 50,
		backgroundColor: Colors.accentSecond,
		justifyContent: "center",
		alignItems: "center",
		width: screenWidth - 40,
		marginLeft: 20,
		marginTop: 20,
		borderRadius: GlobalStyle.borderRadius
	},
	text: {
		fontSize: GlobalStyle.fontMedium,
		fontWeight: "bold",
		color: Colors.accentContrast
	}
});