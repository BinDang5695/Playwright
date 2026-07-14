import { Contract } from '@models/types/contract.model'

export const contractData: Contract = {
  customer: 'Bin Customer',
  subject: 'Bin Subject',
  value: '1000',
  contractType: '1',
  startDate: '18-11-2040',
  endDate: '18-11-2040',
  description: 'Bin Description',
}

export const updatedContractData: Contract = {
  customer: 'Bin Customer',
  contractType: '1',
  subject: 'Bin Subject Updated',
  value: '2000',
  startDate: '18-11-2045',
  endDate: '18-11-2045',
  description: 'Bin Description Updated',
}