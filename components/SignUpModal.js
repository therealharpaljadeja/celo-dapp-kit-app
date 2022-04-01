import {
	View,
	Modal,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useState, useEffect, useContext, useRef } from "react";
import { AccountContext } from "../context/AccountContext";
import tw from "twrnc";

const styles = StyleSheet.create({
	textInput: tw`border-gray-200 border-2 rounded-md my-1 px-2`,
	modalOverlay: tw`p-5 justify-center flex-1 bg-gray-500/50`,
	modal: tw`bg-white p-3 rounded-md shadow-md`,
	button: tw`bg-purple-500 py-4 rounded-md`,
});

export default function SignUpModal() {
	const { account } = useContext(AccountContext);
	const [modalOpen, setModalOpen] = useState(true);

	return (
		<Modal transparent={true} visible={modalOpen}>
			<View style={styles.modalOverlay}>
				<View style={styles.modal}>
					<TouchableOpacity
						size='200'
						style={{
							alignSelf: "flex-end",
						}}
						onPress={() => setModalOpen(false)}>
						<Icon name='close' size={20} />
					</TouchableOpacity>
					<Text
						style={{
							textAlign: "center",
							paddingVertical: 10,
							fontSize: 20,
						}}>
						Sign Up
					</Text>
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
							Sign Up
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
