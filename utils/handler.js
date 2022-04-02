import { useContext } from "react";
// import { AccountContext } from "../context/AccountContext";

// const { setAccount } = useContext(AccountContext);
export default LinkingHandler = ({ url }) => {
	const { path, queryParams } = Linking.parse(url);

	switch (path) {
		case "connect":
			setAccount(queryParams.account);
		// case "send":
		default:
			console.log("unknown url!");
	}
};
