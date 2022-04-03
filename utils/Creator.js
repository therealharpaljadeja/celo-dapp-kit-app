import Creator from "../abi/Creator.json";
import { requestTxSig, FeeCurrency } from "@celo/dappkit";
import * as Linking from "expo-linking";
import { web3 } from "../context/AccountContext";

export const getNFTCollectionAddress = async (creatorAddress) => {
	const creatorContract = new web3.eth.Contract(Creator.abi, creatorAddress);
	let result = await creatorContract.methods.nftCollectionAddress().call();
	return result;
};
