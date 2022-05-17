import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Text, TextInput, View, Keyboard, KeyboardAvoidingView, RefreshControl } from "react-native";
import Page from "../components/common/Page";
import styles from "../styles/Accounts";
import AccountItem from "../components/AccountItem";
import TouchableScale from "../components/common/TouchableScale";
import { wrapperHeight, barHeight } from "../components/common/NavigationBar";
import { Colors, Gradients } from "../styles/Global";
import { wait, empty } from "../utils/Utils";

let data = [
	{
		name: "Twitter",
		secret: "23TplPdS46Juzcyx",
		gradient: 11,
		period: 30
	},
	{
		name: "Instagram",
		secret: "23TplsdS46Juzcyx",
		gradient: 0,
		period: 30
	},
	{
		name: "Reddit",
		secret: "23TplPdS46Jwzdyx",
		gradient: 1,
		period: 30
	},
	{
		name: "Some really long name",
		secret: "23TplPdS46Jwzdcc",
		gradient: 9,
		period: 30
	},
	{
		name: "Cloudflare",
		secret: "23TplPdS46Jwzdff",
		gradient: 13,
		period: 30
	},
	{
		name: "Microsoft",
		secret: "23TplPdS46Jwzdmm",
		gradient: 2,
		period: 30
	},
]

export default function Accounts({ navigation }) {
	const [refreshing, setRefreshing] = useState(false);
	const [accounts, setAccounts] = useState(data);
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
		setAccounts({});
		setRefreshing(true);
		await wait(500);
		setAccounts(data);
		setRefreshing(false);
	}, []);

	useEffect(() => {
		if(empty(input) || empty(accounts)) {
			setFiltered([]);
			return;
		}

		setFiltered(search(accounts, input));
	}, [input]);

	return (
		<Page title="Accounts" gradient={14} angle={240}>
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
						<TouchableScale style={styles.addCard}>
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
									console.log(data.item.name);
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