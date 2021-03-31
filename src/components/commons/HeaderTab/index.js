/* Copyright (C) Go9, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Bryan Starbuck <bryan@go9.com>, October 2019
 */
import React from 'react'

import { Wrapper } from 'commons/Style/PageLayout/index'

import theme from 'constants/theme'
import Tabs from '../Tabs'

const HeaderTab = props => {
  return (
    <Wrapper style={{ minHeight: 0, borderBottom: `1px solid ${theme.color.border.primary}` }}>
      <div style={{ margin: '-20px 0' }}>
        <Tabs {...props} />
      </div>
    </Wrapper>
  )
}

export default HeaderTab
