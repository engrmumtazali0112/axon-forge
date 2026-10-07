import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;
import org.testng.annotations.DataProvider;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.AfterMethod;
import org.testng.Assert;

public class ContactFormTest {
    private ChromeDriver driver;
    private ContactPage contactPage;

    @BeforeMethod
        public void setUp() {
            org.openqa.selenium.chrome.ChromeOptions options = new org.openqa.selenium.chrome.ChromeOptions();
            options.addArguments("--headless=new");
            options.addArguments("--no-sandbox");
            options.addArguments("--disable-dev-shm-usage");
            driver = new ChromeDriver(options);
            contactPage = new ContactPage(driver);
        }

    // This method supplies the test data — one Object[] row = one test run.
    // Columns match the parameters of the @Test method below, in order.
    @DataProvider(name = "contactFormData")
    public Object[][] getContactData() {
        return new Object[][] {
            // name, email, company, phone, subject, message
            { "Mumtaz Ali", "qa@test.com", "Axon Forge QA", "+92 347 6338292", "Valid Submission", "Testing with valid data." },
            { "Ayesha Khan", "ayesha@company.com", "Khan Traders", "+92 300 1112233", "Another Valid Case", "Second valid data set." },
            { "No Company User", "nocompany@test.com", "", "+92 321 9998877", "Empty Company Field", "Company field left blank on purpose." }
        };
    }

    // dataProvider = "contactFormData" tells TestNG: run this test once per row above
    @Test(dataProvider = "contactFormData")
    public void testContactFormSubmission(String name, String email, String company,
                                           String phone, String subject, String message) throws InterruptedException {
        contactPage.open();
        contactPage.fillForm(name, email, company, phone, subject, message);
        contactPage.clickSend();

        Assert.assertTrue(driver.getCurrentUrl().contains("contact"),
            "Expected to still be on the contact page after submit for: " + name);
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}