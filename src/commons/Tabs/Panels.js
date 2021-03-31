/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React from 'react'
import PropTypes from 'prop-types'

import {PanelsWrapper} from './styled'

const Panels = ({children}) => {
  return <PanelsWrapper>{children}</PanelsWrapper>
}

Panels.propTypes = {
  children: PropTypes.node.isRequired,
}

Panels.displayName = 'Tabs.Panels'

export default Panels
