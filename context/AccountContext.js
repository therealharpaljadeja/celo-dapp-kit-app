import React, { useState } from "react";
import * as Linking from "expo-linking";
import { newKitFromWeb3 } from "@celo/contractkit";
import Web3 from "web3";
import { toTxResult } from "@celo/connect";
import { isUserRegistered, registerUser } from "../utils/Creators";

const provider = "https://alfajores-forno.celo-testnet.org";
export const web3 = new Web3(provider);

export const AccountContext = React.createContext(null);

export default function AccountContextProvider({ children }) {
	const kit = newKitFromWeb3(web3);
	const [account, setAccount] = useState(null);
	const [creator, setCreator] = useState(null);

	const handler = async ({ url }) => {
		const { path, queryParams } = Linking.parse(url);

		switch (path) {
			case "connect":
				kit.defaultAccount = queryParams.account;
				setAccount(queryParams.account);
				break;
			case "registerUser":
				let registerTx = queryParams.rawTxs;
				let registerReceipt = await toTxResult(
					kit.web3.eth.sendSignedTransaction(registerTx)
				).waitReceipt();
				console.log(registerReceipt);
				break;
			case "mintNFT":
				let mintTx = queryParams.rawTxs;
				console.log(mintTx);
			default:
				console.log("unknown url!");
		}
	};

	const checkIfUserRegistered = async () => {
		let result = await isUserRegistered(kit);
		return result;
	};

	const registerUserWithKit = async (creatorObj) => {
		await registerUser(kit, creatorObj);
	};
	return (
		<AccountContext.Provider
			value={{
				account,
				checkIfUserRegistered,
				creator,
				setCreator,
				setAccount,
				handler,
				kit,
				registerUserWithKit,
			}}>
			{children}
		</AccountContext.Provider>
	);
}
