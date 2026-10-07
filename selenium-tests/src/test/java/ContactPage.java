import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

// This class represents ONE page: the Contact page.
// All its locators and actions live here, in one place.
public class ContactPage {
    private WebDriver driver;
    private WebDriverWait wait;

    // Locators — defined once, reused by every method below
    private By nameField = By.name("name");
    private By emailField = By.name("email");
    private By companyField = By.name("company");
    private By phoneField = By.name("phone");
    private By subjectField = By.name("subject");
    private By messageField = By.name("message");
    private By sendButton = By.xpath("//button[contains(text(),'Send')]");

    // Constructor: pass in the driver when creating this page object
    public ContactPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void open() {
        driver.get("http://localhost:5173/contact");
        wait.until(ExpectedConditions.visibilityOfElementLocated(nameField));
    }

    public void fillForm(String name, String email, String company, String phone, String subject, String message) {
        driver.findElement(nameField).sendKeys(name);
        driver.findElement(emailField).sendKeys(email);
        driver.findElement(companyField).sendKeys(company);
        driver.findElement(phoneField).sendKeys(phone);
        driver.findElement(subjectField).sendKeys(subject);
        driver.findElement(messageField).sendKeys(message);
    }

    public void clickSend() throws InterruptedException {
        WebElement button = wait.until(ExpectedConditions.elementToBeClickable(sendButton));
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView({block: 'center'});", button);
        Thread.sleep(500);
        js.executeScript("arguments[0].click();", button);
    }
}