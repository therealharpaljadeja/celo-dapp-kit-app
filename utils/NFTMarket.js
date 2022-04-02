import NFTMarket from "../abi/NFTMarket.json";
import { ethers } from "ethers";
import NFT from "../abi/NFT.json";
import Creators from "../abi/Creators.json";
import Creator from "../abi/Creator.json";
import axios from "axios";

export const fetchItemsCreated = async (kit) => {
	const currentAddress = kit.defaultAccount;
	let nftMarketContract = new web3.eth.Contract(
		NFTMarket.abi,
		MARKETPLACE_CONTRACT_ADDRESS
	);
	let result = await nftMarketContract.methods
		.fetchItemsCreated(currentAddress)
		.call();
	console.log(result);
	let nfts = [];
	for (let i = 0; i < result.length; i++) {
		if (result[i].sold !== true) {
			let nft = {};

			let nftContract = new web3.eth.Contract(
				NFT.abi,
				result[i].nftContract
			);

			let tokenURI = await nftContract.methods
				.tokenURI(result[i].tokenId.toString())
				.call();
			let owner = await nftContract.methods
				.ownerOf(result[i].tokenId.toString())
				.call();
			let response = await axios.get(tokenURI);
			const { name, description } = response.data;
			let ImageUrlSplit = response.data.image.split("/", 4);

			let imageUrl = `https://ipfs.io/ipfs/${
				ImageUrlSplit[ImageUrlSplit.length - 2] +
				"/" +
				ImageUrlSplit[ImageUrlSplit.length - 1]
			}`;
			// let isApprovedByOwner = await nftContract.isApprovedToMarketplace(process.env.REACT_APP_MARKETPLACE_CONTRACT_REEF, result[i].tokenId.toString());
			const creatorsContract = new web3.eth.Contract(
				Creators.abi,
				CREATORS_CONTRACT_ADDRESS
			);
			let creatorAddress = await creatorsContract.methods
				.getCreatorAddressByAddress(result[i].seller)
				.call();
			let creatorContract = new web3.eth.Contract(
				Creator.abi,
				creatorAddress
			);
			let sellerName = await creatorContract.methods.name().call();
			let sellerProfilePic = await creatorContract.methods
				.profilePicUrl()
				.call();

			nft.collectionAddress = result[i].nftContract;
			nft.seller = result[i].seller;
			nft.itemId = result[i].itemId;
			nft.price = web3.utils.fromWei(result[i].price);
			nft.tokenId = result[i].tokenId.toString();
			nft.owner = owner;
			nft.name = name;
			nft.description = description;
			nft.image = imageUrl;
			nft.creatorAddress = creatorAddress;
			nft.creator = {};
			nft.creator.name = sellerName;
			nft.creator.profilePicUrl = sellerProfilePic;
			// nft.isApprovedByOwner = isApprovedByOwner;

			nfts.push(nft);
		}
	}

	return nfts;
};

export const fetchMarketItems = async () => {
	let nftMarketContract = new web3.eth.Contract(
		NFTMarket.abi,
		MARKETPLACE_CONTRACT_ADDRESS
	);
	let result = await nftMarketContract.methods.fetchMarketItems().call();
	let nfts = [];
	for (let i = 0; i < result.length; i++) {
		let nft = {};

		let nftContract = new web3.eth.Contract(NFT.abi, result[i].nftContract);

		let tokenURI = await nftContract.methods
			.tokenURI(result[i].tokenId.toString())
			.call();
		let owner = await nftContract.methods
			.ownerOf(result[i].tokenId.toString())
			.call();
		let response = await axios.get(tokenURI);
		const { name, description } = response.data;
		let ImageUrlSplit = response.data.image.split("/", 4);

		let imageUrl = `https://ipfs.io/ipfs/${
			ImageUrlSplit[ImageUrlSplit.length - 2] +
			"/" +
			ImageUrlSplit[ImageUrlSplit.length - 1]
		}`;
		// let isApprovedByOwner = await nftContract.isApprovedToMarketplace(process.env.REACT_APP_MARKETPLACE_CONTRACT_REEF, result[i].tokenId.toString());
		const creatorsContract = new web3.eth.Contract(
			Creators.abi,
			CREATORS_CONTRACT_ADDRESS
		);
		let creatorAddress = await creatorsContract.methods
			.getCreatorAddressByAddress(result[i].seller)
			.call();
		let creatorContract = new web3.eth.Contract(
			Creator.abi,
			creatorAddress
		);
		let sellerName = await creatorContract.methods.name().call();
		let sellerProfilePic = await creatorContract.methods
			.profilePicUrl()
			.call();

		nft.collectionAddress = result[i].nftContract;
		nft.seller = result[i].seller;
		nft.itemId = result[i].itemId;
		nft.price = web3.utils.fromWei(result[i].price);
		nft.tokenId = result[i].tokenId.toString();
		nft.owner = owner;
		nft.name = name;
		nft.description = description;
		nft.image = imageUrl;

		nft.creator = {};
		nft.creator.name = sellerName;
		nft.creator.profilePicUrl = sellerProfilePic;
		// nft.isApprovedByOwner = isApprovedByOwner;

		nfts.push(nft);
	}

	return nfts;
};

