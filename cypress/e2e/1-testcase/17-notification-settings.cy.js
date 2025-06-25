/// <reference types="cypress" />
import commonFunctions from "../../common-functions/commonFunctions.js"
let pageElementsObj = new commonFunctions();
describe('17-CCB-UI Program Notification Save Settings', () => {
  beforeEach( function()  {
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
  it('Save Notification Settings', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectNotfSettings(this.commonVars);
    cy.get('[data-cy-id="saveNotfSetgBtn"]').should('exist');
    cy.intercept("POST", this.commonVars.saveNotificationSettings).as("saveNotificationSettingsAPI");
    cy.get('[data-cy-id="saveNotfSetgBtn"]').click();
    cy.wait("@saveNotificationSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Notification Settings Toggle SMS Provider', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectNotfSettings(this.commonVars);
      cy.get('[data-cy-id="notfProviderConf_SMS"]').should('be.visible');
      cy.get('[data-cy-id="notfProviderConf_SMS"] option:selected').then(function($option){
        pageElementsObj.notificationProviderToogle(this.commonVars,'notfProviderConf_SMS',$option);
      });
  });
  it('Notification Settings Toggle EMAIL Provider', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectNotfSettings(this.commonVars);
      cy.get('[data-cy-id="notfProviderConf_EMAIL"]').should('be.visible');
      cy.get('[data-cy-id="notfProviderConf_EMAIL"] option:selected').then(function($option){
        pageElementsObj.notificationProviderToogle(this.commonVars,'notfProviderConf_EMAIL',$option);
      });
  });
  it('Notification Settings Toggle VOICE Provider', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectNotfSettings(this.commonVars);
      cy.get('[data-cy-id="notfProviderConf_VOICE"]').should('be.visible');
      cy.get('[data-cy-id="notfProviderConf_VOICE"] option:selected').then(function($option){
        pageElementsObj.notificationProviderToogle(this.commonVars,'notfProviderConf_VOICE',$option);
      });
  });
  it('Notification Settings Toggle PUSH Provider', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectNotfSettings(this.commonVars);
      cy.get('[data-cy-id="notfProviderConf_PUSH"]').should('be.visible');
      cy.get('[data-cy-id="notfProviderConf_PUSH"] option:selected').then(function($option){
        pageElementsObj.notificationPUSHProviderToogle(this.commonVars,'notfProviderConf_PUSH',$option);
      });
  });
  it('Notification Settings Active Outage', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectNotfSettings(this.commonVars);
    cy.get('input[data-cy-id="hoursActiveOutage"]').should('be.visible');
    cy.get('[data-cy-id="hoursActiveOutage"]') // Select the input element by its ID
    .invoke('val') // Get the value of the input box
    .then(inputValue => {
      const hourActOutage = inputValue;
      cy.log('hourActOutage=>',hourActOutage);
      cy.get('input[data-cy-id="hoursActiveOutage"]').clear().click();
      cy.get('input[data-cy-id="hoursActiveOutage"]').type('20');
      cy.get('[data-cy-id="saveNotfSetgBtn"]').should('exist');
      cy.intercept("POST", this.commonVars.saveNotificationSettings).as("saveNotificationSettingsAPI");
      cy.get('[data-cy-id="saveNotfSetgBtn"]').click();
      cy.wait("@saveNotificationSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
      cy.get('input[data-cy-id="hoursActiveOutage"]').clear().click();
      cy.get('input[data-cy-id="hoursActiveOutage"]').type(hourActOutage);
      cy.get('[data-cy-id="saveNotfSetgBtn"]').should('exist');
      cy.get('[data-cy-id="saveNotfSetgBtn"]').click();
      cy.wait("@saveNotificationSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    });
  });
  it('Notification Settings Active Outage Send Hold Discard', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectNotfSettings(this.commonVars);
      cy.get('input[data-cy-id="hoursActiveOutage"]').should('be.visible');
      cy.get('[data-cy-id="hoursActiveOutage"]') // Select the input element by its ID
      .invoke('val') // Get the value of the input box
      .then(inputValue => {
        cy.get('[data-cy-id="actionActiveOutageDiv"] .k-dropdown-wrap .k-input').then(($spanPri2)=> {
          let actOutVal = $spanPri2.text();//Send,Hold until Expiry,Discard
          const hourActOutage = inputValue;
          if(actOutVal == 'Send'){
            cy.get('[data-cy-id="actionActiveOutageDiv"] span.k-dropdown-wrap .k-select').click({force:true});
            cy.wait(500);
            cy.get('#actionActiveOutage_listbox').find('li').contains('Hold until Expiry').click({force:true});
          }else if(actOutVal == 'Hold until Expiry'){
            cy.get('[data-cy-id="actionActiveOutageDiv"] span.k-dropdown-wrap .k-select').click({force:true});
            cy.wait(500);
            cy.get('#actionActiveOutage_listbox').find('li').contains('Discard').click({force:true});
          }else{//Discard
            cy.get('[data-cy-id="actionActiveOutageDiv"] span.k-dropdown-wrap .k-select').click({force:true});
            cy.wait(500);
            cy.get('#actionActiveOutage_listbox').find('li').contains('Send').click({force:true});
          }
          cy.log('hourActOutage=>',hourActOutage);
          cy.get('input[data-cy-id="hoursActiveOutage"]').clear().click();
          cy.get('input[data-cy-id="hoursActiveOutage"]').type('20');
          cy.get('[data-cy-id="saveNotfSetgBtn"]').should('exist');
          cy.intercept("POST", this.commonVars.saveNotificationSettings).as("saveNotificationSettingsAPI");
          cy.get('[data-cy-id="saveNotfSetgBtn"]').click();
          cy.wait("@saveNotificationSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
          cy.get('input[data-cy-id="hoursActiveOutage"]').clear().click();
          //drop down revert process          
          cy.get('[data-cy-id="actionActiveOutageDiv"] span.k-dropdown-wrap .k-select').click({force:true});
          cy.wait(500);
          cy.get('#actionActiveOutage_listbox').find('li').contains('Send').click({force:true});
          cy.get('#actionActiveOutage_listbox').find('li').contains('Discard').click({force:true});
          cy.get('#actionActiveOutage_listbox').find('li').contains(actOutVal).click({force:true});
          cy.get('input[data-cy-id="hoursActiveOutage"]').type(hourActOutage);
          cy.get('[data-cy-id="saveNotfSetgBtn"]').should('exist');
          cy.get('[data-cy-id="saveNotfSetgBtn"]').click();
          cy.wait("@saveNotificationSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
        });
      });
  });
  it('Notification Settings Send Max count and Hour/Day Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectNotfSettings(this.commonVars);
    cy.get('input[data-cy-id="hoursActiveOutage"]').should('be.visible');
    cy.get('[data-cy-id="showNotificationRow"]').then(($div) => {
      cy.get('[data-cy-id="saveNotfSetgBtn"]').should('exist');
      cy.intercept("POST", this.commonVars.saveNotificationSettings).as("saveNotificationSettingsAPI");
      if ($div.hasClass('ng-hide')) {
        cy.get('[data-cy-id="notificationLimitboxLbl"] span.notfy-set-check').click({force:true});
        cy.get('[data-cy-id="saveNotfSetgBtn"]').click();
        cy.get('[data-cy-id="maxNotifValidMsg"]').should('be.visible');
        cy.get('[data-cy-id="maxNotifValidMsg"]').should('have.text', 'Both Max Notification Number and Max Notification Hour Fields are required and both should be grater then 0');
      } else {
        cy.get('[data-cy-id="maxNotifications"]').invoke('val').then(inputValue => {
          const maxNotifications = inputValue;
          cy.get('[data-cy-id="progNotifHour"]').invoke('val').then(inputValue => {
            const progNotifHour = inputValue;
            cy.get('[data-cy-id="notificationLimitboxLbl"] span.notfy-set-check').click({force:true});
            cy.get('[data-cy-id="saveNotfSetgBtn"]').click();
            cy.wait("@saveNotificationSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
            cy.get('[data-cy-id="notificationLimitboxLbl"] span.notfy-set-check').click({force:true});
            cy.get('[data-cy-id="saveNotfSetgBtn"]').click();
            cy.get('[data-cy-id="maxNotifValidMsg"]').should('be.visible');
            cy.get('[data-cy-id="maxNotifValidMsg"]').should('have.text', 'Both Max Notification Number and Max Notification Hour Fields are required and both should be grater then 0');
            cy.get('input[data-cy-id="maxNotifications"]').type(maxNotifications);
            cy.get('input[data-cy-id="progNotifHour"]').type(progNotifHour);
            cy.get('[data-cy-id="saveNotfSetgBtn"]').click();
            cy.wait("@saveNotificationSettingsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
          });
        });
      }
    });
  });
});
