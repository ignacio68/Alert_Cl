// https://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 6
	},
	env: {
		browser: true,
	},
	// https://github.com/standard/standard/blob/master/docs/RULES-en.md
	extends: ['standard'],
	// required to lint *.vue files
	plugins: [
		'html'
	],
	// add your custom rules here
	rules: {
		// allow async-await
		'generator-star-spacing': 'off',
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		// allow tabs
		// 'indent': [2, 'tab']
		//no-allow tabs. 2 spaces
		'indent': [2, 2, {"SwitchCase": 1}]
	}
}
