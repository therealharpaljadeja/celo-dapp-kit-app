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
import { useContext, useReducer } from "react";
import { CreatorContext } from "../context/CreatorContext";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import pinataSDK from "@pinata/sdk";
import axios from "axios";
const pinata = pinataSDK(
	"29c93da6414a34825a4f",
	"15b6192caef1b213244bc64c41d75fde39c5fe3c5ec057287cf1b2d6cbcc4dee"
);

const styles = StyleSheet.create({
	textInput: tw`border-gray-200 border-2 rounded-md my-1 px-2`,
	modalOverlay: tw`p-5 justify-center flex-1 bg-gray-500/50`,
	modal: tw`bg-white p-3 flex-1 justify-center`,
	button: tw`bg-purple-500 py-4 rounded-md`,
	image: tw`rounded-full w-25 h-25 self-center mb-10`,
});

const settingsReducer = (state, action) => {
	switch (action.type) {
		case "ACCOUNT":
			return { ...state, account: action.payload };
		case "NAME":
			return { ...state, name: action.payload };
		case "USERNAME":
			return { ...state, username: action.payload };
		case "BIO":
			return { ...state, bio: action.payload };
		case "NFT_COLLECTION_NAME":
			return { ...state, nftCollectionName: action.payload };
		case "NFT_COLLECTION_SYMBOL":
			return { ...state, nftCollectionSymbol: action.payload };
		case "PFP_URL":
			return { ...state, profilePicUrl: action.payload };
		case "CLEAR":
			return initialState;
		default:
			return state;
	}
};

export function SettingsForm() {
	const { account } = useContext(AccountContext);
	const { creator } = useContext(CreatorContext);

	const initialState = {
		account,
		name: creator.name,
		bio: creator.bio,
		nftCollectionName: creator.nftCollectionName,
		nftCollectionSymbol: creator.nftCollectionSymbol,
		profilePicUrl:
			creator.profilePicUrl === ""
				? "https://bit.ly/dan-abramov"
				: creator.profilePicUrl,
		username: creator.username,
	};

	let openImagePickerAsync = async () => {
		let permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("Permission to access camera roll is required!");
			return;
		}

		let pickerResult = await ImagePicker.launchImageLibraryAsync();
		console.log(pickerResult);

		let fileData = await FileSystem.readAsStringAsync(pickerResult.uri, {
			encoding: FileSystem.EncodingType.Base64,
		});

		let result = await pinata.pinJSONToIPFS({
			name: "pfp",
			image: `data:image/png;base64,${fileData}`,
		});

		let url = `https://ipfs.io/ipfs/${result.IpfsHash}`;
		let response = await axios.get(url);
		console.log("response", response);
		let image = response.data.image;
		dispatch({ type: "PFP_URL", payload: image });
	};

	const [state, dispatch] = useReducer(settingsReducer, initialState);
	return (
		<View style={styles.modal}>
			<TouchableOpacity onPress={openImagePickerAsync}>
				<Image
					style={styles.image}
					source={{ uri: state.profilePicUrl }}
				/>
			</TouchableOpacity>
			<TextInput
				style={styles.textInput}
				value={state.account}
				editable={false}
			/>
			<TextInput
				style={styles.textInput}
				value={state.username}
				placeholder='username'
				onChangeText={(newValue) =>
					dispatch({ type: "USERNAME", payload: newValue })
				}
			/>
			<TextInput
				value={state.name}
				onChangeText={(newValue) =>
					dispatch({ type: "NAME", payload: newValue })
				}
				style={styles.textInput}
				placeholder='name'
			/>
			<TextInput
				multiline={true}
				numberOfLines={4}
				placeholder='bio'
				style={styles.textInput}
				value={state.bio}
				onChangeText={(newValue) =>
					dispatch({ type: "BIO", payload: newValue })
				}
			/>
			<TextInput
				placeholder='NFT Collection Name'
				style={styles.textInput}
				value={state.nftCollectionName}
				onChangeText={(newValue) =>
					dispatch({
						type: "NFT_COLLECTION_NAME",
						payload: newValue,
					})
				}
			/>
			<TextInput
				style={styles.textInput}
				value={state.nftCollectionSymbol}
				onChangeText={(newValue) =>
					dispatch({
						type: "NFT_COLLECTION_SYMBOL",
						payload: newValue,
					})
				}
				placeholder='NFT Collection Symbol'
			/>
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
