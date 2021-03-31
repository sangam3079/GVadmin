/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React, {useContext} from 'react'
import PropTypes from 'prop-types'

import {TabContext} from './TabContext'
import {TabWrapper} from './styled'

const Tab = ({id, children, disabled}) => {
  const {changeTab, activeTabId, config} = useContext(TabContext)
  return (
    <TabWrapper
      style={config}
      disabled={disabled}
      active={activeTabId === id}
      onClick={() => (disabled ? {} : changeTab(id))}
    >
      {children}
    </TabWrapper>
  )
}

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  id      : PropTypes.string.isRequired,
}

Tab.defaultProps = {
  disabled: false,
}

Tab.displayName = 'Tabs.Tab'

export default Tab
