import React, { useState } from "react";
import { Text, ScrollView, TextInput, View } from "react-native";
import Page from "../components/common/Page";
import TouchableScale from "../components/common/TouchableScale";
import GradientPicker from "../components/GradientPicker";
import styles from "../styles/Scan";
import { Colors } from "../styles/Global";
import Toast from "react-native-toast-message";
import { empty, encryptObjectValues } from "../utils/Utils";
import { sha256 } from "react-native-sha256";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Edit({ navigation, route }) {
	let account = route.params?.account;
	let secret = account?.secret;
	
	const [domain, setDomain] = useState(account?.domain || "");
	const [name, setName] = useState(account?.name || "");
	const [period, setPeriod] = useState(account?.period.toString() || "30");
	const [gradient, setGradient] = useState(account?.gradient || 0);

	return (
		<Page title="Edit Account" gradient={10} onPressBack={() => navigation.navigate("Accounts")} icon="check" onPressIcon={() => updateAccount(domain, name, secret, period, gradient)}>
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
				<GradientPicker active={gradient} setActive={setGradient}/>
			</ScrollView>
		</Page>
	);

	async function updateAccount(domain, name, secret, period, gradient) {
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

			let updated = {
				domain: domain,
				name: name,
				secret: secret,
				period: period,
				gradient: gradient
			};

			let encrypted = encryptObjectValues("1234", updated);

			await AsyncStorage.setItem(`account-${hash}`, JSON.stringify(encrypted));

			Toast.show({
				type: "success",
				text1: "Account Created",
				text2: `The account "${name}" has been updated.`,
				position: "bottom",
			});

			navigation.navigate("View", { account:updated });
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