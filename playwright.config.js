import {defineConfig} from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  use: {baseURL: 'http://127.0.0.1:8787', channel: 'chrome', headless: true},
  webServer: {command: 'node tools/dev-server.mjs', url: 'http://127.0.0.1:8787', reuseExistingServer: !process.env.CI},
});
