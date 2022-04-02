require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
	solidity: "0.8.4",
	defaultNetwork: "hardhat",
	networks: {
		alfajores: {
			url: "https://alfajores-forno.celo-testnet.org",
			chainId: 44787,
			accounts: [process.env.WALLET_PRIVATE_KEY],
		},
	},
};
