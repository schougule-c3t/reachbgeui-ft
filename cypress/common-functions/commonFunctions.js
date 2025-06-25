/// <reference types ="Cypress" />
  const getIframeBody = function(){
    return cy.get('[data-cy-id="adHocTextEditor"] .k-content').its('0.contentDocument.body').then(cy.wrap);
  }
  const getIframeEmailBody = function(){
    return cy.get('[data-cy-id="adHocEmailEditor"] .k-content').its('0.contentDocument.body').then(cy.wrap);
  }
  const getIframeEmailSub = function(){
    return cy.get('[data-cy-id="adHocSubjectEditor"] .k-content').its('0.contentDocument.body').then(cy.wrap);
  }
class commonFunctions {
    HomepageLogo = 'a>img[src*="/img"]'
    PagerLastPage = '.k-pager-wrap [aria-label="Go to the last page"]' 
    Name_Search = 'div[class*="search-item admin"]  input[data-automation-id="search-input"][placeholder*="Search"]'
    Table_Values = '[data-automation-id="info-table"] tr td:nth-child(1)'  
    Create_Date_Header = 'table thead th[data-automation-id="create-date-header"]'
    Edit_Popup_Tittle = 'div[class*="modalTitle"] h3'
    Edit_Popup_KeyTittle = '[class*="modalContent"] h4[class*="sectionTitle"]'
    /* Only Notification page Draft section*/
    notfSMSChannelName = 'SMS'
    notfSMSChannelDraft = 'SMS-Draft'
    notfSMSChannelLive = 'SMS-Live'
    notfEmailChannelName = 'Email'
    notfEmailChannelDraft = 'Email-Draft'
    notfEmailChannelLive = 'Email-Live'
    notfVoiceChannelName = 'Voice'
    notfVoiceChannelDraft = 'Voice-Draft'
    notfVoiceChannelLive = 'Voice-Live'
    notfPushChannelName = 'Push'
    notfPushChannelDraft = 'Push-Draft'
    notfPushChannelLive = 'Push-Live'
    notfLetterChannelName = 'Letter'
    notfLetterChannelDraft = 'Letter-Draft'
    notfLetterChannelLive = 'Letter-Live'
    inputMaxLength = 50
    draftTempInputMaxLength = 50
    subscriberInputMaxLength = 100
    customerNumMaxLength = 10
    accNumMaxLength = 11
    loadNotifTree(commonVars){
      cy.visit('/subscribers');
      cy.url().should('include','subscribers');
      cy.intercept("GET", commonVars.getNotificationTreeAPI).as("notificationTreeAPI");
      cy.get('#topMenuNotif a').click();
      cy.wait("@notificationTreeAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
      cy.get('#notificationTreeview').should('exist');
    }
    selectProgSettings(commonVars){
        cy.visit('/subscribers');
        cy.url().should('include','subscribers');
        cy.intercept("GET", commonVars.getNotificationTreeAPI).as("notificationTreeAPI");
        cy.get('#topMenuNotif a').click();
        cy.wait("@notificationTreeAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
        cy.get('#notificationTreeview').should('exist');
        cy.get('#notificationTreeview ul li').first('.k-top .k-i-expand').click();
        cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Outage').click();
        cy.intercept("GET", commonVars.programSettings).as("programSettingsAPI");
        cy.get('[id*="notificationTreeview_tv_active"]').find('span').contains('Severe Weather').first().click();
        cy.wait("@programSettingsAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    }
    selectNotfSettings(commonVars){
        cy.visit('/subscribers');
        cy.url().should('include','subscribers');
        cy.intercept("GET", commonVars.getNotificationTreeAPI).as("notificationTreeAPI");
        cy.get('#topMenuNotif a').click();
        cy.wait("@notificationTreeAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
        cy.get('#notificationTreeview').should('exist');
        cy.get('#notificationTreeview ul li').first('.k-top .k-i-expand').click();
        cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Outage').click();
        cy.get('[id*="notificationTreeview_tv_active"]').find('span').contains('Severe Weather').first().click();
        cy.get('[id*="notificationTreeview_tv_active"]').find('span').contains('Notification types').first().click();
        cy.intercept("GET", commonVars.notificationSettings).as("notificationSettingsAPI");
        cy.get('[id*="notificationTreeview_tv_active"]').find('span').contains('Severe Weather').first().click();
        cy.wait("@notificationSettingsAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    }
    saveNotificationSettings(commonVars){
      cy.get('[data-cy-id="saveNotfSetgBtn"]').should('exist');
      cy.intercept("POST", commonVars.saveNotificationSettings).as("saveNotificationSettingsAPI");
      cy.get('[data-cy-id="saveNotfSetgBtn"]').click();
      cy.wait("@saveNotificationSettingsAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    }
    notificationProviderToogle(commonVars,id,$option){
      const OrigVal = $option.attr('value');
      const OrigText = $option.text();
      if(OrigText == 'Using Program Level'){
        cy.get('[data-cy-id="'+id+'"]').select('Native');
        cy.get('[data-cy-id="saveNotfSetgBtn"]').should('exist');
        cy.intercept("POST", commonVars.saveNotificationSettings).as("saveNotificationSettingsAPI");
        cy.get('[data-cy-id="saveNotfSetgBtn"]').click();
        cy.wait("@saveNotificationSettingsAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
        cy.get('[data-cy-id="'+id+'"]').select('null');
        cy.get('[data-cy-id="saveNotfSetgBtn"]').should('exist');
        cy.get('[data-cy-id="saveNotfSetgBtn"]').click();
        cy.wait("@saveNotificationSettingsAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
      }else if(OrigText == 'Native'){
        cy.get('[data-cy-id="'+id+'"]').select('null');
        cy.get('[data-cy-id="saveNotfSetgBtn"]').should('exist');
        cy.intercept("POST", commonVars.saveNotificationSettings).as("saveNotificationSettingsAPI");
        cy.get('[data-cy-id="saveNotfSetgBtn"]').click();
        cy.wait("@saveNotificationSettingsAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
        cy.get('[data-cy-id="'+id+'"]').select('Native');
        cy.get('[data-cy-id="saveNotfSetgBtn"]').should('exist');
        cy.get('[data-cy-id="saveNotfSetgBtn"]').click();
        cy.wait("@saveNotificationSettingsAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
      }
    }
    notificationPUSHProviderToogle(commonVars,id,$option){
      const OrigVal = $option.attr('value');
      const OrigText = $option.text();
      if(OrigText == 'Using Program Level'){
        cy.get('[data-cy-id="'+id+'"]').select('MCS');
        cy.get('[data-cy-id="saveNotfSetgBtn"]').should('exist');
        cy.intercept("POST", commonVars.saveNotificationSettings).as("saveNotificationSettingsAPI");
        cy.get('[data-cy-id="saveNotfSetgBtn"]').click();
        cy.wait("@saveNotificationSettingsAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
        cy.get('[data-cy-id="'+id+'"]').select('null');
        cy.get('[data-cy-id="saveNotfSetgBtn"]').should('exist');
        cy.get('[data-cy-id="saveNotfSetgBtn"]').click();
        cy.wait("@saveNotificationSettingsAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
      }else if(OrigText == 'MCS'){
        cy.get('[data-cy-id="'+id+'"]').select('null');
        cy.get('[data-cy-id="saveNotfSetgBtn"]').should('exist');
        cy.intercept("POST", commonVars.saveNotificationSettings).as("saveNotificationSettingsAPI");
        cy.get('[data-cy-id="saveNotfSetgBtn"]').click();
        cy.wait("@saveNotificationSettingsAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
        cy.get('[data-cy-id="'+id+'"]').select('MCS');
        cy.get('[data-cy-id="saveNotfSetgBtn"]').should('exist');
        cy.get('[data-cy-id="saveNotfSetgBtn"]').click();
        cy.wait("@saveNotificationSettingsAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
      }
    }
    testDraftSelectLanag(commonVars){
        cy.visit('/subscribers');
        cy.url().should('include','subscribers');
        cy.intercept("GET", commonVars.getNotificationTreeAPI).as("notificationTreeAPI");
        cy.get('#topMenuNotif a').click();
        cy.wait("@notificationTreeAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
        cy.get('#notificationTreeview').should('exist');
        cy.get('#notificationTreeview ul li').first('.k-top .k-i-expand').click();
        cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Outage').click();
        cy.get('[id*="notificationTreeview_tv_active"]').find('span').contains('Severe Weather').first().click();
        cy.get('[id*="notificationTreeview_tv_active"]').find('span').contains('Subscription Template').click();
        cy.get('[id*="notificationTreeview_tv_active"]').find('span').contains('English').click();
        /*cy.get('[id*="notificationTreeview_tv_active"]').find('span.k-i-expand').first().click();
        cy.get('[id*="notificationTreeview_tv_active"]').find('span.k-i-expand').first().click();
        cy.get('[id*="notificationTreeview_tv_active"]').find('span.k-i-expand').first().click();
        cy.get('[id*="notificationTreeview_tv_active"]').find('span.k-i-expand').first().click();
        cy.get('[id*="notificationTreeview_tv_active"]').find('span.k-i-expand').first().click();*/
    }
    selectAdHoc(commonVars){
        cy.visit('/subscribers');
        cy.url().should('include','subscribers');
        cy.intercept("GET", commonVars.getNotificationTreeAPI).as("notificationTreeAPI");
        cy.get('#topMenuNotif a').click();
        cy.wait("@notificationTreeAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
        cy.get('#notificationTreeview').should('exist');
        cy.get('#notificationTreeview ul li').first('.k-top .k-i-expand').click();
        cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Outage').click();
        cy.get('[id*="notificationTreeview_tv_active"]').find('span').contains('Severe Weather').first().click();
        cy.get('[id*="notificationTreeview_tv_active"]').find('span').contains('Notification types').click();
        cy.intercept("GET", commonVars.getTempProgPrefCounts).as("getTempProgPrefCountsAPI");
        cy.get('[id*="notificationTreeview_tv_active"]').find('span').contains('Ad Hoc Notification').click();
        cy.wait("@getTempProgPrefCountsAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
    }
    navigateAdHocScreenToTempTab(commonVars){
      cy.get('[data-cy-id="adhocWizard"] div.actions ul li').find('a').contains('Next').should('be.visible');
      cy.get('[data-cy-id="adhocWizard"] div.actions ul li').find('a').contains('Next').click();
      cy.wait(10);
      cy.get('[data-cy-id="adhocWizard"] div.actions ul li').find('a').contains('Next').click();
      cy.get('[data-cy-id="filterConfirmation"] button.wizardContinue').click();
      cy.wait(10);
    }
    testDraftConfSelectLanag(commonVars){
        cy.visit('/subscribers');
        cy.url().should('include','subscribers');
        cy.intercept("GET", commonVars.getNotificationTreeAPI).as("notificationTreeAPI");
        cy.get('#topMenuNotif a').click();
        cy.wait("@notificationTreeAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
        cy.get('#notificationTreeview').should('exist');
        cy.get('#notificationTreeview ul li:nth-child(2)').find('.k-mid .k-i-expand').click();
        cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Billing').click();
        cy.get('[id*="notificationTreeview_tv_active"]').find('span').contains('Dynamic Messaging Payment Confirmation').first().click();
        cy.get('[id*="notificationTreeview_tv_active"]').find('span').contains('English').click();
    }
    testDraftSelectChannel(lang,langDraft){
      cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains(lang).click();
      cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains(langDraft).click();
      cy.get('.draft-mul-div').should('exist');
      cy.get('.draft-mul-div .add-btn').click();
      cy.get('#draftName').should('exist');
      cy.wait(10);
    }
    liveDraftSelectChannel(lang,langDraft){
      cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains(lang).click();
      cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains(langDraft).click();
      cy.wait(10);
    }
    navigateToSubscriberDetailsPage(commonVars,opcoObj){
      cy.visit('/subscribers');
      cy.url().should('include','subscribers');
      cy.get('[data-cy-id="customerNumber"]').type(opcoObj.customerNumber);
      cy.intercept("POST", commonVars.filterAPI).as("subFilterAPI");
      cy.get('.sub-search-btn.btn-primary').click();
      cy.wait("@subFilterAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
      cy.get('#subscribersRstGrid').should('exist');
      cy.get('div#subscribersRstGrid tbody tr td button').first().click();
      cy.get('ul li.tab-set-contr').should('exist');
    }
    adHocScreenSetDate(commonVars){
      let initDate = new Date();
      let ToDate = new Date();
      initDate.setMonth(initDate.getMonth() + 1);
      initDate.setDate(initDate.getDate() + 1);
      initDate.setHours(initDate.getHours() + 1);
      initDate.setMinutes(initDate.getMinutes() + 5);
      ToDate.setMonth(initDate.getMonth() + 1);
      ToDate.setDate(initDate.getDate() + 1);
      ToDate.setHours(initDate.getHours() + 1);
      ToDate.setMinutes(initDate.getMinutes() + 5);
      let curYear = initDate.getFullYear();
      let curMonth = String(initDate.getMonth()).padStart(2, '0');
      let curDay = String(initDate.getDate()).padStart(2, '0');
      let NextDay = String(ToDate.getDate()).padStart(2, '0');
      let CurHour = String(initDate.getHours());
      let CurMint = String(initDate.getMinutes());
      let StartDate = curYear+'-'+curMonth+'-'+curDay+' '+CurHour+':'+CurMint;
      let EndDate = curYear+'-'+curMonth+'-'+NextDay+' '+CurHour+':'+CurMint;
      cy.log('CurDate>',StartDate);//2023-09-15 14:53
      cy.log('EndDate>',EndDate);//2023-09-15 14:53
      cy.get('[data-cy-id="startDatePicker"]').should('be.visible');
      cy.get('[data-cy-id="startDatePicker"]').clear();
      cy.get('[data-cy-id="expiryDatePicker"]').clear();
      cy.get('[data-cy-id="startDatePicker"]').type(StartDate,{force:true},{delay:10}).should('have.value',StartDate);
      cy.get('[data-cy-id="expiryDatePicker"]').type(EndDate,{force:true},{delay:10}).should('have.value',EndDate);
    }
    adHocFillTemplates(commonVars){
      //SMS
      cy.get('[data-cy-id="SMSBtn"]').click();
      cy.get('#templateName').type(commonVars.draftTempName,{force:true},{delay:10}).should('have.value',commonVars.draftTempName);
      cy.get('[data-cy-id="adHocTextEditor"]').find('iframe.k-content').should('be.visible');
      getIframeBody().type(commonVars.draftTempBody,{force:true},{delay:10});
      cy.get('[data-cy-id="adHocSaveBtn"]').click();
      //Email
      cy.get('[data-cy-id="EMAILBtn"]').click();
      cy.get('#templateName').type(commonVars.draftTempName,{force:true},{delay:10}).should('have.value',commonVars.draftTempName);
      cy.get('[data-cy-id="adHocEmailEditor"]').find('iframe.k-content').should('be.visible');
      getIframeEmailSub().type(commonVars.draftTempSubject,{force:true},{delay:10});
      getIframeEmailBody().type(commonVars.draftTempBody,{force:true},{delay:10});
      cy.get('[data-cy-id="adHocSaveBtn"]').click();
      //Voice
      cy.get('[data-cy-id="VOICEBtn"]').click();
      cy.get('#templateName').type(commonVars.draftTempName,{force:true},{delay:10}).should('have.value',commonVars.draftTempName);
      cy.get('[data-cy-id="adHocTextEditor"]').find('iframe.k-content').should('be.visible');
      getIframeBody().type(commonVars.draftTempBody,{force:true},{delay:10});
      cy.get('[data-cy-id="adHocSaveBtn"]').click();
      //PUSH
      cy.get('[data-cy-id="PUSHBtn"]').click();
      cy.get('#templateName').type(commonVars.draftTempName,{force:true},{delay:10}).should('have.value',commonVars.draftTempName);
      cy.get('[data-cy-id="adHocTextEditor"]').find('iframe.k-content').should('be.visible');
      getIframeBody().type(commonVars.draftTempBody,{force:true},{delay:20});
      cy.get('[data-cy-id="adHocSaveBtn"]').click();
    }
    selectReports(commonVars){
      cy.visit('/subscribers');
      cy.url().should('include','subscribers');
      cy.get('#topMenuReports a').click();
    }
    searchAndEditRecord(recordName) {
      // Start on the first page
      let currentPage = 1;
      let recordFound = false;
    
      // Use a loop to iterate through all pages
      cy.wrap().as('grid');
    
      cy.get('[data-cy-id="scheduledReportsGrid"]').then(($grid) => {
        cy.log('inside function');
        function searchInCurrentPage() {
          cy.get($grid)
            .find('.k-grid-content table tbody tr')
            .each(($row) => {
              const rowData = $row.find('td'); // Modify this to match your grid structure
              const cellWithRecordName = rowData.eq(columnIndexOfName); // Modify column index
    
              if (cellWithRecordName.text().trim() === recordName) {
                cy.log('row',$row);
                cy.log('rowData',rowData);
                // Found the record, click the edit icon (modify the selector as needed)
                $row.find('[data-cy-id="editSchRptBtn"]').click();
                recordFound = true;
              }
            });
        }
    
        function goToNextPage() {
          // Go to the next page if available
          const nextPageButton = $grid.find('.k-pager-next');
    
          if (nextPageButton.length > 0) {
            nextPageButton.click();
            currentPage++;
          } else {
            // No more pages to search
            return;
          }
        }
    
        const columnIndexOfName = 1; // Modify this to match the column index where the name is displayed
    
        // Loop through all pages until the record is found or there are no more pages
        while (!recordFound) {
          searchInCurrentPage();
    
          if (!recordFound) {
            goToNextPage();
          }
        }
      });
    }
    notfDfltPrefDisabled(commonVars,optiontoSel){
      if(optiontoSel == ''){
        optiontoSel = 'Always enabled';
      }
      cy.get('[data-cy-id="defaultPreference"] span.k-dropdown-wrap .k-select').click({force:true});
      cy.wait(500);
      cy.get('#defaultPreference-list').find('li').contains('Always enabled').click({force:true});
      cy.get('#defaultPreference-list').find('li').contains('Disabled').click({force:true});
      cy.get('#defaultPreference-list').find('li').contains(optiontoSel).click({force:true});
      cy.get('[data-cy-id="defaultPreferenceMethodMulti"] .k-multiselect-wrap span.k-clear-value').click({force:true});
      cy.get('[data-cy-id="defaultPreferenceMethodMulti"] .k-multiselect-wrap').click({force:true});
      cy.wait(500);
      cy.get('#defaultPreferenceMethodMulti_listbox').find('li').contains('Primary phone').click({force:true});
      cy.get('[data-cy-id="defaultPreferenceMethodDisPrioty2"] .k-dropdown-wrap .k-select').click({force:true});
      cy.wait(500);
      cy.get('#defaultPreferenceMethodPrioty2_listbox').find('li').contains('Primary email').click({force:true});
      //cy.get('#defaultPreferenceMethodMulti_listbox').find('li').contains('Primary phone').click({force:true});
      cy.get('[data-cy-id="saveNotfSetgBtn"]').should('exist');
      cy.intercept("POST", commonVars.saveProgramSettings).as("saveProgramSettingsAPI");
      cy.get('[data-cy-id="saveProgSetgBtn"]').click();
      cy.wait("@saveProgramSettingsAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
      cy.intercept("GET", commonVars.programSettings).as("programSettingsAPI");
      cy.wait("@programSettingsAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
      cy.get('[data-cy-id="defaultPreference"] span.k-dropdown-wrap .k-select').should('exist');
      cy.get('[data-cy-id="defaultPreference"] span.k-dropdown-wrap .k-select').should('be.visible');
      cy.get('[data-cy-id="defaultPreference"] span.k-dropdown-wrap .k-select').click({force:true});
    }
    notfDfltPrefAlwEnabOrFallBck(commonVars,dfltPrefOrigVal,dfltPrefOrigMultiVal,dfltPrefPri2Val){
      cy.get('#defaultPreference-list').find('li').contains('Disabled').click({force:true});
      cy.get('#defaultPreference-list').find('li').contains('Always enabled').click({force:true});
      cy.get('#defaultPreference-list').find('li').contains(dfltPrefOrigVal).click({force:true});
      cy.get('[data-cy-id="defaultPreferenceMethodDisPrioty2"] .k-dropdown-wrap').should('be.visible');
      cy.get('[data-cy-id="defaultPreferenceMethodDisPrioty2"] .k-dropdown-wrap .k-select').click({force:true});
      cy.wait(500);
      cy.get('#defaultPreferenceMethodPrioty2_listbox').find('li').contains('Please Select').click({force:true});
      cy.get('[data-cy-id="defaultPreferenceMethodMulti"] .k-multiselect-wrap').should('exist');
      cy.get('[data-cy-id="defaultPreferenceMethodMulti"] .k-multiselect-wrap').should('be.visible');
      cy.get('[data-cy-id="defaultPreferenceMethodMulti"] .k-multiselect-wrap span.k-clear-value').click({force:true});
      cy.get('[data-cy-id="defaultPreferenceMethodMulti"] .k-multiselect-wrap').click({force:true});
      cy.wait(500);
      cy.get('#defaultPreferenceMethodMulti_listbox').find('li').contains(dfltPrefOrigMultiVal).click({force:true});
      cy.get('[data-cy-id="defaultPreferenceMethodDisPrioty2"] .k-dropdown-wrap').should('be.visible');
      cy.get('[data-cy-id="defaultPreferenceMethodDisPrioty2"] .k-dropdown-wrap').click({force:true});
      //cy.get('#defaultPreferenceMethodMulti_listbox').find('li').contains(dfltPrefOrigMultiVal).click({force:true});
      cy.wait(500);
      cy.get('#defaultPreferenceMethodPrioty2-list').find('li').contains(dfltPrefPri2Val).click({force:true});
    }
    notfDfltPrefNoPriority2(commonVars,dfltPrefOrigVal,dfltPrefOrigMultiVal){
      //Both phone and email selected in default Preference Method Multi select
      cy.get('#defaultPreference-list').find('li').contains('Disabled').click({force:true});
      cy.get('#defaultPreference-list').find('li').contains('Always enabled').click({force:true});
      cy.get('#defaultPreference-list').find('li').contains(dfltPrefOrigVal).click({force:true});
      cy.get('[data-cy-id="defaultPreferenceMethodMulti"] .k-multiselect-wrap').should('exist');
      cy.get('[data-cy-id="defaultPreferenceMethodMulti"] .k-multiselect-wrap').should('be.visible');
      cy.get('[data-cy-id="defaultPreferenceMethodMulti"] .k-multiselect-wrap span.k-clear-value').click({force:true});
      cy.get('[data-cy-id="defaultPreferenceMethodDisPrioty2"] .k-dropdown-wrap').should('be.visible');
      cy.get('[data-cy-id="defaultPreferenceMethodDisPrioty2"] .k-dropdown-wrap .k-select').click({force:true});
      cy.wait(500);
      cy.get('#defaultPreferenceMethodPrioty2_listbox').find('li').contains('Please Select').click({force:true});
      cy.get('[data-cy-id="defaultPreferenceMethodMulti"] .k-multiselect-wrap').click({force:true});
      cy.wait(500);
      //cy.get('#defaultPreferenceMethodMulti-list').find('li').contains('Primary phone').click({force:true});
      cy.get('#defaultPreferenceMethodMulti_listbox').find('li').contains('Primary phone').click({force:true});
      cy.get('#defaultPreferenceMethodMulti_listbox').find('li').contains('Primary email').click({force:true});
    }
    agent511AdminSelectProgWindow(commonVars){
      cy.visit('/subscribers');
      cy.url().should('include','subscribers');
      cy.intercept("GET", commonVars.getNotificationTreeAPI).as("notificationTreeAPI");
      cy.get('#topMenuNotif a').click();
      cy.wait("@notificationTreeAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
      cy.get('#notificationTreeview').should('exist');
      cy.wait(500);
      cy.get('[data-cy-id="openProgCatgWindow"]').should('be.visible');
      cy.get('[data-cy-id="openProgCatgWindow"]').click();
    }
    agent511AdminOpenAddProgWindow(commonVars){
      cy.visit('/subscribers');
      cy.url().should('include','subscribers');
      cy.intercept("GET", commonVars.getNotificationTreeAPI).as("notificationTreeAPI");
      cy.get('#topMenuNotif a').click();
      cy.wait("@notificationTreeAPI", { timeout: commonVars.timeoutAPI }).its("response.statusCode").should("eq", 200);
      cy.get('#notificationTreeview').should('exist');
      cy.wait(500);
      cy.get('#notificationTreeview ul li').first('.k-top .k-i-expand').click();
      cy.get('[id*="notificationTreeview_tv_active"]').find('span').invoke('attr', 'id').contains('Notifications').click();
    }
  }
export default commonFunctions  