import tw from "twrnc";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Image,
} from "react-native";
import { AccountContext } from "../context/AccountContext";
import { useContext } from "react";
const styles = StyleSheet.create({
	textInput: tw`border-gray-200 border-2 rounded-md my-1 px-2`,
	modalOverlay: tw`p-5 justify-center flex-1 bg-gray-500/50`,
	modal: tw`bg-white p-3 flex-1 justify-center`,
	button: tw`bg-purple-500 py-4 rounded-md`,
	image: tw`rounded-full w-25 h-25 self-center mb-10`,
});

export function SettingsForm() {
	const { account } = useContext(AccountContext);
	return (
		<View style={styles.modal}>
			<Image
				style={styles.image}
				source={{ uri: "https://bit.ly/dan-abramov" }}
			/>
			<TextInput
				style={styles.textInput}
				value={account}
				editable={false}
			/>
			<TextInput style={styles.textInput} />
			<TextInput
				multiline={true}
				numberOfLines={4}
				style={styles.textInput}
			/>
			<TextInput style={styles.textInput} />
			<TextInput style={styles.textInput} />
			<TextInput style={styles.textInput} />
			<TouchableOpacity style={styles.button}>
				<Text
					style={{
						textAlign: "center",
						fontSize: 16,
						color: "white",
					}}>
					Save
				</Text>
			</TouchableOpacity>
		</View>
	);
}
