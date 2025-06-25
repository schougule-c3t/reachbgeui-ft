/// <reference types="cypress" />
//const { includes } = require("cypress/types/lodash");
import commonFunctions from "../../common-functions/commonFunctions.js"
let pageElementsObj = new commonFunctions();
// Welcome to Cypress!
// https://on.cypress.io/introduction-to-cypress
//var myConfig = Cypress.config()
describe('10-CCB-UI adHoc Notification Templates Preview', () => {
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
  it('clear All Saved Sessions', function(){
    Cypress.session.clearAllSavedSessions();
  });  
  it('adHoc SMS Preview', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    pageElementsObj.adHocFillTemplates(this.commonVars);
    cy.get('[data-cy-id="adhocWizard"] div.actions ul li').find('a').contains('Next').should('be.visible');
    cy.get('[data-cy-id="adhocWizard"] div.actions ul li').find('a').contains('Next').click();
    cy.wait(10);
    pageElementsObj.adHocScreenSetDate(this.commonVars);
    cy.get('[data-cy-id="adhocWizard"] div.actions ul li').find('a').contains('Next').click();
    cy.get('[data-cy-id="adhocPreviewTempGrid"]').should('be.visible');
    cy.get('[data-cy-id="SMSadHocPreviewBtn"]').should('be.visible');
    cy.get('[data-cy-id="SMSadHocPreviewBtn"]').click();
    cy.get('[data-cy-id="SMStempltName"] span').contains(this.commonVars.draftTempName);
    cy.get('[data-cy-id="smsTempBody"]').contains(this.commonVars.draftTempBody);
  });
  it('Email Draft Preview', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    pageElementsObj.adHocFillTemplates(this.commonVars);
    cy.get('[data-cy-id="adhocWizard"] div.actions ul li').find('a').contains('Next').should('be.visible');
    cy.get('[data-cy-id="adhocWizard"] div.actions ul li').find('a').contains('Next').click();
    cy.wait(10);
    pageElementsObj.adHocScreenSetDate(this.commonVars);
    cy.get('[data-cy-id="adhocWizard"] div.actions ul li').find('a').contains('Next').click();
    cy.get('[data-cy-id="adhocPreviewTempGrid"]').should('be.visible');
    cy.get('[data-cy-id="EMAILadHocPreviewBtn"]').should('be.visible');
    cy.get('[data-cy-id="EMAILadHocPreviewBtn"]').click();
    cy.get('[data-cy-id="EMAILtempltName"] span').contains(this.commonVars.draftTempName);
    cy.get('[data-cy-id="emailTempBody"]').contains(this.commonVars.draftTempBody);
  });
 it('Voice Draft Preview', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    pageElementsObj.adHocFillTemplates(this.commonVars);
    cy.get('[data-cy-id="adhocWizard"] div.actions ul li').find('a').contains('Next').should('be.visible');
    cy.get('[data-cy-id="adhocWizard"] div.actions ul li').find('a').contains('Next').click();
    cy.wait(10);
    pageElementsObj.adHocScreenSetDate(this.commonVars);
    cy.get('[data-cy-id="adhocWizard"] div.actions ul li').find('a').contains('Next').click();
    cy.get('[data-cy-id="adhocPreviewTempGrid"]').should('be.visible');
    cy.get('[data-cy-id="VOICEadHocPreviewBtn"]').should('be.visible');
    cy.get('[data-cy-id="VOICEadHocPreviewBtn"]').click();
    cy.get('[data-cy-id="VOICEtempltName"] span').contains(this.commonVars.draftTempName);
    cy.get('[data-cy-id="voiceTempBody"]').contains(this.commonVars.draftTempBody);
 });
  it('Push Draft Preview', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectAdHoc(this.commonVars);
    pageElementsObj.navigateAdHocScreenToTempTab(this.commonVars);
    pageElementsObj.adHocFillTemplates(this.commonVars);
    cy.get('[data-cy-id="adhocWizard"] div.actions ul li').find('a').contains('Next').should('be.visible');
    cy.get('[data-cy-id="adhocWizard"] div.actions ul li').find('a').contains('Next').click();
    cy.wait(10);
    pageElementsObj.adHocScreenSetDate(this.commonVars);
    cy.get('[data-cy-id="adhocWizard"] div.actions ul li').find('a').contains('Next').click();
    cy.get('[data-cy-id="adhocPreviewTempGrid"]').should('be.visible');
    cy.get('[data-cy-id="PUSHadHocPreviewBtn"]').should('be.visible');
    cy.get('[data-cy-id="PUSHadHocPreviewBtn"]').click();
    cy.get('[data-cy-id="PUSHtempltName"] span').contains(this.commonVars.draftTempName);
    cy.get('[data-cy-id="pushTempBody"]').contains(this.commonVars.draftTempBody);
  });
});
