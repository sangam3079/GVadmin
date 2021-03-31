/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import styled from 'styled-components'

import theme from 'constants/theme'


const Divider = styled.div`
  display: block;
  border: 0;
  margin: 1em 0;
  padding: 0;
  ${props => props.horizontal ? `
    width: 100%;
    border-top: 1px solid ${theme.color.border.fade};
  ` : `
    position: absolute;
    height: 100%;
    border-left: 1px solid ${theme.color.border.fade};
  `}
`

export default Divider
