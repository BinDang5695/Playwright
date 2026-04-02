import { Contract } from '@models/types/crm/contract.model'

export const contractData: Contract = {
  customer: 'Bin Customer',
  subject: 'Bin Subject',
  value: '1000',
  contractType: '1',
  startDate: '18-11-2027',
  endDate: '18-11-2027',
  description: 'Bin Description',
}

export const updatedContractData: Contract = {
  customer: 'Bin Customer',
  contractType: '1',
  subject: 'Bin Subject Updated',
  value: '2000',
  startDate: '18-11-2028',
  endDate: '18-11-2028',
  description: 'Bin Description Updated',
}