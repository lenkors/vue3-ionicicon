import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const projects = [
  {

    name: 'Mobile Firefox',
    use: {
      browserName: 'firefox',

      viewport: {
        width: 393,
        height: 727
      },
      screen: {
        width: 393,
        height: 851
      }
    },
  },
  {
    name: 'Mobile Chrome',
    use: {
      browserName: 'chromium',
      ...devices['Pixel 5']
    }
  },
  {
    name: 'Mobile Safari',
    use: {
      browserName: 'webkit',
      ...devices['iPhone 12']
    }
  }
];

const config: PlaywrightTestConfig = {
  testMatch: '*.e2e.ts',
  expect: {
    timeout: 5000,
    toMatchSnapshot: {
      maxDiffPixelRatio: 0.02
    }
  },
  forbidOnly: undefined,
  retries: 0,
  workers: undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    trace: 'retain-on-failure',
    baseURL: 'http://localhost:3333',
  },
  projects: projects as any,
  webServer: {
    command: 'serve www -p 3333',
    port: 3333
  }
};

export default config;