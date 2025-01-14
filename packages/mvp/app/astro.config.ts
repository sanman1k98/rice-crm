import db from '@astrojs/db';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
	// Add `export const prerender = true` to any page or route to pre-render a
	// static page or endpoint.
	// https://docs.astro.build/en/guides/server-side-rendering/#opting-in-to-pre-rendering-in-server-mode
	output: 'server',
	adapter: node({ mode: 'standalone' }),
	integrations: [
		tailwind({
			// Support CSS nesting in Astro `<style>` tags.
			nesting: true,
		}),
		db(),
	],
});
