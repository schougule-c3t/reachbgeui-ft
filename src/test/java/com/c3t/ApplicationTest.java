package com.c3t;

import com.codeborne.selenide.Selectors;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.junit.runner.RunWith;
import org.openqa.selenium.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static com.codeborne.selenide.CollectionCondition.size;
import static com.codeborne.selenide.Condition.*;
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
        //refresh();
        $(By.name("username")).setValue("superuser@bge.com");
        //$("input[name='username']").setValue("superuser@bge.com");
        $(By.name("password")).setValue("test123");
        $(By.name("loginSubmit")).click();
        // $(Selectors.byName("password")).setValue("test123");
        //$("[type='submit']").click();
    }

    /*@Test
    public void searchSubscriberValidation() {
        open(BASE_URL+ "subscribers");
        $(By.name("subscrSubmit")).click();
        assertThat($("#programAlert div").text(), is("Please enter at least one search criteria"));
        $(".ra-well-title").shouldHave(text("Search Criteria"));
    }*/

    @Test
    public void searchSubscriberResult() {
        //clearBrowserCookies();
        open(BASE_URL+ "subscribers");
        $(By.className("ra-well-title")).shouldHave(text("Search Criteria"));
       // getWebDriver().findElement(By.id("customerNumber"));
        $(By.name("customerNumber")).setValue("xxx0000001");
        $(By.name("subscrSubmit")).click();
        $(By.className("k-loading-image")).shouldBe(visible);
        assertThat($(".k-pager-info").text(), is("No items to display"));
        $(By.name("customerNumber")).setValue("0000000001");
        $(By.name("subscrSubmit")).click();
        $(By.className("k-loading-image")).shouldBe(visible);
        sleep(6000);
        //assertThat($(".k-pager-info").text(), is("1 - 1 of 1 items"));
        $(By.className("k-pager-info")).shouldHave(text("items"));
    }
}