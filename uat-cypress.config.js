const { defineConfig } = require('cypress');
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
//const { cucumber } = require("cypress-cucumber-preprocessor");
//const cucumber = require("cypress-cucumber-preprocessor").default;
//import { cucumber } from "./node_modules/cypress-cucumber-preprocessor";
module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',//for html report
  reporterOptions: {
    charts: true,
    reportPageTitle: 'CCB-UI',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {    
    //chromeWebSecurity: false,
    //screenshotOnRunFailure: false,
    // defaultCommandTimeout: 60000,
    //pageLoadTimeout: 60000,
    // numTestsKeptInMemory: 0,
    watchForFileChanges:false,
    //baseUrl:'http://68.169.48.106:8080/ccb/app/#app/',  //DEV
    baseUrl:'http://69.89.2.3:8080/ccb/app/#app/',  //UAT
    //baseUrl:'http://localhost:8080/ccb-ui-automation/app/#app/',
    setupNodeEvents(on, config) {
     // on("file:preprocessor", cucumber());
      // implement node event listeners here
      screenshotOnRunFailure=true;
      require('cypress-mochawesome-reporter/plugin')(on);
      on('before:browser:launch', (browser = {}, launchOptions) => {
      launchOptions.args.push('--disable-gpu')
      if (browser.name == 'electron') {
        launchOptions.args.push('--disable-gpu');
        launchOptions.args.push('--use-gpu-in-tests');
        launchOptions.preferences.webPreferences.additionalArguments = [
          ...(launchOptions.preferences.webPreferences.additionalArguments || []),
          '--disable-gpu', // Disables GPU hardware acceleration. If software renderer is not in place, then the GPU process won't launch.
          '--use-gpu-in-tests',
        ];
      }else if (browser.name === 'chrome') {//chromium
        launchOptions.args.push('--disable-gpu');
        launchOptions.args.push('--use-gpu-in-tests');       
      }else if (browser.family === 'chromium') {//chromium
        launchOptions.args.push('--disable-gpu');
        launchOptions.args.push('--use-gpu-in-tests');       
      }
      return launchOptions
    });
    on('before:run', async (details) => {
      console.log('override before:run');
      await beforeRunHook(details);
    });
    on('after:run', async () => {
      console.log('override after:run');
      await afterRunHook();
    });
    on('task', {
      log(message) {
        console.log(message)
        return null
      },
    });
    },
    retries: {
      runMode: 1,
      openMode: 0,
    },
    numTestsKeptInMemory : 0,
    experimentalMemoryManagement : true,
    experimentalCspAllowList : false,
    trashAssetsBeforeRuns : true,
    screenshotOnRunFailure : true,
  },
  "chromeWebSecurity": false,
  "env": {
    "headless": true
  },
});