export const fetchListedItems = async (kit) => {
	const currentAddress = kit.defaultAccount;
	let nftMarketContract = new web3.eth.Contract(
		NFTMarket.abi,
		MARKETPLACE_CONTRACT_ADDRESS
	);

	let result = await nftMarketContract.methods
		.fetchListedItems(currentAddress)
		.call();
	let nfts = [];

	for (let i = 0; i < result.length; i++) {
		let nftContract = new web3.eth.Contract(NFT.abi, result[i].nftContract);
		let owner = await nftContract.methods
			.ownerOf(result[i].tokenId.toString())
			.call();
		let nft = {};

		let tokenURI = await nftContract.methods
			.tokenURI(result[i].tokenId.toString())
			.call();
		let response = await axios.get(tokenURI);
		const { name, description } = response.data;
		let ImageUrlSplit = response.data.image.split("/", 4);

		let imageUrl = `https://ipfs.io/ipfs/${
			ImageUrlSplit[ImageUrlSplit.length - 2] +
			"/" +
			ImageUrlSplit[ImageUrlSplit.length - 1]
		}`;
		// let isApprovedByOwner = await nftContract.isApprovedToMarketplace(process.env.REACT_APP_MARKETPLACE_CONTRACT_REEF, result[i].tokenId.toString());
		const creatorsContract = new web3.eth.Contract(
			Creators.abi,
			CREATORS_CONTRACT_ADDRESS
		);
		let creatorAddress = await creatorsContract.methods
			.getCreatorAddressByAddress(result[i].seller)
			.call();
		let creatorContract = new web3.eth.Contract(
			Creator.abi,
			creatorAddress
		);
		let sellerName = await creatorContract.methods.name().call();
		let sellerProfilePic = await creatorContract.methods
			.profilePicUrl()
			.call();

		nft.collectionAddress = result[i].nftContract;
		nft.seller = result[i].seller;
		nft.price = web3.utils.fromWei(result[i].price);
		nft.tokenId = result[i].tokenId.toString();
		nft.owner = owner;
		nft.name = name;
		nft.description = description;
		nft.image = imageUrl;
		nft.creatorAddress = creatorAddress;

		nft.creator = {};
		nft.creator.name = sellerName;
		nft.creator.profilePicUrl = sellerProfilePic;
		// nft.isApprovedByOwner = isApprovedByOwner;

		nfts.push(nft);
	}

	return nfts;
};

export const fetchMyNFTs = async (kit) => {
	const currentAddress = kit.defaultAccount;
	let nftMarketContract = new web3.eth.Contract(
		NFTMarket.abi,
		MARKETPLACE_CONTRACT_ADDRESS
	);
	let result = await nftMarketContract.methods
		.fetchMyNFTs(currentAddress)
		.call();
	let nfts = [];
	for (let i = 0; i < result.length; i++) {
		let nftContract = new web3.eth.Contract(NFT.abi, result[i].nftContract);
		let owner = await nftContract.methods
			.ownerOf(result[i].tokenId.toString())
			.call();
		if (owner === currentAddress) {
			let nft = {};

			let tokenURI = await nftContract.methods
				.tokenURI(result[i].tokenId.toString())
				.call();
			let response = await axios.get(tokenURI);
			const { name, description } = response.data;
			let ImageUrlSplit = response.data.image.split("/", 4);

			let imageUrl = `https://ipfs.io/ipfs/${
				ImageUrlSplit[ImageUrlSplit.length - 2] +
				"/" +
				ImageUrlSplit[ImageUrlSplit.length - 1]
			}`;
			const creatorsContract = new web3.eth.Contract(
				Creators.abi,
				CREATORS_CONTRACT_ADDRESS
			);
			let creatorAddress = await creatorsContract.methods
				.getCreatorAddressByAddress(result[i].seller)
				.call();
			let creatorContract = new web3.eth.Contract(
				Creator.abi,
				creatorAddress
			);

			let sellerName = await creatorContract.methods.name().call();

			let sellerProfilePic = await creatorContract.methods
				.profilePicUrl()
				.call();

			nft.collectionAddress = result[i].nftContract;
			nft.seller = result[i].seller;
			nft.price = web3.utils.fromWei(result[i].price);
			nft.tokenId = result[i].tokenId.toString();
			nft.owner = owner;
			nft.name = name;
			nft.description = description;
			nft.image = imageUrl;
			nft.creatorAddress = creatorAddress;

			nft.creator = {};
			nft.creator.name = sellerName;
			nft.creator.profilePicUrl = sellerProfilePic;

			nfts.push(nft);
		}
	}

	return nfts;
};

