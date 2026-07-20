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
├── .auth/                                            # Playwright authentication storageState files
│   ├── crm-dev                                       # Authentication state for CRM Dev environment
│   │   ├── admin.json                                # Admin user storageState
│   │   └── projectmanager.json                       # Project Manager user storageState
│   ├── crm-prod                                      # Authentication state for CRM Prod environment
│   │   ├── admin.json                                # Admin user storageState
│   │   └── projectmanager.json                       # Project Manager user storageState
│   └── crm-uat                                       # Authentication state for CRM UAT environment
│   │   ├── admin.json                                # Admin user storageState
│   │   └── projectmanager.json                       # Project Manager user storageState
├── .github                                            
│   └─ workflows                                       
│   │   └─ playwright.yml                             # GitHub Actions CI workflow
├── .vscode/                                          
│   └── settings.json                                 # Shared VS Code workspace settings
├── allure-results/                                   # Raw Allure execution results
├── allure-report/                                    # Generated Allure HTML report
├── api/                                              
│   ├── common/                                      
│   │   ├── ApiClient.ts                              # Reusable Playwright API client
│   │   ├── ApiLogger.ts                              # API request/response logging
│   │   ├── Config.ts                                 # API configuration
│   │   ├── EndpointGlobal.ts                         # API endpoint definitions
│   │   ├── VerifyResponseBody.ts                     # Common response body assertions
│   │   └── VerifyResponseHeaders.ts                  # Common response header assertions
│   ├── services/
│   │   ├── AuthService.ts                            # Authentication API service methods
│   │   ├── BookService.ts                            # Book API service methods                                        
│   │   ├── ImageService.ts                           # Image API service methods
│   │   └── UserService.ts                            # User API service methods
│   └── verify/                                         
│   │   ├── VerifyBookResponseBody.ts                 # Book API response assertions
│   │   ├── VerifyImageResponseBody.ts                # Image API response assertions
│   │   └── VerifyUserResponseBody.ts                 # User API response assertions
├── constants/                                        
│   └── crm.ts                                        # Shared constants and menu definitions
├── downloads/                                        # Downloaded files during test runs
├── env/
│   ├── profiles/
│   │   ├── .env.crm-dev                              # Development environment variables
│   │   ├── .env.crm-prod                             # Production environment variables
│   │   └── .env.crm-uat                              # UAT environment variables
│   ├── environment.ts                                # Environment loader
│   ├── global.setup.ts                               # UI authentication setup (storageState)
│   └── users.ts                                      # User credentials by role
├── fixtures/
│   ├── api.fixture.ts                                # Shared API fixtures
│   └── ui.fixture.ts                                 # Shared UI fixtures
├── models/
│   ├── helpers/                                      # Shared helper utilities
│   │   ├── ApiHelper.ts                              # Common API helper methods
│   │   ├── DateHelpers.ts                            # Date and time utility methods
│   │   └── FileHelpers.ts                            # File handling utility methods
│   └── types/                                        # TypeScript models and interfaces
│       ├── api/
│       │   ├── book.model.ts                         # Book API request/response model
│       │   ├── image.model.ts                        # Image API request/response model
│       │   └── user.model.ts                         # User API request/response model
│       └── ui/
│           ├── contact.model.ts                      # Contact test data model
│           ├── contract.model.ts                     # Contract test data model
│           ├── customer.model.ts                     # Customer test data model
│           ├── customerdriven.model.ts               # Data-driven customer model
│           ├── expenses.model.ts                     # Expense test data model
│           ├── export-data.model.ts                  # Export data model
│           ├── file.model.ts                         # File upload/download model
│           ├── item.model.ts                         # Item test data model
│           ├── knowledge.model.ts                    # Knowledge Base test data model
│           ├── lead.model.ts                         # Lead test data model
│           ├── project.model.ts                      # Project test data model
│           ├── proposal.model.ts                     # Proposal test data model
│           └── task.model.ts                         # Task test data model
├── node_modules/                                     # Installed project dependencies
├── pages/
│   ├── BasePage.ts                                   # Base page with common Playwright actions
│   ├── ContactsPage.ts                               # Contacts page object
│   ├── ContractsPage.ts                              # Contracts page object
│   ├── CustomerPage.ts                               # Customer page object
│   ├── ExpensesPage.ts                               # Expenses page object
│   ├── ItemsPage.ts                                  # Items page object
│   ├── KnowledgeBasePage.ts                          # Knowledge Base page object
│   ├── LeadsPage.ts                                  # Leads page object
│   ├── LoginPage.ts                                  # Login page object
│   ├── ProjectsPage.ts                               # Projects page object
│   ├── ProposalsPage.ts                              # Proposals page object
│   └── TasksPage.ts                                  # Tasks page object
├── playwright-report/
│   └── index.html                                    # Generated Playwright HTML report
├── test_data/
│   ├── api/                                          # API test data, payloads and JSON schemas
│   │   ├── book.data.ts                              # Book API test data
│   │   ├── config.json                               # API configuration data
│   │   ├── CreateBookSchema.json                     # JSON schema for Create Book response
│   │   ├── CreateImageSchema.json                    # JSON schema for Create Image response
│   │   ├── CreateTokenSchema.json                    # JSON schema for Login response
│   │   ├── CreateUserSchema.json                     # JSON schema for Create User response
│   │   ├── DeleteBookSchema.json                     # JSON schema for Delete Book response
│   │   ├── DeleteUserSchema.json                     # JSON schema for Delete User response
│   │   ├── GetBookAfterDeleteSchema.json             # JSON schema after deleting a Book
│   │   ├── GetBookAfterPutSchema.json                # JSON schema after updating a Book
│   │   ├── GetBookSchema.json                        # JSON schema for Get Book response
│   │   ├── GetImageAfterDeleteSchema.json            # JSON schema after deleting an Image
│   │   ├── GetImageAfterPutSchema.json               # JSON schema after updating an Image
│   │   ├── GetImageSchema.json                       # JSON schema for Get Image response
│   │   ├── GetUserAfterDeleteSchema.json             # JSON schema after deleting a User
│   │   ├── GetUserAfterPutSchema.json                # JSON schema after updating a User
│   │   ├── GetUserSchema.json                        # JSON schema for Get User response
│   │   ├── image.data.ts                             # Image API test data
│   │   ├── LoginSchema.json                          # JSON schema for authentication response
│   │   ├── UpdateBookSchema.json                     # JSON schema for Update Book response
│   │   ├── UpdateImageSchema.json                    # JSON schema for Update Image response
│   │   ├── UpdateUserSchema.json                     # JSON schema for Update User response
│   │   └── user.data.ts                              # User API test data
│   ├── ui/                                           # UI test data files
│   │   ├── Binitems.csv                              # CSV file for data-driven testing
│   │   ├── contact.data.ts                           # Contact test data
│   │   ├── contract.data.ts                          # Contract test data
│   │   ├── customer.data.ts                          # Customer test data
│   │   ├── CustomerData.json                         # Customer data-driven dataset
│   │   ├── expenses.data.ts                          # Expenses test data
│   │   ├── item.data.ts                              # Item test data
│   │   ├── knowledge.data.ts                         # Knowledge Base test data
│   │   ├── lead.data.ts                              # Lead test data
│   │   ├── login.data.ts                             # Login credentials and test data
│   │   ├── project.data.ts                           # Project test data
│   │   ├── proposal.data.ts                          # Proposal test data
│   │   └── task.data.ts                              # Task test data
│   ├── sample_image.jpg                              # Image upload testing for UI and API
│   └── UK.jpg                                        # Image upload testing for UI and API
├── test-results/                                     # Playwright execution artifacts
├── tests/
│   ├── api/                                          # API test suites
│   │   ├── ApiBookTest.spec.ts                       # Book API CRUD tests
│   │   ├── ApiImageTest.spec.ts                      # Image API CRUD tests
│   │   └── ApiUserTest.spec.ts                       # User API CRUD tests
│   └── ui/                                           # UI feature test suites
│   │   ├── ContractTest.spec.ts                      # Contract feature tests
│   │   ├── CustomerDataDrivenTest.spec.ts            # Customer data-driven tests
│   │   ├── CustomerTest.spec.ts                      # Customer feature tests
│   │   ├── ExpensesTest.spec.ts                      # Expenses feature tests
│   │   ├── ItemTest.spec.ts                          # Item feature tests
│   │   ├── KnowledgeBaseTest.spec.ts                 # Knowledge Base feature tests
│   │   ├── LeadTest.spec.ts                          # Lead feature tests
│   │   ├── LoginTest.spec.ts                         # Login feature tests
│   │   ├── ProjectTest.spec.ts                       # Project feature tests
│   │   ├── ProposalTest.spec.ts                      # Proposal feature tests
│   │   └── TaskTest.spec.ts                          # Task feature tests
├── .gitignore                                        # Git ignored files
├── package-lock.json                                 # Locked dependency versions
├── package.json                                      # Project npm scripts
├── playwright.config.ts                              # Playwright configuration
├── README.md                                         # Project documentation
└── tsconfig.json                                     # TypeScript compiler configuration
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

   
### Run UI tests on Chrome/Edge

