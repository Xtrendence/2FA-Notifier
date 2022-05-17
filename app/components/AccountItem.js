import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Colors, Gradients } from "../styles/Global";
import totp from "totp-generator";
import TouchableScale from "./common/TouchableScale";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "../styles/Accounts";
import getAccountIcon from "../utils/AccountIcons";

export default function AccountItem({ item, onPress }) {
	const [code, setCode] = useState("");

	useEffect(() => {
		generateCode();

		// let refresh = setInterval(generateCode, 1000);

		// return () => {
		// 	clearInterval(refresh);
		// }
	}, []);

	return (
		<TouchableScale onPress={onPress}>
			<LinearGradient useAngle={true} angle={45} style={styles.cardContainer} colors={Gradients[item.gradient]}>
				<View style={styles.card}>
					<View style={styles.cardLeft}>
						<Icon name={getAccountIcon(item.name)} size={40} color={Colors.mainContrast}/>
					</View>
					<View style={styles.cardCenter}>
						<Text style={styles.cardText}>{item.name}</Text>
						<Text style={styles.cardText}>{code}</Text>
					</View>
					<View style={styles.cardRight}>
						<Icon name="chevron-right" size={40} color={Colors.mainContrast}/>
					</View>
				</View>
			</LinearGradient>
		</TouchableScale>
	);

	function generateCode() {
		try {
			setCode(totp(item.secret));
		} catch(error) {
			setCode("");
			console.log(error);
		}
	}
}