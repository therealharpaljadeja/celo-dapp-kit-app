import React, { useState } from "react";

export const AccountContext = React.createContext(null);

export default function AccountContextProvider({ children }) {
	const [account, setAccount] = useState(null);
	return (
		<AccountContext.Provider value={{ account, setAccount }}>
			{children}
		</AccountContext.Provider>
	);
}
