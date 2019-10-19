import { join } from 'path';

import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

import react from 'react';
import reactDom from 'react-dom';

import exampleConfig from '../example/rollup.config.js';

const NODE_ENV = process.env.NODE_ENV || 'development';

export default {
	input: {
		react: join(__dirname, './index.js'),
	},
	output: exampleConfig.output,
	// SEE: https://reactjs.org/docs/optimizing-performance.html#rollup
	plugins: [
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
		postcss(),
		json({
			exclude: 'node_modules/**'
		}),
		( NODE_ENV !== 'development' ) && terser()
	],
	// RFC: Should I load React & Friends as external scripts instead of bundled?
	// external: ['react', 'react-dom', 'prop-types'],
};
