/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import styled from 'styled-components'

export default styled.span `
  padding: 5px;
  background: ${props => props.background || 'green'};
  font-size: ${props => props.fontSize || '10'}px;
  font-weight: 600;
  letter-spacing: 1.2px;
  border-radius: 2px;
  color: ${props => props.color || '#fff'};
`
