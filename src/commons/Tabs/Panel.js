/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React, {useContext} from 'react'
import PropTypes from 'prop-types'

import {TabContext} from './TabContext'
import {PanelWrapper} from './styled'

const Panel = ({panelId, children}) => {
  const {activeTabId, config} = useContext(TabContext)
  return (
    <>
      {activeTabId === panelId ? (
        <PanelWrapper style={config}>{children}</PanelWrapper>
      ) : null}
    </>
  )
}

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  panelId : PropTypes.string.isRequired,
}

Panel.displayName = 'Tabs.Panel'

export default Panel
