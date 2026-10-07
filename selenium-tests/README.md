# Axon Forge — Selenium Test Suite

[![Selenium](https://img.shields.io/badge/Selenium-4.48-43B02A?style=flat-square&logo=selenium&logoColor=white)](https://www.selenium.dev/)
[![Java](https://img.shields.io/badge/Java-21-007396?style=flat-square&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![TestNG](https://img.shields.io/badge/TestNG-7.11-orange?style=flat-square)](https://testng.org/)
[![Maven](https://img.shields.io/badge/Build-Maven-C71A36?style=flat-square&logo=apachemaven&logoColor=white)](https://maven.apache.org/)
[![CI](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)](../../actions)

Automated QA test suite for the **Axon Forge** web application — covering network monitoring, form automation, and UI verification. Runs automatically on every push via GitHub Actions.

---

## Table of Contents

- [What This Suite Tests](#what-this-suite-tests)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Running Locally](#running-locally)
- [Continuous Integration](#continuous-integration)

---

## What This Suite Tests

| Test Class | Purpose |
|---|---|
| `AxonForgeNetworkTest` | Captures live network activity (API calls, status codes) via Chrome DevTools Protocol — separates frontend rendering issues from backend/API failures at a glance. |
| `RelativeLocatorTest` | Automates the Contact form using Selenium 4 Relative Locators, Explicit Waits, and a Page Object Model (`ContactPage.java`) for maintainable, reusable locators. |
| `ElementScreenshotTest` | Captures a screenshot of a single form field (not the full page) to verify specific UI elements render as expected. |
| `ContactFormTest` | Data-driven TestNG suite — submits the Contact form across multiple input sets (valid data + edge cases like an empty optional field) and asserts successful submission. |

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Java 21 | Language |
| Selenium 4.48 | Browser automation |
| TestNG 7.11 | Test runner, assertions, data providers |
| Apache Commons IO | File handling for screenshots |
| Maven | Dependency management & build |
| GitHub Actions | Continuous Integration |

---

## Project Structure

selenium-tests/
├── src/test/java/
│ ├── ContactPage.java # Page Object Model — Contact form
│ ├── ContactFormTest.java # Data-driven TestNG test
│ ├── RelativeLocatorTest.java # Relative locators + explicit waits
│ └── ElementScreenshotTest.java # Single-element screenshot capture
├── testng.xml # TestNG suite configuration
└── pom.xml # Maven dependencies & build config

---

## Running Locally

**Prerequisites:** Java 21 · Maven · Google Chrome

```bash
# 1. Start the backend
cd ../backend
uvicorn main:app --port 8000

# 2. Start the frontend (new terminal)
cd ../frontend
npm run dev

# 3. Run the test suite (new terminal)
cd selenium-tests
mvn test
```

Reports are generated after each run in:
- `target/surefire-reports/`
- `test-output/` (TestNG HTML report)

---

## Continuous Integration

Every push to `main` triggers [`selenium-tests.yml`](../.github/workflows/selenium-tests.yml), which:

1. Spins up a fresh Ubuntu environment
2. Installs Java, Node, and Python
3. Starts the backend and frontend
4. Runs the full Selenium/TestNG suite headlessly via Maven

Check the **[Actions tab](../../actions)** for pass/fail status on any commit.

---

<div align="center">

**Built as part of the Axon Forge QA automation initiative.**

</div>