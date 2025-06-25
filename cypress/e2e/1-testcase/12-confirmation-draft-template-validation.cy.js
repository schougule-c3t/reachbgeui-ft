/// <reference types="cypress" />
//const { includes } = require("cypress/types/lodash");
import commonFunctions from "../../common-functions/commonFunctions.js"
let pageElementsObj = new commonFunctions();

describe('12-CCB-UI Confirmation Draft Templates Validation', () => {
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
  const getIframeBody = function(){
    return cy.get('.textEditor .k-content').its('0.contentDocument.body').then(cy.wrap);
  }
  const getIframeEmailBody = function(){
    return cy.get('.emailEditor .k-content').its('0.contentDocument.body').then(cy.wrap);
  }
  const getIframeEmailSub = function(){
    return cy.get('#subEditorBox .k-content').its('0.contentDocument.body').then(cy.wrap);
  }
  it('Draft Template Name Max Length Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    pageElementsObj.testDraftSelectChannel('SMS','SMS-Draft');
    cy.get('#draftName').should('exist');
    cy.get('#draftName').invoke('attr', 'maxlength').should('contain', pageElementsObj.draftTempInputMaxLength);
  });
  it('SMS Draft Mandatory Check all fields', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    pageElementsObj.testDraftSelectChannel('SMS','SMS-Draft');
    cy.get('.textEditor').find('iframe.k-content').should('exist');
    cy.get('#saveDraftBtn').click();
    cy.get('#programAlert').find('div.ng-binding').contains('Please enter');
  });
  it('SMS Draft Template Name Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    pageElementsObj.testDraftSelectChannel('SMS','SMS-Draft');
    cy.get('.textEditor').find('iframe.k-content').should('exist');
    getIframeBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.get('#saveDraftBtn').click();
    cy.get('#programAlert').find('div.ng-binding').contains('Please enter');
  });
  it('SMS Draft Body Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    pageElementsObj.testDraftSelectChannel('SMS','SMS-Draft');
    cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('.textEditor').find('iframe.k-content').should('exist');
    cy.get('#saveDraftBtn').click();
    cy.get('#programAlert').find('div.ng-binding').contains('Please enter');
  });
  it('Email Draft Mandatory Check all fields', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    pageElementsObj.testDraftSelectChannel('Email','Email-Draft');
    //cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('.emailEditor').find('iframe.k-content').should('exist');
    //getIframeEmailSub().type(this.commonVars.draftTempSubject,{force:true},{delay:10});
    //getIframeEmailBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.get('#saveDraftBtn').click();
    cy.get('#programAlert').find('div.ng-binding').contains('Please enter');
  });
  it('Email Draft Template Name Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    pageElementsObj.testDraftSelectChannel('Email','Email-Draft');
    cy.get('.emailEditor').find('iframe.k-content').should('exist');
    getIframeEmailSub().type(this.commonVars.draftTempSubject,{force:true},{delay:10});
    getIframeEmailBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.get('#saveDraftBtn').click();
    cy.get('#programAlert').find('div.ng-binding').contains('Please enter');
  });
  it('Email Draft Subject Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    pageElementsObj.testDraftSelectChannel('Email','Email-Draft');
    cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('.emailEditor').find('iframe.k-content').should('exist');
    getIframeEmailBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.get('#saveDraftBtn').click();
    cy.get('#programAlert').find('div.ng-binding').contains('Please enter');
  });
  it('Email Draft Body Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    pageElementsObj.testDraftSelectChannel('Email','Email-Draft');
    cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('.emailEditor').find('iframe.k-content').should('exist');
    getIframeEmailSub().type(this.commonVars.draftTempSubject,{force:true},{delay:10});
    cy.get('#saveDraftBtn').click();
    cy.get('#programAlert').find('div.ng-binding').contains('Please enter');
  });
  it('Email Draft Subject Limit Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    pageElementsObj.testDraftSelectChannel('Email','Email-Draft');
    cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('.emailEditor').find('iframe.k-content').should('exist');
    getIframeEmailSub().type(this.commonVars.emailSubMaxlength200Chk,{force:true},{delay:10});
    getIframeEmailBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.get('#saveDraftBtn').click();
    cy.get('#programAlert').find('div.ng-binding').contains('Subject should be less than '+this.commonVars.emailSubjectMaxLength+' Characters.');
  });
  it('Voice Draft Mandatory Check all fields', function(){
   cy.LoginApp(this.userCred.email,this.userCred.password);
   pageElementsObj.testDraftConfSelectLanag(this.commonVars);
   pageElementsObj.testDraftSelectChannel('Voice','Voice-Draft');
   cy.get('.textEditor').find('iframe.k-content').should('exist');
   cy.get('#saveDraftBtn').click();
   cy.get('#programAlert').find('div.ng-binding').contains('Please enter');
 });
 it('Voice Draft Template Name Mandatory Validation', function(){
   cy.LoginApp(this.userCred.email,this.userCred.password);
   pageElementsObj.testDraftConfSelectLanag(this.commonVars);
   pageElementsObj.testDraftSelectChannel('Voice','Voice-Draft');
   cy.get('.textEditor').find('iframe.k-content').should('exist');
   getIframeBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
   cy.get('#saveDraftBtn').click();
   cy.get('#programAlert').find('div.ng-binding').contains('Please enter');
 });
 it('Voice Draft Body Mandatory Validation', function(){
   cy.LoginApp(this.userCred.email,this.userCred.password);
   pageElementsObj.testDraftConfSelectLanag(this.commonVars);
   pageElementsObj.testDraftSelectChannel('Voice','Voice-Draft');
   cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
   cy.get('.textEditor').find('iframe.k-content').should('exist');
   cy.get('#saveDraftBtn').click();
   cy.get('#programAlert').find('div.ng-binding').contains('Please enter');
 });
 it('Push Draft Mandatory Check all fields', function(){
  cy.LoginApp(this.userCred.email,this.userCred.password);
  pageElementsObj.testDraftConfSelectLanag(this.commonVars);
  pageElementsObj.testDraftSelectChannel('Push','Push-Draft');
  cy.get('.textEditor').find('iframe.k-content').should('exist');
  cy.get('#saveDraftBtn').click();
  cy.get('#programAlert').find('div.ng-binding').contains('Please enter');
  });
  it('Push Draft Template Name Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    pageElementsObj.testDraftSelectChannel('Push','Push-Draft');
    cy.get('.textEditor').find('iframe.k-content').should('exist');
    getIframeBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.get('#saveDraftBtn').click();
    cy.get('#programAlert').find('div.ng-binding').contains('Please enter');
  });
  it('Push Draft Body Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    pageElementsObj.testDraftSelectChannel('Push','Push-Draft');
    cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('.textEditor').find('iframe.k-content').should('exist');
    cy.get('#saveDraftBtn').click();
    cy.get('#programAlert').find('div.ng-binding').contains('Please enter');
  });
});
