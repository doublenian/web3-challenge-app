const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // 设置publicPath为相对路径以支持GitHub Pages
  config.output.publicPath = './';
  
  return config;
}; 