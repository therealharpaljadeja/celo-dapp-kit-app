import { View, Button, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import {
	FeeCurrency,
	requestAccountAddress,
	requestTxSig,
} from "@celo/dappkit";
import HelloWorldContract from "../HelloWorld.json";
import { newKitFromWeb3 } from "@celo/contractkit";
import Web3 from "web3";
import { toTxResult } from "@celo/connect";
import * as Linking from "expo-linking";

const provider = "https://alfajores-forno.celo-testnet.org";
const web3 = new Web3(provider);
const kit = newKitFromWeb3(web3);

export default function ConnectWalletScreen() {
	const [account, setAccount] = useState(null);
	const [contract, setContract] = useState(null);

	useEffect(async () => {
		const networkId = await web3.eth.net.getId();
		const deployedNetwork = HelloWorldContract.networks[networkId];
		const instance = new web3.eth.Contract(
			HelloWorldContract.abi,
			"0xD9BBC1c3C76bd285C33de5Df4b987369EC66DC56"
		);
		setContract(instance);
	}, []);

	async function login() {
		requestAccountAddress({
			requestId: "requesting",
			dappName: "native",
			callback: Linking.createURL("/connect"),
		});

		async function handler({ url }) {
			const { path, queryParams } = Linking.parse(url);
			if (path == "connect") {
				setAccount(queryParams.account);
				kit.defaultAccount = queryParams.account;
			} else if (path == "send") {
				let result = await toTxResult(
					kit.web3.eth.sendSignedTransaction(queryParams.rawTxs)
				).waitReceipt();
				console.log(result);
			}
		}

		Linking.addEventListener("url", handler);
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

	if (account) {
		return (
			<View>
				<Text>{account}</Text>
				<Button title='Send' onPress={send} />
			</View>
		);
	} else {
		<Button onPress={login} title='Connect Wallet' />;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
