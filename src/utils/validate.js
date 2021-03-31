/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import { get, set } from 'lodash'
import { isArray, isObject, docsUrl, convertFormattedNumberToInteger } from 'utils'

const currencyRegex = /(?=.*?\d)^(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
  currencyRegexNeglectingDecimal = /(?=.*?\d)^(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d+)?$/

const validate = (values, { fields, initialValues }) => {
  const errors = {}
  const urlKeys = ['holonContractUrl', 'migrateHolonContractUrl', 'website']
  const phoneKeys = ['phone', 'phoneNumber']
  const zipCodeKeys = ['zip', 'zipCode']

  Object.keys(fields).forEach(key => {
    const value = get(values, key)
    const fieldValue = get(fields, key)
    if (isObject(fieldValue)) {
      if (
        fieldValue.required &&
        ((isArray(value) && value.length === 0) || (!value && value !== 0))
      ) {
        set(errors, key, `${fieldValue.label} is required`)
      }
      if (fieldValue.number && value && !/^\d+$/.test(value)) {
        set(errors, key, `${fieldValue.label} should be a number`)
      }
      if (fieldValue.decimalNumber && value && !/^-?[0-9]\d*(\.\d+)?$/.test(value)) {
        set(errors, key, `${fieldValue.label} should be a number`)
      }
      if(fieldValue.bigInteger && value && !/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?$/.test(value.toString())) {
        set(errors, key, `${fieldValue.label} is invalid`)
      }
      if (fieldValue.currency && value) {
        const regex = fieldValue.neglectDecimal ? currencyRegexNeglectingDecimal : currencyRegex
        if (!regex.test(value.toString()))
          set(errors, key, `${fieldValue.label} should be a valid currency`)
      }
      if(fieldValue.zeroNotAllowed && parseFloat(value) === 0) {
        set(errors, key, `${fieldValue.label} should not be 0`)
      }
      if (
        fieldValue.min !== undefined &&
        value &&
        parseInt(value, 10) < fieldValue.min
      ) {
        set(
          errors,
          key,
          `${fieldValue.label} should be greater or equal to ${fieldValue.min}`,
        )
      }
      if(fieldValue.max)
        if (fieldValue.max && value && convertFormattedNumberToInteger(value) > fieldValue.max) {
          set(
            errors,
            key,
            `${fieldValue.label} should be smaller than or equal to ${
              fieldValue.max
            }`,
          )
        }
      if (
        fieldValue.smallerThan &&
        value &&
        parseFloat(value) > fieldValue.smallerThan
      ) {
        set(
          errors,
          key,
          `${fieldValue.label} should be smaller than ${fieldValue.smallerThan}`,
        )
      }
      if (
        'greaterThan' in fieldValue &&
        parseFloat(value) <= fieldValue.greaterThan
      ) {
        set(
          errors,
          key,
          `${fieldValue.label} should be greater than ${fieldValue.greaterThan}`,
        )
      }
      if (
        fieldValue.url &&
        value &&
        !/^((https?):\/\/(www\.)?)?[A-Za-z0-9]+([-.]{1}[A-Za-z0-9]+)*\.[A-Za-z#]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
          value,
        )
      ) {
        set(errors, key, `${fieldValue.label} should be valid url`)
      }
      if (fieldValue.length && value && value.length !== fieldValue.length) {
        set(
          errors,
          key,
          `${fieldValue.label} length should be equal to ${fieldValue.length}`,
        )
      }
      if (
        fieldValue.minLength &&
        value &&
        value.length > fieldValue.minLength
      ) {
        set(
          errors,
          key,
          `${fieldValue.label} length should be greater than to ${
            fieldValue.minLength
          }`,
        )
      }
      if (
        fieldValue.maxLength &&
        value &&
        value.length < fieldValue.maxLength
      ) {
        set(
          errors,
          key,
          `${fieldValue.label} length should be smaller than to ${
            fieldValue.maxLength
          }`,
        )
      }
      if (
        fieldValue.email &&
        value &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ) {
        set(errors, key, `${fieldValue.label} is invalid`)
      }
      if (
        fieldValue.fax &&
        value &&
        !/^(\+?)([1-9]{1})?([0-9]){7,10}$/.test(value)
      ) {
        set(errors, key, `${fieldValue.label} is invalid`)
      }
      if (
        fieldValue.phone &&
        value &&
        !/^(\+)[1-9]{1}([0-9]){8,12}$/.test(value)
      ) {
        set(errors, key, `Enter valid ${fieldValue.label} e.g: +11231231234`)
      }
      if (
        fieldValue.postalCode &&
        value &&
        !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value)
      ) {
        set(errors, key, `${fieldValue.label} is invalid`)
      }
      if (fieldValue.age && value && (value < 15 || value > 120)) {
        set(errors, key, `${fieldValue.label} should be between 15 and 120`)
      }
      if (fieldValue.regex && value && !fieldValue.regex.test(value)) {
        set(errors, key, fieldValue.message || `${fieldValue.label} is invalid`)
      }
    } else if ((isArray(value) && value.length === 0) || !value) {
      set(errors, key, `${fieldValue} is required`)
    }
    if (values.currentTemplateLink && !docsUrl(values.currentTemplateLink)) {
      errors.currentTemplateLink = 'Invalid document Url'
    }

    if(key === 'cliff' && value && values.yearsToFullyVest) {
      if(value > values.yearsToFullyVest * 12) {
        set(errors, key, 'Cliff should not be greater than years to full yest')
      }
    }
  })


  urlKeys.forEach(urlKey => {
    if (
      values[urlKey] &&
      !/^((https?):\/\/(www\.)?)?[A-Za-z0-9]+([-.]{1}[A-Za-z0-9]+)*\.[A-Za-z#]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
        values[urlKey],
      )
    ) {
      errors[urlKey] = 'Enter valid url'
    }
  })
  phoneKeys.forEach(phoneKey => {
    if (
      values[phoneKey] &&
      !/^(\+?)[1-9]{1}([0-9]){8,12}$/.test(values[phoneKey])
    ) {
      errors[phoneKey] = 'Enter valid phone number  e.g: +11231231234'
    }
  })
  zipCodeKeys.forEach(zipCodeKey => {
    const initial = initialValues || {}
    if (initial[zipCodeKey] !== values[zipCodeKey] && values[zipCodeKey] &&
      !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(values[zipCodeKey])
    ) {
      errors[zipCodeKey] = 'Enter valid zip code'
    }
  })

  if (values.password && values.password.length < 6) {
    errors.password = 'Password should have more than 6 characters'
  }

  if (values.current_password && values.current_password === values.password) {
    errors.password = 'Matches old password entered. Enter new one.'
  }

  if (
    values.password &&
    values.password_confirmation &&
    values.password !== values.password_confirmation
  ) {
    errors.password_confirmation = 'Password do not match'
  }

  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation =
      'Mismatches new password entered. Enter new password again.'
  }

  return errors
}

export const isCurrencyFieldValid = value =>
  !value || currencyRegex.test(value.toString())

export default validate
