import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import "./global";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./screens/ProfileScreen";
import FeedScreen from "./screens/FeedScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Icon from "react-native-vector-icons/Feather";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const BottomTabs = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<BottomTabs.Navigator
				screenOptions={({ route }) => ({
					tabBarLabelPosition: "beside-icon",
					tabBarIcon: ({ color, size }) => {
						const Icons = {
							Profile: "user",
							Settings: "settings",
							Feed: "rss",
						};
						return (
							<Icon
								color={color}
								name={Icons[route.name]}
								size={size}
							/>
						);
					},
				})}>
				<BottomTabs.Screen name='Feed' component={FeedScreen} />
				<BottomTabs.Screen name='Profile' component={ProfileScreen} />
				<BottomTabs.Screen name='Settings' component={SettingsScreen} />
			</BottomTabs.Navigator>
		</NavigationContainer>
	);
}
