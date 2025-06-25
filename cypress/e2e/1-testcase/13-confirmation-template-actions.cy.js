/// <reference types="cypress" />
//const { includes } = require("cypress/types/lodash");
import commonFunctions from "../../common-functions/commonFunctions.js"
let pageElementsObj = new commonFunctions();
// Welcome to Cypress!
describe('13-CCB-UI Confirmation Draft Templates Add Approve Check Live', () => {
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
  it('clear All Saved Sessions', function(){
    Cypress.session.clearAllSavedSessions();
  });
  it('Add SMS Draft', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    pageElementsObj.testDraftSelectChannel('SMS','SMS-Draft');
    cy.wait(10);
    cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('.textEditor').find('iframe.k-content').should('exist');
    getIframeBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.intercept("POST", this.commonVars.addUpdateTemplateAPI).as("saveSMSTemplateAPI");
    cy.get('#saveDraftBtn').click();
    cy.wait("@saveSMSTemplateAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('SMS Draft sendToApprove/Approve', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('SMS').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('SMS-Draft').click();
    cy.get('.draft-mul-div').should('exist');
    cy.get('#multiTempDraftGrid .k-grid-content table tr td').its('length').then(function(resLen){
      if(resLen > 0){
          cy.get('#multiTempDraftGrid table tr').contains('td div.drafTempName',this.commonVars.draftTempName).its('length').then(function(res){
            if(res > 0){
              cy.get('#multiTempDraftGrid').find(pageElementsObj.PagerLastPage).click();
              cy.get('#multiTempDraftGrid table tr').last().contains('td div.drafTempName',this.commonVars.draftTempName).parent().parent().find('td .draftAction .mt-tab-selct-btn').click({force:true});
              cy.wait(10);
              cy.get('.draft-mul-div').should('exist');
              cy.get('#draftName').should('exist');
              cy.wait(10);
              cy.get('#sendToApprovarBtn', { timeout: this.commonVars.timeoutAPI }).should('exist');
              cy.intercept("POST", this.commonVars.submitToApproverSMS).as("submitToApproverSMSAPI");
              cy.get('#sendToApprovarBtn').click();
              cy.wait("@submitToApproverSMSAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
              cy.get('.draft-mul-div').should('exist');
              cy.wait(10);
              cy.get('#ApproveDraftBtn', { timeout: this.commonVars.timeoutAPI }).should('exist');
              cy.intercept("POST", this.commonVars.approveTemplate).as("approveSMSTemplateAPI");
              cy.intercept("GET", this.commonVars.getNotificationTreeAPI).as("notificationTreeAPI3");
              cy.get('#ApproveDraftBtn').click();
              cy.wait("@approveSMSTemplateAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200); 
            }
          });
        }
    });
  });
  it('SMS Check Approved draft as Live', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    pageElementsObj.liveDraftSelectChannel(pageElementsObj.notfSMSChannelName,pageElementsObj.notfSMSChannelLive);
    cy.get('[data-cy-id="livePreviewWindow"]').should('exist');
    cy.get('[data-cy-id="SMStempltName"] span').contains(this.commonVars.draftTempName);
    cy.get('[data-cy-id="smsTempBody"]').contains(this.commonVars.draftTempBody);
  });
  it('Add Email Draft', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    pageElementsObj.testDraftSelectChannel('Email','Email-Draft');
    cy.wait(10);
    cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('.emailEditor').find('iframe.k-content').should('exist');
    getIframeEmailSub().type(this.commonVars.draftTempSubject,{force:true},{delay:10});
    getIframeEmailBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.intercept("POST", this.commonVars.addUpdateTemplateAPI).as("saveTemplateAPI");
    cy.get('#saveDraftBtn').click();
    cy.wait("@saveTemplateAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Email Draft sendToApprover/Approve', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Email').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Email-Draft').click();
    cy.get('.draft-mul-div').should('exist');
    cy.get('#multiTempDraftGrid .k-grid-content table tr td').its('length').then(function(resLen){
      if(resLen > 0){
          cy.get('#multiTempDraftGrid table tr').contains('td div.drafTempName',this.commonVars.draftTempName).its('length').then(function(res){
            if(res > 0){
              cy.get('#multiTempDraftGrid').find(pageElementsObj.PagerLastPage).click();
              cy.get('#multiTempDraftGrid table tr').last().contains('td div.drafTempName',this.commonVars.draftTempName).parent().parent().find('td .draftAction .mt-tab-selct-btn').click({force:true});
              cy.wait(10);
              cy.get('#draftName').should('exist');
              cy.get('#sendToApprovarBtn', { timeout: this.commonVars.timeoutAPI }).should('exist');
              cy.intercept("POST", this.commonVars.submitToApproverEMAIL).as("submitToApproverEmailAPI");
              cy.get('#sendToApprovarBtn').click();
              cy.wait("@submitToApproverEmailAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
              cy.get('.draft-mul-div').should('exist');
              cy.wait(10);
              cy.get('#ApproveDraftBtn', { timeout: this.commonVars.timeoutAPI }).should('exist');
              cy.intercept("POST", this.commonVars.approveTemplate).as("approveTemplateEmailAPI");
              cy.get('#ApproveDraftBtn').click();
              cy.wait("@approveTemplateEmailAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200); 
            }
          });
        }
    });
  });
  it('Email Check Approved draft as Live', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    pageElementsObj.liveDraftSelectChannel(pageElementsObj.notfEmailChannelName,pageElementsObj.notfEmailChannelLive);
    cy.get('[data-cy-id="livePreviewWindow"]').should('exist');
    cy.get('[data-cy-id="EMAILtempltName"] span').contains(this.commonVars.draftTempName);
    cy.get('[data-cy-id="emailTempBody"]').contains(this.commonVars.draftTempBody);
  });
  it('Add Voice Draft', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    pageElementsObj.testDraftSelectChannel('Voice','Voice-Draft');
    cy.wait(10);
    cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('.textEditor').find('iframe.k-content').should('exist');
    getIframeBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.intercept("POST", this.commonVars.addUpdateTemplateAPI).as("saveVoiceTemplateAPI");
    cy.get('#saveDraftBtn').click();
    cy.wait("@saveVoiceTemplateAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Voice Draft sendToApprove/Approve', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Voice').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Voice-Draft').click();
    cy.get('.draft-mul-div').should('exist');
    cy.get('#multiTempDraftGrid .k-grid-content table tr td').its('length').then(function(resLen){
      if(resLen > 0){
          cy.get('#multiTempDraftGrid table tr').contains('td div.drafTempName',this.commonVars.draftTempName).its('length').then(function(res){
            if(res > 0){
              cy.get('#multiTempDraftGrid').find(pageElementsObj.PagerLastPage).click();
              cy.get('#multiTempDraftGrid table tr').last().contains('td div.drafTempName',this.commonVars.draftTempName).parent().parent().find('td .draftAction .mt-tab-selct-btn').click({force:true});
              cy.wait(10);
              cy.get('.draft-mul-div').should('exist');
              cy.get('#draftName').should('exist');
              cy.wait(10);
              cy.get('#sendToApprovarBtn', { timeout: this.commonVars.timeoutAPI }).should('exist');
              cy.intercept("POST", this.commonVars.submitToApproverVOICE).as("submitToApproverVoiceAPI");
              cy.get('#sendToApprovarBtn').click();
              cy.wait("@submitToApproverVoiceAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
              cy.get('.draft-mul-div').should('exist');
              cy.wait(10);
              cy.get('#ApproveDraftBtn', { timeout: this.commonVars.timeoutAPI }).should('exist');
              cy.intercept("POST", this.commonVars.approveTemplate).as("approveVoiceTemplateAPI");
              cy.get('#ApproveDraftBtn').click();
              cy.wait("@approveVoiceTemplateAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200); 
            }
          });
        }
    });
  });
  it('Voice Check Approved draft as Live', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    pageElementsObj.liveDraftSelectChannel(pageElementsObj.notfVoiceChannelName,pageElementsObj.notfVoiceChannelLive);
    cy.get('[data-cy-id="livePreviewWindow"]').should('exist');
    cy.get('[data-cy-id="VOICEtempltName"] span').contains(this.commonVars.draftTempName);
    cy.get('[data-cy-id="voiceTempBody"]').contains(this.commonVars.draftTempBody);
  });
  it('Add Push Draft', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    pageElementsObj.testDraftSelectChannel('Push','Push-Draft');
    cy.wait(10);
    cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('.textEditor').find('iframe.k-content').should('exist');
    getIframeBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.intercept("POST", this.commonVars.addUpdateTemplateAPI).as("savePushTemplateAPI");
    cy.get('#saveDraftBtn').click();
    cy.wait("@savePushTemplateAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Push Draft sendToApprove/Approve', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Push').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Push-Draft').click();
    cy.get('.draft-mul-div').should('exist');
    cy.get('#multiTempDraftGrid .k-grid-content table tr td').its('length').then(function(resLen){
      if(resLen > 0){
          cy.get('#multiTempDraftGrid table tr').contains('td div.drafTempName',this.commonVars.draftTempName).its('length').then(function(res){
            if(res > 0){
              cy.get('#multiTempDraftGrid').find(pageElementsObj.PagerLastPage).click();
              cy.get('#multiTempDraftGrid table tr').last().contains('td div.drafTempName',this.commonVars.draftTempName).parent().parent().find('td .draftAction .mt-tab-selct-btn').click({force:true});
              cy.wait(10);
              cy.get('.draft-mul-div').should('exist');
              cy.get('#draftName').should('exist');
              cy.wait(10);
              cy.get('#sendToApprovarBtn', { timeout: this.commonVars.timeoutAPI }).should('exist');
              cy.intercept("POST", this.commonVars.submitToApproverPUSH).as("submitToApproverPushAPI");
              cy.get('#sendToApprovarBtn').click();
              cy.wait("@submitToApproverPushAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
              cy.get('.draft-mul-div').should('exist');
              cy.wait(10);
              cy.get('#ApproveDraftBtn', { timeout: this.commonVars.timeoutAPI }).should('exist');
              cy.intercept("POST", this.commonVars.approveTemplate).as("approvePushTemplateAPI");
              cy.get('#ApproveDraftBtn').click();
              cy.wait("@approvePushTemplateAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200); 
            }
          });
        }
    });
  });  
  it('Push Check Approved draft as Live', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftConfSelectLanag(this.commonVars);
    pageElementsObj.liveDraftSelectChannel(pageElementsObj.notfPushChannelName,pageElementsObj.notfPushChannelLive);
    cy.get('[data-cy-id="livePreviewWindow"]').should('exist');
    cy.get('[data-cy-id="PUSHtempltName"] span').contains(this.commonVars.draftTempName);
    cy.get('[data-cy-id="pushTempBody"]').contains(this.commonVars.draftTempBody);
  });
});
