/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React, {useContext} from 'react'
import PropTypes from 'prop-types'

import {ListWrapper} from './styled'
import {TabContext} from './TabContext'

const List = ({render}) => {
  const context = useContext(TabContext)
  const {config} = context
  return <ListWrapper style={config}>{render(context)}</ListWrapper>
}

List.propTypes = {
  render: PropTypes.func.isRequired,
}

List.displayName = 'Tabs.list'

export default List
