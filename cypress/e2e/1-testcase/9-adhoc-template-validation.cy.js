/// <reference types="cypress" />
//const { includes } = require("cypress/types/lodash");
import commonFunctions from "../../common-functions/commonFunctions.js"
let pageElementsObj = new commonFunctions();
// Welcome to Cypress!
// https://on.cypress.io/introduction-to-cypress
//var myConfig = Cypress.config()
describe('9-CCB-UI adHoc Notification Templates Validation', () => {
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
    return cy.get('[data-cy-id="adHocTextEditor"] .k-content').its('0.contentDocument.body').then(cy.wrap);
  }
  const getIframeEmailBody = function(){
    return cy.get('[data-cy-id="adHocEmailEditor"] .k-content').its('0.contentDocument.body').then(cy.wrap);
  }
  const getIframeEmailSub = function(){
    return cy.get('[data-cy-id="adHocSubjectEditor"] .k-content').its('0.contentDocument.body').then(cy.wrap);
  }
  it('clear All Saved Sessions', function(){
    Cypress.session.clearAllSavedSessions();
  });
  it('adHoc SMS Template Max Length Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    cy.get('[data-cy-id="SMSBtn"]').click();
    cy.get('.adhoc-template-name').should('be.visible');
    cy.get('#templateName').should('exist');
    cy.get('#templateName').invoke('attr', 'maxlength').should('contain', pageElementsObj.inputMaxLength);
  });
  it('adHoc SMS Template Mandatory Check all fields', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    cy.get('[data-cy-id="SMSBtn"]').click();
    cy.get('[data-cy-id="adHocTextEditor"]').find('iframe.k-content').should('be.visible');
    cy.get('[data-cy-id="adHocSaveBtn"]').click();
    cy.get('#adhocAlert').find('div.ng-binding').contains('Please enter');
  });
  it('adHoc SMS Template Name Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    cy.get('[data-cy-id="SMSBtn"]').click();
    cy.get('[data-cy-id="adHocTextEditor"]').find('iframe.k-content').should('be.visible');
    getIframeBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.get('[data-cy-id="adHocSaveBtn"]').click();
    cy.get('#adhocAlert').find('div.ng-binding').contains('Please enter');
  });
  it('adHoc SMS Body Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    cy.get('[data-cy-id="SMSBtn"]').click();
    cy.get('#templateName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('[data-cy-id="adHocTextEditor"]').find('iframe.k-content').should('be.visible');
    cy.get('[data-cy-id="adHocSaveBtn"]').click();
    cy.get('#adhocAlert').find('div.ng-binding').contains('Please enter');
  });
  it('adHoc SMS Test Draft', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    cy.get('[data-cy-id="SMSBtn"]').click();
    cy.get('#templateName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('[data-cy-id="adHocTextEditor"]').find('iframe.k-content').should('be.visible');
    getIframeBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.get('[data-cy-id="adHocTestDraftBtn"]').click();
    cy.get('[data-cy-id="livePreviewWindow"]').should('be.visible');
    cy.get('[data-cy-id="senderID"]').type(this.commonVars.validmdn,{force:true},{delay:10}).should('have.value',this.commonVars.validmdn);
    cy.intercept("POST", this.commonVars.sendTestMessage).as("sendTestMessageAPI");
    cy.get('[data-cy-id="sendMsgSubmitBtn"]').click();
    cy.wait("@sendTestMessageAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);//should('be.oneOf', [200]);
  });
  //SMS Draft Validation End
  it('Email Draft Mandatory Check all fields', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    cy.get('[data-cy-id="EMAILBtn"]').click();
    cy.get('[data-cy-id="adHocEmailEditor"]').find('iframe.k-content').should('be.visible');
    cy.get('[data-cy-id="adHocSaveBtn"]').click();
    cy.get('#adhocAlert').find('div.ng-binding').contains('Please enter');
  });
  it('Email Draft Template Name Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    cy.get('[data-cy-id="EMAILBtn"]').click();
    cy.get('[data-cy-id="adHocEmailEditor"]').find('iframe.k-content').should('be.visible');
    getIframeEmailSub().type(this.commonVars.draftTempSubject,{force:true},{delay:10});
    getIframeEmailBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.get('[data-cy-id="adHocSaveBtn"]').click();
    cy.get('#adhocAlert').find('div.ng-binding').contains('Please enter');
  });
  it('Email Draft Subject Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    cy.get('[data-cy-id="EMAILBtn"]').click();
    cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('[data-cy-id="adHocEmailEditor"]').find('iframe.k-content').should('be.visible');
    getIframeEmailBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.get('[data-cy-id="adHocSaveBtn"]').click();
    cy.get('#adhocAlert').find('div.ng-binding').contains('Please enter');
  });
  it('Email Draft Body Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    cy.get('[data-cy-id="EMAILBtn"]').click();
    cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('[data-cy-id="adHocEmailEditor"]').find('iframe.k-content').should('be.visible');
    getIframeEmailSub().type(this.commonVars.draftTempSubject,{force:true},{delay:10});
    cy.get('[data-cy-id="adHocSaveBtn"]').click();
    cy.get('#adhocAlert').find('div.ng-binding').contains('Please enter');
  });
  it('Email Draft Subject Limit Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    cy.get('[data-cy-id="EMAILBtn"]').click();
    cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('[data-cy-id="adHocEmailEditor"]').find('iframe.k-content').should('be.visible');
    getIframeEmailSub().type(this.commonVars.emailSubMaxlength200Chk,{force:true},{delay:10});
    getIframeEmailBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.get('[data-cy-id="adHocSaveBtn"]').click();
    cy.get('.adhoc-subj-remain-char').find('span.show-remaining-warn').contains('Exceeded the maximum 200 characters');
  });
  it('Email Test Draft', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    cy.get('[data-cy-id="EMAILBtn"]').click();
    cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('[data-cy-id="adHocEmailEditor"]').find('iframe.k-content').should('be.visible');
    getIframeEmailSub().type(this.commonVars.draftTempSubject,{force:true},{delay:10});
    getIframeEmailBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.get('[data-cy-id="adHocTestDraftBtn"]').click();
    cy.get('[data-cy-id="livePreviewWindow"]').should('be.visible');
    cy.get('[data-cy-id="senderID"]').type(this.commonVars.email,{force:true},{delay:10}).should('have.value',this.commonVars.email);
    cy.intercept("POST", this.commonVars.sendTestMessage).as("sendTestMessageAPI");
    cy.get('[data-cy-id="sendMsgSubmitBtn"]').click();
    cy.wait("@sendTestMessageAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  //Email Draft Validation End
 it('Voice Draft Mandatory Check all fields', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    cy.get('[data-cy-id="VOICEBtn"]').click();
    cy.get('[data-cy-id="adHocTextEditor"]').find('iframe.k-content').should('be.visible');
    cy.get('[data-cy-id="adHocSaveBtn"]').click();
    cy.get('#adhocAlert').find('div.ng-binding').contains('Please enter');
 });
 it('Voice Draft Template Name Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    cy.get('[data-cy-id="VOICEBtn"]').click();
    cy.get('[data-cy-id="adHocTextEditor"]').find('iframe.k-content').should('be.visible');
    getIframeBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.get('[data-cy-id="adHocSaveBtn"]').click();
    cy.get('#adhocAlert').find('div.ng-binding').contains('Please enter');
 });
 it('Voice Draft Body Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    cy.get('[data-cy-id="VOICEBtn"]').click();
    cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('[data-cy-id="adHocTextEditor"]').find('iframe.k-content').should('be.visible');
    cy.get('[data-cy-id="adHocSaveBtn"]').click();
    cy.get('#adhocAlert').find('div.ng-binding').contains('Please enter');
 });
 it('Voice Test Draft', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    cy.get('[data-cy-id="VOICEBtn"]').click();
    cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('[data-cy-id="adHocTextEditor"]').find('iframe.k-content').should('be.visible');
    getIframeBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.get('[data-cy-id="adHocTestDraftBtn"]').click();
    cy.get('[data-cy-id="livePreviewWindow"]').should('be.visible');
    cy.get('[data-cy-id="senderID"]').type(this.commonVars.validmdn,{force:true},{delay:10}).should('have.value',this.commonVars.validmdn);
    cy.intercept("POST", this.commonVars.sendTestMessage).as("sendTestMessageAPI");
    cy.get('[data-cy-id="sendMsgSubmitBtn"]').click();
    cy.wait("@sendTestMessageAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
 });
 //Voice draft validation End
  it('Push Draft Mandatory Check all fields', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    cy.get('[data-cy-id="PUSHBtn"]').click();
    cy.get('[data-cy-id="adHocTextEditor"]').find('iframe.k-content').should('be.visible');
    cy.get('[data-cy-id="adHocSaveBtn"]').click();
    cy.get('#adhocAlert').find('div.ng-binding').contains('Please enter');
  });
  it('Push Draft Template Name Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    cy.get('[data-cy-id="PUSHBtn"]').click();
    cy.get('[data-cy-id="adHocTextEditor"]').find('iframe.k-content').should('be.visible');
    getIframeBody().type(this.commonVars.draftTempBody,{force:true},{delay:20});
    cy.get('[data-cy-id="adHocSaveBtn"]').click();
    cy.get('#adhocAlert').find('div.ng-binding').contains('Please enter');
  });
  it('Push Draft Body Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    cy.get('[data-cy-id="PUSHBtn"]').click();
    cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('[data-cy-id="adHocTextEditor"]').find('iframe.k-content').should('be.visible');
    cy.get('[data-cy-id="adHocSaveBtn"]').click();
    cy.get('#adhocAlert').find('div.ng-binding').contains('Please enter');
  });
  it('Push Test Draft', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    cy.get('[data-cy-id="PUSHBtn"]').click();
    cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('[data-cy-id="adHocTextEditor"]').find('iframe.k-content').should('be.visible');
    getIframeBody().type(this.commonVars.draftTempBody,{force:true},{delay:20});
    cy.get('[data-cy-id="adHocTestDraftBtn"]').click();
    cy.get('[data-cy-id="livePreviewWindow"]').should('be.visible');
    cy.get('[data-cy-id="senderID"]').type(this.commonVars.deviceId,{force:true},{delay:10}).should('have.value',this.commonVars.deviceId);
    cy.intercept("POST", this.commonVars.sendTestMessage).as("sendTestMessageAPI");
    cy.get('[data-cy-id="sendMsgSubmitBtn"]').click();
    cy.wait("@sendTestMessageAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
});
