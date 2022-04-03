import React, { useState, useContext } from "react";
import {
	getCreatorObjFromAddress,
	getCreatorAddressByAddress,
} from "../utils/Creators";
import { mintNFT } from "../utils/NFT";
import { AccountContext } from "./AccountContext";

export const CreatorContext = React.createContext();

export default function CreatorContextProvider({ children }) {
	const { kit } = useContext(AccountContext);
	const [isMintModalOpen, setIsMintModalOpen] = useState(false);
	const [creator, setCreator] = useState(null);

	async function mintNFTFromContext(tokenURI, royaltyPercentage) {
		let creatorAddress = await getCreatorAddressByAddress(kit);
		await mintNFT(kit, creatorAddress, tokenURI, royaltyPercentage);
	}

	async function getCreatorObjFromAddressWithKit() {
		let creatorContractAddress = await getCreatorAddressByAddress(kit);
		let response = await getCreatorObjFromAddress(creatorContractAddress);
		console.log(response);
		setCreator(response);
	}

	return (
		<CreatorContext.Provider
			value={{
				creator,
				setCreator,
				getCreatorObjFromAddressWithKit,
				isMintModalOpen,
				setIsMintModalOpen,
				mintNFTFromContext,
			}}>
			{children}
		</CreatorContext.Provider>
	);
}
