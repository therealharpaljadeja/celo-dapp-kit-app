import NFT from "../abi/NFT.json";
import { getNFTCollectionAddress } from "./Creator";
import axios from "axios";
import Creator from "../abi/Creator.json";
import { web3 } from "../context/AccountContext";
import { requestTxSig, FeeCurrency } from "@celo/dappkit";
import * as Linking from "expo-linking";

export const balanceOf = async (kit, creatorAddress) => {
	let collectionAddress = getNFTCollectionAddress(creatorAddress);
	let nftContract = new web3.eth.Contract(NFT.abi, collectionAddress);
	let result = await nftContract.methods.balanceOf(kit.defaultAccount);
	return result;
};

export const mintNFT = async (
	kit,
	creatorAddress,
	tokenURI,
	royaltyPercentage
) => {
	console.log("minting nft", kit.defaultAccount);
	let collectionAddress = await getNFTCollectionAddress(creatorAddress);
	let nftContract = new web3.eth.Contract(NFT.abi, collectionAddress);
	let txObject = await nftContract.methods
		.createToken(tokenURI, royaltyPercentage)
		.call();

	requestTxSig(
		kit,
		[
			{
				from: kit.defaultAccount,
				to: collectionAddress,
				tx: txObject,
				feeCurrency: FeeCurrency.cUSD,
			},
		],
		{
			requestId: "mintNFT",
			dappName: "DAOMe",
			callback: Linking.createURL("/mintNFT"),
		}
	);

	// console.log(txObject);
	// return txObject;
};

export const tokenOwnedByUser = async (creatorAddress) => {
	const ownerAddress = kit.defaultAccount;

	let collectionAddress = await getNFTCollectionAddress(creatorAddress);

	let nftContract = new web3.eth.Contract(NFT.abi, collectionAddress);
	let balanceOfOwner = await balanceOf(kit, creatorAddress);
	let nfts = [];
	for (let i = 0; i < balanceOfOwner; i++) {
		let tokenId = await nftContract.methods
			.tokenOfOwnerByIndex(ownerAddress, i)
			.call();
		let tokenURI = await nftContract.methods.tokenURI(tokenId).call();
		let response = await axios.get(tokenURI);
		const { name, description } = response.data;
		let ImageUrlSplit = response.data.image.split("/", 4);
		let imageUrl = `https://ipfs.io/ipfs/${
			ImageUrlSplit[ImageUrlSplit.length - 2] +
			"/" +
			ImageUrlSplit[ImageUrlSplit.length - 1]
		}`;
		let nft = {
			name,
			description,
			image: imageUrl,
			collectionAddress,
			creatorAddress,
			tokenId,
		};
		nfts.push(nft);
	}

	return nfts;
};

export const tokenMetadata = async (
	creatorAddress,
	collectionAddress,
	tokenId
) => {
	let nftContract = new web3.eth.Contract(NFT.abi, collectionAddress);
	let isApprovedByOwner = await nftContract.methods
		.isApprovedToMarketplace(MARKETPLACE_CONTRACT_ADDRESS, tokenId)
		.call();
	let owner = await nftContract.methods.ownerOf(tokenId).call();
	let creatorContract = new web3.eth.Contract(Creator.abi, creatorAddress);

	let creator = {};
	creator.username = await creatorContract.methods.username().call();

	creator.name = await creatorContract.methods.name().call();
	creator.bio = await creatorContract.methods.bio().call();
	creator.profilePicUrl = await creatorContract.methods
		.profilePicUrl()
		.call();

	let tokenURI = await nftContract.methods.tokenURI(tokenId).call();
	let response = await axios.get(tokenURI);

	const { name, description } = response.data;
	let ImageUrlSplit = response.data.image.split("/", 4);
	let imageUrl = `https://ipfs.io/ipfs/${
		ImageUrlSplit[ImageUrlSplit.length - 2] +
		"/" +
		ImageUrlSplit[ImageUrlSplit.length - 1]
	}`;

	let nft = {
		name,
		description,
		image: imageUrl,
		collectionAddress,
		tokenId,
		creator,
		owner,
		isApprovedByOwner,
	};

	return nft;
};

export const approveToMarketplace = async (collectionAddress, tokenId) => {
	let nftContract = new web3.eth.Contract(NFT.abi, collectionAddress);
	let txObject = await nftContract.methods
		.approve(MARKETPLACE_CONTRACT_ADDRESS, tokenId)
		.send();

	requestTxSig(
		kit,
		[
			{
				from: kit.defaultAccount,
				to: collectionAddress,
				tx: txObject,
				feeCurrency: FeeCurrency.cUSD,
			},
		],
		{
			requestId: "approveNFT",
			dappName: "DAOMe",
			callback: Linking.createURL("/approveNFT"),
		}
	);

	return txObject;
};

export const withdrawRoyalty = async (collectionAddress) => {
	let nftContract = new web3.eth.Contract(NFT.abi, collectionAddress);
	let txObject = await nftContract.methods.withdraw().send();

	requestTxSig(
		kit,
		[
			{
				from: kit.defaultAccount,
				to: collectionAddress,
				tx: txObject,
				feeCurrency: FeeCurrency.cUSD,
			},
		],
		{
			requestId: "withdrawRoyalty",
			dappName: "DAOMe",
			callback: Linking.createURL("/withdrawRoyalty"),
		}
	);

	return txObject;
};
