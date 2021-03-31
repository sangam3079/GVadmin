/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import styled from 'styled-components'

import theme from 'constants/theme'

const Error = `
  color: ${theme.color.text.error};
  background: ${theme.color.lightRed};
  border: 1px solid ${theme.color.border.error};
`;

const Success = `
  color: ${theme.color.text.success};
  background: ${theme.color.lightGreen};
  border: 1px solid ${theme.color.border.success};
`;

export const MessageWrapper = styled.div `
    position: relative;
    padding: 10px;
    border-radius: 4px;
    font-size: 14px;
    display: flex;
    
    ${props => props.type === 'success' && Success}
    ${props => props.type === 'error' && Error}
  `,
  CrossIcon = styled.img `
    cursor: pointer;
    padding: 5px 5px 5px 10px;
  `
