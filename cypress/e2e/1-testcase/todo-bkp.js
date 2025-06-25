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
describe('CCB-UI Automation', () => {
  beforeEach( function()  {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    //cy.visit('http://68.169.48.106:8080/ccb/app/#app/subscribers');
    cy.visit('subscribers');
    cy.fixture('usersData').as('userCred');
    cy.fixture('common').as('commonVars');
    //cy.LoginApp();
    //.should('have.class', 'error')
    //.should('have.attr', 'style', 'color: red;')
    //.should('have.value', 'Clear this text')
    //.should('contain', 'Your form has been submitted!')
  });
  /*before(() => {
    // Log in before all tests run
    cy.visit('http://localhost:8080/reachui/app/#app/login');
    cy.Login_Application();
  });*/
  const getIframeBody = function(){
    return cy.get('.textEditor .k-content').its('0.contentDocument.body').then(cy.wrap)
    //return cy.get('.textEditor .k-content').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap)
  }
  const getIframeEmailBody = function(){
    return cy.get('.emailEditor .k-content').its('0.contentDocument.body').then(cy.wrap)
    //return cy.get('.emailEditor .k-content').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap)
  }
  const getIframeEmailSub = function(){
    return cy.get('#subEditorBox .k-content').its('0.contentDocument.body').then(cy.wrap)
    //return cy.get('#subEditorBox .k-content').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap)
  }
  /*it('First name minimum length Validation', function(){
    //cy.getCookies().should('not.be.empty')
    //cy.clearCookies()
    //cy.getCookies().should('be.empty')
    cy.log('log log log ',this.user);
    cy.log('log2 log2 log2 ',this.userCred);
    cy.LoginApp(this.userCred.email,this.userCred.password);
    //cy.visit('/');
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#firstName').type('a').should('have.value','a');
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#programAlert')
    //.shadow()
    .find('div.ng-binding')//.find('div.message__bind')
    .should('have.text', 'Please enter minimum 3 characters.');
  });
  it('Last name minimum length Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#lastName').type('a').should('have.value','a');
    cy.get('.sub-search-btn.btn-primary').click();
    //cy.get('form').submit();
    cy.get('#programAlert')
    //.shadow()
    .find('div.ng-binding')//.find('div.message__bind')
    .should('have.text', 'Please enter minimum 3 characters.');
  });
  it('Customer Number minimum length Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type('a').should('have.value','a');
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#programAlert').find('div.ng-binding')
    .should('have.text', 'Please enter minimum 3 characters.');
  });
  it('Account Number minimum length Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#accountID').type('a').should('have.value','a');
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#programAlert').find('div.ng-binding')
    .should('have.text', 'Please enter minimum 3 characters.');
  });
  it('Premise Number minimum length Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#premiseNo').type('a').should('have.value','a');
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#programAlert').find('div.ng-binding')
    .should('have.text', 'Please enter minimum 3 characters.');
  });
  it('Service Point Number minimum length Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#servicePntNo').type('a').should('have.value','a');
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#programAlert').find('div.ng-binding')
    .should('have.text', 'Please enter minimum 3 characters.');
  });
  it('Check Subscriber Search', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber).should('have.value',this.opcoObj.customerNumber);
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('div.k-grid').should('exist');
    cy.get('div.k-grid tbody tr').should('have.length.greaterThan',0);
    
    //cy.wait('@filterLog',{ timeout: 30000 }).its('response.statusCode').should('eq', 200);
  });
  it('Check subscriber Details page by clicking view button', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber).should('have.value',this.opcoObj.customerNumber);
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('div.k-grid').should('exist');
    cy.get('div.k-grid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    //cy.wait('@filterLog',{ timeout: 30000 }).its('response.statusCode').should('eq', 200);
  });
  it('Add SMS Contact', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.intercept("POST", this.commonVars.filterAPI).as("contFilterAPI");
    cy.get('.sub-search-btn.btn-primary').click();
    cy.wait("@contFilterAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.get('div#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#subscriberDataSMSGrid .k-grid-toolbar button').first().click();
    cy.get('#contactdata').should('exist');
    cy.get('#contactLabel').should('exist');
    //cy.get('#contactLabel').type('autoMationData1');
    cy.get('input#contactLabel').click();
    //cy.get('input#contactLabel').type('{selectall}{backspace}');
    //this.commonVars.name
    //this.commonVars.mdn
    cy.get('input#contactLabel').type(this.commonVars.contLabelSMS,{force:true}).should('have.value',this.commonVars.contLabelSMS);
    cy.get('#mdn').click();
    cy.wait(10);
    cy.get('#mdn').type(this.commonVars.mdnNumber).should('have.value',this.commonVars.mdnFind);
    //cy.get('#mdn').type('(321) 212-1212',{delay:50});
    //cy.get('#accKDropdown .k-multiselect').should('exist');
    //cy.get('#accKDropdown .k-multiselect').contains('Select account');
    //cy.wait(1000);
    //cy.get('#accKDropdown .k-multiselect').should('include.text', 'Select account').click();
    //cy.get('#accKDropdown .k-multiselect-wrap .k-input').click();
    //cy.get('div#account-list ul#account_listbox li').eq(1).click();
    //cy.wait(1000);
    cy.intercept("POST", this.commonVars.addSubscriberContactAPI).as("addSMSContactAPI");
    cy.get('#contSaveBtn').click();   
    cy.wait("@addSMSContactAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.get('#subscriberDataSMSGrid table tr').contains('td span', this.commonVars.contLabelSMS).should('be.visible');
  });
  it('Edit SMS Contact', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.intercept("POST", this.commonVars.filterAPI).as("contFilterAPI");
    cy.get('.sub-search-btn.btn-primary').click();
    cy.wait("@contFilterAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.wait(200);
    cy.get('div#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#subscriberDataSMSGrid').should('exist');
    cy.get('#subscriberDataSMSGrid table tr td').its('length').then(function(resLen){
      if(resLen > 0){
        cy.get('#subscriberDataSMSGrid table tr td').contains(this.commonVars.contLabelSMS).its('length').then(function(res){
          if(res > 0){
            cy.get('#subscriberDataSMSGrid table tr td').contains(this.commonVars.contLabelSMS).parent().parent().find('td button.smsCnctEditBtn').click();
            cy.get('#contactdata').should('exist');
            cy.get('#mdn').type('{selectall}{backspace}');
            cy.get('#mdn').click();
            cy.wait(10);
            cy.get('#mdn').type(this.commonVars.editmdnNumber,{force:true},{delay:50}).should('have.value',this.commonVars.editmdnFind);
            cy.intercept("POST", this.commonVars.editSubscriberContactAPI).as("editSMSContactAPI");
            cy.get('#contSaveBtn').click();
            cy.wait("@editSMSContactAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
            cy.get('#subscriberDataSMSGrid table tr').contains('td div', this.commonVars.editmdnFind).should('be.visible');
          }
        });
      }
    });
  });
  
  it('Delete SMS Contact', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.intercept("POST", this.commonVars.filterAPI).as("contFilterAPI");
    cy.get('.sub-search-btn.btn-primary').click();
    cy.wait("@contFilterAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.wait(1000);
    cy.get('div#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
   //cy.get('#subscriberDataSMSGrid table tr').contains('td span', '(321) 212-1212').should('be.visible').then//((campaign) => {     
    //});
    cy.get('#subscriberDataSMSGrid table tr td').should('exist');
    //cy.get('#subscriberDataSMSGrid table div.k-grid-norecords').should('exist');
    cy.get('#subscriberDataSMSGrid table tr td').then((table) => {
        cy.get('#subscriberDataSMSGrid table tr td span').contains(this.commonVars.contLabelSMS).its('length').then(res=>{
          if(res > 0){
            cy.get('#subscriberDataSMSGrid table tr td span').contains(this.commonVars.contLabelSMS).parent().parent().find('td button.smsCnctDeleteBtn').click();
            cy.intercept("POST", this.commonVars.deleteSubscriberContactAPI).as("deleteSMSContactAPI");
            cy.get('.subConfirmWindow').should('exist');
            cy.get('.subConfirmWindow #yesButton').click();
            cy.wait("@deleteSMSContactAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
          }
        });
    });
  });
  it('Add Email Contact', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#tabstrip ul li').eq(1).click();
    cy.get('#subscriberDataEmailGrid .k-grid-toolbar button').first().click();
    cy.get('#contactdata').should('exist');
    cy.get('#contactLabel').should('exist');
    cy.get('#contactLabel').click();
    cy.wait(10);
    cy.get('#contactLabel').type(this.commonVars.contLabelEmail,{force:true},{delay:50}).should('have.value',this.commonVars.contLabelEmail);
    cy.get('#emailId').type(this.commonVars.email).should('have.value',this.commonVars.email);
    cy.intercept("POST", this.commonVars.addSubscriberContactAPI).as("contAddEmailAPI");
    cy.get('#contSaveBtn').click();
    //cy.get('#contactdata').should('exist');
    //cy.get('#programAlert').should('not.contain', 'We are sorry. Something went wrong. Please try again later.');    
    cy.wait("@contAddEmailAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.get('#subscriberDataEmailGrid table tr').contains('td span', this.commonVars.contLabelEmail).should('be.visible');
  });
  it('Edit Email Contact', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#tabstrip ul li').eq(1).click();
    cy.get('#subscriberDataEmailGrid table tr td').its('length').then(function(resLen){
      if(resLen > 0){
        cy.get('#subscriberDataEmailGrid table tr').contains('td span',this.commonVars.email).its('length').then(function(res){
          if(res > 0){
            cy.get('#subscriberDataEmailGrid table tr').contains('td span',this.commonVars.email).parent().parent().find('td button.emailCnctEditBtn').click();
            cy.get('#emailId').type('{selectall}{backspace}');
            cy.get('#emailId').click();
            cy.wait(10);
            cy.get('#emailId').type(this.commonVars.editemail,{force:true},{delay:50}).should('have.value',this.commonVars.editemail);
            cy.intercept("POST", this.commonVars.editSubscriberContactAPI).as("editEmailContactAPI");
            cy.get('#contSaveBtn').click();
            cy.wait("@editEmailContactAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
            cy.get('#subscriberDataEmailGrid table tr').contains('td span', this.commonVars.editemail).should('be.visible');
          }
        });
      }
    });
  });
  it('Delete Email Contact', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.intercept("POST", this.commonVars.filterAPI).as("contFilterAPI");
    cy.get('.sub-search-btn.btn-primary').click();
    cy.wait("@contFilterAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.wait(200);
    cy.get('#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#tabstrip ul li').eq(1).click();
    cy.get('#subscriberDataEmailGrid table tr td').should('exist');
    cy.get('#subscriberDataEmailGrid table tr td').its('length').then(function(resLen){
      if(resLen > 0){
        cy.get('#subscriberDataEmailGrid table tr').contains('td span',this.commonVars.contLabelEmail).its('length').then(function(res){
          if(res > 0){
            cy.get('#subscriberDataEmailGrid table tr').contains('td span',this.commonVars.contLabelEmail).parent().parent().find('td button.emailCnctDeleteBtn').click();
            cy.intercept("POST", this.commonVars.deleteSubscriberContactAPI).as("contDeleteEmailAPI");
            cy.get('.subConfirmWindow').should('exist');
            cy.get('.subConfirmWindow #yesButton').click();
            cy.wait("@contDeleteEmailAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
          }
        });
      }
    });
  });
  it('Add Voice Contact', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#tabstrip ul li').eq(2).click();
    cy.get('#subscriberDataVoiceGrid .k-grid-toolbar button').first().click();
    cy.get('#contactdata').should('exist');
    cy.get('#contactLabel').should('exist');
    cy.get('#contactLabel').click();
    cy.wait(10);
    cy.get('#contactLabel').type(this.commonVars.contLabelVoice,{force:true},{delay:50}).should('have.value',this.commonVars.contLabelVoice);
    cy.get('#phoneNumber').type(this.commonVars.voiceNumber).should('have.value',this.commonVars.voiceFind);
    cy.get('#phoneNumberExt').type(this.commonVars.voiceExt).should('have.value',this.commonVars.voiceExt);
    cy.intercept("POST", this.commonVars.addSubscriberContactAPI).as("AddVoiceContactAPI");
    cy.get('#contSaveBtn').click();
    //cy.get('#contactdata').should('exist');
    //cy.get('#programAlert').should('not.contain', 'We are sorry. Something went wrong. Please try again later.');    
    cy.wait("@AddVoiceContactAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.get('#subscriberDataVoiceGrid table tr').contains('td span', this.commonVars.contLabelVoice).should('be.visible');
  });
  it('Edit Voice Contact', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#tabstrip ul li').eq(2).click();
    cy.get('#subscriberDataVoiceGrid table tr td').its('length').then(function(resLen){
      if(resLen > 0){
        cy.get('#subscriberDataVoiceGrid table tr').contains('td span',this.commonVars.contLabelVoice).its('length').then(function(res){
          if(res > 0){
            cy.get('#subscriberDataVoiceGrid table tr').contains('td span',this.commonVars.contLabelVoice).parent().parent().find('td button.voiceCnctEditBtn').click();
            cy.get('#phoneNumber').type('{selectall}{backspace}');
            cy.get('#phoneNumber').click();
            cy.wait(10);
            cy.get('#phoneNumber').type(this.commonVars.editVoiceNumber,{force:true},{delay:50}).should('have.value',this.commonVars.editVoiceFind);
            cy.intercept("POST", this.commonVars.editSubscriberContactAPI).as("editVoiceContactAPI");
            cy.get('#contSaveBtn').click();
            cy.wait("@editVoiceContactAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
            cy.get('#subscriberDataVoiceGrid table tr').contains('td div', this.commonVars.editVoiceFind).should('be.visible');
          }
        });
      }
    });
  });
  it('Delete Voice Contact', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.intercept("POST", this.commonVars.filterAPI).as("contFilterAPI");
    cy.get('.sub-search-btn.btn-primary').click();
    cy.wait("@contFilterAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.wait(200);
    cy.get('#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#tabstrip ul li').eq(2).click();
    cy.get('#subscriberDataVoiceGrid table tr td').should('exist');
    cy.get('#subscriberDataVoiceGrid table tr td').its('length').then(function(resLen){
      if(resLen > 0){
        cy.get('#subscriberDataVoiceGrid table tr').contains('td span',this.commonVars.contLabelVoice).its('length').then(function(res){
          if(res > 0){
            cy.get('#subscriberDataVoiceGrid table tr').contains('td span',this.commonVars.contLabelVoice).parent().parent().find('td button.voiceCnctDeleteBtn').click();
            cy.intercept("POST", this.commonVars.deleteSubscriberContactAPI).as("DeleteVoiceContactAPI");
            cy.get('.subConfirmWindow').should('exist');
            cy.get('.subConfirmWindow #yesButton').click();
            cy.wait("@DeleteVoiceContactAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
          }
        });
      }
    });
  });
  it('Add PUSH Contact', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#tabstrip ul li').eq(4).click();
    cy.get('#subscriberDataPushGrid .k-grid-toolbar button').first().click();
    cy.get('#contactdata').should('exist');
    cy.get('#contactLabel').should('exist');
    cy.get('#contactLabel').click();
    cy.wait(10);
    cy.get('#contactLabel').type(this.commonVars.contLabelPush,{force:true},{delay:50}).should('have.value',this.commonVars.contLabelPush);
    cy.get('#deviceId').type(this.commonVars.deviceId).should('have.value',this.commonVars.deviceId);
    cy.intercept("POST", this.commonVars.addSubscriberContactAPI).as("AddPushContactAPI");
    cy.get('#contSaveBtn').click(); 
    cy.wait("@AddPushContactAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.get('#subscriberDataPushGrid table tr').contains('td span', this.commonVars.contLabelPush).should('be.visible');
  });
  it('Edit PUSH Contact', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#tabstrip ul li').eq(4).click();
    cy.get('#subscriberDataPushGrid table tr td').its('length').then(function(resLen){
      if(resLen > 0){
        cy.get('#subscriberDataPushGrid table tr').contains('td span',this.commonVars.contLabelPush).its('length').then(function(res){
          if(res > 0){
            cy.get('#subscriberDataPushGrid table tr').contains('td span',this.commonVars.contLabelPush).parent().parent().find('td button.pushCnctEditBtn').click();
            cy.get('#deviceId').type('{selectall}{backspace}');
            cy.get('#deviceId').click();
            cy.wait(10);
            cy.get('#deviceId').type(this.commonVars.editdeviceId,{force:true},{delay:50}).should('have.value',this.commonVars.editdeviceId);
            cy.intercept("POST", this.commonVars.editSubscriberContactAPI).as("editPushContactAPI");
            cy.get('#contSaveBtn').click();
            cy.wait("@editPushContactAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
            cy.get('#subscriberDataPushGrid table tr').contains('td span', this.commonVars.editdeviceId).should('be.visible');
          }
        });
      }
    });
  });
  it('Delete PUSH Contact', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.intercept("POST", this.commonVars.filterAPI).as("contFilterAPI");
    cy.get('.sub-search-btn.btn-primary').click();
    cy.wait("@contFilterAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.wait(200);
    cy.get('#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#tabstrip ul li').eq(4).click();
    cy.get('#subscriberDataPushGrid table tr td').should('exist');
    cy.get('#subscriberDataPushGrid table tr td').its('length').then(function(resLen){
      if(resLen > 0){
        cy.get('#subscriberDataPushGrid table tr').contains('td span',this.commonVars.contLabelPush).its('length').then(function(res){
          if(res > 0){
            cy.get('#subscriberDataPushGrid table tr').contains('td span',this.commonVars.contLabelPush).parent().parent().find('td button.pushCnctDeleteBtn').click();
            cy.intercept("POST", this.commonVars.deleteSubscriberContactAPI).as("DeletePushContactAPI");
            cy.get('.subConfirmWindow').should('exist');
            cy.get('.subConfirmWindow #yesButton').click();
            cy.wait("@DeletePushContactAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
          }
        });
      }
    });
  });
  it('Add SMS Preferences', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.intercept("POST", this.commonVars.filterAPI).as("contFilterAPI");
    cy.get('.sub-search-btn.btn-primary').click();
    cy.wait("@contFilterAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.get('div#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#subscriberDataSMSGrid .k-grid-toolbar button').first().click();
    cy.get('#contactdata').should('exist');
    cy.get('#contactLabel').should('exist');
    cy.get('input#contactLabel').click();
    cy.get('input#contactLabel').type(this.commonVars.contLabelSMSPref,{force:true}).should('have.value',this.commonVars.contLabelSMSPref);
    cy.get('#mdn').click();
    cy.wait(10);
    cy.get('#mdn').type(this.commonVars.mdnNumber).should('have.value',this.commonVars.mdnFind);
    cy.intercept("POST", this.commonVars.addSubscriberContactAPI).as("addSMSContactAPI");
    cy.get('#contSaveBtn').click();   
    cy.wait("@addSMSContactAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.wait(10);
    cy.get('#subscriberDataSMSGrid table tr td').contains(this.commonVars.contLabelSMSPref).parent().parent().find('td button.smsCnctPrefBtn').click();
    cy.get('.prefpopupbox').should('exist');
    cy.get('#createPrefBtn').click();
    cy.get('#contactdata').should('exist');
    cy.wait(10);
    cy.get('#progDropDownDiv .k-multiselect').should('exist');
    cy.get('#progDropDownDiv .k-multiselect-wrap .k-input',{force:true}).click();
    cy.get('#progDropDownDiv .k-multiselect').contains('Select Program');
    cy.wait(1000);
    cy.get('#progDropDownDiv .k-multiselect').should('include.text', 'Select Program').click();
    cy.get('div#program-list ul#program_listbox li').eq(1).click();
    cy.wait(1000);
    cy.get('#accKDropdown .k-multiselect').should('exist');
    cy.get('#accKDropdown .k-multiselect').contains('Select account');
    cy.wait(1000);
    cy.get('#accKDropdown .k-multiselect').should('include.text', 'Select account').click();
    cy.get('div#account-list ul#account_listbox li').eq(1).click();
    cy.wait(1000);
    cy.intercept("POST", this.commonVars.addPreferenceAPI).as("addSMSPrefAPI");
    cy.get('#contSaveBtn').click();
    cy.wait("@addSMSPrefAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Delete SMS Preferences', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.intercept("POST", this.commonVars.filterAPI).as("contFilterAPI");
    cy.get('.sub-search-btn.btn-primary').click();
    cy.wait("@contFilterAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.get('div#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();    
    cy.get('#subscriberDataSMSGrid table tr td').contains(this.commonVars.contLabelSMSPref).parent().parent().find('td button.smsCnctPrefBtn').click();
    cy.get('.prefpopupbox').should('exist');
    cy.wait(10);
    cy.get('.prefpopupbox table tr td').find('button.preferenceDelBtn').first().click();
    cy.intercept("POST", this.commonVars.deletePreferenceAPI).as("DeleteSMSPrefAPI");
    cy.get('.subConfirmWindow').should('exist');
    cy.get('.subConfirmWindow #yesButton').click();
    cy.wait("@DeleteSMSPrefAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Delete SMS Contact added for Preferences', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.intercept("POST", this.commonVars.filterAPI).as("contFilterAPI");
    cy.get('.sub-search-btn.btn-primary').click();
    cy.wait("@contFilterAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.wait(1000);
    cy.get('div#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#subscriberDataSMSGrid table tr td').should('exist');
    cy.get('#subscriberDataSMSGrid table tr td').then((table) => {
        cy.get('#subscriberDataSMSGrid table tr td span').contains(this.commonVars.contLabelSMSPref).its('length').then(res=>{
          if(res > 0){
            cy.get('#subscriberDataSMSGrid table tr td span').contains(this.commonVars.contLabelSMSPref).parent().parent().find('td button.smsCnctDeleteBtn').click();
            cy.intercept("POST", this.commonVars.deleteSubscriberContactAPI).as("deleteSMSContactAPI");
            cy.get('.subConfirmWindow').should('exist');
            cy.get('.subConfirmWindow #yesButton').click();
            cy.wait("@deleteSMSContactAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
          }
        });
    });
  });
  it('Add Email Preferences', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#tabstrip ul li').eq(1).click();
    cy.get('#subscriberDataEmailGrid .k-grid-toolbar button').first().click();
    cy.get('#contactdata').should('exist');
    cy.get('#contactLabel').should('exist');
    cy.get('#contactLabel').click();    
    cy.wait(10);
    cy.get('#contactLabel').type(this.commonVars.contLabelEmailPref,{force:true},{delay:50}).should('have.value',this.commonVars.contLabelEmailPref);
    cy.wait(10);
    cy.get('#emailId').type(this.commonVars.email).should('have.value',this.commonVars.email);
    cy.intercept("POST", this.commonVars.addSubscriberContactAPI).as("contAddEmailAPI");
    cy.get('#contSaveBtn').click(); 
    cy.wait("@contAddEmailAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.get('#subscriberDataEmailGrid table tr td').contains(this.commonVars.contLabelEmailPref).parent().parent().find('td button.emailCnctPrefBtn').click();
    cy.get('.prefpopupbox').should('exist');
    cy.get('#createPrefBtn').click();
    cy.get('#contactdata').should('exist');
    cy.wait(10);
    cy.get('#progDropDownDiv .k-multiselect').should('exist');
    cy.get('#progDropDownDiv .k-multiselect-wrap .k-input',{force:true}).click();
    cy.get('#progDropDownDiv .k-multiselect').contains('Select Program');
    cy.wait(1000);
    cy.get('#progDropDownDiv .k-multiselect').should('include.text', 'Select Program').click();
    cy.get('div#program-list ul#program_listbox li').eq(1).click();
    cy.wait(1000);
    cy.get('#accKDropdown .k-multiselect').should('exist');
    cy.get('#accKDropdown .k-multiselect').contains('Select account');
    cy.wait(1000);
    cy.get('#accKDropdown .k-multiselect').should('include.text', 'Select account').click();
    cy.get('div#account-list ul#account_listbox li').eq(1).click();
    cy.wait(1000);
    cy.intercept("POST", this.commonVars.addPreferenceAPI).as("addSMSPrefAPI");
    cy.get('#contSaveBtn').click();
    cy.wait("@addSMSPrefAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Delete Email Preferences', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.intercept("POST", this.commonVars.filterAPI).as("contFilterAPI");
    cy.get('.sub-search-btn.btn-primary').click();
    cy.wait("@contFilterAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.wait(200);
    cy.get('#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#tabstrip ul li').eq(1).click();
    cy.get('#subscriberDataEmailGrid table tr td').contains(this.commonVars.contLabelEmailPref).parent().parent().find('td button.emailCnctPrefBtn').click();
    cy.get('.prefpopupbox').should('exist');
    cy.wait(10);
    cy.get('.prefpopupbox table tr td').find('button.preferenceDelBtn').first().click();
    cy.intercept("POST", this.commonVars.deletePreferenceAPI).as("DeleteEmailPrefAPI");
    cy.get('.subConfirmWindow').should('exist');
    cy.get('.subConfirmWindow #yesButton').click();
    cy.wait("@DeleteEmailPrefAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Delete Email Contact added for Preferences', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.intercept("POST", this.commonVars.filterAPI).as("contFilterAPI");
    cy.get('.sub-search-btn.btn-primary').click();
    cy.wait("@contFilterAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.wait(200);
    cy.get('#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#tabstrip ul li').eq(1).click();
    cy.get('#subscriberDataEmailGrid table tr td').should('exist');
    cy.get('#subscriberDataEmailGrid table tr td').its('length').then(function(resLen){
      if(resLen > 0){
        cy.get('#subscriberDataEmailGrid table tr').contains('td span',this.commonVars.contLabelEmailPref).its('length').then(function(res){
          if(res > 0){
            cy.get('#subscriberDataEmailGrid table tr').contains('td span',this.commonVars.contLabelEmailPref).parent().parent().find('td button.emailCnctDeleteBtn').click();
            cy.intercept("POST", this.commonVars.deleteSubscriberContactAPI).as("contDeleteEmailAPI");
            cy.get('.subConfirmWindow').should('exist');
            cy.get('.subConfirmWindow #yesButton').click();
            cy.wait("@contDeleteEmailAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
          }
        });
      }
    });
  });
  it('Add Voice Preferences', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#tabstrip ul li').eq(2).click();
    cy.get('#subscriberDataVoiceGrid .k-grid-toolbar button').first().click();
    cy.get('#contactdata').should('exist');
    cy.get('#contactLabel').should('exist');
    cy.get('#contactLabel').click();
    cy.wait(10);
    cy.get('#contactLabel').type(this.commonVars.contLabelVoicePref,{force:true},{delay:50}).should('have.value',this.commonVars.contLabelVoicePref);
    cy.wait(10);
    cy.get('#phoneNumber').type(this.commonVars.voiceNumber).should('have.value',this.commonVars.voiceFind);
    cy.get('#phoneNumberExt').type(this.commonVars.voiceExt).should('have.value',this.commonVars.voiceExt);
    cy.intercept("POST", this.commonVars.addSubscriberContactAPI).as("AddVoiceContactAPI");
    cy.get('#contSaveBtn').click();   
    cy.wait("@AddVoiceContactAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.get('#subscriberDataVoiceGrid table tr td').contains(this.commonVars.contLabelVoicePref).parent().parent().find('td button.voiceCnctPrefBtn').click();
    cy.get('.prefpopupbox').should('exist');
    cy.get('#createPrefBtn').click();
    cy.get('#contactdata').should('exist');
    cy.wait(10);
    cy.get('#progDropDownDiv .k-multiselect').should('exist');
    cy.get('#progDropDownDiv .k-multiselect-wrap .k-input',{force:true}).click();
    cy.get('#progDropDownDiv .k-multiselect').contains('Select Program');
    cy.wait(1000);
    cy.get('#progDropDownDiv .k-multiselect').should('include.text', 'Select Program').click();
    cy.get('div#program-list ul#program_listbox li').eq(1).click();
    cy.wait(1000);
    cy.get('#accKDropdown .k-multiselect').should('exist');
    cy.get('#accKDropdown .k-multiselect').contains('Select account');
    cy.wait(1000);
    cy.get('#accKDropdown .k-multiselect').should('include.text', 'Select account').click();
    cy.get('div#account-list ul#account_listbox li').eq(1).click();
    cy.wait(1000);
    cy.intercept("POST", this.commonVars.addPreferenceAPI).as("addVoicePrefAPI");
    cy.get('#contSaveBtn').click();
    cy.wait("@addVoicePrefAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Delete Voice Preferences', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#tabstrip ul li').eq(2).click();
    cy.get('#subscriberDataVoiceGrid table tr td').contains(this.commonVars.contLabelVoicePref).parent().parent().find('td button.voiceCnctPrefBtn').click();
    cy.get('.prefpopupbox').should('exist');
    cy.wait(10);
    cy.get('.prefpopupbox table tr td').find('button.preferenceDelBtn').first().click();
    cy.intercept("POST", this.commonVars.deletePreferenceAPI).as("DeleteEmailPrefAPI");
    cy.get('.subConfirmWindow').should('exist');
    cy.get('.subConfirmWindow #yesButton').click();
    cy.wait("@DeleteEmailPrefAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Delete Voice Contact added for Preferences', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.intercept("POST", this.commonVars.filterAPI).as("contFilterAPI");
    cy.get('.sub-search-btn.btn-primary').click();
    cy.wait("@contFilterAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.wait(200);
    cy.get('#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#tabstrip ul li').eq(2).click();
    cy.get('#subscriberDataVoiceGrid table tr td').should('exist');
    cy.get('#subscriberDataVoiceGrid table tr td').its('length').then(function(resLen){
      if(resLen > 0){
        cy.get('#subscriberDataVoiceGrid table tr').contains('td span',this.commonVars.contLabelVoicePref).its('length').then(function(res){
          if(res > 0){
            cy.get('#subscriberDataVoiceGrid table tr').contains('td span',this.commonVars.contLabelVoicePref).parent().parent().find('td button.voiceCnctDeleteBtn').click();
            cy.intercept("POST", this.commonVars.deleteSubscriberContactAPI).as("DeleteVoiceContactPrefAPI");
            cy.get('.subConfirmWindow').should('exist');
            cy.get('.subConfirmWindow #yesButton').click();
            cy.wait("@DeleteVoiceContactPrefAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
          }
        });
      }
    });
  });
  it('Add PUSH Preferences', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#tabstrip ul li').eq(4).click();
    cy.get('#subscriberDataPushGrid .k-grid-toolbar button').first().click();
    cy.get('#contactdata').should('exist');
    cy.get('#contactLabel').should('exist');
    cy.get('#contactLabel').click();
    cy.wait(10);
    cy.get('#contactLabel').type(this.commonVars.contLabelPushPref,{force:true},{delay:50}).should('have.value',this.commonVars.contLabelPushPref);
    cy.wait(10);
    cy.get('#deviceId').type(this.commonVars.deviceId).should('have.value',this.commonVars.deviceId);
    cy.intercept("POST", this.commonVars.addSubscriberContactAPI).as("AddPushContactPrefAPI");
    cy.get('#contSaveBtn').click(); 
    cy.wait("@AddPushContactPrefAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.get('#subscriberDataPushGrid table tr td').contains(this.commonVars.contLabelPushPref).parent().parent().find('td button.pushCnctPrefBtn').click();
    cy.get('.prefpopupbox').should('exist');
    cy.get('#createPrefBtn').click();
    cy.get('#contactdata').should('exist');
    cy.wait(10);
    cy.get('#progDropDownDiv .k-multiselect').should('exist');
    cy.get('#progDropDownDiv .k-multiselect-wrap .k-input',{force:true}).click();
    cy.get('#progDropDownDiv .k-multiselect').contains('Select Program');
    cy.wait(1000);
    cy.get('#progDropDownDiv .k-multiselect').should('include.text', 'Select Program').click();
    cy.get('div#program-list ul#program_listbox li').eq(1).click();
    cy.wait(1000);
    cy.get('#accKDropdown .k-multiselect').should('exist');
    cy.get('#accKDropdown .k-multiselect').contains('Select account');
    cy.wait(1000);
    cy.get('#accKDropdown .k-multiselect').should('include.text', 'Select account').click();
    cy.get('div#account-list ul#account_listbox li').eq(1).click();
    cy.wait(1000);
    cy.intercept("POST", this.commonVars.addPreferenceAPI).as("addPushPrefAPI");
    cy.get('#contSaveBtn').click();
    cy.wait("@addPushPrefAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Delete PUSH Preferences', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.get('.sub-search-btn.btn-primary').click();
    cy.get('#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#tabstrip ul li').eq(4).click();
    cy.get('#subscriberDataPushGrid table tr td').contains(this.commonVars.contLabelPushPref).parent().parent().find('td button.pushCnctPrefBtn').click();
    cy.get('.prefpopupbox').should('exist');
    cy.wait(10);
    cy.get('.prefpopupbox table tr td').find('button.preferenceDelBtn').first().click();
    cy.intercept("POST", this.commonVars.deletePreferenceAPI).as("DeleteEmailPrefAPI");
    cy.get('.subConfirmWindow').should('exist');
    cy.get('.subConfirmWindow #yesButton').click();
    cy.wait("@DeleteEmailPrefAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Delete Push Contact added for Preferences', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#customerNumber').type(this.opcoObj.customerNumber);
    cy.intercept("POST", this.commonVars.filterAPI).as("contFilterAPI");
    cy.get('.sub-search-btn.btn-primary').click();
    cy.wait("@contFilterAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.wait(200);
    cy.get('#subscribersRstGrid').should('exist');
    cy.get('div#subscribersRstGrid tbody tr td button').first().click();
    cy.get('ul li.tab-set-contr').should('exist');
    cy.get('ul li.sub-cont-tab').click();
    cy.get('#tabstrip ul li').eq(4).click();
    cy.get('#subscriberDataPushGrid table tr td').should('exist');
    cy.get('#subscriberDataPushGrid table tr td').its('length').then(function(resLen){
      if(resLen > 0){
        cy.get('#subscriberDataPushGrid table tr').contains('td span',this.commonVars.contLabelPushPref).its('length').then(function(res){
          if(res > 0){
            cy.get('#subscriberDataPushGrid table tr').contains('td span',this.commonVars.contLabelPushPref).parent().parent().find('td button.pushCnctDeleteBtn').click();
            cy.intercept("POST", this.commonVars.deleteSubscriberContactAPI).as("DeletePushContactPrefAPI");
            cy.get('.subConfirmWindow').should('exist');
            cy.get('.subConfirmWindow #yesButton').click();
            cy.wait("@DeletePushContactPrefAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
          }
        });
      }
    });
  });
  it('Subscriber Contact Search Channel Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#contSrchTabs ul li').eq(1).click();
    cy.get('#subContSrchForm .sub-cont-hist-ser').click();
    cy.get('#programAlert div').should('include.text', 'Please select Channel');
    //cy.get('#programAlert div').contains('Please select Channel');
  });
  it('Subscriber Contact Channel SMS Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#contSrchTabs ul li').eq(1).click();
    cy.get('#contTypeChannelDiv .k-dropdown-wrap .k-input').click();
    cy.get('#notificationContactTypeChannel-list ul li').eq(0).click();
    cy.wait(10);
    cy.get('#subContSrchForm .sub-cont-hist-ser').click();
    cy.get('#programAlert div').should('include.text', 'Please enter MDN');
    cy.get('#contactSearch').type(this.commonVars.validmdn,{force:true}).should('have.value',this.commonVars.validmdn);
    cy.get('#subContSrchForm .sub-cont-hist-ser').click();
    cy.get('#programAlert div').should('include.text', 'Please select from date');
  });
  it('Subscriber Contact Channel Email Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#contSrchTabs ul li').eq(1).click();
    cy.get('#contTypeChannelDiv .k-dropdown-wrap .k-input').click();
    cy.get('#notificationContactTypeChannel-list ul li').eq(1).click();
    cy.wait(10);
    cy.get('#subContSrchForm .sub-cont-hist-ser').click();
    cy.get('#programAlert div').should('include.text', 'Please enter Email');
    cy.get('#contactSearch').type(this.commonVars.email,{force:true}).should('have.value',this.commonVars.email);
    cy.get('#subContSrchForm .sub-cont-hist-ser').click();
    cy.get('#programAlert div').should('include.text', 'Please select from date');
  });
  it('Subscriber Contact Channel Voice Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#contSrchTabs ul li').eq(1).click();
    cy.get('#contTypeChannelDiv .k-dropdown-wrap .k-input').click();
    cy.get('#notificationContactTypeChannel-list ul li').eq(2).click();
    cy.wait(10);
    cy.get('#subContSrchForm .sub-cont-hist-ser').click();
    cy.get('#programAlert div').should('include.text', 'Please enter Phone');
    cy.get('#contactSearch').type(this.commonVars.validmdn,{force:true}).should('have.value',this.commonVars.validmdn);
    cy.get('#subContSrchForm .sub-cont-hist-ser').click();
    cy.get('#programAlert div').should('include.text', 'Please select from date');
  });
  it('Subscriber Contact Channel Push Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#contSrchTabs ul li').eq(1).click();
    cy.get('#contTypeChannelDiv .k-dropdown-wrap .k-input').click();
    cy.get('#notificationContactTypeChannel-list ul li').eq(3).click();
    cy.wait(10);
    cy.get('#subContSrchForm .sub-cont-hist-ser').click();
    cy.get('#programAlert div').should('include.text', 'Please enter Device ID');
    cy.get('#contactSearch').type(this.commonVars.deviceId,{force:true}).should('have.value',this.commonVars.deviceId);
    cy.get('#subContSrchForm .sub-cont-hist-ser').click();
    cy.get('#programAlert div').should('include.text', 'Please select from date');
  });
  it('Subscriber Contact Channel Twitter Mandatory Validation', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    cy.visit('/subscribers');
    cy.url().should('include','subscribers');
    cy.get('#contSrchTabs ul li').eq(1).click();
    cy.get('#contTypeChannelDiv .k-dropdown-wrap .k-input').click();
    cy.get('#notificationContactTypeChannel-list ul li').eq(4).click();
    cy.wait(10);
    cy.get('#subContSrchForm .sub-cont-hist-ser').click();
    cy.get('#programAlert div').should('include.text', 'Please enter Twitter Handle');
    cy.get('#contactSearch').type(this.commonVars.twitterId,{force:true}).should('have.value',this.commonVars.twitterId);
    cy.get('#subContSrchForm .sub-cont-hist-ser').click();
    cy.get('#programAlert div').should('include.text', 'Please select from date');
  });
  it('Add SMS Draft', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftSelectLanag(this.commonVars);
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('SMS').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('SMS-Draft').click();
    cy.get('.draft-mul-div').should('exist');
    cy.get('.draft-mul-div .add-btn').click();
    cy.get('#draftName').should('exist');
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
    pageElementsObj.testDraftSelectLanag(this.commonVars);
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
  it('Add Email Draft', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftSelectLanag(this.commonVars);
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Email').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Email-Draft').click();
    cy.get('.draft-mul-div').should('exist');
    cy.get('.draft-mul-div .add-btn').click();
    cy.get('#draftName').should('exist');
    cy.wait(10);
    cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('.textEditor').find('iframe.k-content').should('exist');
    getIframeEmailSub().type(this.commonVars.draftTempSubject,{force:true},{delay:10});
    getIframeEmailBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.intercept("POST", this.commonVars.addUpdateTemplateAPI).as("saveTemplateAPI");
    cy.get('#saveDraftBtn').click();
    cy.wait("@saveTemplateAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Email Draft sendToApprover/Approve', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftSelectLanag(this.commonVars);
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
  it('Add Voice Draft', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftSelectLanag(this.commonVars);
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Voice').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Voice-Draft').click();
    cy.get('.draft-mul-div').should('exist');
    cy.get('.draft-mul-div .add-btn').click();
    cy.get('#draftName').should('exist');
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
    pageElementsObj.testDraftSelectLanag(this.commonVars);
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
  it('Add Voice Draft', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftSelectLanag(this.commonVars);
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Voice').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Voice-Draft').click();
    cy.get('.draft-mul-div').should('exist');
    cy.get('.draft-mul-div .add-btn').click();
    cy.get('#draftName').should('exist');
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
    pageElementsObj.testDraftSelectLanag(this.commonVars);
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
  });*/
  it('Add Push Draft', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftSelectLanag(this.commonVars);
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Push').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Push-Draft').click();
    cy.get('.draft-mul-div').should('exist');
    cy.get('.draft-mul-div .add-btn').click();
    cy.get('#draftName').should('exist');
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
    pageElementsObj.testDraftSelectLanag(this.commonVars);
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
  it('Add Letter Draft', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftSelectLanag(this.commonVars);
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Letter').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Letter-Draft').click();
    cy.get('.draft-mul-div').should('exist');
    cy.get('.draft-mul-div .add-btn').click();
    cy.get('#draftName').should('exist');
    cy.wait(10);
    cy.get('#draftName').type(this.commonVars.draftTempName,{force:true},{delay:10}).should('have.value',this.commonVars.draftTempName);
    cy.get('.textEditor').find('iframe.k-content').should('exist');
    getIframeBody().type(this.commonVars.draftTempBody,{force:true},{delay:10});
    cy.intercept("POST", this.commonVars.addUpdateTemplateAPI).as("saveLetterTemplateAPI");
    cy.get('#saveDraftBtn').click();
    cy.wait("@saveLetterTemplateAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Letter Draft sendToApprove/Approve', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.testDraftSelectLanag(this.commonVars);
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Letter').click();
    cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Letter-Draft').click();
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
              cy.intercept("POST", this.commonVars.submitToApproverLETTER).as("submitToApproverLetterAPI");
              cy.get('#sendToApprovarBtn').click();
              cy.wait("@submitToApproverLetterAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
              cy.get('.draft-mul-div').should('exist');
              cy.wait(10);
              cy.get('#ApproveDraftBtn', { timeout: this.commonVars.timeoutAPI }).should('exist');
              cy.intercept("POST", this.commonVars.approveTemplate).as("approveLetterTemplateAPI");
              cy.get('#ApproveDraftBtn').click();
              cy.wait("@approveLetterTemplateAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200); 
            }
          });
        }
    });
  });
  /* it('Edit Scheduled Report not required', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectReports(this.commonVars);
    cy.url().should('include','reports');
    cy.get('div[data-cy-id="reportsTabStrip"]').should('exist');
    cy.get('div[data-cy-id="reportsTabStrip"] ul li[data-cy-id="scheduledRptTab"]').should('exist');
    cy.get('div[data-cy-id="reportsTabStrip"] ul li[data-cy-id="scheduledRptTab"]').click();
   // cy.get('button[data-cy-id="createSchdRptBtn"]').should('be.visible');
    //cy.get('[data-cy-id*="scheduledReportsGrid"] tbody',{force:true}).find('span',{force:true}).contains('AutomationReportTitle',{force:true});
    let page = 1;
    let textToFind = 'Master notification report 1 dayssssssssss';
    let editBtn = '';
    // Loop through pages
    while (true) {
      // Search for the text on the current page
      //let dataFound = cy.searchTextInschdRptGrid(textToFind);
      //cy.log('dataFound=>',dataFound);
      cy.log('find 1=>',cy.get('[data-cy-id="scheduledReportsGrid"] table tbody tr td').contains(textToFind));
      cy.log('find 2=>',cy.get('[data-cy-id="scheduledReportsGrid"] table tbody tr td').contains(textToFind).parent().parent().find('td button[data-cy-id="editSchRptBtn"]'));
      cy.get('[data-cy-id="scheduledReportsGrid"] table tbody tr td').contains(textToFind).parent().parent().find('td button[data-cy-id="editSchRptBtn"]').click();
      cy.get('[data-cy-id="scheduledReportsGrid"] .k-grid-content table tbody tr').each(function($row) {
        if ($row.text().includes(textToFind)) {
          cy.log(`Found textttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt: ${textToFind}`);
          editBtn = $row.find('[data-cy-id="editSchRptBtn"]');
          cy.log('editBtn 1=>',editBtn);
          //return 'found';
        }
      });
      //editBtn.click();
      // Check for next page button and click it
      const nextPageButton = cy.get('[data-cy-id*="scheduledReportsGrid"] a.k-pager-nav').eq(2);
      cy.log('nextPageButton=>',nextPageButton);
      if (nextPageButton.length === 0) {
        // No more pages to navigate
        break;
      } else {
        nextPageButton.click({ force: true });
      }

      // Optionally, you can also add a timeout to prevent infinite loops in case of issues
      if (page > 10) {
        // For example, break after 10 pages
        break;
      }

      page++;
    }
    //pageElementsObj.searchAndEditRecord('AutomationReportTitle');
    //cy.intercept("POST", this.commonVars.editscheduledreport).as("editscheduledreportAPI");
    //cy.get('[data-cy-id="saveSchedReportBtn"]').click();
    //cy.wait("@editscheduledreportAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });*/
});
