const { registerRootComponent } = require("expo");
const { default: App } = require("./App");
const { default: AccountContextProvider } = require("./context/AccountContext");

function Root() {
	return (
		<AccountContextProvider>
			<App />
		</AccountContextProvider>
	);
}

registerRootComponent(Root);
