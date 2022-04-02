import { useContext } from "react";
import { Modal, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { CreatorContext } from "../context/CreatorContext";
import Icon from "react-native-vector-icons/AntDesign";
import tw from "twrnc";

const styles = StyleSheet.create({
	textInput: tw`border-gray-200 border-2 rounded-md my-1 px-2`,
	modalOverlay: tw`p-5 justify-center flex-1 bg-gray-500/50`,
	modal: tw`bg-white p-3 rounded-md shadow-md`,
	button: tw`bg-purple-500 py-4 rounded-md`,
});

export default function MintNFTModal() {
	const { isMintModalOpen, setIsMintModalOpen } = useContext(CreatorContext);
	return (
		<Modal transparent={true} visible={isMintModalOpen}>
			<View style={styles.modalOverlay}>
				<View style={styles.modal}>
					<TouchableOpacity
						size='200'
						style={{
							alignSelf: "flex-end",
						}}
						onPress={() => setIsMintModalOpen(false)}>
						<Icon name='close' size={20} />
					</TouchableOpacity>
					<Text style={tw`text-5 self-center py-2 text-purple-500`}>
						Mint Modal
					</Text>
				</View>
			</View>
		</Modal>
	);
}
