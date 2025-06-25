// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('LoginApp', function (email, password) {
 //Cypress.session.clearAllSavedSessions()
 email = email+'@'+Cypress.env('opco')+'.com';
 cy.session([email, password], () => {
  cy.visit('/');
  cy.get('#username').should('be.visible').type(email);
  cy.get('#password').should('be.visible').type(password,{force: true});
  cy.get('.sub-btn').click();
  cy.url().should('include', '/subscribers');
  cy.get('.sub-ser-btn').should('be.visible');
},{cacheAcrossSpecs:true})
});
Cypress.Commands.add('reportFindTextInKendoGridAndEdit', function(textToFind){
  let found = false;
  function findAndClickEditButton() {
    cy.log('textToFind=>',textToFind);
    cy.get('[data-cy-id="scheduledReportsGrid"] table tbody tr').each(function($row){
      cy.log('row=>',$row);
      if ($row.text().includes(textToFind)) {
        found = true;
        cy.log('found=>',found);
        cy.get('[data-cy-id="scheduledReportsGrid"] table tbody tr td').contains(textToFind).parent().parent().find('td button[data-cy-id="editSchRptBtn"]').click();
        //$row.find('[data-cy-id="editSchRptBtn"]').click({force: true});
      }
    });
  }
  // Search for the text on the current page
  findAndClickEditButton();
  // If not found, check for the next page button and click it
  if (!found) {
    const nextPageButton = cy.get('[data-cy-id*="scheduledReportsGrid"] a.k-pager-nav').eq(2);
    cy.log('length next btn 1=>',nextPageButton);
    cy.log('length next btn 2=>',nextPageButton.length);
    //if (nextPageButton.length > 0) {
      nextPageButton.click();
      findAndClickEditButton(); // Search on the next page
    //}
  }
});
Cypress.Commands.add('reportFindTextInKendoGridAndRemoveIt', function(textToFind){
  let found = false;
  function findAndClickEditButton() {
    cy.log('textToFind=>',textToFind);
    cy.get('[data-cy-id="scheduledReportsGrid"] table tbody tr').each(function($row){
      cy.log('row=>',$row);
      if ($row.text().includes(textToFind)) {
        found = true;
        cy.log('found=>',found);
        cy.get('[data-cy-id="scheduledReportsGrid"] table tbody tr td').contains(textToFind).parent().parent().find('td button[data-cy-id="removeSchRptBtn"]').click();
        //$row.find('[data-cy-id="editSchRptBtn"]').click({force: true});
      }
    });
  }
  // Search for the text on the current page
  findAndClickEditButton();
  // If not found, check for the next page button and click it
  if (!found) {
    const nextPageButton = cy.get('[data-cy-id*="scheduledReportsGrid"] a.k-pager-nav').eq(2);
    cy.log('length next btn 1=>',nextPageButton);
    cy.log('length next btn 2=>',nextPageButton.length);
    //if (nextPageButton.length > 0) {
      nextPageButton.click();
      findAndClickEditButton(); // Search on the next page
    //}
  }
});
Cypress.Commands.add('reportFindTextInKendoGrid', function(textToFind){
  let found = false;
  function findAndClickEditButton() {
    cy.log('textToFind=>',textToFind);
    cy.get('[data-cy-id="scheduledReportsGrid"] table tbody tr').each(function($row){
      cy.log('row=>',$row);
      if ($row.text().includes(textToFind)) {
        found = true;
        cy.log('found=>',found);
        cy.get('[data-cy-id="scheduledReportsGrid"] table tbody tr td').contains(textToFind);
      }
    });
  }
  // Search for the text on the current page
  findAndClickEditButton();
  // If not found, check for the next page button and click it
  if (!found) {
    const nextPageButton = cy.get('[data-cy-id*="scheduledReportsGrid"] a.k-pager-nav').eq(2);
    cy.log('length next btn 1=>',nextPageButton);
    cy.log('length next btn 2=>',nextPageButton.length);
    //if (nextPageButton.length > 0) {
      nextPageButton.click();
      findAndClickEditButton(); // Search on the next page
    //}
  }
});

Cypress.Commands.add('onlineReportFindTextInKendoGrid', function(tableid,textToFind){
  let found = false;
  function findAndClickEditButton() {
    cy.log('textToFind=>',textToFind);
    cy.get('[data-cy-id="onlineReportTabGrid"] table tbody tr').each(function($row){
      cy.log('row=>',$row);
      if ($row.text().includes(textToFind)) {
        found = true;
        cy.log('found=>',found);
        cy.get('[data-cy-id="onlineReportTabGrid"] .k-grid-content table tbody tr td').contains(textToFind);
        cy.get('[data-cy-id="onlineReportTabGrid"] .k-grid-content table tbody tr td').contains(textToFind).parent().parent().find('td button[data-cy-id="executeReportBtn"]').click();
      }
    });
  }
  // Search for the text on the current page
  findAndClickEditButton();
  // If not found, check for the next page button and click it
  cy.log('found outside =>',found);
  if (!found) {
    const nextPageButton = cy.get('[data-cy-id*="onlineReportTabGrid"] a.k-pager-nav').eq(2);
    cy.log('length next btn 1=>',nextPageButton);
    cy.log('length next btn 2=>',nextPageButton.length);
    //if (nextPageButton.length > 0) {
      nextPageButton.click();
      findAndClickEditButton(); // Search on the next page
    //}
  }
});