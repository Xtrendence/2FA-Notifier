import React, { useState } from "react";
import { Text, ScrollView, TextInput } from "react-native";
import Page from "../components/common/Page";
import TouchableScale from "../components/common/TouchableScale";
import GradientPicker from "../components/GradientPicker";
import styles from "../styles/Scan";
import { Colors } from "../styles/Global";
import Toast from "react-native-toast-message";
import { empty } from "../utils/Utils";

export default function Scan({ navigation }) {
	const [name, setName] = useState("");
	const [secret, setSecret] = useState("");
	const [period, setPeriod] = useState("");
	const [gradient, setGradient] = useState(0);

	return (
		<Page title="Add Account" gradient={11} onPressBack={() => navigation.navigate("Accounts")} icon="check" onPressIcon={() => addAccount(name, secret, period, gradient)}>
			<ScrollView nestedScrollEnabled={true}>
				<TextInput
					value={name}
					spellCheck={false}
					keyboardType="default"
					autoCorrect={false}
					placeholder="Name..." 
					selectionColor={Colors.accentFirst} 
					placeholderTextColor={Colors.mainContrastDark} 
					style={styles.input}
					onChangeText={(value) => setName(value)}
				/>
				<TextInput
					value={secret}
					spellCheck={false}
					keyboardType="default"
					autoCorrect={false}
					placeholder="Secret Key..." 
					selectionColor={Colors.accentFirst} 
					placeholderTextColor={Colors.mainContrastDark} 
					style={styles.input}
					onChangeText={(value) => setSecret(value)}
				/>
				<TextInput
					value={period}
					spellCheck={false}
					keyboardType="number-pad"
					autoCorrect={false}
					placeholder="Period in Seconds (Default: 30)..." 
					selectionColor={Colors.accentFirst} 
					placeholderTextColor={Colors.mainContrastDark} 
					style={styles.input}
					onChangeText={(value) => setPeriod(value)}
				/>
				<TouchableScale style={styles.button} onPress={() => {}}>
					<Text style={styles.text}>Scan QR Code</Text>
				</TouchableScale>
				<GradientPicker active={gradient} setActive={setGradient}/>
			</ScrollView>
		</Page>
	);

	async function addAccount(name, secret, period, gradient) {
		try {
			period = empty(period) ? 30 : parseInt(period);
		} catch(error) {
			console.log(error);

			Toast.show({
				type: "error",
				text1: "Error",
				text2: `Please provide all required details.`,
				position: "bottom",
			});

			return;
		}

		if(empty(name) || empty(secret) || empty(gradient)) {
			Toast.show({
				type: "error",
				text1: "Error",
				text2: `Please provide all required details.`,
				position: "bottom",
			});

			return;
		}

		Toast.show({
			type: "success",
			text1: "Account Created",
			text2: `The account "${name}" has been created.`,
			position: "bottom",
		});

		navigation.navigate("Accounts");
	}
}