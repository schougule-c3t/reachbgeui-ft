/// <reference types="cypress" />
import commonFunctions from "../../common-functions/commonFunctions.js"
let pageElementsObj = new commonFunctions();
//var myConfig = Cypress.config()
//expect(myConfig).to.have.property('requestWaitTime', 2000)
//expect(myConfig).to.have.property('baseUrl', 'http://localhost:8080/reachui/app/')
describe('16-CCB-UI Report Export and History Search', () => {
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
  it('Online Report Execute and Download', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectReports(this.commonVars);
    cy.url().should('include','reports');
    cy.get('div[data-cy-id="reportsTabStrip"]').should('exist');
    cy.get('div[data-cy-id="reportsTabStrip"] ul li[data-cy-id="onlineRptTab"]').should('exist');
    cy.intercept("POST", this.commonVars.getreportconfig).as("getreportconfigAPI");
    cy.intercept("POST", this.commonVars.reportWebProgram).as("reportWebProgramAPI");
    cy.intercept("POST", this.commonVars.notificationTypes).as("notificationTypesAPI");
    cy.onlineReportFindTextInKendoGrid('onlineReportTabGrid',this.commonVars.masterNotificationReport);
    cy.wait(500);
    cy.wait("@getreportconfigAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    //cy.wait("@reportWebProgramAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    //cy.wait("@notificationTypesAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.wait(5000);
    cy.get('[data-cy-id="downloadFormatDiv"]').find('.k-dropdown-wrap .k-select').click({force:true});
    cy.get('#downloadFormat_listbox').find('li').contains('PDF').click({force:true});
    cy.get('[data-cy-id="Message_typeAll"]').click({force:true});
    let fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 5);
    let curYear = fromDate.getFullYear();
    let curMonth = String(fromDate.getMonth()+1).padStart(2, '0');
    let curDay = String(fromDate.getDate()).padStart(2, '0');
    let StartDate = curYear+'-'+curMonth+'-'+curDay;
    curYear = new Date().getFullYear();
    curMonth = String(new Date().getMonth()+1).padStart(2, '0');
    curDay = String(new Date().getDate()).padStart(2, '0');
    let endDate = curYear+'-'+curMonth+'-'+curDay;
    cy.get('[data-cy-id="onlineRptTemplate"] [data-cy-id="from_date"]').type(StartDate);
    cy.get('[data-cy-id="onlineRptTemplate"] [data-cy-id="to_send_date_time"]').type(endDate);
    cy.intercept("POST", this.commonVars.getReportSize).as("getReportSizeAPI");
    cy.intercept("POST", this.commonVars.getlivereport).as("getlivereportAPI");
    cy.get('[data-cy-id="exportBtn"]').click();
    cy.wait(500);
    cy.wait("@getReportSizeAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    //cy.wait("@getlivereportAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Report History Search', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectReports(this.commonVars);
    cy.url().should('include','reports');
    cy.get('div[data-cy-id="reportsTabStrip"]').should('exist');
    cy.get('div[data-cy-id="reportsTabStrip"] ul li[data-cy-id="rptHistoryTab"]').should('exist');
    cy.get('div[data-cy-id="reportsTabStrip"] ul li[data-cy-id="rptHistoryTab"]').click();
    cy.get('[data-cy-id="historyReportNameDiv"]').find('.k-dropdown-wrap .k-select').click({force:true});
    cy.get('#historyReportName_listbox').find('li').contains(this.commonVars.reportHistRptName).click({force:true});
    let fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 5);
    let curYear = fromDate.getFullYear();
    let curMonth = String(fromDate.getMonth()+1).padStart(2, '0');
    let curDay = String(fromDate.getDate()).padStart(2, '0');
    let StartDate = curYear+'-'+curMonth+'-'+curDay;
    curYear = new Date().getFullYear();
    curMonth = String(new Date().getMonth()+1).padStart(2, '0');
    curDay = String(new Date().getDate()).padStart(2, '0');
    let endDate = curYear+'-'+curMonth+'-'+curDay;
    cy.get('[data-cy-id="reportHistoryPage"] [data-cy-id="historyStartDatePicker"]').type(StartDate);
    cy.get('[data-cy-id="reportHistoryPage"] [data-cy-id="historyEndDatePicker"]').type(endDate);
    cy.intercept("POST", this.commonVars.getreporthistory).as("getreporthistoryAPI");
    cy.get('[data-cy-id="reportHistorySearchBtn"]').click();
    cy.wait("@getreporthistoryAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
});