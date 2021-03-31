/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React, {useContext} from 'react'
import PropTypes from 'prop-types'

import {TableContext} from './TableContext'
import Cell from './Cell'
import {Tr} from './styled'

const Row = ({item}) => {
  const {columns, rowConfig, border} = useContext(TableContext)
  const {uniqueKey, css, onClick} = rowConfig
  return (
    <Tr
      key={item[uniqueKey]}
      border={border}
      css={css}
      onClick={onClick ? e => onClick(e, item) : null}
    >
      {Object.keys(columns).map(key => (
        <Cell key={key} uniqueKey={key} item={item} />
      ))}
    </Tr>
  )
}

Row.propTypes = {
  item: PropTypes.object,
}

export default Row
