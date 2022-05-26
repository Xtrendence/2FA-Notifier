import React from "react";
import Page from "../components/common/Page";

export default function Settings({ navigation }) {
	return (
		<Page title="Settings" gradient={5} onPressBack={() => navigation.navigate("Accounts")} noIcon>

		</Page>
	);
}