/// <reference types="cypress" />
//const { includes } = require("cypress/types/lodash");
import commonFunctions from "../../common-functions/commonFunctions.js"
let pageElementsObj = new commonFunctions();
describe('18-CCB-UI Agent511Admin Create Program category, Program, Notification, Remove', () => {
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
  /*it('Create Program Mandatory Check', function(){
    cy.LoginApp(this.userCred.agent511email,this.userCred.agent511password);
    pageElementsObj.agent511AdminSelectProgWindow(this.commonVars);
    cy.get('[data-cy-id="programCategory"]').type('test');
    cy.get('[data-cy-id="programCategory"]').clear();
    cy.get('[data-cy-id="programCategoryDiv"] span').should('be.visible');
    cy.get('[data-cy-id="programCategoryDiv"] span').should('have.text', 'Program category name is required');
  });
  it('Create Program category', function(){
    cy.LoginApp(this.userCred.agent511email,this.userCred.agent511password);
    pageElementsObj.agent511AdminSelectProgWindow(this.commonVars);
    cy.get('[data-cy-id="programCategory"]').type('test');
    cy.get('[data-cy-id="programCategory"]').clear();
    cy.get('[data-cy-id="programCategoryDiv"] span').should('be.visible');
    cy.get('[data-cy-id="programCategoryDiv"] span').should('have.text', 'Program category name is required');
    cy.get('[data-cy-id="programCategory"]').type(this.commonVars.programCatName);
    cy.get('[data-cy-id="progCatSubmit"]').should('exist');
    cy.intercept("POST", this.commonVars.addProgramCategory).as("addProgramCategoryAPI");
    cy.get('[data-cy-id="progCatSubmit"]').click();
    cy.wait("@addProgramCategoryAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Optional Wildcard Name Mandatory Validation', function(){
    cy.LoginApp(this.userCred.agent511email,this.userCred.agent511password);
    pageElementsObj.agent511AdminSelectProgWindow(this.commonVars);
    cy.get('[data-cy-id="wildcardCategoryLI"]').click();
    cy.get('[data-cy-id="wildcardName"]').clear();
    cy.get('[data-cy-id="wildcardName"]').type('test');
    cy.get('[data-cy-id="wildcardName"]').clear();
    cy.get('[data-cy-id="wildcardNameErrSpan"]').should('be.visible');
    cy.get('[data-cy-id="wildcardNameErrSpan"]').should('have.text', 'Wildcard name is required');
  });
  it('Optional Wildcard Value Mandatory Validation', function(){
    cy.LoginApp(this.userCred.agent511email,this.userCred.agent511password);
    pageElementsObj.agent511AdminSelectProgWindow(this.commonVars);
    cy.get('[data-cy-id="wildcardCategoryLI"]').click();
    cy.get('[data-cy-id="wildcardValue"]').clear();
    cy.get('[data-cy-id="wildcardValue"]').type('test');
    cy.get('[data-cy-id="wildcardValue"]').clear();
    cy.get('[data-cy-id="wildcardValueErrSpan"]').should('be.visible');
    cy.get('[data-cy-id="wildcardValueErrSpan"]').should('have.text', 'Wildcard value is required');
  });
  it('Optional Wildcard Dummy Value Mandatory Validation', function(){
    cy.LoginApp(this.userCred.agent511email,this.userCred.agent511password);
    pageElementsObj.agent511AdminSelectProgWindow(this.commonVars);
    cy.get('[data-cy-id="wildcardCategoryLI"]').click();
    cy.get('[data-cy-id="dummyValue"]').clear();
    cy.get('[data-cy-id="dummyValue"]').type('test');
    cy.get('[data-cy-id="dummyValue"]').clear();
    cy.get('[data-cy-id="dummyValueErrSpan"]').should('be.visible');
    cy.get('[data-cy-id="dummyValueErrSpan"]').should('have.text', 'Dummy value is required');
  });
  it('Create Optional Wildcard', function(){
    cy.LoginApp(this.userCred.agent511email,this.userCred.agent511password);
    pageElementsObj.agent511AdminSelectProgWindow(this.commonVars);
    cy.get('[data-cy-id="wildcardCategoryLI"]').click();
    cy.get('[data-cy-id="wildcardName"]').clear();
    cy.get('[data-cy-id="wildcardName"]').type(this.commonVars.optionalWildCardName);
    cy.get('[data-cy-id="wildcardValue"]').clear();
    cy.get('[data-cy-id="wildcardValue"]').type(this.commonVars.optionalWildCardValue);
    cy.get('[data-cy-id="dummyValue"]').clear();
    cy.get('[data-cy-id="dummyValue"]').type(this.commonVars.optionalWildCardDummyValue);
    cy.get('[data-cy-id="creOptWildCardSubBtn"]').should('exist');
    cy.intercept("POST", this.commonVars.createOptionalWildCard).as("createOptionalWildCardAPI");
    cy.get('[data-cy-id="creOptWildCardSubBtn"]').click();
    cy.wait("@createOptionalWildCardAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Create Program Program Name Mandatory Test', function(){
    cy.LoginApp(this.userCred.agent511email,this.userCred.agent511password);
    pageElementsObj.agent511AdminOpenAddProgWindow(this.commonVars);
    cy.get('[data-cy-id="programName"]').type('test');
    cy.get('[data-cy-id="programName"]').clear();
    cy.get('[data-cy-id="progNameErrMsg"]').should('be.visible');
    cy.get('[data-cy-id="progNameErrMsg"]').should('have.text', '*Program name is required');
  });
  it('Create Program Sequence Number Mandatory Test', function(){
    cy.LoginApp(this.userCred.agent511email,this.userCred.agent511password);
    pageElementsObj.agent511AdminOpenAddProgWindow(this.commonVars);
    cy.get('[data-cy-id="progSequanceNumber"]').type('123');
    cy.get('[data-cy-id="progSequanceNumber"]').clear();
    cy.get('[data-cy-id="seqNumErrMsg"]').should('be.visible');
    cy.get('[data-cy-id="seqNumErrMsg"]').should('have.text', 'sequence Number is required');
  });
  it('Create Program', function(){
    cy.LoginApp(this.userCred.agent511email,this.userCred.agent511password);
    pageElementsObj.agent511AdminOpenAddProgWindow(this.commonVars);
    cy.get('[data-cy-id="programName"]').clear();
    cy.get('[data-cy-id="programName"]').type(this.commonVars.programName);
    cy.get('[data-cy-id="progSequanceNumber"]').clear();
    cy.get('[data-cy-id="progSequanceNumber"]').type(this.commonVars.programSequenceNumber);
    cy.get('[data-cy-id="addProgSubmitBtn"]').should('exist');
    cy.intercept("POST", this.commonVars.addPrograms).as("addProgramsAPI");
    cy.intercept("GET", this.commonVars.getNotificationTreeAPI).as("notificationTreeAPI");
    cy.get('[data-cy-id="addProgSubmitBtn"]').click();
    cy.wait("@addProgramsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.wait("@notificationTreeAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.get('#notificationTreeview').should('exist');
    cy.wait(500);
    cy.get('#notificationTreeview ul li').first('.k-top .k-i-expand').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Notifications').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Outage').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').contains(this.commonVars.programName);
  });
  it('Remove Program', function(){
    cy.LoginApp(this.userCred.agent511email,this.userCred.agent511password);
    pageElementsObj.agent511AdminOpenAddProgWindow(this.commonVars);
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Outage').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').contains(this.commonVars.programName).first().click();
    cy.get('[data-cy-id="removeProgBtn"]').should('exist');
    cy.intercept("DELETE", this.commonVars.removeProgram).as("removeProgramAPI");
    cy.intercept("GET", this.commonVars.getNotificationTreeAPI).as("notificationTreeAPI");
    cy.get('[data-cy-id="removeProgBtn"]').click();
    cy.wait("@removeProgramAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.wait("@notificationTreeAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.get('#notificationTreeview').should('exist');
    cy.wait(500);
    cy.get('#notificationTreeview ul li').first('.k-top .k-i-expand').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Notifications').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Outage').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').contains(this.commonVars.programName).should('not.exist');
  });*/
  it('Add Notification Name Mandatory Validation', function(){
    cy.LoginApp(this.userCred.agent511email,this.userCred.agent511password);
    pageElementsObj.agent511AdminOpenAddProgWindow(this.commonVars);
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Outage').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Severe Weather').click();
    cy.get('[data-cy-id="addNotfWildCardBtn"]').should('exist');
    cy.get('[data-cy-id="addNotfWildCardBtn"]').click();
    cy.wait(200);
    cy.get('[data-cy-id="detailsContainer"]').should('exist');
    cy.get('[data-cy-id="notificationTypeName"]').should('exist');
    cy.get('[data-cy-id="notificationTypeName"]').clear();
    cy.get('[data-cy-id="notificationTypeName"]').type('test');
    cy.get('[data-cy-id="notificationTypeName"]').clear();
    cy.get('[data-cy-id="notfNameErrMsg"]').should('be.visible');
    cy.get('[data-cy-id="notfNameErrMsg"]').should('have.text', 'Notification name is required');
  });
  it('Add Notification Name Mandatory Validation', function(){
    cy.LoginApp(this.userCred.agent511email,this.userCred.agent511password);
    pageElementsObj.agent511AdminOpenAddProgWindow(this.commonVars);
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Outage').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Severe Weather').click();
    cy.get('[data-cy-id="addNotfWildCardBtn"]').should('exist');
    cy.get('[data-cy-id="addNotfWildCardBtn"]').click();
    cy.wait(200);
    cy.get('[data-cy-id="detailsContainer"]').should('exist');
    cy.get('[data-cy-id="notfSequanceNumber"]').should('exist');
    cy.get('[data-cy-id="notfSequanceNumber"]').clear();
    cy.get('[data-cy-id="notfSequanceNumber"]').type(123);
    cy.get('[data-cy-id="notfSequanceNumber"]').clear();
    cy.get('[data-cy-id="notfSeqNumErrMsg"]').should('be.visible');
    cy.get('[data-cy-id="notfSeqNumErrMsg"]').should('have.text', 'sequence Number is required');
  });
  
});
