import axios from "axios";
import pinataSDK from "@pinata/sdk";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const pinata = pinataSDK(
	"29c93da6414a34825a4f",
	"15b6192caef1b213244bc64c41d75fde39c5fe3c5ec057287cf1b2d6cbcc4dee"
);
export default async function openImagePickerAsync() {
	let permissionResult =
		await ImagePicker.requestMediaLibraryPermissionsAsync();

	if (permissionResult.granted === false) {
		alert("Permission to access camera roll is required!");
		return;
	}

	let pickerResult = await ImagePicker.launchImageLibraryAsync();

	let fileData = await FileSystem.readAsStringAsync(pickerResult.uri, {
		encoding: FileSystem.EncodingType.Base64,
	});

	let result = await pinata.pinJSONToIPFS({
		name: "pfp",
		image: `data:image/png;base64,${fileData}`,
	});

	let url = `https://ipfs.io/ipfs/${result.IpfsHash}`;
	let response = await axios.get(url);
	let image = response.data.image;
	return image;
}
