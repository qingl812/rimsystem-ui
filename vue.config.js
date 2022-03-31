const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: true,
	// sass-resources-loader
	chainWebpack: (config) => {
		const oneOfsMap = config.module.rule("scss").oneOfs.store;
		oneOfsMap.forEach((item) => {
			item.use("sass-resources-loader")
				.loader("sass-resources-loader")
				.options({
					// Provide path to the file with resources
					// Or array of paths
					resources: ["./src/styles/normal.scss"],
				})
				.end();
		});
	},
});
