import React, { useEffect, useState, useRef } from "react";
import { View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Colors, Gradients } from "../styles/Global";
import totp from "totp-generator";
import TouchableScale from "./common/TouchableScale";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "../styles/Accounts";
import getAccountIcon from "../utils/AccountIcons";
import { empty } from "../utils/Utils";
import CircularProgress from "react-native-circular-progress-indicator";

export default function AccountItem({ item, onPress }) {
	let period = !empty(item?.period) ? item.period : 30;

	const [code, setCode] = useState("");
	const [counter, setCounter] = useState(0);
	
	const interval = useRef(null);

	useEffect(() => {
		generateCode();

		if(empty(interval.current)) {
			interval.current = setInterval(generateCode, 1000);
		}

		return () => {
			clearInterval(interval.current);
			interval.current = null;
		}
	}, []);

	return (
		<TouchableScale onPress={onPress}>
			<LinearGradient useAngle={true} angle={45} style={styles.cardContainer} colors={Gradients[item.gradient]}>
				<View style={styles.card}>
					<View style={styles.cardLeft}>
						<Icon name={getAccountIcon(item.name)} size={40} color={Colors.mainContrast}/>
					</View>
					<View style={styles.cardCenter}>
						<Text style={[styles.cardText, styles.cardName]} ellipsizeMode="tail" numberOfLines={1}>{item.name}</Text>
						<Text style={styles.cardText}>{code}</Text>
					</View>
					<View style={styles.cardCounter} pointerEvents="none">
						<CircularProgress
							radius={26}
							value={counter}
							maxValue={period}
							activeStrokeColor={`${Gradients[item.gradient][Gradients[item.gradient].length - 1]}`}
							activeStrokeSecondaryColor={`${Gradients[item.gradient][0]}`}
							inActiveStrokeColor={Colors.mainFourth}
							progressValueFontSize={14}
						/>
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
			let timeLeft = Math.floor(period - Date.now() / 1000 % period);
			setCounter(timeLeft);
			setCode(totp(item.secret));
		} catch(error) {
			setCode("");
			console.log(error);
		}
	}
}