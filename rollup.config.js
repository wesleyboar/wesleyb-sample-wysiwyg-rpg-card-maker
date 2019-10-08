// TODO: Isolate this to be used only for the `react` app

import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';

import react from 'react';
import reactDom from 'react-dom';

const bundles = {};
const options = {};
const NODE_ENV = process.env.NODE_ENV || 'development';

// SEE: https://reactjs.org/docs/optimizing-performance.html#rollup
options.plugins = [
	nodeResolve(),
	replace({
		'process.env.NODE_ENV': JSON.stringify( NODE_ENV )
	}),
	babel({
		exclude: 'node_modules/**'
	}),
	commonjs({
		namedExports: {
			'react': Object.keys( react ),
			'react-dom': Object.keys( reactDom )
		}
	}),
	json({
		exclude: 'node_modules/**'
	}),
	( NODE_ENV !== 'development' ) && terser()
];

bundles.index = {
	input: {
		native: 'src/native/index.js',
		react: 'src/react/index.js',
	},
	output: [
		{
			dir: 'dist',
			entryFileNames: '[name]/index.js',
			format: 'system',
			sourcemap: true
		},
		{
			dir: 'dist',
			entryFileNames: '[name]/index.mjs',
			format: 'esm',
			sourcemap: true
		},
	],
	// RFC: Should I load React & Friends as external scripts instead of bundled?
	// external: ['react', 'react-dom', 'prop-types'],
	plugins: options.plugins,
}

export default Object.values( bundles );
