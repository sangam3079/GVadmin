/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React from 'react'
import PropTypes from 'prop-types'

import {GridCell} from './styled'

const Cell = ({children}) => {
  return <GridCell data-id="GridCell">{children}</GridCell>
}

Cell.propTypes = {
  children: PropTypes.node.isRequired,
}

Cell.displayName = 'Grid.Cell'

export default Cell
