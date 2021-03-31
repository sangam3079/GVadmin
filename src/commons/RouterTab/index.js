/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React from 'react'
import PropTypes from 'prop-types';

import TabTitle from './TabTitle'
import {Wrapper} from './styled'

const RouterTab = ({ shouldPreserveQueryString, children, ...props }) => {
  return (
    <Wrapper>
      {React.Children.map(children, child => (
        React.cloneElement(child, {
          shouldPreserveQueryString,
          ...props
        })
      ))}
     
    </Wrapper>
  )
}

RouterTab.Title = TabTitle

RouterTab.propTypes = {
  children                 : PropTypes.node.isRequired,
  shouldPreserveQueryString: PropTypes.bool
}

export default RouterTab;


