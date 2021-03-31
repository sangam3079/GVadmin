/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper } from './styled'
import Spinner from 'components/Spinner/Spinner'

const OverlaySpinner = ({ left, top, backgroundColor, loading, style, overlayParent, loaderStyle }) => {
  if (!loading) return null
  return (
    <Wrapper left={left} top={top} backgroundColor={backgroundColor} style={style} overlayParent={overlayParent}>
      <Spinner />
    </Wrapper>
  )
}

OverlaySpinner.defaultProps = {
  left           : 0,
  top            : 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
}

OverlaySpinner.propTypes = {
  backgroundColor: PropTypes.string,
  left           : PropTypes.number,
  loaderStyle    : PropTypes.object,
  loading        : PropTypes.bool.isRequired,
  overlayParent  : PropTypes.bool,
  style          : PropTypes.object,
  top            : PropTypes.number,
}
export default OverlaySpinner
