import Creator from "../abi/Creator.json";

export const getNFTCollectionAddress = async (creatorAddress) => {
	const creatorContract = new web3.eth.Contract(Creator.abi, creatorAddress);
	let result = await creatorContract.methods.nftCollectionAddress().call();
	return result;
};
