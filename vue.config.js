const { defineConfig } = require("@vue/cli-service");
const fs = require("fs");

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
	// 通过域名访问
	devServer: {
		host: 'dev.winterwonder.top',
		port: 8080,
		https: {
			// https 证书
			key: fs.readFileSync('cert/dev.winterwonder.top.key'),
			cert: fs.readFileSync('cert/dev.winterwonder.top.pem'),
		},
	},
});
