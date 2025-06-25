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
describe('4-CCB-UI Contact History', () => {
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
});
