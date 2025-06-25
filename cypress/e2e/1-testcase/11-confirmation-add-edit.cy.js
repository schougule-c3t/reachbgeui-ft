/// <reference types="cypress" />
//const { includes } = require("cypress/types/lodash");
import commonFunctions from "../../common-functions/commonFunctions.js"
let pageElementsObj = new commonFunctions();
// Welcome to Cypress!
describe('11-CCB-UI Confirmation Add/Update', () => {
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
  it('Add Confirmation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.loadNotifTree(this.commonVars);
    cy.get('[id*="select__Confirmations"]').find('span').invoke('attr', 'id').contains('Confirmations').click();
    cy.wait(10);
    cy.get('#confirmationName').type(this.commonVars.draftTempConfName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempConfName);
    let randSeqNum = Math.floor((Math.random() * 1000000) + 1);
    cy.get('#sequenceNumber').type(randSeqNum,{force:true},{delay:10}).should('have.value',randSeqNum);
    cy.get('[data-cy-id="fromEmailConfdd"]').select(1);
    cy.intercept("POST", this.commonVars.saveConfirmation).as("saveConfirmationAPI");
    cy.get('[data-cy-id="addConfirmationBtn"]').click();
    cy.wait("@saveConfirmationAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should('be.oneOf', [200, 409]);//add and if already added then it should return duplicate record response
  });
  it('Edit Confirmation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.loadNotifTree(this.commonVars);
    cy.get('#notificationTreeview ul li:nth-child(2)').find('.k-mid .k-i-expand').click();
    cy.get('[id*="select__Default"]').find('span').invoke('attr', 'id').contains('Default').click();
    cy.get('[id*="select__AutomationTestConf"]').first().find('span').invoke('attr', 'id').contains('AutomationTestConf').click();
    cy.get('[data-cy-id="editconfirmationName"]').clear().click();
    cy.get('[data-cy-id="editconfirmationName"]').type(this.commonVars.draftTempConfNameEdit,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempConfNameEdit);
    let randSeqNum = Math.floor((Math.random() * 1000000) + 1);
    cy.get('[data-cy-id="editsequenceNumber"]').clear().click();
    cy.get('[data-cy-id="editsequenceNumber"]').type(randSeqNum,{force:true},{delay:10}).should('have.value',randSeqNum);
    cy.get('[data-cy-id="fromeditEmailConfdd"]').select(1);
    cy.intercept("POST", this.commonVars.saveConfirmation).as("updateConfirmationAPI");
    cy.get('[data-cy-id="updateConfirmation"]').click();
    //delete option not present now so we have 409 in the assertion, once delete came then will remove 409
    cy.wait("@updateConfirmationAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should('be.oneOf', [200, 409]);
  });
  it('Add Confirmation Group', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.loadNotifTree(this.commonVars);
    cy.get('[id*="select__Confirmations"]').find('span').invoke('attr', 'id').contains('Confirmations').click();
    cy.wait(10);
    cy.get('[data-cy-id="grp-chk-div"] label span.checkbox-conf__span').click();
    cy.get('[data-cy-id="confirmationGroupName"]').type(this.commonVars.draftTempConfGroupName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempConfGroupName);
    cy.intercept("POST", this.commonVars.saveConfirmationGroup).as("saveConfirmationGroupAPI");
    cy.get('[data-cy-id="addConfirmationBtn"]').click();
    cy.wait("@saveConfirmationGroupAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should('be.oneOf', [200, 409]);//add and if already added then it should return duplicate record response
  });
  it('Add Confirmation From Email Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.loadNotifTree(this.commonVars);
    cy.get('[id*="select__Confirmations"]').find('span').invoke('attr', 'id').contains('Confirmations').click();
    cy.wait(10);
    cy.get('#confirmationName').type(this.commonVars.draftTempConfName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempConfName);
    let randSeqNum = Math.floor((Math.random() * 1000000) + 1);
    cy.get('#sequenceNumber').type(randSeqNum,{force:true},{delay:10}).should('have.value',randSeqNum);
    //cy.get('[data-cy-id="fromEmailConfdd"]').select(1);
    cy.intercept("POST", this.commonVars.saveConfirmation).as("saveConfirmationAPI");
    cy.get('[data-cy-id="addConfirmationBtn"]').click();
    cy.get('[data-cy-id="email_channel_valid"] span').should('exist');
    cy.get('[data-cy-id="email_channel_valid"] span').should('be.visible');
    //here some improvements required
    //cy.get('[data-cy-id="email_channel_valid"] span').should('have.value','Please select email sender').should('be.visible');
  });
});
