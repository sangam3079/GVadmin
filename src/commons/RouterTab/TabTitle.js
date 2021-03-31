/* Copyright (C) Go9, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Bryan Starbuck <bryan@go9.com>, October 2019
 */
import React from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { StyledNavLink, NonLink } from './styled';

const TabTitle = ({ path, shouldPreserveQueryString, disabled, children, className, location, labelStyle, history }) => {
  const isActive = location.pathname === path
  return (
    <>
    {disabled ? <NonLink>{children}</NonLink> :
      <StyledNavLink
        onClick={() => history.push({ pathname: path, search: shouldPreserveQueryString ? location.search : '' })}
        tabstate={disabled ? 'disabled' : isActive ? 'active' : ''}
        className={className}
        style={labelStyle}>
        {children}
      </StyledNavLink>
    }
    </>
  )
}

TabTitle.propTypes = {
  children                 : PropTypes.node.isRequired,
  className                : PropTypes.string,
  disabled                 : PropTypes.bool,
  history                  : PropTypes.object,
  labelStyle               : PropTypes.object,
  location                 : PropTypes.object.isRequired,
  path                     : PropTypes.string.isRequired,
  shouldPreserveQueryString: PropTypes.bool
}

TabTitle.defaultProps = {
  disabled                 : false,
  shouldPreserveQueryString: false
}

export default withRouter(TabTitle)
