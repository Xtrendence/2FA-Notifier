import React from "react";
import Page from "../components/common/Page";
import { empty } from "../utils/Utils";

export default function View({ navigation, route }) {
	let account = route.params?.account;
	let name = !empty(account?.name) ? account.name : "Account";

	return (
		<Page title={name} gradient={account?.gradient} onPressBack={() => navigation.navigate("Accounts")} icon="pen">

		</Page>
	);
}