/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import React, { useContext } from 'react'

import { TableContext } from './TableContext'
import { Thead, Th, SortHead } from './styled'

const headerColumns = (columns, header) =>
  Object.keys(columns).map(key => {
    return (
      <Th
        key={key}
        header={header}
        align={columns[key].align || 'left'}
        width={columns[key].width}
        hideOnDesktop={columns[key].hideOnDesktop}
        hideOnTablet={columns[key].hideOnTablet}
        hideOnPhone={columns[key].hideOnPhone}
        css={columns[key].singleColumnCss}
        onClick={columns[key].onClick}
      >
        {columns[key].headerContent ? columns[key].headerContent(columns[key]) : <SortHead>{columns[key].label ? columns[key].label : ''}</SortHead>}
      </Th>
    )
  })

const TableHeader = () => {
  const { columns, header } = useContext(TableContext)
  return (
    <Thead css={columns.cssHeader} header={header}>
      <tr>{headerColumns(columns, header)}</tr>
    </Thead>
  )
}

export default TableHeader
