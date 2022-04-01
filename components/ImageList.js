import tw from "twrnc";
import { FlatList, Image, View } from "react-native";
export default function ImageList() {
	return (
		<>
			<View style={{ flex: 1 }}>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						backgroundColor: "red",
					}}>
					<View style={{ flex: 1 }}>
						<Image
							style={{ flex: 1 }}
							source={{ uri: "https://bit.ly/dan-abramov" }}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<Image
							style={{ flex: 1 }}
							source={{ uri: "https://bit.ly/dan-abramov" }}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<Image
							style={{ flex: 1 }}
							source={{ uri: "https://bit.ly/dan-abramov" }}
						/>
					</View>
				</View>
			</View>
			<View style={{ flex: 1 }}>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						backgroundColor: "red",
					}}>
					<View style={{ flex: 1 }}>
						<Image
							style={{ flex: 1 }}
							source={{ uri: "https://bit.ly/dan-abramov" }}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<Image
							style={{ flex: 1 }}
							source={{ uri: "https://bit.ly/dan-abramov" }}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<Image
							style={{ flex: 1 }}
							source={{ uri: "https://bit.ly/dan-abramov" }}
						/>
					</View>
				</View>
			</View>
			<View style={{ flex: 1 }}>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						backgroundColor: "red",
					}}>
					<View style={{ flex: 1 }}>
						<Image
							style={{ flex: 1 }}
							source={{ uri: "https://bit.ly/dan-abramov" }}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<Image
							style={{ flex: 1 }}
							source={{ uri: "https://bit.ly/dan-abramov" }}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<Image
							style={{ flex: 1 }}
							source={{ uri: "https://bit.ly/dan-abramov" }}
						/>
					</View>
				</View>
			</View>
		</>
	);
}
