import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
switch (process.env.ENV) {
  case 'QA': {
    dotenv.config({ path: path.resolve(__dirname, '.', 'qa.env') });
    break;
  }
  case 'STAGING': {
    dotenv.config({ path: path.resolve(__dirname, '.', 'staging.env') });
    break;
  }
  default: {
    dotenv.config({ path: path.resolve(__dirname, '.', 'qa.env') });
    break;
  }
}
export default defineConfig({

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: /global.setup\.ts/,
      use: {
        browserName: 'chromium',
        baseURL: process.env.BASEURL,
        headless: true,
        screenshot: 'only-on-failure'
      }
    },
    {
      name: 'Login',
      testDir: 'tests',
      testMatch: [/login.spec.ts/],
      use: {
        browserName: 'chromium',
        baseURL: process.env.BASEURL,
        headless: true,
        screenshot: 'only-on-failure'
      }
    }
    
  ],

  timeout: 4 * 60 * 1000,
  retries: 0,
  workers: 1,
  expect: {
    timeout: 20000,
    toMatchSnapshot: {
      threshold: Number(process.env.IMAGETRESHHOLD)
    }
  },
  reporter: [
    ['line'],
    ['html'],
    [
      'allure-playwright',
      {
        detail: false,
        outputFolder: 'allure-results',
        suiteTitle: false
      }
    ]]
});
