/// <reference types="cypress" />
import commonFunctions from "../../common-functions/commonFunctions.js"
let pageElementsObj = new commonFunctions();
let myConfig = Cypress.config();
let authToken = 'test';
describe('Local Internal Testing', () => {
  beforeEach( function()  {
    //cy.visit('subscribers');
    if(Cypress.env('opco') == 'peco'){
      cy.fixture('pecoData').as('opcoObj');
    }else if(Cypress.env('opco') == 'comed'){
      cy.fixture('comedData').as('opcoObj');
    }else{
      cy.fixture('pecoData').as('opcoObj');
    }
    cy.fixture('usersData').as('userCred');
    cy.fixture('common').as('commonVars');
    /*Object.entries(response).forEach(([key, value]) => {
        cy.log(key, value);
      });*/
  });
  it('Login API request', function(){
    authToken = 'max';
    cy.request({
      method: 'POST',
      url: Cypress.env('uatAPIBaseURL') + this.commonVars.loginuser,
      body : {"user":{"email":this.userCred.email+'@'+Cypress.env('opco')+'.com',"password":this.userCred.password}},
      headers: {
        'Content-Type':'application/json',
        Accept:'application/json'
      },
      // You can include other request options such as query parameters or request body.
    }).then(function(response){
      // Assertions on the response
      //cy.log('env=>',Cypress.env());
      //cy.log('process=>',process.env.NODE_ENV);
      //cy.log('apiBaseUrl=>',Cypress.env('apiBaseUrl'));
      //cy.log('uatAPIBaseURL=>',Cypress.env('uatAPIBaseURL'));
      authToken = response.body.auth_key;
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('auth_key');
    });
    //cy.wait("@login", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
});