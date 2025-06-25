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
describe('1-CCB-UI Search Subscriber', () => {
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
  /*before(() => {
    // Log in before all tests run
    cy.visit('http://localhost:8080/reachui/app/#app/login');
    cy.Login_Application();
  });*/
  it('First name minimum length Validation', function(){
    //cy.getCookies().should('not.be.empty')
    //cy.clearCookies()
    //cy.getCookies().should('be.empty')
    //cy.log('log log log ',this.user);
    //cy.log('log2 log2 log2 ',this.userCred);
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('[data-cy-id="firstName"]').type('a').should('have.value','a');
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#programAlert').find('div.ng-binding').should('have.text', 'Please enter minimum 3 characters.');
  });
  it('Last name minimum length Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('[data-cy-id="lastName"]').type('a').should('have.value','a');
    cy.get('.sub-search-btn.btn-primary').click();
    //cy.get('form').submit();
    cy.get('#programAlert').find('div.ng-binding').should('have.text', 'Please enter minimum 3 characters.');
  });
  it('Customer Number minimum length Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('[data-cy-id="customerNumber"]').type('a').should('have.value','a');
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#programAlert').find('div.ng-binding').should('have.text', 'Please enter minimum 3 characters.');
  });
  it('Account Number minimum length Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('[data-cy-id="accountID"]').type('a').should('have.value','a');
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#programAlert').find('div.ng-binding').should('have.text', 'Please enter minimum 3 characters.');
  });
  it('Premise Number minimum length Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('[data-cy-id="premiseNo"]').type('a').should('have.value','a');
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#programAlert').find('div.ng-binding').should('have.text', 'Please enter minimum 3 characters.');
  });
  it('Service Point Number minimum length Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('[data-cy-id="servicePntNo"]').type('a').should('have.value','a');
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#programAlert').find('div.ng-binding').should('have.text', 'Please enter minimum 3 characters.');
  });
  // Max length valiation
  it('First name Maxlength length Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('[data-cy-id="firstName"]').should('exist');
    cy.get('[data-cy-id="firstName"]').invoke('attr', 'maxlength').should('contain', pageElementsObj.subscriberInputMaxLength);
  });
  it('Last name Maxlength length Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('[data-cy-id="lastName"]').should('exist');
    cy.get('[data-cy-id="lastName"]').invoke('attr', 'maxlength').should('contain', pageElementsObj.subscriberInputMaxLength);
  });
  it('Customer Number Maxlength length Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('[data-cy-id="customerNumber"]').should('exist');
    cy.get('[data-cy-id="customerNumber"]').invoke('attr', 'maxlength').should('contain', pageElementsObj.customerNumMaxLength);
  });
  it('Account Number Maxlength length Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('[data-cy-id="accountID"]').should('exist');
    cy.get('[data-cy-id="accountID"]').invoke('attr', 'maxlength').should('contain', pageElementsObj.accNumMaxLength);
  });
  it('Premise Number Maxlength length Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('[data-cy-id="premiseNo"]').should('exist');
    cy.get('[data-cy-id="premiseNo"]').invoke('attr', 'maxlength').should('contain', pageElementsObj.accNumMaxLength);
  });
  it('Service Point Number Maxlength length Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('[data-cy-id="servicePntNo"]').should('exist');
    cy.get('[data-cy-id="servicePntNo"]').invoke('attr', 'maxlength').should('contain', pageElementsObj.accNumMaxLength);
  });
  //Subscriber search
  it('Check Subscriber Search', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber).should('have.value',this.opcoObj.customerNumber);
    cy.get('[data-cy-id="subSearchBtn"]').click();
    cy.get('div.k-grid').should('exist');
    cy.get('[data-cy-id="subscribersRstGrid"] tbody tr').should('have.length.greaterThan',0);
  });
});
