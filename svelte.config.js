// import adapter from '@sveltejs/adapter-static';
import adapter from 'svelte-adapter-deno';
import preprocess from 'svelte-preprocess';

const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: preprocess({
    scss: {
      prependData: `@import 'src/app.scss';`
    }
  }),
	kit: {
		adapter: adapter()
	},
};

export default config;
