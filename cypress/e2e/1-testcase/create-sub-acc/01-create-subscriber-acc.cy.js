/// <reference types="cypress" />
import commonFunctions from "../../../common-functions/commonFunctions.js"
let pageElementsObj = new commonFunctions();
let authToken = 'test';
describe('1-CCB-UI Create Subscriber Account and Link it', () => {
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
  it('Add Subscriber API', function(){
    //cy.log('authToken 4=>',authToken);
    let addsubscriberReqURL = Cypress.env('uatAPIBaseURL') + this.commonVars.addsubscriber;
    cy.request({
      method: 'POST',
      url: addsubscriberReqURL,
      body:{
        "subscribers": [{
          "action": "ADD",
          "firstName": "UI Automation",
          "lastName": "Test",
          "customerNumber": this.opcoObj.customerNumber,
          "mainPhone": "7852749412",
          "mainPhoneConsentDate": "",
          "mobilePhone": "",
          "mobilePhoneConsentDate": "",
          "alternateMobilePhone": "",
          "alternateMobilePhoneConsentDate": "",
          "emailAddress": this.opcoObj.subSearchEmailId,
          "streetAddress": "43 main street",
          "city": "New Jersy",
          "state": "NJ",
          "zipCode": "53331",
          "language": "English"
        }]
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
  it('Add Account API', function(){
    let addAccountReqURL = Cypress.env('uatAPIBaseURL')+this.commonVars.addaccount;
    cy.request({
      method: 'POST',
      url: addAccountReqURL,
      body:{
        "accounts": [
          {
            "action": "ADD",
            "name": "Act Name",
            "accountNumber": this.opcoObj.accountNumber,
            "type": "Commercial",
            "actAdditionalType": "xyz",
            "primaryPhone": 1234567890,
            "alternatePhone": 1234567890,
            "streetAddress": "123 main street",
            "city": "NEW YORK",
            "state": "IL",
            "zipCode": 51101,
            "region": "IL",
            "revenueClass": "as",
            "flami": "N",
            "reportlevel": "level",
            "enrollmentEbill": 0,
            "specialNeeds": "N",
            "subOpco": Cypress.env('opco'),
            "managedAccount": false,
            "premises": {
              "premises": [
                {
                  "action": "ADD",
                  "premiseNumber": this.opcoObj.premiseNumber,
                  "streetAddress": "123 main street",
                  "opCenter": "New Center",
                  "region": "IL",
                  "city": "NEW YORK",
                  "state": "IL",
                  "county": "WAYNE",
                  "zipCode": 51101,
                  "enrollmentPeakRewards": 1,
                  "enrollmentSer": 1,
                  "servicePoints": {
                    "servicePoints": [
                      {
                        "action": "ADD",
                        "servicePointNumber": this.opcoObj.servicePointNumber,
                        "amiFlag": "N",
                        "Feeder": "A543Y",
                        "streetAddress": "123 main street",
                        "city": "NEW YORK",
                        "state": "IL",
                        "zipCode": 51101,
                        "servicePointType": "E",
                        "active": 1,
                        "amiLabel": "N",
                        "transformers": {
                          "transformerNo": [
                            {
                              "value": "T60118",
                              "transformerAction": "ADD",
                              "alias": "CIMS,QUAD,OMSGIS"
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
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
  it('Link Account and Subscriber', function(){
    let accSubLinkReqURL = Cypress.env('uatAPIBaseURL')+this.commonVars.addsubscriberaccountlink;
    cy.request({
      method: 'POST',
      url: accSubLinkReqURL,
      body:{
        "subAccLinks": [
          {
            "action": "ADD",
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
    }).then(function(response){
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('success');
    });
  });
});
