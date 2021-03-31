/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import styled, { css } from 'styled-components'

import theme from 'constants/theme'

const plainProperty = `
  background: ${theme.color.white};
  border: 1px solid ${theme.color.button.primary};
  color: ${theme.color.button.primary};
`

const secondaryProperty = `
  color: ${theme.color.button.primary};
  background: #fff;
`

export default styled.button`
  background: ${theme.color.button.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 25px;
  cursor: pointer;
  font-size: 14px;
  border: none;
  font-weight: 600;
  :focus {
    outline: none;
  }
  :disabled {
    opacity: 0.7;
    cursor: no-drop;
  }
  color: ${theme.color.white};
  width: ${props => (props.width ? `${props.width}px` : 'auto')};
  height: ${props => `${props.height || 35}px`};
  ${props => props.css && css(...props.css)};
  ${props => props.plain && plainProperty}
  ${props => props.secondary && secondaryProperty}
`
