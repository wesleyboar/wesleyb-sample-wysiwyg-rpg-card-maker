import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const bundles = {};
const options = {};

options.plugins = [
	resolve(),
	babel({
		// FAQ: Only transpile our source code
		exclude: 'node_modules/**'
	})
];

bundles.index = {
	input: 'src/index.js',
	output: [
		{
			file: 'dist/index.js',
			format: 'iife',
			sourcemap: true
		},{
			file: 'dist/index.mjs',
			format: 'esm',
			sourcemap: true
		}
	],
	plugins: options.plugins
}

export default Object.values( bundles );
