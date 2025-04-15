import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { listExtensionPlugin } from './vite-list-extension';

export default defineConfig({
  plugins: [sveltekit(), listExtensionPlugin()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
