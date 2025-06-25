/// <reference types="cypress" />
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
describe('5-CCB-UI Subscriber OutGoing Message and History', () => {
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
  it('clear All Saved Sessions', function(){
    Cypress.session.clearAllSavedSessions();
  });
 it('Subscriber History Search Validation', function(){
  cy.LoginApp(this.userCred.email,this.userCred.password);
  pageElementsObj.navigateToSubscriberDetailsPage(this.commonVars,this.opcoObj);
  cy.get('[data-cy-id="historyTab"]').click();
  cy.get('[data-cy-id="SubHistorySrchBtn"]').click();
  cy.get('#programAlert').find('div.ng-binding').should('have.text', 'Please select from date');
  
  let fromDate = new Date();
  fromDate.setMonth(fromDate.getMonth() - 1);
  fromDate.setDate(fromDate.getDate() - 1);
  let curYear = fromDate.getFullYear();
  let curMonth = String(fromDate.getMonth()).padStart(2, '0');
  let curDay = String(fromDate.getDate()).padStart(2, '0');
  let curDate = curYear+'-'+curMonth+'-'+curDay;
  cy.log('CurDate>',curDate);
  cy.get('[data-cy-id="subscriberHistoryFromDate"]').click().focused().type(curDate);
  cy.intercept("POST", this.commonVars.filterAPI).as("historyFilterAPI");
  cy.get('[data-cy-id="SubHistorySrchBtn"]').click();
  cy.wait("@historyFilterAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
 });
 it('Subscriber Outgoing Message Validation', function(){
  cy.LoginApp(this.userCred.email,this.userCred.password);
  cy.visit('/subscribers');
  cy.url().should('include','subscribers');
  cy.get('[data-cy-id="outgoingMsgTab"]').click();
  cy.get('[data-cy-id="subOutGoingMsgSendBtn"]').click();
  cy.get('[data-cy-id="outgoingmdn"]').should('have.class', 'required-alert');
  cy.get('[aria-owns="outgoingTxtTemplate_listbox"]').should('have.class', 'kendo-dd-required-alert');
  cy.get('[data-cy-id="outgoingTemplate"]').should('have.class', 'required-alert');
  cy.get('[data-cy-id="outgoingmdn"]').click().focused().type(this.commonVars.validmdn);
  cy.get('[aria-owns="outgoingTxtTemplate_listbox"]').first().click();
  cy.get('div#outgoingTxtTemplate-list ul#outgoingTxtTemplate_listbox li').eq(0).click();
  //cy.get('[data-cy-id="outgoingTemplate"]').click().focused().type(this.commonVars.draftTempBody);
  cy.intercept("POST", this.commonVars.sendOutgoingTextMessage).as("sendOutgoingTextMessageAPI");
  cy.get('[data-cy-id="subOutGoingMsgSendBtn"]').click();
  cy.wait("@sendOutgoingTextMessageAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
 });
});