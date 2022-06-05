import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Text, TextInput, View, Keyboard, KeyboardAvoidingView, RefreshControl } from "react-native";
import Page from "../components/common/Page";
import styles from "../styles/Accounts";
import AccountItem from "../components/AccountItem";
import TouchableScale from "../components/common/TouchableScale";
import { wrapperHeight, barHeight } from "../utils/Measurements";
import { Colors, Gradients } from "../styles/Global";
import { wait, empty, decryptObjectValues } from "../utils/Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Accounts({ navigation }) {
	const [refreshing, setRefreshing] = useState(false);
	const [accounts, setAccounts] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [input, setInput] = useState("");

	const [keyboardVisible, setKeyboardVisible] = useState(false);
	const [keyboardHeight, setKeyboardHeight] = useState(0);

	const listRef = useRef();
	const inputRef = useRef();

	let listHeightKeyboard = wrapperHeight - keyboardHeight + barHeight - 88;

	let keyboardDidHideListener = null;
	let keyboardDidShowListener = null;

	keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", keyboardDidHide);
	keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", keyboardDidShow);

	const onRefresh = useCallback(async () => {
		setAccounts([]);
		setRefreshing(true);
		await wait(500);
		getAccounts();
		setRefreshing(false);
	}, []);

	useEffect(() => {
		navigation.addListener("focus", async () => {
			if(navigation.isFocused()) {
				setAccounts([]);
				await wait(500);
				getAccounts();
			}
		});
	}, []);

	useEffect(() => {
		if(empty(input) || empty(accounts)) {
			setFiltered([]);
			return;
		}

		setFiltered(search(accounts, input));
	}, [input]);

	return (
		<Page title="Accounts" gradient={14} angle={240} noBack onPressIcon={() => navigation.navigate("Settings")}>
			<KeyboardAvoidingView style={[styles.view, keyboardVisible ? { height:listHeightKeyboard } : null]}>
				<FlatList
					refreshControl={
						<RefreshControl
							progressBackgroundColor={Colors.mainFirst}
							colors={Gradients[9]}
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}
					ref={listRef}
					style={[styles.list, keyboardVisible ? { maxHeight:listHeightKeyboard, minHeight:listHeightKeyboard } : null]}
					ListHeaderComponent={
						<TouchableScale style={styles.addCard} onPress={() => navigation.navigate("Scan")}>
							<Text style={styles.addText}>Add Account</Text>
						</TouchableScale>
					}
					data={getListData()}
					keyExtractor={(item, index) => index}
					renderItem={(data) => {
						return (
							<AccountItem 
								item={data.item} 
								onPress={() => {
									navigation.navigate("View", { account:data.item });
								}}
							/>
						);
					}}
					contentContainerStyle={{
						paddingBottom: 10
					}}
				/>
			</KeyboardAvoidingView>
			<View style={styles.searchWrapper}>
				<TextInput
					ref={inputRef}
					value={input}
					spellCheck={false}
					keyboardType="default"
					autoCorrect={false}
					placeholder="Search..." 
					selectionColor={Colors.accentFirst} 
					placeholderTextColor={Colors.mainContrastDark} 
					style={styles.input}
					onChangeText={(value) => setInput(value)}
				/>
			</View>
		</Page>
	);

	async function getAccounts() {
		let result = await decryptAccounts("1234") || [];
		setAccounts(result);
	}

	function decryptAccounts(password) {
		return new Promise(async (resolve, reject) => {
			try {
				let result = [];

				let keys = await AsyncStorage.getAllKeys();
				keys.map(async (key) => {
					try {
						if(key.includes("account-")) {
							let value = await AsyncStorage.getItem(key);
							let decrypted = decryptObjectValues(password, JSON.parse(value));
							result.push(decrypted);

							if(keys[keys.length - 1] === key) {
								resolve(result);
							}
						}
					} catch(error) {
						console.log(error);
					}
				});
			} catch(error) {
				console.log(error);
				reject(error);
			}
		});
	}

	function getListData() {
		if(empty(accounts)) {
			return null;
		}

		if(empty(input) || empty(filtered)) {
			return accounts;
		}

		return filtered;
	}

	function search(data, query) {
		try {
			let result = [];
			let keys = Object.keys(data);
			keys.map(key => {
				let value = data[key];
				let name = value.name;
				if(name.toLowerCase().includes(query.toLowerCase())) {
					result.push(value);
				}
			});
			
			return result;
		} catch(error) {
			console.log(error);
			setInput("");
			return {};
		}
	}

	function keyboardDidHide(event) {
		if(navigation.isFocused()) {
			inputRef?.current?.blur();
			setKeyboardVisible(false);
		}
	}

	function keyboardDidShow(event) {
		if(navigation.isFocused()) {
			setKeyboardHeight(event.endCoordinates.height);
			setKeyboardVisible(true);
		}
	}
}