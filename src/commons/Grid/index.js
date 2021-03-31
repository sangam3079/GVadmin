/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React from 'react'
import PropTypes from 'prop-types'

import Cell from './Cell'
import {GridWrapper} from './styled'

const Grid = ({children, ...props}) => {
  return (
    <GridWrapper {...props} data-id="Grid">
      {children}
    </GridWrapper>
  )
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  cols    : PropTypes.oneOf([
    'cols-2',
    'cols-3',
    'cols-4',
    'cols-6',
    'cols-12',
    'cols-1of6',
    'cols-1of4',
    'cols-1of3',
    'cols-1of2',
  ]),
  full      : PropTypes.bool,
  gridAlign : PropTypes.oneOf(['top', 'bottom', 'center', 'right', 'left']),
  gutters   : PropTypes.bool,
  textCenter: PropTypes.bool,
}

Grid.defaultProps = {
  gutters   : true,
  full      : false,
  textCenter: false,
  gridAlign : 'left',
}

Grid.displayName = 'Grid'

Grid.Cell = Cell

export default Grid
