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
describe('8-CCB-UI adHoc Notification Filter', () => {
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
  it('adHoc Filter Validation using Account Number', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    cy.get('[data-cy-id="adhocWizard"] div.actions ul li').find('a').contains('Next').should('be.visible');
    cy.get('[data-cy-id="adhocWizard"] div.actions ul li').find('a').contains('Next').click();
    cy.get('[data-cy-id="adhocFiltField"] .k-multiselect ').find('input').click();
    cy.get('#selFilterList_listbox').find('li').contains('Account Number').click();
    cy.get('[data-cy-id="applyBtn"]').click();
    cy.get('[data-cy-id="filterInpDiv"] input#accountNumber').should('be.visible');
    cy.get('[data-cy-id="filterInpDiv"] input#accountNumber').type(this.opcoObj.accountNumber);
    cy.intercept("POST", this.commonVars.getAdhocPrefCount).as("getAdhocPrefCountAPI");
    cy.get('[data-cy-id="applyFilter"]').click();
    cy.wait("@getAdhocPrefCountAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
});
