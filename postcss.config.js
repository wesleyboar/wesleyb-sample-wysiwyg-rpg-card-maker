const stylesDir = './src/_shared/styles/';

/* TODO: Ensure `NODE_ENV` is functional; manual tests suggest that it is not */
module.exports = ({ options, NODE_ENV, file }) => ({
	// Source maps should obey CLI arg or use these options or not be created
	map: options.map || ( NODE_ENV !== 'production') ? {
		inline: false
	} : false,
	plugins: {
		// Include `@import` file content at build-time
		'postcss-import': {
			root: file.dirname
		},

		// Load only what `.browserslistrc` requires from `normalize.css`
		'postcss-normalize': true,

		// Support mixins
		'postcss-mixins': {
			mixinsDir: stylesDir + '/tools'
		},

		// Support tomorrow's CSS, today
		'postcss-preset-env': {
			stage: 0,
			preserve: false,
			importFrom: stylesDir + '/settings'
		},

		// Support `@extend` at-rule
		// NOTE: To extend a selector that is built via nesting, then
		//       extend AFTER nesting polyfill, otherwise extention fails
		'postcss-extend-rule': {
			onRecursiveExtend: 'throw',
			onUnusedExtend: 'warn'
		},

		// Minify CSS
		'cssnano': ( NODE_ENV === 'production') ? { preset: ['default', {
			/* FAQ: This prevented broken CSS - 2019-07 */
			mergeLonghand: false,
			// RFE: Review outdated reference
			// SEE: https://github.com/MoOx/postcss-cssnext/issues/323
			// autoprefixer: false,
			discardDuplicates: true,
			safe: true
		}]} : false,

		// Report PostCSS issues in browser
		'postcss-browser-reporter': true,

		// Report PostCSS issues in CLI
		'postcss-reporter': true
	}
});
