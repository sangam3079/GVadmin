/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import styled, {css} from 'styled-components'

import theme from 'constants/theme'

export const TabsWrapper = styled.div`
    display: flex;
    flex-direction: column;
  `,
  ListWrapper = styled.div`
    display: flex;
    cursor: pointer;
    ${({style}) => style.css && css(...style.css)}
  `,
  PanelWrapper = styled.div`
    ${({style}) => style.css && css(...style.css)}
  `,
  PanelsWrapper = styled.div`
    display: flex;
    padding: 10px 4px;
  `

export const TabWrapper = styled.div`
  position: relative;
  padding: 5px 10px;
  cursor: ${({disabled}) => disabled && 'not-allowed'};
  opacity: ${({disabled}) => disabled && '0.6'};
  :after {
    content: '';
    display: block;
    height: 4px;
    position: absolute;
    bottom: 0px;
    left: 50%;
    width: 0;
    background: ${({style}) =>
    style.borderline && (style.borderColor || theme.color.primary)};
    transition: all 150ms;
  }
  ${({active, style}) =>
    active &&
    `
    color: ${style.activeTextColor || theme.color.primary};
    :after {
      width: 100%;
      left: 0;
    }
  `}
`
