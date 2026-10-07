import org.openqa.selenium.chrome.ChromeDriver;

public class RelativeLocatorTest {
    public static void main(String[] args) throws InterruptedException {
        ChromeDriver driver = new ChromeDriver();

        ContactPage contactPage = new ContactPage(driver);

        System.out.println("Opening Contact page...");
        contactPage.open();

        System.out.println("Filling the form...");
        contactPage.fillForm(
            "Mumtaz Ali",
            "qa@test.com",
            "Axon Forge QA",
            "+92 347 6338292",
            "Page Object Model Test",
            "Testing the Page Object Model pattern on Axon Forge."
        );

        System.out.println("Clicking Send...");
        contactPage.clickSend();

        System.out.println("Test complete!");
        driver.quit();
    }
}