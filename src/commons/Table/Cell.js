/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { TableContext } from './TableContext'
import { Td } from './styled'

const Cell = ({ uniqueKey, item }) => {
  const { columns } = useContext(TableContext)
  const column = columns[uniqueKey]
  return (
    <Td
      key={uniqueKey}
      align={column.align}
      width={column.width}
      hideOnDesktop={column.hideOnDesktop}
      hideOnTablet={column.hideOnTablet}
      hideOnPhone={column.hideOnPhone}
      css={column.css}
      isEditable={column.isEditable}
    >
      {column.content ? column.content(item, '') : <span>{item[uniqueKey]}</span>}
    </Td>
  )
}

Cell.propTypes = {
  item     : PropTypes.object,
  uniqueKey: PropTypes.string,
}

export default Cell
