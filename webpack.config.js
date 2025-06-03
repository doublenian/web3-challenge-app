const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // 设置publicPath为GitHub Pages子路径
  config.output.publicPath = '/web3-challenge-app/';
  
  return config;
}; 