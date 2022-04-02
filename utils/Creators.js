import { ethers } from "ethers";
import Creators from "../abi/Creators.json";
import Creator from "../abi/Creator.json";
import { CREATORS_CONTRACT_ADDRESS } from "@env";
import { web3 } from "../context/AccountContext";
import * as Linking from "expo-linking";
import { requestTxSig, FeeCurrency } from "@celo/dappkit";

export const isUserRegistered = async (kit) => {
	const creatorsContract = new web3.eth.Contract(
		Creators.abi,
		CREATORS_CONTRACT_ADDRESS
	);
	let account = kit.defaultAccount;

	let result = await creatorsContract.methods
		.isUserRegistered(account)
		.call();
	return result;
};

export const getCreatorAddressByUsername = async (wallet, username) => {
	const signer = wallet.getSigner();
	const creatorsContract = new ethers.Contract(
		process.env.REACT_APP_CREATORS_CONTRACT_ADDRESS,
		Creators.abi,
		signer
	);
	let result = await creatorsContract.getCreatorAddressByUsername(username);
	return result;
};

export const registerUser = async (kit, creatorObj) => {
	const creatorsContract = new web3.eth.Contract(
		Creators.abi,
		CREATORS_CONTRACT_ADDRESS
	);

	let {
		name,
		bio,
		username,
		profilePicUrl,
		nftCollectionName,
		nftCollectionSymbol,
	} = creatorObj;

	let txObject = await creatorsContract.methods.registerUser(
		username,
		name,
		bio,
		profilePicUrl,
		nftCollectionName,
		nftCollectionSymbol
	);

	requestTxSig(
		kit,
		[
			{
				from: kit.defaultAccount,
				to: CREATORS_CONTRACT_ADDRESS,
				tx: txObject,
				feeCurrency: FeeCurrency.cUSD,
			},
		],
		{
			requestId: "registerUser",
			dappName: "DAOMe",
			callback: Linking.createURL("/registerUser"),
		}
	);
};

export const getCreatorAddressBySender = async () => {
	const creatorsContract = new web3.eth.Contract(
		Creators.abi,
		CREATORS_CONTRACT_ADDRESS
	);

	let result = await creatorsContract.methods
		.getCreatorAddressBySender()
		.call();
	return result;
};

export const getCreatorObjFromAddress = async (contractAddress) => {
	const creatorContract = new web3.eth.Contract(Creator.abi, contractAddress);

	let username = await creatorContract.methods.username().call();
	let name = await creatorContract.methods.name().call();
	let bio = await creatorContract.methods.bio().call();

	let profilePicUrl = await creatorContract.methods.profilePicUrl().call();
	let nftCollectionName = await creatorContract.methods
		.nftCollectionName()
		.call();
	let nftCollectionSymbol = await creatorContract.methods
		.nftCollectionSymbol()
		.call();
	let nftCollectionAddress = await creatorContract.methods
		.nftCollectionAddress()
		.call();

	let royaltyEarned = ethers.utils.formatEther(
		(await provider.getBalance(nftCollectionAddress)).toString()
	);

	return {
		username,
		name,
		bio,
		nftCollectionName,
		nftCollectionSymbol,
		nftCollectionAddress,
		profilePicUrl,
		royaltyEarned,
	};
};
