package com.c3t;

import com.codeborne.selenide.Selectors;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static com.codeborne.selenide.Condition.text;
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


    @Test
    public void setUp() {
        // Set authentication
        open(BASE_URL+ "login");
        refresh();
        $("input[name='username']").setValue("superuser@bge.com");
        $(Selectors.byName("password")).setValue("test123");
        $("[type='submit']").click();
    }

    @Test
    public void searchSubscriberValidation() {
        //System.out.println("Now the output is printed!");
        open(BASE_URL+ "subscribers");
        refresh();
        //$("#subscriberSubmit").click();
        $("[type='submit']").click();
        assertThat($("#programAlert div").text(), is("Please enter at least one search criteria"));
    }
}