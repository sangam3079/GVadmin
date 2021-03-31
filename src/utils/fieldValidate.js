/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import { memoize } from 'lodash'

export const required = memoize(label => value => {
  return (value ? undefined : `${label} is required.`)
});

export const number = value => value && typeof(value) === 'string' ? 'Must be a number' : undefined;

export const currency = value => {
  if (value && /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(value.toString())) {
    if (parseFloat(value) === 0) return 'Value should not be 0'
    return undefined
  } 
  return 'Invalid value'
}

