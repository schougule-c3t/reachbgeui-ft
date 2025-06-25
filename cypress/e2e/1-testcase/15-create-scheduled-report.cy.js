/// <reference types="cypress" />
import commonFunctions from "../../common-functions/commonFunctions.js"
let pageElementsObj = new commonFunctions();
//var myConfig = Cypress.config()
//expect(myConfig).to.have.property('requestWaitTime', 2000)
//expect(myConfig).to.have.property('baseUrl', 'http://localhost:8080/reachui/app/')
describe('15-CCB-UI Report Create Edit Remove', () => {
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
  it('Create Scheduled Report', function(){
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectReports(this.commonVars);
    cy.url().should('include','reports');
    cy.get('div[data-cy-id="reportsTabStrip"]').should('exist');
    cy.get('div[data-cy-id="reportsTabStrip"] ul li[data-cy-id="scheduledRptTab"]').should('exist');
    cy.get('div[data-cy-id="reportsTabStrip"] ul li[data-cy-id="scheduledRptTab"]').click();
    cy.get('button[data-cy-id="createSchdRptBtn"]').should('be.visible');
    cy.get('[data-cy-id="createSchdRptBtn"]').click({force:true});
    cy.wait(50);
    cy.get('div[data-cy-id="createSchdRptWindow"]').should('be.visible');
    cy.get('[data-cy-id="reportCategoryDiv"]').should('be.visible');
    cy.get('[data-cy-id="reportCategoryDiv"] .k-dropdown-wrap span').contains('Please Select').should('be.visible');
    cy.get('[data-cy-id="reportCategoryDiv"] .k-dropdown-wrap .k-input').click({ force: true });
    cy.wait(1000);
    //cy.get('[data-cy-id="reportCategoryDiv"] .k-dropdown-wrap').contains('Notification').click();
    cy.get('div#reportCategory-list ul#reportCategory_listbox li').eq(1).click({ force: true });
    //cy.get('div#reportCategory-list ul#reportCategory_listbox li').contains('Notification',{force:true}).click();
    cy.wait(1000);
    cy.get('[data-cy-id="reportIdDiv"] .k-dropdown-wrap .k-input').click({ force: true });
    cy.wait(1000);
    cy.get('div#reportId-list ul#reportId_listbox li').contains('Master Notification Report').click({ force: true });
    cy.get('input#emailIds-tokenfield').type(this.commonVars.email+'{enter}',{force:true},{delay:50});
    cy.get('[data-cy-id="reportTitle"]').type(this.commonVars.reportTitle);
    cy.get('[data-cy-id="recPatternMonthlyRadio"]').click();
    cy.get('[data-cy-id="monthlyOpt"]').click({ force: true });
    cy.get('[data-cy-id="monthDay"]').type(1);
    cy.get('[data-cy-id="monthRecureInterval"]').type(5);
    let curYear = new Date().getFullYear();
    let curMonth = String(new Date().getMonth()+1).padStart(2, '0');
    let curDay = String(new Date().getDate()+1).padStart(2, '0');
    let CurHour = String(new Date().getHours()+1);
    let CurMint = String(new Date().getMinutes()+5);
    let StartDate = curYear+'-'+curMonth+'-'+curDay;
    let ampmVal = ((new Date().getHours()+1) < 12) ? "AM" : "PM";
    let TimeVal = CurHour+':'+CurMint+ ' '+ampmVal;
    cy.get('[data-cy-id="startDatePicker"]').type(StartDate);
    cy.get('[data-cy-id="startTimePicker"]').type(TimeVal);
    cy.get('[data-cy-id="Message_typeNotifications"]').click();
    cy.get('li#show_hide_notification_type div.k-multiselect div.k-multiselect-wrap').click({force:true});
    cy.get('div#notification_type-list ul li').eq(1).click({force:true});
    cy.get('li#show_hide_triggerType .k-dropdown-wrap span').contains('Please Select').should('be.visible');
    cy.get('li#show_hide_triggerType .k-dropdown-wrap .k-input').click({ force: true });
    cy.wait(1000);
    cy.get('ul#triggerType_listbox li').contains('API').click({ force: true });
    cy.get('li#show_hide_dateRange .k-dropdown-wrap span').contains('Please Select').should('be.visible');
    cy.get('li#show_hide_dateRange .k-dropdown-wrap .k-input').click({ force: true });
    cy.wait(1000);
    cy.get('ul#dateRange_listbox li').contains('Last 30 days').click({ force: true });
    cy.intercept("POST", this.commonVars.generatescheduledreport).as("generatescheduledreportAPI");
    cy.get('[data-cy-id="saveSchedReportBtn"]').click();
    cy.wait("@generatescheduledreportAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  });
  it('Edit Scheduled Report', function() {
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectReports(this.commonVars);
    cy.url().should('include','reports');
    cy.get('div[data-cy-id="reportsTabStrip"]').should('exist');
    cy.get('div[data-cy-id="reportsTabStrip"] ul li[data-cy-id="scheduledRptTab"]').should('exist');
    cy.get('div[data-cy-id="reportsTabStrip"] ul li[data-cy-id="scheduledRptTab"]').click();
    //cy.reportFindTextInKendoGridAndEdit('Master notification report 1 day'); 
    cy.reportFindTextInKendoGridAndEdit(this.commonVars.reportTitleSearch);
    cy.get('[data-cy-id="createSchdRptWindow"]').should('be.visible');
    cy.get('[data-cy-id="fieldlist"]').should('be.visible');
    cy.get('[data-cy-id="reportTitle"]').should('be.visible');
    cy.get('[data-cy-id="reportTitle"]').click().clear();
    cy.get('[data-cy-id="reportTitle"]').type(this.commonVars.reportEditTitle);
    let initDate = new Date();
    initDate.setMonth(initDate.getMonth() + 1);
    initDate.setDate(initDate.getDate() + 1);
    initDate.setHours(initDate.getHours() + 1);
    initDate.setMinutes(initDate.getMinutes() + 5);
    let curYear = initDate.getFullYear();
    let curMonth = String(initDate.getMonth()).padStart(2, '0');
    let curDay = String(initDate.getDate()).padStart(2, '0');
    let CurHour = String(initDate.getHours());
    let CurMint = String(initDate.getMinutes());
    let StartDate = curYear+'-'+curMonth+'-'+curDay;
    let ampmVal = ((new Date().getHours()+1) < 12) ? "AM" : "PM";
    let TimeVal = CurHour+':'+CurMint+ ' '+ampmVal;
    cy.get('[data-cy-id="startDatePicker"]').clear();
    cy.get('[data-cy-id="startTimePicker"]').clear();
    cy.get('[data-cy-id="startDatePicker"]').type(StartDate);
    cy.get('[data-cy-id="startTimePicker"]').type(TimeVal);
    cy.wait(12000);
    cy.intercept("POST", this.commonVars.editscheduledreport).as("editscheduledreportAPI");
    cy.get('[data-cy-id="saveSchedReportBtn"]').click();
    cy.wait("@editscheduledreportAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.intercept("POST", this.commonVars.getscheduledreports).as("getscheduledreportsAPI");
    cy.wait("@getscheduledreportsAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    cy.wait(3000);
    cy.reportFindTextInKendoGrid(this.commonVars.reportEditTitle);
  });
  it('Remove Scheduled Report', function() {
    cy.LoginApp(this.userCred.email,this.userCred.password);
    pageElementsObj.selectReports(this.commonVars);
    cy.url().should('include','reports');
    cy.get('div[data-cy-id="reportsTabStrip"]').should('exist');
    cy.get('div[data-cy-id="reportsTabStrip"] ul li[data-cy-id="scheduledRptTab"]').should('exist');
    cy.get('div[data-cy-id="reportsTabStrip"] ul li[data-cy-id="scheduledRptTab"]').click();
    //cy.reportFindTextInKendoGridAndEdit('Master notification report 1 day'); 
    cy.reportFindTextInKendoGridAndRemoveIt(this.commonVars.reportTitleSearch);
    cy.get('[data-cy-id="reportConfWindow"]').should('be.visible');
    cy.get('[data-cy-id="removeConfYesButton"]').should('be.visible');
    //cy.get('#yesButton').should('be.visible');
    cy.intercept("POST", this.commonVars.removescheduledreport).as("removescheduledreportAPI");
    //cy.get('#yesButton').click({force:true});
    cy.get('[data-cy-id="removeConfYesButton"]').click({force:true});
    cy.wait("@removescheduledreportAPI", { timeout: this.commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
  }); 
});