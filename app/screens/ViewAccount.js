import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import Page from "../components/common/Page";
import { empty } from "../utils/Utils";
import CircularProgress from "react-native-circular-progress-indicator";
import { Gradients, Colors } from "../styles/Global";
import styles from "../styles/ViewAccount";
import totp from "totp-generator";
import Toast from "react-native-toast-message";
import Clipboard from "@react-native-clipboard/clipboard";
import TouchableScale from "../components/common/TouchableScale";

export default function ViewAccount({ navigation, route }) {
	let account = route.params?.account;
	let name = !empty(account?.name) ? account.name : "Account";
	let period = !empty(account?.period) ? account.period : 30;

	const [code, setCode] = useState("");
	const [counter, setCounter] = useState(0);
	const [copied, setCopied] = useState("");
	
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
		<Page title={name} gradient={account?.gradient} onPressBack={() => navigation.navigate("Accounts")} icon="pen" onPressIcon={() => navigation.navigate("Edit", { account:account })}>
			<View style={styles.wrapper}>
				<CircularProgress
					radius={64}
					value={counter}
					maxValue={period}
					activeStrokeColor={`${Gradients[account.gradient][Gradients[account.gradient].length - 1]}`}
					activeStrokeSecondaryColor={`${Gradients[account.gradient][0]}`}
					inActiveStrokeColor={Colors.mainFourth}
					progressValueFontSize={40}
				/>
				<Text style={styles.code}>{code}</Text>
				<Text style={styles.name}>{name}</Text>
			</View>
			<View style={styles.buttonWrapper}>
				<TouchableScale style={[styles.button, styles[`button${copied}`]]} onPress={() => copy(code)}>
					<Text style={[styles.buttonText, styles[`buttonText${copied}`]]}>{copied === "Copied" ? "Copied" : "Copy Code"}</Text>
				</TouchableScale>
			</View>
		</Page>
	);

	function generateCode() {
		try {
			let timeLeft = Math.floor(period - Date.now() / 1000 % period);
			setCounter(timeLeft);
			setCode(totp(account.secret));
		} catch(error) {
			setCode("");
			console.log(error);
		}
	}

	function copy(string) {
		Clipboard.setString(string);
		Toast.show({
			type: "success",
			text1: "2FA Code",
			text2: "Copied to Clipboard.",
			position: "bottom",
			onShow: () => {
				if(navigation.isFocused()) {
					setCopied("Copied");
				}
			},
			onHide: () => {
				if(navigation.isFocused()) {
					setCopied("");
				}
			}
		});
	}
}