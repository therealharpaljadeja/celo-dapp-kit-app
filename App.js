import "./global";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./screens/ProfileScreen";
import FeedScreen from "./screens/FeedScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Icon from "react-native-vector-icons/AntDesign";
import SignUpModal from "./components/SignUpModal";
import { useContext, useEffect, useState } from "react";
import ConnectWalletScreen from "./screens/ConnectWalletScreen";
import { AccountContext } from "./context/AccountContext";
import { ActivityIndicator } from "react-native";
import * as Linking from "expo-linking";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { CreatorContext } from "./context/CreatorContext";

const BottomTabs = createBottomTabNavigator();

export default function App() {
	const { account, handler, checkIfUserRegistered } =
		useContext(AccountContext);

	const { creator, getCreatorObjFromAddressWithKit } =
		useContext(CreatorContext);

	const [checkingIfRegistered, setCheckingIfRegistered] = useState(null);
	const [isUserRegistered, setIsUserRegistered] = useState(null);
	useEffect(() => {
		Linking.addEventListener("url", handler);

		return () => {
			Linking.removeEventListener("url", handler);
		};
	}, []);

	useEffect(async () => {
		if (account) {
			console.log(account);
			setCheckingIfRegistered(true);
			let response = await checkIfUserRegistered();
			setIsUserRegistered(response);
			await getCreatorObjFromAddressWithKit();
			setCheckingIfRegistered(false);
		}
	}, [account]);

	return (
		<>
			{!account ? (
				<ConnectWalletScreen />
			) : (
				<>
					{checkingIfRegistered ? (
						<SafeAreaView style={tw`flex-1 items-center`}>
							<ActivityIndicator
								animating={true}
								size='large'
								color='#a855f7'
							/>
						</SafeAreaView>
					) : (
						<>
							{!isUserRegistered && <SignUpModal />}
							{creator && (
								<NavigationContainer>
									<BottomTabs.Navigator
										initialRouteName='Profile'
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
							)}
						</>
					)}
				</>
			)}
		</>
	);
}
