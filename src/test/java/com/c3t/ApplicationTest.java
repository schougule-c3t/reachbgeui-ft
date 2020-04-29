package com.c3t;

import com.codeborne.selenide.Selectors;
import com.codeborne.selenide.WebDriverRunner;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.Rule;
//import org.junit.jupiter.api.BeforeAll;
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
import static com.codeborne.selenide.Selectors.*;
import static com.codeborne.selenide.Selenide.*;
import static com.codeborne.selenide.WebDriverRunner.getWebDriver;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ApplicationTest {

    private static final String BASE_URL = "http://localhost:8080/reachuibge/app/#app/";

    @Before
    public void setUp() {
        // Set authentication
        open(BASE_URL+ "login");
        clearBrowserCookies();
        WebDriverRunner.clearBrowserCache();
        $(By.name("username")).setValue("superuser@bge.com");
        $(By.name("password")).setValue("test123");
        $(By.name("loginSubmit")).click();
        //screenshot("login.png");
    }
    @Rule
    public ScreenShooter photographer = ScreenShooter.failedTests().succeededTests();
    @Test
    public void searchSubscriberEmptyValidation() {
        open(BASE_URL+ "subscribers");
        $(By.name("subscrSubmit")).click();
        assertThat($("#programAlert div").text(), is("Please enter at least one search criteria"));
    }

    @Test
    public void searchSubscriberPositiveResult() {
        open(BASE_URL+ "subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        //getWebDriver().findElement(By.id("customerNumber"));
        $(By.name("customerNumber")).setValue("xxx0000001");
        $(By.name("subscrSubmit")).click();
        $(By.className("k-loading-image")).shouldBe(visible);
        assertThat($(".k-pager-info").text(), is("No items to display"));
        $(By.name("customerNumber")).setValue("0000000001");
        $(By.name("subscrSubmit")).click();
        $(By.className("k-loading-image")).shouldBe(visible);
        //screenshot("SubSrchLoadding.png");
        //sleep(6000);
        //assertThat($(".k-pager-info").text(), is("1 - 1 of 1 items"));
        $(By.className("k-pager-info")).shouldHave(text("items"));
        screenshot("SubSrchWithResult.png");
    }
    @Test
    public void searchSubscriberFirstnameNegative() {
        open(BASE_URL+ "subscribers");
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
        open(BASE_URL+ "subscribers");
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
        open(BASE_URL+ "subscribers");
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
        open(BASE_URL+ "subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.id("accountID")).setValue("a");
        $(By.name("subscrSubmit")).click();
        $("#programAlert div").shouldHave(text("Please enter minimum 3 characters."));
        $(By.id("accountID")).setValue("aa");
        $(By.name("subscrSubmit")).click();
        $("#programAlert div").shouldHave(text("Please enter minimum 3 characters."));
        assertThat($(By.id("accountID")).getAttribute("maxlength"), is("11"));
    }
    @Test
    public void contactSearchEmptyValid() {
        open(BASE_URL+ "subscribers");
        $(By.className("cont-srch")).click();
        $(By.id("cnt-title")).shouldHave(text("Search Criteria"));
        $(By.id("contactSubBtn")).click();
        //screenshot("con-srch-empty-negative.png");
        $("#contErrorMsgDiv").shouldHave(text("Please select from date"));
        //assertThat($("#programAlert div").text(), is("Please select from date"));
    }
    @Test
    public void contactSearchOnlyDateValid() {
        open(BASE_URL+ "subscribers");
        $(By.className("cont-srch")).click();
        $(By.id("cnt-title")).shouldHave(text("Search Criteria"));
        $(By.id("subscriberContactFromDate")).setValue("2020-04-01");
        $(By.id("contactSubBtn")).click();
        $("#contErrorMsgDiv").shouldHave(text("Please select Channel"));
    }
   /* @Test //kendo drop down selection issue still pending
    public void contactSearchPush() {
        open(BASE_URL+ "subscribers");
        $(By.className("cont-srch")).click();
        $(By.id("cnt-title")).shouldHave(text("Search Criteria"));
        //$(By.id("notificationContactTypeChannel")).shouldBe(visible);
        $(By.id("notificationContactTypeChannel")).selectOptionByValue("Push");
       // $(By.id("contactSearch")).setValue("BGE_1233456");
        //$(By.id("subscriberContactFromDate")).setValue("2020-04-01");
        screenshot("con-srch-push-negative.png");
        $(By.id("contactSubBtn")).click();
    }*/
    @Test
    public void subscriberDetailsPage() {
        open(BASE_URL+ "subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
        $(By.name("customerNumber")).setValue("0000000001");
        $(By.name("subscrSubmit")).click();
        $(By.className("k-loading-image")).shouldBe(visible);
        $(By.className("k-loading-image")).shouldBe(disappear);
        $(By.className("k-pager-info")).shouldHave(text("items"));
        //sleep(36000);
        $(By.className("view-det-btn")).shouldBe(visible);
        $(By.className("view-det-btn")).click();
        $(By.id("subDetDiv")).shouldNotHave(attribute("class", "ng-hide"));
        $(By.className("k-loading-image")).shouldBe(visible);
        $(By.className("k-loading-image")).shouldBe(disappear);
        $(".pref-refresh span").shouldHave(text("Refresh"));
        screenshot("sub-scr-det.png");
        $(By.id("subDetContViewTab")).click();
        screenshot("sub-scr-det1.png");
        $(By.id("addNewContSms")).shouldBe(visible);
        screenshot("sub-scr-det2.png");
        $(By.id("addNewContSms")).click();
        screenshot("sub-scr-det3.png");
        close();
    }
}