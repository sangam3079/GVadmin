/* Copyright (C) Go9, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Bryan Starbuck <bryan@go9.com>, October 2019
 */
import React from 'react'
import PropTypes from 'prop-types'

import StyledContainer from 'commons/Style/Container'

import cookie from 'utils/cookie'

const Container = ({ children }) => {
  const offsetTop = cookie.isImpersonating() ? 48 : 0

  return (
    <div style={{ minHeight: `Calc(100vh - ${offsetTop}px)`, paddingTop: offsetTop, background: '#f0f0f7' }}>
      <StyledContainer>
        {children}
      </StyledContainer>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node
};

export default Container
