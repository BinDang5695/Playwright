export const Menu = {
  DASHBOARD: "Dashboard",
  CUSTOMERS: "Customers",
  PROJECTS: "Projects",
  TASKS: "Tasks",
  SALES: "Sales",
  INVOICES: "Invoices",
  EXPENSES: "Expenses",
  CONTRACTS: "Contracts",
  KNOWLEDGE_BASE: "Knowledge Base",
  LEADS: "Leads",
  ITEMS: "Items",
  PROPOSALS: "Proposals"
} as const;

export const Message = {
  CREATED: "Contract added successfully.",
  UPDATED: "Contract updated successfully.",
  NO_DATA: "No entries found"
} as const;

export const Button = {
  NEWCONTRACT: "New Contract",
  SUBMIT: "submit",
  MORE: "More",
  DELETE: "Delete"
} as const;

export const Dropdown = {
  CLIENT_ID: "clientid",
  CONTRACT_TYPE: "contract_type",
} as const;

export const Number = {
  ONE: 1,
  TWO: 2,
} as const;

export const Delay = {
  ONE_HUNDRED_MILLISECONDS: 100,
} as const;

export const Input = {
  CONTRACT_VALUE: "contract_value",
  DESCRIPTION: "description",
  SEARCH_CONTRACT: "contracts",
  SUBJECT: "subject",
  DATESTART: "datestart",
  DATEEND: "dateend"
} as const;