```sh
For Chrome, Execute the command in the terminal: 
npm run test:ui:dev:chrome

For Edge, Execute the command in the terminal: 
npm run test:ui:dev:edge
```

### Run API tests only (include all API test suite)

```sh
Execute the command in the terminal: 
npm run test:api
```

### Run tests by feature tags (example 1 test suite)

```sh
Execute the command in the terminal: 
npm run test:crm:login:chrome
```

Please see the package.json file for more details

### Run tests in parallel

We can run test cases in parallel in two ways

Option #1: Modify the "workers" field in the playwright.config.ts page -> this option will affect all test suites

Option #2: Add --workers arguments in the test run commands (only affect for specific test run)

```sh
Run Login test suite with many workers
npm run test:crm:login:edge -- --workers=<number-of-workers>
```

For more details, please refer to Playwright document
[Playwright Parallelism and sharding](https://playwright.dev/docs/test-parallel)

### Run Linting to check coding convention of all projects (by ESLint)

```sh
Execute the command in the terminal: 
npm run lint
```
### How to configure and run tests on different environment or browser
Playwright has many options to configure how your tests are run. You can specify these options in the configuration file. Therefore, we can configure the enviroment which we use to run test in Project section of configuration file like below:

<img width="726" height="1026" alt="image" src="https://github.com/user-attachments/assets/2e0bfeda-37fd-4d85-bd4f-cc37139f58b7" />

In this sample, we configure 2 projects (1 for Chrome and 1 for Edge) in order to run all tests on different browsers. We can also configure different baseURl for different Environments here.
Then, we can specify the scripts to run on multi environments on package.json file like below:

<img width="1117" height="961" alt="image" src="https://github.com/user-attachments/assets/f07ce1f2-833f-4376-8af0-0d9c846fe5bb" />

Finally, we can use npm run command to specify the enviroment that we want to run. For example, if we want to run all tests UI and API on Chromium we can use below command:
```sh
npm run test:all
npm run test:all:chrome
npm run test:all:edge
```
<img width="1457" height="398" alt="image" src="https://github.com/user-attachments/assets/138b9a4d-6b29-442d-91b8-46acc9d7ba95" />

### Generate Report

```
After running test complete, we can execute the following command in Visual Code Terminal window or CMD window:
npm run create:report

The HTML report will be generated in folder TestReport in root folder

We can change the type of reporter (JUnit, customized, 3rd party reporter - Allure, etc) in the playwright.config.ts file

Execute this command for generating Playwright report:
npm run create:playwright:report
```

<img width="1095" height="948" alt="image" src="https://github.com/user-attachments/assets/189a2778-5623-4da4-a167-316c7715cec3" />

For more details, please refer to Playwright document
[Playwright Test Configuration](https://playwright.dev/docs/test-configuration)

