/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React from 'react'
import styled from 'styled-components'

import {docsUrl} from 'utils'

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100vh;
`

/* To Do: Need to fix issue with showinfo page in storybook for required attribute. 
          When using custom validation, the requried attribute value is not showing */
const customSrcValidation = (props, propName, componentName) => {
  const {src} = props
  if (!src) return new Error(`${propName} prop is required`)
  if (!docsUrl(src)) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to` +
        ` \`${componentName}\`. Validation failed.`,
    )
  }
  return null
}

const Iframe = ({src}) => <StyledIframe src={src} />

Iframe.displayName = 'Iframe'

Iframe.propTypes = {
  src: customSrcValidation,
}

export default Iframe
