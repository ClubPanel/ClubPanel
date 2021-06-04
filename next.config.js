const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  typescript: {
    includePaths: [path.join(__dirname, "js")]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md[x]?$/,
      use: "raw-loader"
    });
    return config;
  }
}