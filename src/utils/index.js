/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import { format, differenceInMonths } from 'date-fns'
import { range } from 'lodash'
import { MIN_VALUE } from 'constants/fieldConstants'
import cookie from './cookie'
import customFetch from './customFetch'


export const isObject = obj => obj && typeof obj === 'object'

export const isArray = obj => obj && isObject(obj) && obj instanceof Array

export const isEmpty = obj => {
  // eslint-disable-next-line
  for (const key in obj) {
    if (key in obj) return false
  }
  return true
}

// auth related

export const isLogin = () => {
  if (cookie.getSession()) {
    return true
  }
  return false
}

export const isSubmitButtonDisabled = props => {
  const { invalid, submitting, pristine } = props
  return invalid || submitting || pristine
}

export const humanize = path => {
  // eslint-disable-line import/prefer-default-export
  if (path !== null) {
    const spath = path.split('_')
    const readableValue = spath
      .map(p => p.charAt(0).toUpperCase() + p.substr(1).toLowerCase())
      .join(' ')
    return readableValue
  }
  return ''
}

export const getAllUrlParams = url => {
  // get query string from url (optional) or window
  const queryString = url ? url.split('?')[1] : window.location.search.slice(1)

  // we'll store the parameters here
  const obj = {}

  // if query string exists
  if (queryString) {
    // split our query string into its component parts
    const arr = queryString.split('#')[0].split('&')

    for (let i = 0; i < arr.length; i += 1) {
      // separate the keys and the values
      const a = arr[i].split('=')

      // in case params look like: list[]=thing1&list[]=thing2
      // eslint-disable-next-line
      let paramNum = undefined
      // eslint-disable-next-line
      let paramName = a[0].replace(/\[\d*\]/, function (v) {
        paramNum = v.slice(1, -1)
        return ''
      })

      // set parameter value (use 'true' if empty)
      let paramValue = typeof a[1] === 'undefined' ? true : a[1]

      // (optional) keep case consistent
      paramName = paramName.toLowerCase()
      paramValue = paramValue.toLowerCase()

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]]
        }

        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue)
        }

        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue
        }
      }

      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue
      }
    }
  }

  return obj
}

export const docsUrl = url => {
  const urlRegx = new RegExp('docs.google.com')
  return urlRegx.test(url)
}

export const getDate = (date, dateFormat = 'dd MMM, yyyy') => {
  return date && format(new Date(date), dateFormat)
}

export const formatCurrency = (val, returnIntegerOnly, showCurrencySign = true) => {
  if (!val && showCurrencySign) return '$0'
  if (!val) return val

  const value = returnIntegerOnly ? parseInt(val, 10) : val
  const minimumFractionDigits = (value.toString().split('.')[1] || '').length ? 2 : 0

  const toAdd = showCurrencySign ? { style: 'currency', currency: 'USD' } : {}
  const formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits, maximumFractionDigits: 2, useGrouping: true, ...toAdd })
  return formatter.format(value)
}

export const formatNumber = (val, isInteger, maxFractionDigits) => {
  if (!val) return val

  const value = isInteger ? parseInt(val, 10) : val

  const minimumFractionDigits = (value.toString().split('.')[1] || '').length ? 2 : 0

  const formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits, maximumFractionDigits: maxFractionDigits || 2 })
  return formatter.format(value)
}

export const capitalizeFirstLetter = value =>
  value && `${value.charAt(0).toUpperCase()}${value.slice(1)}`

export { customFetch }

export const isRightDevice = () => {
  if (
    /Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  ) {
    return false
  }
  return true
}

export const convertCurrencyToFloat = val => {
  if (!val) return val

  return parseFloat(val.toString().replace(/,/g, ''))
}

export const convertFormattedNumberToInteger = val => {
  if (!val) return val

  return parseInt(val.toString().replace(/,/g, ''), 10)
}

export const convertCurrencyToString = val => {
  if (!val) return val

  return val.toString().replace(/,/g, '')
}

export const parsePositiveInt = value => value && Math.abs(parseInt(value, 10))

export const normalizeMaxIntValue = (value, max) =>
  value > max
    ? parseInt(value.toString().substring(0, max.toString().length), 10)
    : value


export const normalizeNumbers = value => {
  if (!value) return value
  return value.toString().replace(/[^\d,]/g, '');
}

export const normalizeDecimal = value => {
  if (!value) return value
  return value.toString().replace(/[^\d.]/g, '');
}

export const normalizeName = value => {
  if (!value) return value
  return value.replace(/[^A-Za-z\u00C0-\u024F -]/g, '');
}

export const getYearsRange = range(MIN_VALUE.year, new Date().getFullYear() + 1).map(i => ({ id: i, value: i })).reverse()

export const getDifferenceInMonths = (startDate, endDate) => differenceInMonths(endDate, startDate);

export const calcVestedPercent = (years, cliff, startDate) => {
  const monthsToBeVested = years * 12;
  const duration = getDifferenceInMonths( startDate, new Date())
  return (parseInt(duration/cliff, 10) * cliff * 100) / monthsToBeVested
}

export const getCurrencyShort = x => {
  if(isNaN(x)) return x;

  if(x < 9999) {
    return formatNumber(x, true);
  }

  if(x < 1000000) {
    return `${Math.round(x/100)/10 }K`;
  }
  if( x < 10000000) {
    return `${Math.round(x/100000)/10 }M`;
  }

  if(x < 1000000000) {
    return `${Math.round((x/100000))/10 }M`;
  }

  if(x < 1000000000000) {
    return `${Math.round((x/100000000))/10 }B`;
  }

  return '1T+';
}
