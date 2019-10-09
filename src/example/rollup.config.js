/*
 * IMPORTANT
 * ---
 * This is only an example configuration for Rollup;
 * clone or import for relevant scripts directory.
 */
import { join } from 'path';
/*
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';

const NODE_ENV = process.env.NODE_ENV || 'development';
*/
export default {
	input: {
		example: join(__dirname, './relative-path-to-entry-point.js'),
	},
	output: [
		{
			dir: join(__dirname, '../../dist'),
			entryFileNames: '[name]/index.js',
			format: 'system',
			sourcemap: true
		},
		{
			dir: join(__dirname, '../../dist'),
			entryFileNames: '[name]/index.mjs',
			format: 'esm',
			sourcemap: true
		},
	],
	plugins: [/*
		nodeResolve(),
		babel({
			exclude: 'node_modules/**'
		}),
		json({
			exclude: 'node_modules/**'
		}),
		( NODE_ENV !== 'development' ) && terser()
	*/],
};
