/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React from 'react'
import PropTypes from 'prop-types'

import {TabsWrapper} from './styled'
import TabProvider from './TabContext'
import List from './List'
import Tab from './Tab'
import Panels from './Panels'
import Panel from './Panel'

const Tabs = ({children, ...props}) => {
  return (
    <TabProvider {...props}>
      <TabsWrapper>{children}</TabsWrapper>
    </TabProvider>
  )
}

Tabs.List = List
Tabs.Tab = Tab
Tabs.Panels = Panels
Tabs.Panel = Panel

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
}

Tabs.displayName = 'Tabs'

export default Tabs
