import { View, Button, TouchableOpacity, Text } from "react-native";
import { useState, useEffect, useContext } from "react";
import {
	FeeCurrency,
	requestAccountAddress,
	requestTxSig,
} from "@celo/dappkit";
import * as Linking from "expo-linking";
import { SafeAreaView } from "react-native-safe-area-context";
import { AccountContext } from "../context/AccountContext";
import tw from "twrnc";

export default function ConnectWalletScreen() {
	async function login() {
		requestAccountAddress({
			requestId: "requesting",
			dappName: "native",
			callback: Linking.createURL("/connect"),
		});
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
		<SafeAreaView style={tw`flex-1 justify-center items-center`}>
			<TouchableOpacity
				style={tw`bg-purple-500 p-4 rounded-md shadow-md`}
				onPress={login}>
				<Text style={tw`text-white`}>Connect Wallet</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
