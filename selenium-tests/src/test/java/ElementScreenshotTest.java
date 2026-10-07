import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.chrome.ChromeDriver;
import org.apache.commons.io.FileUtils;
import java.io.File;

public class ElementScreenshotTest {
    public static void main(String[] args) throws InterruptedException, java.io.IOException {
        ChromeDriver driver = new ChromeDriver();

        System.out.println("Opening Contact page...");
        driver.get("http://localhost:5173/contact");
        Thread.sleep(3000);

        WebElement nameField = driver.findElement(By.name("name"));
        nameField.sendKeys("Mumtaz Ali");

        File elementScreenshot = nameField.getScreenshotAs(OutputType.FILE);

        File destination = new File("screenshots/name-field.png");
        FileUtils.copyFile(elementScreenshot, destination);

        System.out.println("Saved element screenshot to: " + destination.getAbsolutePath());

        driver.quit();
    }
}