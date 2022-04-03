const crypto = require.resolve("crypto-browserify");
const url = require.resolve("url/");
const nodelibs = require("node-libs-react-native");
module.exports = {
	resolver: {
		extraNodeModules: {
			...nodelibs,
			crypto,
			url,
			fs: require.resolve("expo-file-system"),
			http: require.resolve("stream-http"),
			https: require.resolve("https-browserify"),
			net: require.resolve("react-native-tcp"),
			os: require.resolve("os-browserify/browser.js"),
			path: require.resolve("path-browserify"),
			stream: require.resolve("readable-stream"),
		},
		sourceExts: ["cjs", "js", "jsx", "ts", "tsx"],
	},
};
