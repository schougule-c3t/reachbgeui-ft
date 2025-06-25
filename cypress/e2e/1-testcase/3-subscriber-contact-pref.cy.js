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

describe('3-CCB-UI Contact Preferences', () => {
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
/*it('Check subscriber Details page by clicking view button', function(){
 cy.LoginApp(this.userCred.email,this.userCred.password);
 cy.visit('/subscribers');
 cy.url().should('include','subscribers');
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber).should('have.value',this.opcoObj.customerNumber);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
 cy.intercept("POST", this.commonVars.filterAPI).as("contFilterAPI");
 cy.get('.sub-search-btn.btn-primary').click();
 cy.wait("@contFilterAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
 cy.get('div#subscribersRstGrid').should('exist');
 cy.get('div#subscribersRstGrid tbody tr td button').first().click();
 cy.get('ul li.tab-set-contr').should('exist');
 cy.get('ul li.sub-cont-tab').click();
 cy.get('#subscriberDataSMSGrid .k-grid-toolbar button').first().click();
 cy.get('#contactdata').should('exist');
 cy.get('[data-cy-id="contactLabel"]').should('exist');
 cy.get('input[data-cy-id="contactLabel"]').click();
 cy.get('input[data-cy-id="contactLabel"]').type(this.commonVars.contLabelSMS,{force:true}).should('have.value',this.commonVars.contLabelSMS);
 cy.get('[data-cy-id="mdn"]').click();
 cy.wait(10);
 cy.get('[data-cy-id="mdn"]').type(this.commonVars.mdnNumber).should('have.value',this.commonVars.mdnFind);
 cy.intercept("POST", this.commonVars.addSubscriberContactAPI).as("addSMSContactAPI");
 cy.get('#contSaveBtn').click();   
 cy.wait("@addSMSContactAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
 cy.get('#subscriberDataSMSGrid table tr').contains('td span', this.commonVars.contLabelSMS).should('be.visible');
});
it('Edit SMS Contact', function(){
 cy.LoginApp(this.userCred.email,this.userCred.password);
 cy.visit('/subscribers');
 cy.url().should('include','subscribers');
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
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
         cy.get('[data-cy-id="mdn"]').type('{selectall}{backspace}');
         cy.get('[data-cy-id="mdn"]').click();
         cy.wait(15);
         cy.get('[data-cy-id="mdn"]').type(this.commonVars.editmdnNumber,{force:true},{delay:50}).should('have.value',this.commonVars.editmdnFind);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
 cy.get('.sub-search-btn.btn-primary').click();
 cy.get('#subscribersRstGrid').should('exist');
 cy.get('div#subscribersRstGrid tbody tr td button').first().click();
 cy.get('ul li.tab-set-contr').should('exist');
 cy.get('ul li.sub-cont-tab').click();
 cy.get('#tabstrip ul li').eq(1).click();
 cy.get('#subscriberDataEmailGrid .k-grid-toolbar button').first().click();
 cy.get('#contactdata').should('exist');
 cy.get('[data-cy-id="contactLabel"]').should('exist');
 cy.get('[data-cy-id="contactLabel"]').click();
 cy.wait(10);
 cy.get('[data-cy-id="contactLabel"]').type(this.commonVars.contLabelEmail,{force:true},{delay:50}).should('have.value',this.commonVars.contLabelEmail);
 cy.get('#emailId').type(this.commonVars.email).should('have.value',this.commonVars.email);
 cy.intercept("POST", this.commonVars.addSubscriberContactAPI).as("contAddEmailAPI");
 cy.get('#contSaveBtn').click();   
 cy.wait("@contAddEmailAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
 cy.get('#subscriberDataEmailGrid table tr').contains('td span', this.commonVars.contLabelEmail).should('be.visible');
});
it('Edit Email Contact', function(){
 cy.LoginApp(this.userCred.email,this.userCred.password);
 cy.visit('/subscribers');
 cy.url().should('include','subscribers');
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
 cy.get('.sub-search-btn.btn-primary').click();
 cy.get('#subscribersRstGrid').should('exist');
 cy.get('div#subscribersRstGrid tbody tr td button').first().click();
 cy.get('ul li.tab-set-contr').should('exist');
 cy.get('ul li.sub-cont-tab').click();
 cy.get('#tabstrip ul li').eq(2).click();
 cy.get('#subscriberDataVoiceGrid .k-grid-toolbar button').first().click();
 cy.get('#contactdata').should('exist');
 cy.get('[data-cy-id="contactLabel"]').should('exist');
 cy.get('[data-cy-id="contactLabel"]').click();
 cy.wait(10);
 cy.get('[data-cy-id="contactLabel"]').type(this.commonVars.contLabelVoice,{force:true},{delay:50}).should('have.value',this.commonVars.contLabelVoice);
 cy.get('#phoneNumber').type(this.commonVars.voiceNumber).should('have.value',this.commonVars.voiceFind);
 cy.get('#phoneNumberExt').type(this.commonVars.voiceExt).should('have.value',this.commonVars.voiceExt);
 cy.intercept("POST", this.commonVars.addSubscriberContactAPI).as("AddVoiceContactAPI");
 cy.get('#contSaveBtn').click();   
 cy.wait("@AddVoiceContactAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
 cy.get('#subscriberDataVoiceGrid table tr').contains('td span', this.commonVars.contLabelVoice).should('be.visible');
});
it('Edit Voice Contact', function(){
 cy.LoginApp(this.userCred.email,this.userCred.password);
 cy.visit('/subscribers');
 cy.url().should('include','subscribers');
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
 cy.get('.sub-search-btn.btn-primary').click();
 cy.get('#subscribersRstGrid').should('exist');
 cy.get('div#subscribersRstGrid tbody tr td button').first().click();
 cy.get('ul li.tab-set-contr').should('exist');
 cy.get('ul li.sub-cont-tab').click();
 cy.get('#tabstrip ul li').eq(4).click();
 cy.get('#subscriberDataPushGrid .k-grid-toolbar button').first().click();
 cy.get('#contactdata').should('exist');
 cy.get('[data-cy-id="contactLabel"]').should('exist');
 cy.get('[data-cy-id="contactLabel"]').click();
 cy.wait(10);
 cy.get('[data-cy-id="contactLabel"]').type(this.commonVars.contLabelPush,{force:true},{delay:50}).should('have.value',this.commonVars.contLabelPush);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
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
         cy.wait(10);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
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
});*/
it('Add SMS Preferences', function(){
 cy.LoginApp(this.userCred.email,this.userCred.password);
 cy.visit('/subscribers');
 cy.url().should('include','subscribers');
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
 cy.intercept("POST", this.commonVars.filterAPI).as("contFilterAPI");
 cy.get('.sub-search-btn.btn-primary').click();
 cy.wait("@contFilterAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
 cy.get('div#subscribersRstGrid').should('exist');
 cy.get('div#subscribersRstGrid tbody tr td button').first().click();
 cy.get('ul li.tab-set-contr').should('exist');
 cy.get('ul li.sub-cont-tab').click();
 cy.get('#subscriberDataSMSGrid .k-grid-toolbar button').first().click();
 cy.get('#contactdata').should('exist');
 cy.get('[data-cy-id="contactLabel"]').should('exist');
 cy.get('input[data-cy-id="contactLabel"]').click();
 cy.get('input[data-cy-id="contactLabel"]').type(this.commonVars.contLabelSMSPref,{force:true}).should('have.value',this.commonVars.contLabelSMSPref);
 cy.get('[data-cy-id="mdn"]').click();
 cy.wait(10);
 cy.get('[data-cy-id="mdn"]').type(this.commonVars.mdnNumber).should('have.value',this.commonVars.mdnFind);
 cy.intercept("POST", this.commonVars.addSubscriberContactAPI).as("addSMSContactAPI");
 cy.get('#contSaveBtn').click();   
 cy.wait("@addSMSContactAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should('be.oneOf', [200, 406]);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
 cy.get('.sub-search-btn.btn-primary').click();
 cy.get('#subscribersRstGrid').should('exist');
 cy.get('div#subscribersRstGrid tbody tr td button').first().click();
 cy.get('ul li.tab-set-contr').should('exist');
 cy.get('ul li.sub-cont-tab').click();
 cy.get('#tabstrip ul li').eq(1).click();
 cy.get('#subscriberDataEmailGrid .k-grid-toolbar button').first().click();
 cy.get('#contactdata').should('exist');
 cy.get('[data-cy-id="contactLabel"]').should('exist');
 cy.get('[data-cy-id="contactLabel"]').click();    
 cy.wait(10);
 cy.get('[data-cy-id="contactLabel"]').type(this.commonVars.contLabelEmailPref,{force:true},{delay:50}).should('have.value',this.commonVars.contLabelEmailPref);
 cy.wait(10);
 cy.get('#emailId').type(this.commonVars.email).should('have.value',this.commonVars.email);
 cy.intercept("POST", this.commonVars.addSubscriberContactAPI).as("contAddEmailAPI");
 cy.get('#contSaveBtn').click(); 
 cy.wait("@contAddEmailAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should('be.oneOf', [200, 406]);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
 cy.get('.sub-search-btn.btn-primary').click();
 cy.get('#subscribersRstGrid').should('exist');
 cy.get('div#subscribersRstGrid tbody tr td button').first().click();
 cy.get('ul li.tab-set-contr').should('exist');
 cy.get('ul li.sub-cont-tab').click();
 cy.get('#tabstrip ul li').eq(2).click();
 cy.get('#subscriberDataVoiceGrid .k-grid-toolbar button').first().click();
 cy.get('#contactdata').should('exist');
 cy.get('[data-cy-id="contactLabel"]').should('exist');
 cy.get('[data-cy-id="contactLabel"]').click();
 cy.wait(10);
 cy.get('[data-cy-id="contactLabel"]').type(this.commonVars.contLabelVoicePref,{force:true},{delay:50}).should('have.value',this.commonVars.contLabelVoicePref);
 cy.wait(10);
 cy.get('#phoneNumber').type(this.commonVars.voiceNumber).should('have.value',this.commonVars.voiceFind);
 cy.get('#phoneNumberExt').type(this.commonVars.voiceExt).should('have.value',this.commonVars.voiceExt);
 cy.intercept("POST", this.commonVars.addSubscriberContactAPI).as("AddVoiceContactAPI");
 cy.get('#contSaveBtn').click();   
 cy.wait("@AddVoiceContactAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should('be.oneOf', [200, 406]);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
 cy.get('.sub-search-btn.btn-primary').click();
 cy.get('#subscribersRstGrid').should('exist');
 cy.get('div#subscribersRstGrid tbody tr td button').first().click();
 cy.get('ul li.tab-set-contr').should('exist');
 cy.get('ul li.sub-cont-tab').click();
 cy.get('#tabstrip ul li').eq(4).click();
 cy.get('#subscriberDataPushGrid .k-grid-toolbar button').first().click();
 cy.get('#contactdata').should('exist');
 cy.get('[data-cy-id="contactLabel"]').should('exist');
 cy.get('[data-cy-id="contactLabel"]').click();
 cy.wait(10);
 cy.get('[data-cy-id="contactLabel"]').type(this.commonVars.contLabelPushPref,{force:true},{delay:50}).should('have.value',this.commonVars.contLabelPushPref);
 cy.wait(10);
 cy.get('#deviceId').type(this.commonVars.deviceId).should('have.value',this.commonVars.deviceId);
 cy.intercept("POST", this.commonVars.addSubscriberContactAPI).as("AddPushContactPrefAPI");
 cy.get('#contSaveBtn').click(); 
 cy.wait("@AddPushContactPrefAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should('be.oneOf', [200, 406]);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
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
 cy.get('[data-cy-id="customerNumber"]').type(this.opcoObj.customerNumber);
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
});