export const createSale = async (collectionAddress, tokenId, price) => {
	let nftMarketContract = new web3.eth.Contract(
		NFTMarket.abi,
		MARKETPLACE_CONTRACT_ADDRESS
	);

	let txObject = await nftMarketContract.methods
		.createMarketSale(collectionAddress, tokenId, { value: price })
		.send();

	requestTxSig(
		kit,
		[
			{
				from: kit.defaultAccount,
				to: MARKETPLACE_CONTRACT_ADDRESS,
				tx: txObject,
				feeCurrency: FeeCurrency.cUSD,
			},
		],
		{
			requestId: "createSale",
			dappName: "DAOMe",
			callback: Linking.createURL("/createSale"),
		}
	);
	return txObject;
};

export const createMarketItem = async (collectionAddress, tokenId, price) => {
	let nftMarketContract = new web3.eth.Contract(
		NFTMarket.abi,
		MARKETPLACE_CONTRACT_ADDRESS
	);
	let txObject = await nftMarketContract.methods
		.createMarketItem(collectionAddress, tokenId, price, {
			value: ethers.utils.parseUnits("0.025", "ether"),
		})
		.send();

	requestTxSig(
		kit,
		[
			{
				from: kit.defaultAccount,
				to: MARKETPLACE_CONTRACT_ADDRESS,
				tx: txObject,
				feeCurrency: FeeCurrency.cUSD,
			},
		],
		{
			requestId: "createMarketItem",
			dappName: "DAOMe",
			callback: Linking.createURL("/createMarketItem"),
		}
	);

	return txObject;
};

export const getMarketItemByItemId = async (itemId) => {
	let nftMarketContract = new web3.eth.Contract(
		NFTMarket.abi,
		MARKETPLACE_CONTRACT_ADDRESS
	);
	let result = await nftMarketContract.methods
		.getMarketItemById(itemId)
		.call();
	let nft = {};
	let nftContract = new web3.eth.Contract(NFT.abi, result.nftContract);

	let tokenURI = await nftContract.methods
		.tokenURI(result.tokenId.toString())
		.call();
	let owner = await nftContract.methods
		.ownerOf(result.tokenId.toString())
		.call();
	let response = await axios.get(tokenURI);
	const { name, description } = response.data;
	let ImageUrlSplit = response.data.image.split("/", 4);

	let imageUrl = `https://ipfs.io/ipfs/${
		ImageUrlSplit[ImageUrlSplit.length - 2] +
		"/" +
		ImageUrlSplit[ImageUrlSplit.length - 1]
	}`;
	// let isApprovedByOwner = await nftContract.isApprovedToMarketplace(process.env.REACT_APP_MARKETPLACE_CONTRACT_REEF, result.tokenId.toString());
	const creatorsContract = new web3.eth.Contract(
		Creators.abi,
		CREATORS_CONTRACT_ADDRESS
	);
	let creatorAddress = await creatorsContract.methods
		.getCreatorAddressByAddress(result.seller)
		.call();
	let creatorContract = new web3.eth.Contract(Creator.abi, creatorAddress);
	let sellerName = await creatorContract.methods.name().call();
	let sellerProfilePic = await creatorContract.methods.profilePicUrl().call();

	nft.collectionAddress = result.nftContract;
	nft.seller = result.seller;
	nft.itemId = result.itemId;
	nft.price = web3.utils.fromWei(result.price);
	nft.tokenId = result.tokenId.toString();
	nft.owner = owner;
	nft.name = name;
	nft.description = description;
	nft.image = imageUrl;
	nft.creatorAddress = creatorAddress;
	nft.creator = {};
	nft.creator.name = sellerName;
	nft.creator.profilePicUrl = sellerProfilePic;

	// nft.isApprovedByOwner = isApprovedByOwner;

	return nft;
};
