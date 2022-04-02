const { registerRootComponent } = require("expo");
const { default: App } = require("./App");
const { default: AccountContextProvider } = require("./context/AccountContext");
import { LogBox } from "react-native";

LogBox.ignoreLogs([
	"The provided value 'ms-stream' ",
	"The provided value 'moz-chunked-arraybuffer'",
	"Require cycle",
]);

// LogBox.ignoreLogs([
// 	"The provided value 'moz-chunked-arraybuffer' ...",
// 	"The provided value 'ms-stream'",
// 	"Require cycle",
// ]);

function Root() {
	return (
		<AccountContextProvider>
			<App />
		</AccountContextProvider>
	);
}

registerRootComponent(Root);
