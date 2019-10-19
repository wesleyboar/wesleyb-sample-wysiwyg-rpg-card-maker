import { join } from 'path';

import exampleConfig from '../example/rollup.config.js';

export default {
	input: {
		plain: join(__dirname, './index.js'),
	},
	output: exampleConfig.output,
	plugins: exampleConfig.plugins,
};
