package com.c3t;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.Selectors;
import com.codeborne.selenide.WebDriverRunner;
import org.junit.*;
import org.junit.Test;
import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.junit.runner.RunWith;
import org.openqa.selenium.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static com.codeborne.selenide.CollectionCondition.size;
import static com.codeborne.selenide.CollectionCondition.texts;
import static com.codeborne.selenide.Condition.*;
import com.codeborne.selenide.junit.ScreenShooter;
import static com.codeborne.selenide.Selenide.screenshot;
import static com.codeborne.selenide.Selectors.*;
import static com.codeborne.selenide.Selenide.*;
import static com.codeborne.selenide.WebDriverRunner.getWebDriver;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import org.apache.commons.lang3.RandomStringUtils;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ApplicationTest<var> {

    private static final String BASE_URL = "http://69.89.12.213:8080/reachuibgeTestAutomation/app/#app/";
    //private static final String BASE_URL = "http://localhost:8080/reachuibgeTestAutomation/app/#app/";
    
    @BeforeClass
    public static void setup() {
        Configuration.baseUrl = "http://69.89.12.213:8080/reachuibgeTestAutomation/app/#app/";
        //Configuration.baseUrl = "http://localhost:8080/reachuibgeTestAutomation/app/#app/";
    }
    @Before
    public void setUp() {
        // Set authentication
        String currentWorkingDir = System.getProperty("user.dir");
        System.out.println("Root Path: "+ currentWorkingDir);
        //System.setProperty("remote-debugging-port", "9515");
        //System.setProperty("webdriver.chrome.driver", "D:/cloud3tech/reachbuiAutomation/drivers/windows/chromedriver.exe");
        System.setProperty("webdriver.chrome.driver", "/tmp/chromedriver_linux64/chromedriver");
        open("login");
        clearBrowserCookies();
        WebDriverRunner.clearBrowserCache();
        $(By.name("username")).setValue("superuser_dev@bge.com");
        $(By.name("password")).setValue("tdev123");
        $(By.name("loginSubmit")).click();
        //screenshot("login.png");
    }
    @Rule
    public ScreenShooter photographer = ScreenShooter.failedTests().succeededTests();
    @Test
    public void searchSubscriberEmptyValidation() {
        //open("subscribers");
        $(By.name("subscrSubmit")).click();
        assertThat($("#programAlert div").text(), is("Please enter at least one search criteria"));
    }
    @Test
    public void searchSubscriberPositiveResult() {
        //open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        //getWebDriver().findElement(By.id("customerNumber"));
        $(By.name("customerNumber")).setValue("xxx0000001");
        $(By.name("subscrSubmit")).click();
        $(By.className("k-loading-image")).shouldBe(visible);
        assertThat($(".k-pager-info").text(), is("No items to display"));
        $(By.name("customerNumber")).setValue("0000000102");
        $(By.name("subscrSubmit")).click();
        $(By.className("k-loading-image")).shouldBe(visible);
        //screenshot("SubSrchLoadding.png");
        //sleep(6000);
        //assertThat($(".k-pager-info").text(), is("1 - 1 of 1 items"));
        $(By.className("k-pager-info")).shouldHave(text("items"));
        //screenshot("SubSrchWithResult.png");
    }
    @Test
    public void searchSubscriberFirstnameNegative() {
        //open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.id("firstName")).setValue("a");
        $(By.name("subscrSubmit")).click();
        //screenshot("FirstnameErrorMessage.png");
        //assertThat($(".k-pager-info").text(), is("1 - 1 of 1 items"));
        $("#programAlert div").shouldHave(text("Please enter minimum 3 characters."));
        $(By.id("firstName")).setValue("aa");
        $(By.name("subscrSubmit")).click();
        $("#programAlert div").shouldHave(text("Please enter minimum 3 characters."));
    }
    @Test
    public void searchSubscriberLastnameNegative() {
        //open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.id("lastName")).setValue("a");
        $(By.name("subscrSubmit")).click();
        $("#programAlert div").shouldHave(text("Please enter minimum 3 characters."));
        $(By.id("lastName")).setValue("aa");
        $(By.name("subscrSubmit")).click();
        $("#programAlert div").shouldHave(text("Please enter minimum 3 characters."));
    }
    @Test
    public void searchSubscriberCustNoNegative() {
        //open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.id("customerNumber")).setValue("a");
        $(By.name("subscrSubmit")).click();
        $("#programAlert div").shouldHave(text("Please enter minimum 3 characters."));
        $(By.id("customerNumber")).setValue("aa");
        $(By.name("subscrSubmit")).click();
        $("#programAlert div").shouldHave(text("Please enter minimum 3 characters."));
        assertThat($(By.id("customerNumber")).getAttribute("maxlength"), is("10"));
    }
    @Test
    public void searchSubscriberAccNoNegative() {
        //open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.id("accountID")).setValue("a");
        $(By.name("subscrSubmit")).click();
        $("#programAlert div").shouldHave(text("Please enter minimum 3 characters."));
        $(By.id("accountID")).setValue("aa");
        $(By.name("subscrSubmit")).click();
        $("#programAlert div").shouldHave(text("Please enter minimum 3 characters."));
        assertThat($(By.id("accountID")).getAttribute("maxlength"), is("11"));
    }
   /*@Test
    public void contactSearchEmptyValidation() {
        //open("subscribers");
        $(By.className("cont-srch")).click();
        $(By.id("cnt-title")).shouldHave(text("Search Criteria"));
        $(By.id("contactSubBtn")).click();
        //screenshot("con-srch-empty-negative.png");
        $("#contErrorMsgDiv").shouldHave(text("Please select from date"));
        //$(".errorMsg").shouldHave(text("Please select from date"));
        //assertThat($("#programAlert div").text(), is("Please select from date"));
    }
    @Test
    public void contactSearchOnlyDateValidation() {
        //open("subscribers");
        $(By.className("cont-srch")).click();
        $(By.id("cnt-title")).shouldHave(text("Search Criteria"));
        $(By.id("subscriberContactFromDate")).setValue("2020-04-01");
        $(By.id("contactSubBtn")).click();
        $("#contErrorMsgDiv").shouldHave(text("Please select Channel"));
    }
    @Test
    public void addContactNegativeCase() {
        open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.name("customerNumber")).setValue("0000000102");
        $(By.name("subscrSubmit")).click();
        $(By.className("k-loading-image")).shouldBe(visible);
        $(By.className("k-loading-image")).shouldBe(disappear);
        $(By.className("k-pager-info")).shouldHave(text("items"));
        //sleep(36000);
        $(By.className("view-det-btn")).shouldBe(visible);
        $(By.className("view-det-btn"),0).click();
        $(By.id("subDetDiv")).shouldNotHave(attribute("class", "ng-hide"));
        $(By.className("k-loading-image")).shouldBe(visible);
        $(By.className("k-loading-image")).shouldBe(disappear);
        sleep(4000);
        $(".pref-refresh span").shouldHave(text("Refresh"));
        $(By.id("subDetContViewTab")).click();
        $(By.id("addNewContSms")).shouldBe(visible);
        $(By.id("addNewContSms")).click();
        $(".modelButtonFloatRight button").shouldBe(visible);
       // sleep(1000);
        $(By.id("exportBtn")).pressEnter();
        //$$("#programAlert").shouldHave(size(3));
        String inrText = $("#programAlert").innerText();
        inrText = inrText.trim();
        inrText = inrText.replace("×\n" +
                "                                                   \n" +
                "                                                   ", "");
        System.out.println("text=>"+inrText);
        assertThat(inrText, is("Please enter Channel Type"));
        //sleep(71000);
        screenshot("sub-scr-det2.png");
        $(By.id("contactLabel")).setValue("a");
        $(By.id("exportBtn")).click();
        String mdnText = $("#programAlert").innerText();
        mdnText = mdnText.trim();
        mdnText = mdnText.replace("×\n" +
                "                                                   \n" +
                "                                                   ", "");
        System.out.println("mdn=>"+mdnText);
        assertThat(mdnText, is("Please enter mdn"));
        screenshot("sub-scr-det3.png");
        //close();
    }
	@Test
    public void addContactSuccessTestCase() {
        open("subscribers");
        sleep(10000);
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.name("customerNumber")).setValue("0000000102");
        $(By.name("subscrSubmit")).click();
        $(By.className("k-pager-info")).shouldHave(text("items"));
        //sleep(36000);
        $(By.className("view-det-btn")).shouldBe(visible);
        $(By.className("view-det-btn"),0).click();
        $(By.id("subDetDiv")).shouldNotHave(attribute("class", "ng-hide"));
        //sleep(4000);
        $(".pref-refresh span").shouldHave(text("Refresh"));
        $(By.id("subDetContViewTab")).click();
        $(By.id("addNewContSms")).shouldBe(visible);
        $(By.id("addNewContSms")).click();
        $(".modelButtonFloatRight button").shouldBe(visible);
        // sleep(1000);
		String rndStr = RandomStringUtils.randomAlphabetic(8);
        $(By.id("contactLabel")).setValue(rndStr);
        $(By.id("mdn")).click();
        $(By.id("mdn")).sendKeys("(454) 545-4545");
        $(By.id("exportBtn")).pressEnter();
        //sleep(3000);
        $(By.id("contactdata")).shouldBe(disappear);
        String successText = $(".alert-success div").innerText();
        System.out.println("successText"+successText);
        assertThat(successText, is("Contact Added Successfully."));
    }*/
    @Test
    public void addContactAtrrMaxlengthExist() {
        open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.name("customerNumber")).setValue("0000000102");
        $(By.name("subscrSubmit")).click();
        $(By.className("k-loading-image")).shouldBe(visible);
        $(By.className("k-loading-image")).shouldBe(disappear);
        $(By.className("k-pager-info")).shouldHave(text("items"));
        //sleep(36000);
        $(By.className("view-det-btn")).shouldBe(visible);
        $(By.className("view-det-btn"),0).click();
        $(By.id("subDetDiv")).shouldNotHave(attribute("class", "ng-hide"));
        $(By.className("k-loading-image")).shouldBe(visible);
        $(By.className("k-loading-image")).shouldBe(disappear);
        sleep(4000);
        $(".pref-refresh span").shouldHave(text("Refresh"));
        $(By.id("subDetContViewTab")).click();
        $(By.id("addNewContSms")).shouldBe(visible);
        $(By.id("addNewContSms")).click();
        $(".modelButtonFloatRight button").shouldBe(visible);
        // sleep(1000);
        $(By.id("contactLabel")).shouldHave(attribute("maxlength"));
    }

   @Test //kendo drop down selection issue still pending
    public void contactSearchPush() {
        open("subscribers");
        $(By.className("cont-srch")).click();
        $(By.id("cnt-title")).shouldHave(text("Search Criteria"));
        //$(By.id("notificationContactTypeChannel")).shouldBe(visible);
        $(By.id("notificationContactTypeChannel")).selectOptionByValue("Push");
       // $(By.id("contactSearch")).setValue("BGE_1233456");
        //$(By.id("subscriberContactFromDate")).setValue("2020-04-01");
       // screenshot("con-srch-push-negative.png");
        $(By.id("contactSubBtn")).click();
    }
    
	/* Test case from Test Rail */
    @Test  //#31571
    public void openSearchPageSubscriber() {
        open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
    }
    @Test  //#31572
    public void displaysearchsubscriberfields() {
        open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.id("firstName")).shouldBe(visible);
        $(By.id("lastName")).shouldBe(visible);
        $(By.id("customerNumber")).shouldBe(visible);
        $(By.id("accountID")).shouldBe(visible);
    }
    @Test  //#31573
    public void searchSubscriberFirstname1() {
        open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.id("firstName")).setValue("BGETest");
        $(By.name("subscrSubmit")).click();
        $(By.className("view-det-btn")).shouldBe(visible);
    }
    @Test  //#31573
    public void searchSubscriberFirstname2() {
        open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.id("firstName")).setValue("B**");
        $(By.name("subscrSubmit")).click();
        $(By.className("view-det-btn")).shouldBe(visible);
    }
    @Test  //#31573
    public void searchSubscriberFirstname3() {
        open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.id("firstName")).setValue("norecord");
        $(By.name("subscrSubmit")).click();
        $(By.className("k-pager-info")).shouldHave(text("No items to display"));
    }
    @Test  //#31574
    public void searchSubscriberLastname1() {
        open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.id("lastName")).setValue("BGETest");
        $(By.name("subscrSubmit")).click();
        $(By.className("view-det-btn")).shouldBe(visible);
    }
    @Test  //#31574
    public void searchSubscriberLastname2() {
        open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.id("lastName")).setValue("B**");
        $(By.name("subscrSubmit")).click();
        $(By.className("view-det-btn")).shouldBe(visible);
    }
    @Test  //#31574
    public void searchSubscriberLastname3() {
        open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.id("lastName")).setValue("norecord");
        $(By.name("subscrSubmit")).click();
        $(By.className("k-pager-info")).shouldHave(text("No items to display"));
    }
	@Test  //#31575
    public void searchSubscriberAccountNumber1() {
        open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.id("accountID")).setValue("0000000002");
        $(By.name("subscrSubmit")).click();
        $(By.className("view-det-btn")).shouldBe(visible);
    }
    @Test  //#31575
    public void searchSubscriberAccountNumber2() {
        open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.id("accountID")).setValue("0000000000");
        $(By.name("subscrSubmit")).click();
        $(By.className("k-pager-info")).shouldHave(text("No items to display"));
    }
	@Test  //#31576
    public void searchSubscriberCustomerNumber1() {
        open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.id("customerNumber")).setValue("0000000001");
        $(By.name("subscrSubmit")).click();
        $(By.className("view-det-btn")).shouldBe(visible);
    }
    @Test  //#31576
    public void searchSubscriberCustomerNumber2() {
        open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.id("customerNumber")).setValue("0000000000");
        $(By.name("subscrSubmit")).click();
        $(By.className("k-pager-info")).shouldHave(text("No items to display"));
    }
	@Test  //#31579
    public void testSubscriberViewDetails() {
        open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.name("customerNumber")).setValue("0000000001");
        $(By.name("subscrSubmit")).click();
        $(By.className("k-pager-info")).shouldHave(text("items"));
        $(By.className("view-det-btn")).shouldBe(visible);
        $(By.className("view-det-btn"),0).click();
        $(By.id("subDetDiv")).shouldNotHave(attribute("class", "ng-hide"));
        sleep(1000);
        $(".pref-refresh span").shouldHave(text("Refresh"));
    }
	@Test  //#31580
    public void testSubscriberViewDetailsBack() {
        open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.name("customerNumber")).setValue("0000000001");
        $(By.name("subscrSubmit")).click();
        $(By.className("k-pager-info")).shouldHave(text("items"));
        $(By.className("view-det-btn")).shouldBe(visible);
        $(By.className("view-det-btn"),0).click();
        $(By.id("subDetDiv")).shouldNotHave(attribute("class", "ng-hide"));
        sleep(1000);
        $(".pref-refresh span").shouldHave(text("Refresh"));
        $(By.className("subscrDetBack")).click();
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
    }
    @Test  //#31581
    public void testTabStripSubscriberDetailsPage() {
        open("subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.name("customerNumber")).setValue("0000000001");
        $(By.name("subscrSubmit")).click();
        $(By.className("k-pager-info")).shouldHave(text("items"));
        $(By.className("view-det-btn")).shouldBe(visible);
        $(By.className("view-det-btn"),0).click();
        $(By.id("subDetDiv")).shouldNotHave(attribute("class", "ng-hide"));
        sleep(1000);
        $(".pref-refresh span").shouldHave(text("Refresh"));
        $(By.id("preferenceViewTab")).shouldBe(visible);
        $(By.id("subDetContViewTab")).shouldBe(visible);
        $(By.id("accountViewTab")).shouldBe(visible);
        $(By.id("historyViewTab")).shouldBe(visible);
    }
}