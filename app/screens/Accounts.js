import React from "react";
import { FlatList, Text } from "react-native";
import Page from "../components/common/Page";
import styles from "../styles/Accounts";
import AccountItem from "../components/AccountItem";
import TouchableScale from "../components/common/TouchableScale";

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
		name: "Random",
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
	return (
		<Page title="Accounts" gradient={14} angle={240}>
			<FlatList
				ListHeaderComponent={
					<TouchableScale style={styles.addCard}>
						<Text style={styles.addText}>Add Account</Text>
					</TouchableScale>
				}
				data={data}
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
		</Page>
	);
}