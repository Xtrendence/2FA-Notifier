import React, { useState } from "react";
import { Text, ScrollView, TextInput, View } from "react-native";
import Page from "../components/common/Page";
import TouchableScale from "../components/common/TouchableScale";
import GradientPicker from "../components/GradientPicker";
import QRCodeScanner from "react-native-qrcode-scanner";
import styles from "../styles/Scan";
import { Colors } from "../styles/Global";
import Toast from "react-native-toast-message";
import { empty, parseURI, validSecret, encryptObjectValues } from "../utils/Utils";
import { sha256 } from "react-native-sha256";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../store/store";

export default function Scan({ navigation }) {
	const [camera, setCamera] = useState(false);

	// const [domain, setDomain] = useState("");
	// const [name, setName] = useState("");
	// const [secret, setSecret] = useState("");
	// const [period, setPeriod] = useState("");
	// const [gradient, setGradient] = useState(0);
	
	const [domain, setDomain] = useState("reddit.com");
	const [name, setName] = useState("Reddit");
	const [secret, setSecret] = useState("23TplPdS46Juzcyx");
	const [period, setPeriod] = useState("30");
	const [gradient, setGradient] = useState(1);

	return (
		<Page title="Add Account" gradient={gradient} onPressBack={() => navigation.navigate("Accounts")} icon="check" onPressIcon={() => addAccount(domain, name, secret, period, gradient)}>
			{ camera &&
				<View style={styles.modalContent}>
					<QRCodeScanner 
						vibrate={false}
						reactivate={true}
						onRead={(e) => processCode(e.data)}
						topContent={
							<View style={styles.modalTop}>
								<Text style={styles.modalText}>Please scan a valid 2FA QR code.</Text>
							</View>
						}
						bottomContent={
							<TouchableScale style={styles.button} onPress={() => setCamera(false)}>
								<Text style={styles.text}>Close Camera</Text>
							</TouchableScale>
						}
					/>
				</View>
			}
			{ !camera &&
				<ScrollView nestedScrollEnabled={true}>
					<TextInput
						value={domain}
						spellCheck={false}
						keyboardType="default"
						autoCorrect={false}
						placeholder="Domain... (e.g. reddit.com)" 
						selectionColor={Colors.accentFirst} 
						placeholderTextColor={Colors.mainContrastDark} 
						style={styles.input}
						onChangeText={(value) => setDomain(value)}
					/>
					<TextInput
						value={name}
						spellCheck={false}
						keyboardType="default"
						autoCorrect={false}
						placeholder="Name... (e.g. Reddit)" 
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
					<TouchableScale style={styles.button} onPress={() => setCamera(true)}>
						<Text style={styles.text}>Scan QR Code</Text>
					</TouchableScale>
					<GradientPicker active={gradient} setActive={setGradient}/>
				</ScrollView>
			}
		</Page>
	);

	function processCode(code) {
		try {
			let details = parseURI(code);
			let accountName = !empty(details?.issuer) ? details?.issuer : details?.account;

			if(empty(details?.key) || !validSecret(details?.key)) {
				Toast.show({
					type: "error",
					text1: "Error",
					text2: `Invalid secret/key.`,
					position: "bottom",
				});

				return;
			}

			setName(accountName);
			setSecret(details?.key);
			setPeriod(empty(details?.period) ? "30" : details?.period.toString());
			
			setCamera(false);

			Toast.show({
				type: "success",
				text1: "Scan Successful",
				text2: `Details have now been filled out.`,
				position: "bottom",
			});
		} catch(error) {
			console.log(error);

			Toast.show({
				type: "error",
				text1: "Error",
				text2: `Couldn't parse QR code content.`,
				position: "bottom",
			});
		}
	}

	async function addAccount(domain, name, secret, period, gradient) {
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

		if(empty(domain) || empty(name) || empty(secret) || empty(gradient)) {
			Toast.show({
				type: "error",
				text1: "Error",
				text2: `Please provide all required details.`,
				position: "bottom",
			});

			return;
		}

		try {
			let hash = await sha256(domain.toLowerCase());
			let userPassword = store.getState().password.password;
			let encrypted = encryptObjectValues(userPassword, {
				domain: domain,
				name: name,
				secret: secret,
				period: period,
				gradient: gradient
			});

			await AsyncStorage.setItem(`account-${hash}`, JSON.stringify(encrypted));

			Toast.show({
				type: "success",
				text1: "Account Created",
				text2: `The account "${name}" has been created.`,
				position: "bottom",
			});

			navigation.navigate("Accounts");
		} catch(error) {
			console.log(error);

			Toast.show({
				type: "error",
				text1: "Error",
				text2: `Couldn't create account.`,
				position: "bottom",
			});
		}
	}
}