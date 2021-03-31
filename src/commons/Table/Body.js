/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React, {useContext} from 'react'

import {isObject, isArray, isEmpty} from 'utils'
import {TableContext} from './TableContext'
import Row from './Row'

function sanitizeData(data) {
  if (data.length !== undefined || !isEmpty(data)) {
    if (isObject(data)) {
      return Object.values(data)
    }
    if (isArray(data)) {
      return data
    }
  } else {
    return []
  }
}

const TableBody = () => {
  const {data} = useContext(TableContext)
  return (
    <tbody>
      {sanitizeData(data).map(item =>
        <Row key={item.id} item={item} />
      )}
    </tbody>
  )
}

export default TableBody
