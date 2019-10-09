// import exampleConfig from './src/scripts/example/rollup.config.js';
import reactConfig from './src/scripts/react/rollup.config.js';
import nativeConfig from './src/scripts/native/rollup.config.js';

const bundles = {};
// bundles.example = exampleConfig;
bundles.react = reactConfig;
bundles.native = nativeConfig;

// FAQ: Provide all bundles as an array
const config = Object.values( bundles );

export default config;
