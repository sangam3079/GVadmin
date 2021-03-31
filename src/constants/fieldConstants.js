/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
export const MAX_VALUE = {
  cliffInMonths: 150,
  maxShares    : 2000000000,
  maxCurrency  : 999999999999,
  normalFields : 200,
  currencyField: 17,
  maxStockPrice: 1000000
}

export const MIN_VALUE = {
  year: 1850
}

export const SOURCE = {
  1: 'System(Admin/User)',
  2: 'Crunchbase',
  3: 'Financialmodelingprep',
  4: 'iexcloud',
  5: 'GroomedData',
}
export const SOURCE_OPTION = [
  { id: '1', value: 'Self', label: 'Self' },
  { id: '2', value: 'Crunchbase', label: 'Crunchbase' },
  { id: '5', value: 'GroomedData', label: 'GroomedData' },
  { id: '6', value: 'Pitchbook', label: 'Pitchbook' },
]

export const FUNDING_ROUNDS = [
  { id: 'seed', value: 'Seed', label: 'Seed' },
  { id: 'A', value: 'Series A', label: 'Series A' },
  { id: 'B', value: 'Series B', label: 'Series B' },
  { id: 'C', value: 'Series C', label: 'Series C' },
  { id: 'D', value: 'Series D', label: 'Series D' },
  { id: 'E', value: 'Series E', label: 'Series E' },
  { id: 'F', value: 'Series F', label: 'Series F' },
  { id: 'G', value: 'Series G', label: 'Series G' },
  { id: 'H', value: 'Series H', label: 'Series H' },
]

export const ADMINS = [{ id: 'user_admin', value: 'User Admin' }, { id: 'admin', value: 'Site Admin' }]

export const CURRENT_COMPANY = 'Current Company'
export const CURRENT_COMPANY_PATH = 'current_company'
