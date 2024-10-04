import antfu, { GLOB_JSON, GLOB_MARKDOWN, GLOB_TOML, GLOB_YAML } from '@antfu/eslint-config';

// https://github.com/antfu/eslint-config
export default antfu(
	{
		ignores: [
			'com.crm/**',
			'customer/**',
			'pnpm-lock.yaml',
		],
		stylistic: {
			semi: true,
			quotes: 'single',
			indent: 'tab',
			overrides: {
				'style/brace-style': [
					'error',
					'1tbs',
					{ allowSingleLine: true },
				],
				'style/arrow-parens': [
					'error',
					'always',
				],
				'style/newline-per-chained-call': [
					'error',
					{ ignoreChainWithDepth: 2 },
				],
			},
		},
		// Enable Astro eslint plugin.
		astro: {
			overrides: {
				'antfu/no-top-level-await': 'off',
			},
		},
	},
	{
		// Matches prettier overrides.
		name: 'user/stylistic/indent/overrides',
		files: [GLOB_JSON, GLOB_MARKDOWN, GLOB_TOML, GLOB_YAML],
		rules: {
			'style/indent': ['error', 2],
		},
	},
);
