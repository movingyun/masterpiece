package com.ssafy.backend.service;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Service;

@Service
public class SeleniumServiceImpl implements SeleniumService{
    // WebDriver
    private static WebDriver driver;
    // Properties
    public static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    public static final String WEB_DRIVER_PATH = "chromedriver.exe";
    // 크롤링 할 URL
    private static String base_url;
    private static String englishName;

    @Override
    public String makeName(String englishName) {
        this.englishName = englishName;
        SeleniumServiceImpl test = new SeleniumServiceImpl();
        String hangulName=test.crawl();
        return hangulName;
    }

    public SeleniumServiceImpl() {
        // System Property SetUp
        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

        // Driver SetUp
        // 크롬 설정을 담은 객체 생성
        ChromeOptions options = new ChromeOptions();
        options.addArguments("headless");
        options.addArguments("--start-maximized");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--disable-popup-blocking");
        driver = new ChromeDriver(options);
        base_url = "https://transliterator.herokuapp.com/#"+englishName;
    }

    static public String crawl() {
        try {
            // get page (= 브라우저에서 url을 주소창에 넣은 후 request 한 것과 같다)
            driver.get(base_url);
            Thread.sleep(1000);

            WebElement element = driver.findElement(By.id("output"));
            String hangulName = element.getText() ;
            System.out.println(hangulName);
            return hangulName;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.close();
        }
        return null;
    }
}
