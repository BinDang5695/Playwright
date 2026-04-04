# PlaywrightFramework

Playwright TypeScript Automation Framework

## Playwright Introduction

* Playwright is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API. Playwright is built to enable cross-browser web automation that is ever-green, capable, reliable and fast. Headless execution is supported for all browsers on all platforms.
* As Playwright is written by the creators of the Puppeteer, you would find a lot of similarities between them.
* Playwright has its own test runner for end-to-end tests, we call it Playwright Test.
* Cross-browser. Playwright supports all modern rendering engines including Chromium, WebKit, and Firefox.
* Cross-platform. Test on Windows, Linux, and macOS, locally or on CI, headless or headed.
* Cross-language. Use the Playwright API in TypeScript, JavaScript, Python, .NET, Java. The core framework is implemented using TypeScript.
* Playwright development is sponsored by Microsoft.

[GitHub](https://github.com/microsoft/playwright)
[Documentation](https://playwright.dev/docs/intro)
[API reference](https://playwright.dev/docs/api/class-playwright/)
[Changelog](https://github.com/microsoft/playwright/releases)

# Playwright - Framework

This is an automation framework using Playwright written in TypeScript.

## Framework Structure

```
non-bdd
├── .auth/                                            
│   ├── cms-user.json                                 # Auth of CMS after login
│   └── crm-user.json                                 # Auth of CRM after login
├── .github                                            
│   └─ workflows                                       
│   │   └─ playwright.yml                             # GitHub Actions file - auto run
├── .vscode/                                          
│   └── settings.json                                 # Shared TypeScript & editor
├── allure-results/                                   # Raw Allure result files generated after each test run
├── allure-report/                                    # Generated Allure HTML report — served via allure open
├── api/                                              
│   ├── book/                                         
│   │   ├── BookBuilder.ts                            # Generate random Book data using faker
│   │   ├── BookCreateRequest.ts                      # Interface defining Book request payload
│   │   ├── BookService.ts                            # HTTP methods for Book API
│   │   ├── VerifyBookHeaders.ts                      # Assertions for Book response headers
│   │   └── VerifyBookResponseBody.ts                 # Assertions for Book response body
│   ├── booking/                                      
│   │   ├── BookingBuilder.ts                         # Generate random Booking data using faker
│   │   ├── BookingCreateRequest.ts                   # Interface defining Booking request payload
│   │   ├── BookingService.ts                         # HTTP methods for Booking API
│   │   ├── CreateBooking.ts                          # Interface defining Booking auth payload
│   │   ├── CreateToken.ts                            # Generate token credentials from config
│   │   ├── VerifyBookingHeaders.ts                   # Assertions for Booking response headers
│   │   ├── VerifyBookingResponseBody.ts              # Assertions for Booking response body
│   │   └── VerifyBookingResponseBody.ts              # Assertions for Booking response body
│   ├── common/                                       
│   │   ├── ApiLogger.ts                              # Log request & response details to console
│   │   ├── ApiTestHelper.ts                          # Schema validation & response time assertion
│   │   ├── BaseApiService.ts                         # Base class for sending HTTP requests
│   │   ├── BaseTestApi.ts                            # Custom fixture — login & cache token for Book API
│   │   ├── BaseTestApiBooking.ts                     # Custom fixture — login & cache token for Booking API
│   │   ├── ConfigLoader.ts                           # Read & parse JSON config files from @data
│   │   ├── ConfigsBooking.ts                         # Booking environment config
│   │   ├── ConfigsGlobal.ts                          # Global environment config
│   │   ├── EndpointGlobal.ts                         # All API endpoint constants in one place
│   │   ├── LoginBuilder.ts                           # Generate login payload from global config
│   │   └── LoginPOJO.ts                              # Interface defining login request payload
│   ├── image/                                        
│   │   ├── ImagePath.ts                              # Resolve file paths for create & update image
│   │   ├── ImageService.ts                           # HTTP methods for Image API
│   │   ├── VerifyImageHeaders.ts                     # Assertions for Image response headers
│   │   └── VerifyImageResponseBody.ts                # Assertions for Image response body
│   └── user/                                         
│   │   ├── UserBuilder.ts                            # Generate random User data using faker
│   │   ├── UserCreateRequest.ts                      # Interface defining User request payload
│   │   ├── UserService.ts                            # HTTP methods for User API
│   │   ├── VerifyUserHeaders.ts                      # Assertions for User response headers
│   │   └── VerifyUserResponseBody.ts                 # Assertions for User response body
├── constants/                                        
│   └── crm.ts                                        # Static constants for CRM UI tests
├── downloads/                                        # Downloaded files during test runs
├── env/
│   ├── profiles/
│   │   ├── .env.crm-dev                              # CRM dev environment config
│   │   └── .env.cms-dev                              # CRM dev environment config
│   └── global.setup.ts                               # Global auth setup — login & save storageState for each app
├── fixtures/
│   ├── cms.fixture.ts                                # Extends base test with CMS project object instances
│   ├── crm.fixture.ts                                # Extends base test with CRM project object instances
│   └── fb.fixture.ts                                 # Extends base test with Football project object instances
├── models/
│   ├── helpers/
│   │   ├── DateHelpers.ts                            # Utility methods for date formatting and offset calculation
│   │   ├── FileHelpers.ts                            # Utility methods for reading and deleting PDF/CSV/Excel files
│   │   └── SystemHelper.ts                           # Utility methods for resolving file system paths
│   └── types/
│   │   ├── cms/
│   │   │   ├── category.model.ts                     # Type definition for Category test data
│   │   │   └── product.model.ts                      # Type definition for Product test data
│   │   ├── crm/
│   │   │   ├── contact.model.ts                      # Type definition for Contact test data
│   │   │   ├── contract.model.ts                     # Type definition for Contract test data
│   │   │   ├── customer.model.ts                     # Type definition for Customer test data
│   │   │   ├── customerdriven.model.ts               # Type definition for Customer driven test data
│   │   │   ├── expenses.model.ts                     # Type definition for Expenses test data
│   │   │   ├── file.model.ts                         # Type definition for File test data
│   │   │   ├── item.model.ts                         # Type definition for Item test data
│   │   │   ├── knowdledge.model.ts                   # Type definition for Knowdledge test data
│   │   │   ├── lead.model.ts                         # Type definition for Lead test data
│   │   │   ├── project.model.ts                      # Type definition for Project test data
│   │   │   ├── proposal.model.ts                     # Type definition for Proposal test data
│   │   │   └── task.model.ts                         # Type definition for Task test data
│   │   └── fb/
│   │   │   └── fb.model.ts                           # Type definition for FB test data
├── pages/
│   ├── cms/
│   │   ├── CategoryPage.ts                           # Category page actions
│   │   ├── CMSBasePage.ts                            # CMS-specific base page
│   │   ├── LoginPage.ts                              # Login page actions
│   │   └── ProductsPage.ts                           # Products page actions
│   ├── crm/
│   │   ├── BasePage.ts                               # Root base page — core Playwright wrappers shared across all page objects
│   │   ├── ContactsPage.ts                           # Contacts page actions
│   │   ├── ContractsPage.ts                          # Contracts page actions
│   │   ├── CRMBasePage.ts                            # CRM-specific base page
│   │   ├── CustomerPage.ts                           # Customer page actions
│   │   ├── ExpensesPage.ts                           # Expenses page actions
│   │   ├── ItemsPage.ts                              # Items page actions
│   │   ├── KnowledgeBasePage.ts                      # KnowledgeBase page actions
│   │   ├── LeadsPage.ts                              # Leads page actions
│   │   ├── LoginPage.ts                              # Login page actions
│   │   ├── ProjectsPage.ts                           # Projects page actions
│   │   ├── ProposalsPage.ts                          # Proposals page actions
│   │   └── TasksPage.ts                              # Tasks page actions
│   └── football/
│   │   ├── FBBasePage.ts                             # FB-specific base page
│   │   └── RegistrationPage.ts                       # Registration page actions
├── playwright-report/
│   └── index.html                                    # Auto-generated HTML test report (gitignored)
├── test_data/
│   ├── api/                                          # Static JSON files for API tests — request payloads,response schemas, and environment configs
│   ├── cms/                                          # Typed test data objects for CMS UI tests — category, product,...
│   ├── crm/                                          # Typed test data objects for CRM UI tests — leads, customers,...
│   └── fb/                                           # Typed test data objects for FB UI tests
├── tests/
│   ├── api/                                          # API test suites — serial flows covering CRUD operations with schema validation and response body verification
│   ├── cms/                                          # CMS UI test suites — feature-based test files
│   ├── crm/                                          # CRM UI test suites — feature-based test files
│   └── football/                                     # FB UI test suites — feature-based test files
├── utils/
│   └── env.ts                                        # Typed accessors for runtime environment variables
├─ package-lock.json                                  # Provide an immutable version of package.json
├─ package.json                                       # Contains basic information about the project,registered dependencies and running script
├─ playwright.config.ts                               # PlayWright configuration file
├─ README.md                                          # Starting guideline
└─ tsconfig.json                                      # The tsconfig.json file specifies the root files and the compiler options required to compile the project.

```

## Requirements

```
- Visual Code
- NodeJS version > 14 (Node.js 14 is no longer supported since it reached its end-of-life on April 30, 2023.)
- Playwright 1.32.3
```

# Getting Started

```
This is the quick and easy getting started assuming you already have git, Visual Code and NodeJS installed.
```

## Open project in Visual Code

```
- Launch Visual Code
- File -> Open Folder OR ctrl+K ctrl+O
- Select project root folder
```

## Install the required items

1. Install all required packages for project defined in the package.json file: Playwright, etc

```sh

Open Terminal window in Visual Code (ctrl + `) then execute command:
npm install

Or go to project root folder then open CMD windows and execute command:
npm install

```

2. Install Playwright Browsers

```sh

Open Terminal window in Visual Code (ctrl + `) then execute command:
npx playwright install

Or go to project root folder then open CMD windows and execute command:
npx playwright install

```

## Run Tests

### Run tests by Playwright VSCode extension

1. Install Playwright Test for VS Code extension on VS Code Marketplace (https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
2. You can run a single test by clicking the green triangle next to your test block to run your test. Playwright will run through each line of the test and when it finishes you will see a green tick next to your test block as well as the time it took to run the test.
![Run Test](https://user-images.githubusercontent.com/13063165/212735762-51bae36b-8c91-46f1-bd3a-24bd29f853d2.png)
3. You can also run your tests and show the browsers by selecting the option Show Browsers in the testing sidebar. Then when you click the green triangle to run your test the browser will open and you will visually see it run through your test. Leave this selected if you want browsers open for all your tests or uncheck it if you prefer your tests to run in headless mode with no browser open.
![Run Test](https://user-images.githubusercontent.com/13063165/212737059-0c52cda1-829d-4cda-9ca8-33741c87dfff.png)

   
### Run tests on Chrome (include CRM/CMS/FB test suite)

```sh
For Chrome, Execute the command in the terminal: 
npm run test:cms
npm run test:fb
npm run test:crm
```

### Run API tests only (include all API test suite)

```sh
Execute the command in the terminal: 
npm run test:api
```

### Run tests by feature tags (example 1 test suite)

```sh
Execute the command in the terminal: 
npm run test:crm:task
```

Please see the package.json file for more details

### Run tests in parallel

We can run test cases in parallel in two ways

Option #1: Modify the "workers" field in the playwright.config.ts page -> this option will affect all test suites

Option #2: Add --workers arguments in the test run commands (only affect for specific test run)

```sh
Run Login test suite with many workers
npm run test:crm -- --workers=<number-of-workers>
```

For more details, please refer to Playwright document
[Playwright Parallelism and sharding](https://playwright.dev/docs/test-parallel)


### Generate Report

```
After running test complete, we can execute the following command in Visual Code Terminal window or CMD window:
npm run create:report

The HTML report will be generated in folder TestReport in root folder

We can change the type of reporter (JUnit, customized, 3rd party reporter - Allure, etc) in the playwright.config.ts file

Execute this command for generating Allure report:
npm run create:allure-report
```

### Run Linting to check coding convention of all projects (by ESLint)

```sh
Execute the command in the terminal: 
npm run lint
```

Finally, we can use npm run command to specify the enviroment that we want to run. For example, if we want to run all tests UI and API on Chromium we can use below command:
```sh
npm run test:all
```
For more details, please refer to Playwright document
[Playwright Test Configuration](https://playwright.dev/docs/test-configuration)






























