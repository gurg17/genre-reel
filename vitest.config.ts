import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin'
import { storybookVuePlugin } from '@storybook/vue3-vite/vite-plugin'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
  defineConfig({
    plugins: [
      storybookTest({
        // The location of your Storybook config, main.js|ts
        configDir: path.join(dirname, '.storybook'),
        // This should match your package.json script to run Storybook
        // The --ci flag will skip prompts and not open a browser
        storybookScript: 'yarn storybook --ci',
      }),
      storybookVuePlugin(),
    ],
    test: {
      // Enable browser mode
      browser: {
        enabled: true,
        name: 'chromium',
        // Make sure to install Playwright
        provider: 'playwright',
        headless: true,
      },
      setupFiles: ['./.storybook/vitest.setup.ts'],
    },
  }),
)
