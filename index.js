const { registerRootComponent } = require("expo");
const { default: App } = require("./App");
const { default: AccountContextProvider } = require("./context/AccountContext");
const { LogBox } = require("react-native");
const { default: CreatorContextProvider } = require("./context/CreatorContext");

LogBox.ignoreLogs([
	"The provided value 'ms-stream' ",
	"The provided value 'moz-chunked-arraybuffer'",
	"Require cycle",
]);

function Root() {
	return (
		<AccountContextProvider>
			<CreatorContextProvider>
				<App />
			</CreatorContextProvider>
		</AccountContextProvider>
	);
}

registerRootComponent(Root);
