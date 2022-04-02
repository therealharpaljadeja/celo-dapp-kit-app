import { View, Button, StyleSheet, Text } from "react-native";
import { useState, useEffect, useContext } from "react";
import {
	FeeCurrency,
	requestAccountAddress,
	requestTxSig,
} from "@celo/dappkit";
import { newKitFromWeb3 } from "@celo/contractkit";
import Web3 from "web3";
import { toTxResult } from "@celo/connect";
import * as Linking from "expo-linking";
import { SafeAreaView } from "react-native-safe-area-context";
import { AccountContext } from "../context/AccountContext";

const provider = "https://alfajores-forno.celo-testnet.org";
const web3 = new Web3(provider);
const kit = newKitFromWeb3(web3);

export default function ConnectWalletScreen() {
	const { setAccount } = useContext(AccountContext);

	async function login() {
		requestAccountAddress({
			requestId: "requesting",
			dappName: "native",
			callback: Linking.createURL("/connect"),
		});

		async function handler({ url }) {
			const { path, queryParams } = Linking.parse(url);
			if (path == "connect") {
				console.log(queryParams.account);
				setAccount(queryParams.account);
				kit.defaultAccount = queryParams.account;
			} else if (path == "send") {
				let result = await toTxResult(
					kit.web3.eth.sendSignedTransaction(queryParams.rawTxs)
				).waitReceipt();
				console.log(result);
			}
		}
	}

	async function send() {
		const txObject = await web3.eth.send({
			from: account,
			to: "0x22b2DD2CFEF2018D15543c484aceF6D9B5435863",
			value: web3.utils.toWei(web3.utils.toBN(1), "ether"),
		});

		console.log(txObject);
		// requestTxSig(
		// 	kit,
		// 	[
		// 		{
		// 			from: account,
		// 			to: "0x22b2DD2CFEF2018D15543c484aceF6D9B5435863",
		// 			feeCurrency: FeeCurrency.cUSD,
		// 			tx: txObject,
		// 		},
		// 	],
		// 	{
		// 		requestId: "sending",
		// 		dappName: "native",
		// 		callback: Linking.createURL("/send"),
		// 	}
		// );
	}

	// return (
	// 	<View>
	// 		<Text>{account}</Text>
	// 		<Button title='Send' onPress={send} />
	// 	</View>
	// );
	return (
		<SafeAreaView>
			<Button onPress={login} title='Connect Wallet' />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
