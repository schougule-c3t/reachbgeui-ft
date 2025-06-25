/// <reference types="cypress" />
import commonFunctions from "../../../common-functions/commonFunctions.js"
let pageElementsObj = new commonFunctions();
let authToken = 'test';
describe('1-CCB-UI Remove Subscriber and Account', () => {
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
  it('Login API request', function(){
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
      authToken = response.body.auth_key;
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('auth_key');
    });
    //cy.wait("@login", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Delete Subscriber Acc Link', function(){
    //cy.log('authToken 4=>',authToken);
    let deleteSubAccLinkReqURL = Cypress.env('uatAPIBaseURL') + this.commonVars.deleteSubscriberAccountLink;
    cy.request({
      method: 'POST',
      url: deleteSubAccLinkReqURL,
      body:{
        "subAccLinks": [
          {
            "action": "DELETE",
            "customerIdNumber": this.opcoObj.customerNumber,
            "accountNumber": this.opcoObj.accountNumber,
            "primarySubscriber": true
          }
        ]
      },
      headers: {
        'Content-Type':'application/json',
        auth_key:authToken,
        Accept:'application/json'
      },
      // You can include other request options such as query parameters or request body.
    }).then(function(response){
      // Assertions on the response
      expect(response.status).to.eq(200);
      //expect(response.body.success).to.be.oneOf(["true"]);
      /*Object.entries(response.body).forEach(([key, value]) => {
        cy.log(key, value);
      });*/
      expect(response.body).to.have.property('success');
    });
  });
  it('Remove Account', function(){
    let deleteAccountReqURL = Cypress.env('uatAPIBaseURL')+this.commonVars.deleteaccount;
    cy.request({
      method: 'POST',
      url: deleteAccountReqURL,
      body:{
        "accounts": [
          {
            "action": "DELETE",
            "accountNumber": this.opcoObj.accountNumber
          }
        ]
      },
      headers: {
        'Content-Type':'application/json',
        auth_key:authToken,
        Accept:'application/json'
      },
    }).then(function(response){
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('success');
    });
  });
  it('Remove Subscriber', function(){
    let removeSubReqURL = Cypress.env('uatAPIBaseURL')+this.commonVars.deletesubscriber;
    cy.request({
      method: 'POST',
      url: removeSubReqURL,
      body:{
        "subscribers": [
          {
            "action": "DELETE",
            "customerNumber": this.opcoObj.customerNumber
          }
        ]
      },
      headers: {
        'Content-Type':'application/json',
        auth_key:authToken,
        Accept:'application/json'
      },
    }).then(function(response){
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('success');
    });
  });
});
