/// <reference types="cypress" />
//const { includes } = require("cypress/types/lodash");
import commonFunctions from "../../common-functions/commonFunctions.js"
let pageElementsObj = new commonFunctions();
// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress
//var myConfig = Cypress.config()

//expect(myConfig).to.have.property('requestWaitTime', 2000)
//expect(myConfig).to.have.property('baseUrl', 'http://localhost:8080/reachui/app/')
describe('14-CCB-UI Program Notification Save Settings', () => {
  beforeEach( function()  {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('subscribers');
    if(Cypress.env('opco') == 'peco'){
      cy.fixture('pecoData').as('opcoObj');
    }else if(Cypress.env('opco') == 'comed'){
      cy.fixture('comedData').as('opcoObj');
    }else{
      cy.fixture('pecoData').as('opcoObj');
    }
    cy.fixture('usersData').as('userCred');
    cy.fixture('common').as('commonVars');
  });
  it('Save Program Settings', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectProgSettings(this.commonVars);
    cy.get('[data-cy-id="saveProgSetgBtn"]').should('exist');
    cy.intercept("POST", this.commonVars.saveProgramSettings).as("saveProgramSettingsAPI");
    cy.get('[data-cy-id="saveProgSetgBtn"]').click();
    cy.wait("@saveProgramSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Change Program OptIn Settings For Email', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectProgSettings(this.commonVars);
    cy.get('[data-cy-id="actDivEMAIL"] label span.onoffswitch-switch').should('exist');
    //cy.get('[data-cy-id="actEMAIL"]').should('have.attr', 'checked', 'true');
    cy.get('[data-cy-id="actDivEMAIL"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="saveProgSetgBtn"]').should('exist');
    cy.intercept("POST", this.commonVars.saveProgramSettings).as("saveProgramSettingsAPI");
    cy.get('[data-cy-id="saveProgSetgBtn"]').click();
    cy.wait("@saveProgramSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    //cy.intercept("GET", this.commonVars.getNotificationTreeAPI).as("notificationTreeAPI");
    //cy.wait("@notificationTreeAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.intercept("GET", this.commonVars.programSettings).as("programSettingsAPI");
    cy.wait("@programSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.get('[data-cy-id="actDivEMAIL"] label span.onoffswitch-switch').should('exist');
    cy.get('[data-cy-id="actDivEMAIL"] label span.onoffswitch-switch').should('be.visible');
    cy.get('[data-cy-id="actDivEMAIL"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="saveProgSetgBtn"]').should('exist');
    cy.get('[data-cy-id="saveProgSetgBtn"]').click();
    cy.wait("@saveProgramSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Toggle Program Channel Settings', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectProgSettings(this.commonVars);
    cy.get('[data-cy-id="channelConfSMS"] label span.onoffswitch-switch').should('exist');
    cy.get('[data-cy-id="channelConfSMS"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="channelConfEMAIL"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="channelConfVOICE"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="channelConfPUSH"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="channelConfLETTER"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="saveProgSetgBtn"]').should('exist');
    cy.intercept("POST", this.commonVars.saveProgramSettings).as("saveProgramSettingsAPI");
    cy.get('[data-cy-id="saveProgSetgBtn"]').click();
    cy.wait("@saveProgramSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.intercept("GET", this.commonVars.programSettings).as("programSettingsAPI");
    cy.wait("@programSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.get('[data-cy-id="channelConfSMS"] label span.onoffswitch-switch').should('exist');
    cy.get('[data-cy-id="channelConfSMS"] label span.onoffswitch-switch').should('be.visible');
    cy.get('[data-cy-id="channelConfSMS"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="channelConfEMAIL"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="channelConfVOICE"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="channelConfPUSH"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="channelConfLETTER"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="saveProgSetgBtn"]').should('exist');
    cy.get('[data-cy-id="saveProgSetgBtn"]').click();
    cy.wait("@saveProgramSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Toggle Program Allow Priority Override Settings', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectProgSettings(this.commonVars);
    cy.get('[data-cy-id="allPrioritySMS"] label span.onoffswitch-switch').should('exist');
    cy.get('[data-cy-id="allPrioritySMS"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="allPriorityEMAIL"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="allPriorityVOICE"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="allPriorityPUSH"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="allPriorityLETTER"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="saveProgSetgBtn"]').should('exist');
    cy.intercept("POST", this.commonVars.saveProgramSettings).as("saveProgramSettingsAPI");
    cy.get('[data-cy-id="saveProgSetgBtn"]').click();
    cy.wait("@saveProgramSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.intercept("GET", this.commonVars.programSettings).as("programSettingsAPI");
    cy.wait("@programSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.get('[data-cy-id="allPrioritySMS"] label span.onoffswitch-switch').should('exist');
    cy.get('[data-cy-id="allPrioritySMS"] label span.onoffswitch-switch').should('be.visible');
    cy.get('[data-cy-id="allPrioritySMS"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="allPriorityEMAIL"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="allPriorityVOICE"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="allPriorityPUSH"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="allPriorityLETTER"] label span.onoffswitch-switch').click();
    cy.get('[data-cy-id="saveProgSetgBtn"]').should('exist');
    cy.get('[data-cy-id="saveProgSetgBtn"]').click();
    cy.wait("@saveProgramSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Default Preference always enabled', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectProgSettings(this.commonVars);
    cy.get('[data-cy-id="defaultPreference"] span.k-dropdown-wrap .k-select').should('exist');
    cy.get('[data-cy-id="defaultPreference"] span.k-dropdown-wrap .k-select').should('be.visible');
    cy.wait(1000);    
    cy.get('[data-cy-id="defaultPreference"] .k-dropdown-wrap .k-input').then(($span)=> {
      const dfltPrefOrigVal = $span.text();
      if(dfltPrefOrigVal == 'Disabled'){
        pageElementsObj.notfDfltPrefDisabled(this.commonVars,'');
        cy.get('#defaultPreference-list').find('li').contains('Disabled').click({force:true});
        cy.get('#defaultPreference-list').find('li').contains('Always enabled').click({force:true});
        cy.get('#defaultPreference-list').find('li').contains(dfltPrefOrigVal).click({force:true});
      }else if(dfltPrefOrigVal == 'Always enabled' || dfltPrefOrigVal == 'Fallback Only'){
        cy.get('[data-cy-id="defaultPreferenceMethodMulti"] #defaultPreferenceMethodMulti_taglist li span').then(($spanMulti)=> {
          let dfltPrefOrigMultiVal = $spanMulti.text();
          if(dfltPrefOrigMultiVal == 'Primary phone'){
            cy.get('[data-cy-id="defaultPreferenceMethodDisPrioty2"] .k-dropdown-wrap .k-input').then(($spanPri2)=> {
              let dfltPrefPri2Val = $spanPri2.text();
              if(dfltPrefPri2Val == 'Please Select'){
                pageElementsObj.notfDfltPrefDisabled(this.commonVars,'Fallback Only');
                pageElementsObj.notfDfltPrefAlwEnabOrFallBck(this.commonVars,dfltPrefOrigVal,dfltPrefOrigMultiVal,dfltPrefPri2Val);
                cy.log('1=>',dfltPrefOrigVal,'  2=>',dfltPrefOrigMultiVal,'  3=>',dfltPrefPri2Val);
              }else if(dfltPrefPri2Val == 'Primary phone'){
                pageElementsObj.notfDfltPrefDisabled(this.commonVars,'Fallback Only');
                pageElementsObj.notfDfltPrefAlwEnabOrFallBck(this.commonVars,dfltPrefOrigVal,dfltPrefOrigMultiVal,dfltPrefPri2Val);
                cy.log('1=>',dfltPrefOrigVal,'  2=>',dfltPrefOrigMultiVal,'  3=>',dfltPrefPri2Val);
              }else if(dfltPrefPri2Val == 'Primary email'){
                pageElementsObj.notfDfltPrefDisabled(this.commonVars,'Fallback Only');
                pageElementsObj.notfDfltPrefAlwEnabOrFallBck(this.commonVars,dfltPrefOrigVal,dfltPrefOrigMultiVal,dfltPrefPri2Val);
                cy.log('1=>',dfltPrefOrigVal,'  2=>',dfltPrefOrigMultiVal,'  3=>',dfltPrefPri2Val);
              }
            });
          }else if(dfltPrefOrigMultiVal == 'Primary email'){
            cy.get('[data-cy-id="defaultPreferenceMethodDisPrioty2"] .k-dropdown-wrap .k-input').then(($spanPri2)=> {
              let dfltPrefPri2Val = $spanPri2.text();
              if(dfltPrefPri2Val == 'Please Select'){
                pageElementsObj.notfDfltPrefDisabled(this.commonVars,'');
                pageElementsObj.notfDfltPrefAlwEnabOrFallBck(this.commonVars,dfltPrefOrigVal,dfltPrefOrigMultiVal,dfltPrefPri2Val);
                cy.log('1=>',dfltPrefOrigVal,'  2=>',dfltPrefOrigMultiVal,'  3=>',dfltPrefPri2Val);
              }else if(dfltPrefPri2Val == 'Primary phone'){
                pageElementsObj.notfDfltPrefDisabled(this.commonVars,'');
                pageElementsObj.notfDfltPrefAlwEnabOrFallBck(this.commonVars,dfltPrefOrigVal,dfltPrefOrigMultiVal,dfltPrefPri2Val);
                cy.log('1=>',dfltPrefOrigVal,'  2=>',dfltPrefOrigMultiVal,'  3=>',dfltPrefPri2Val);
              }else if(dfltPrefPri2Val == 'Primary email'){
                pageElementsObj.notfDfltPrefDisabled(this.commonVars,'');
                pageElementsObj.notfDfltPrefAlwEnabOrFallBck(this.commonVars,dfltPrefOrigVal,dfltPrefOrigMultiVal,dfltPrefPri2Val);
                cy.log('1=>',dfltPrefOrigVal,'  2=>',dfltPrefOrigMultiVal,'  3=>',dfltPrefPri2Val);
              }
            });
          }else if(dfltPrefOrigMultiVal == 'Primary phonePrimary email'){
            pageElementsObj.notfDfltPrefDisabled(this.commonVars,'');
            pageElementsObj.notfDfltPrefNoPriority2(this.commonVars,dfltPrefOrigVal,dfltPrefOrigMultiVal);
            cy.log('1=>',dfltPrefOrigVal,'  2=>',dfltPrefOrigMultiVal);
          }
        });
      }
      cy.get('[data-cy-id="saveProgSetgBtn"]').should('exist');
      cy.get('[data-cy-id="saveProgSetgBtn"]').click();
      cy.wait("@saveProgramSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    });
  });
  it('Notification Sending Hold Toggle', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectProgSettings(this.commonVars);
    cy.get('[data-cy-id="btnSending"]') // Select the button element by its ID
    .invoke('attr', 'class') // Get the 'class' attribute value
    .then(classNames => {
      if(classNames.includes('btn-green')){
        cy.log(classNames);
        cy.get('[data-cy-id="btnHold"]').should('be.visible');
        cy.get('[data-cy-id="btnHold"]').click();
        cy.get('[data-cy-id="saveProgSetgBtn"]').should('exist');
        cy.intercept("POST", this.commonVars.saveProgramSettings).as("saveProgramSettingsAPI");
        cy.get('[data-cy-id="saveProgSetgBtn"]').click();
        cy.wait("@saveProgramSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
        cy.intercept("GET", this.commonVars.programSettings).as("programSettingsAPI");
        cy.wait("@programSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
        cy.get('[data-cy-id="btnSending"]').should('be.visible')
        cy.get('[data-cy-id="btnSending"]').click();
        cy.get('[data-cy-id="saveProgSetgBtn"]').should('exist');
        //cy.intercept("POST", commonVars.saveProgramSettings).as("saveProgramSettingsAPI");
        cy.get('[data-cy-id="saveProgSetgBtn"]').click();
        cy.wait("@saveProgramSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
      }else{
        cy.get('[data-cy-id="btnHold"]') // Select the button element by its ID
        .invoke('attr', 'class') // Get the 'class' attribute value
        .then(classNames => {
          if(classNames.includes('btn-red')){
            cy.log(classNames);
            cy.get('[data-cy-id="btnSending"]').should('be.visible')
            cy.get('[data-cy-id="btnSending"]').click();
            cy.get('[data-cy-id="saveProgSetgBtn"]').should('exist');
            cy.intercept("POST", this.commonVars.saveProgramSettings).as("saveProgramSettingsAPI");
            cy.get('[data-cy-id="saveProgSetgBtn"]').click();
            cy.wait("@saveProgramSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
            cy.intercept("GET", this.commonVars.programSettings).as("programSettingsAPI");
            cy.wait("@programSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
            cy.get('[data-cy-id="btnHold"]').should('be.visible')
            cy.get('[data-cy-id="btnHold"]').click();
            cy.get('[data-cy-id="saveProgSetgBtn"]').should('exist');
            cy.get('[data-cy-id="saveProgSetgBtn"]').click();
            cy.wait("@saveProgramSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
          }
        });
      }
    });
  });
});
