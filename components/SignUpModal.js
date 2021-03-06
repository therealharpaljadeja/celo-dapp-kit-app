import {
	View,
	Modal,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useState, useEffect, useContext, useReducer } from "react";
import { AccountContext } from "../context/AccountContext";
import tw from "twrnc";
import Toast from "react-native-toast-message";

const styles = StyleSheet.create({
	textInput: tw`border-gray-200 border-2 rounded-md my-1 px-2`,
	modalOverlay: tw`p-5 justify-center flex-1 bg-gray-500/50`,
	modal: tw`bg-white p-3 rounded-md shadow-md`,
	button: tw`bg-purple-500 py-4 rounded-md`,
});

const registerReducer = (state, action) => {
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
		case "CLEAR":
			return initialState;
		default:
			return state;
	}
};

export default function SignUpModal() {
	const initialState = {
		account: "",
		name: "",
		bio: "",
		nftCollectionName: "",
		nftCollectionSymbol: "",
		pfpUrl: "",
		username: "",
	};
	const [state, dispatch] = useReducer(registerReducer, initialState);
	const { account, registerUserWithKit } = useContext(AccountContext);
	const [registeringUser, setRegisteringUser] = useState(null);

	const [modalOpen, setModalOpen] = useState(true);

	useEffect(() => {
		dispatch({ type: "ACCOUNT", payload: account });
		Toast.show({
			type: "info",
			text1: "User not registered",
			text2: "Please register first to proceed",
		});
	}, []);

	async function registerUser() {
		setRegisteringUser(true);
		let creatorObj = {
			name: state.name,
			username: state.account,
			bio: state.bio,
			profilePicUrl: state.pfpUrl,
			nftCollectionName: state.nftCollectionName,
			nftCollectionSymbol: state.nftCollectionSymbol,
		};
		await registerUserWithKit(creatorObj);
		setRegisteringUser(false);
	}

	return (
		<Modal transparent={true} visible={modalOpen}>
			<View style={styles.modalOverlay}>
				<Toast />
				<View style={styles.modal}>
					{/* <TouchableOpacity
						size='200'
						style={{
							alignSelf: "flex-end",
						}}
						onPress={() => setModalOpen(false)}>
						<Icon name='close' size={20} />
					</TouchableOpacity> */}
					<Text style={tw`text-5 self-center py-2 text-purple-500`}>
						Sign Up
					</Text>
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
					{registeringUser ? (
						<ActivityIndicator
							animating={true}
							size='small'
							style={tw`py-4`}
							color='#a855f7'
						/>
					) : (
						<TouchableOpacity
							onPress={() => registerUser()}
							style={styles.button}>
							<Text
								style={{
									textAlign: "center",
									fontSize: 16,
									color: "white",
								}}>
								Sign Up
							</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
		</Modal>
	);
}
