// import exampleConfig from './src/scripts/example/rollup.config.js';
import plainConfig from './src/scripts/plain/rollup.config.js';
import reactConfig from './src/scripts/react/rollup.config.js';

const bundles = {};
// bundles.example = exampleConfig;
bundles.plain = plainConfig;
bundles.react = reactConfig;

// FAQ: Provide all bundles as an array
const config = Object.values( bundles );

export default config;
