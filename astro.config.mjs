// @ts-check
import {defineConfig} from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import alpinejs from "@astrojs/alpinejs";
import playformInline from "@playform/inline";
import mdx from "@astrojs/mdx";

export default defineConfig({
	site: "https://huayuan-csm.de",
	base: "/",
	// trailingSlash: 'always',
	integrations: [
		alpinejs(),
		playformInline({
			Beasties: true,
		}),
		mdx(),
	],
    i18n: {
        defaultLocale: 'de',
        locales: ['de', 'en'],
        routing: {
          prefixDefaultLocale: false
        }
    },
	output: "static",
	devToolbar: {
		enabled: false,
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
