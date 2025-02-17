const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, 'common', 'node_modules'),
];
defaultConfig.watchFolders = [path.resolve(__dirname, '../common')];

module.exports = defaultConfig;
