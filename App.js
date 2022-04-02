import "./global";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./screens/ProfileScreen";
import FeedScreen from "./screens/FeedScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Icon from "react-native-vector-icons/AntDesign";
import SignUpModal from "./components/SignUpModal";
import { useContext, useEffect } from "react";
import ConnectWalletScreen from "./screens/ConnectWalletScreen";
import { AccountContext } from "./context/AccountContext";
import { Linking } from "react-native";
import LinkingHandler from "./utils/handler";
import { MARKETPLACE_CONTRACT_ADDRESS } from "@env";

const BottomTabs = createBottomTabNavigator();

export default function App() {
	useEffect(() => {
		console.log(MARKETPLACE_CONTRACT_ADDRESS);
		Linking.addEventListener("url", LinkingHandler);

		return () => {
			Linking.removeAllListeners("url");
		};
	}, []);

	const { account } = useContext(AccountContext);
	return (
		<>
			{!account ? (
				<ConnectWalletScreen />
			) : (
				<>
					{/* <SignUpModal /> */}
					<NavigationContainer>
						<BottomTabs.Navigator
							screenOptions={({ route }) => ({
								tabBarLabelPosition: "beside-icon",
								tabBarIcon: ({ color, size }) => {
									const Icons = {
										Profile: "user",
										Settings: "setting",
										Feed: "earth",
									};
									return (
										<Icon
											color={color}
											name={Icons[route.name]}
											size={size}
										/>
									);
								},
								tabBarActiveTintColor: "#a855f7",
							})}>
							<BottomTabs.Screen
								name='Feed'
								component={FeedScreen}
							/>
							<BottomTabs.Screen
								name='Profile'
								component={ProfileScreen}
							/>
							<BottomTabs.Screen
								name='Settings'
								component={SettingsScreen}
							/>
						</BottomTabs.Navigator>
					</NavigationContainer>
				</>
			)}
		</>
	);
}
