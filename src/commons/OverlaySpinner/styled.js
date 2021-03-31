/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import styled from 'styled-components'
import theme from 'constants/theme'

export const Wrapper = styled.div`
  z-index: 501;
  position: fixed;
  top: ${({ top }) => top}px;
  bottom: 0;
  left: ${({ left }) => left}px;
  right: 0;
  background: ${({ backgroundColor }) => backgroundColor};
  ${props => props.overlayParent && `
    position: absolute;
    background: rgba(255, 255, 255, 0.7);
  `}
`

export const Spinner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 45px;
  width: 45px;
  margin: 0px auto;
  animation: rotation 0.6s infinite linear;
  border-left: 4px solid ${theme.color.spinner.unfilled};
  border-right: 4px solid ${theme.color.spinner.unfilled};
  border-bottom: 4px solid ${theme.color.spinner.unfilled};
  border-top: 4px solid ${theme.color.spinner.filled};
  border-radius: 100%;
`
