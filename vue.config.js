const { defineConfig } = require('@vue/cli-service')
const fs = require("fs");

module.exports = defineConfig({
  transpileDependencies: true,
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
})
