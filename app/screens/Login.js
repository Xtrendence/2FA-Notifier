import React, { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import Wave from "../components/Wave";
import LottieView from "lottie-react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "../styles/Login";
import { Gradients, Colors } from "../styles/Global";
import Loading from "../components/common/Loading";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { empty, wait } from "../utils/Utils";
import TouchableScale from "../components/common/TouchableScale";

export default function Login({ navigation }) {
	let gradient = 0;

	const [loading, setLoading] = useState(true);

	const [register, setRegister] = useState(false);

	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");

	useEffect(() => {
		checkUser();

		navigation.addListener("focus", () => {
			if(navigation.isFocused()) {
				checkUser();
			}
		});
	}, []);

	return (
		<View style={styles.wrapper}>
			<Loading loading={loading}/>
			<Wave gradient={gradient}/>
			<View style={styles.titleWrapper}>
				<Text style={styles.title}>2FA Notifier</Text>
				<Text style={styles.subtitle}>by Xtrendence</Text>
			</View>
			<View style={styles.container}>
				{ !register &&
					<View style={{ alignItems:"center" }}>
						<View style={styles.inputWrapper}>
							<LinearGradient useAngle={true} angle={45} style={styles.border} colors={[Gradients[gradient][0], Gradients[gradient][1]]}/>
							<TextInput
								value={password}
								spellCheck={false}
								keyboardType="default"
								autoCorrect={false}
								placeholder="Password..." 
								selectionColor={Colors.accentFirst} 
								placeholderTextColor={Colors.mainContrastDark} 
								style={styles.input}
								onChangeText={(value) => setPassword(value)}
								secureTextEntry
							/>
						</View>
						<TouchableScale style={styles.button} onPress={() => login(password)}>
							<Text style={styles.text}>Login</Text>
						</TouchableScale>
					</View>
				}
				{ register &&
					<View style={{ alignItems:"center" }}>
						<View style={styles.inputWrapper}>
							<LinearGradient useAngle={true} angle={45} style={styles.border} colors={[Gradients[gradient][0], Gradients[gradient][1]]}/>
							<TextInput
								value={newPassword}
								spellCheck={false}
								keyboardType="default"
								autoCorrect={false}
								placeholder="Password..." 
								selectionColor={Colors.accentFirst} 
								placeholderTextColor={Colors.mainContrastDark} 
								style={styles.input}
								onChangeText={(value) => setNewPassword(value)}
								secureTextEntry
							/>
						</View>
						<View style={styles.inputWrapper}>
							<LinearGradient useAngle={true} angle={45} style={styles.border} colors={[Gradients[gradient][0], Gradients[gradient][1]]}/>
							<TextInput
								value={repeatPassword}
								spellCheck={false}
								keyboardType="default"
								autoCorrect={false}
								placeholder="Repeat Password..." 
								selectionColor={Colors.accentFirst} 
								placeholderTextColor={Colors.mainContrastDark} 
								style={styles.input}
								onChangeText={(value) => setRepeatPassword(value)}
								secureTextEntry
							/>
						</View>
						<TouchableScale style={styles.button} onPress={() => registerUser(newPassword, repeatPassword)}>
							<LinearGradient useAngle={true} angle={45} style={styles.buttonGradient} colors={[Gradients[gradient][0], Gradients[gradient][1]]}>
								<Text style={styles.text}>Confirm Password</Text>
							</LinearGradient>
						</TouchableScale>
					</View>
				}
			</View>
			<View style={styles.animationWrapper}>
				<LottieView style={styles.animation} source={require("../assets/animations/security.json")} autoPlay loop/>
			</View>
		</View>
	);

	function login(password) {

	}

	function registerUser(newPassword, repeatPassword) {

	}

	async function checkUser() {
		try {
			setLoading(true);

			let user = await AsyncStorage.getItem("user") || "";

			setRegister(empty(user));

			await wait(1500);

			setLoading(false);
		} catch(error) {
			Toast.show({
				type: "error",
				text1: "Error Fetching Account",
				text2: `Couldn't fetch user data.`,
				position: "bottom",
			});
		}
	}
}