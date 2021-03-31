/* Copyright (C) Go9, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Bryan Starbuck <bryan@go9.com>, October 2019
 */
import styled from 'styled-components';

import theme from 'constants/theme';

export const Wrapper = styled.div`
  display: flex;
`;

export const StyledNavLink = styled.div`
  cursor: pointer;
  && {
    color: ${(props) =>
      props.tabstate === 'active'
        ? theme.color.text.primary
        : props.color || '#1B1D1F'};
    font-weight: ${(props) => (props.tabstate === 'active' ? '600' : '400')};
    padding: 10px;
    display: block;
  }
`;

export const NonLink = styled.span`
  color: ${(props) =>
    props.tabstate === 'active'
      ? theme.color.primary
      : props.color || '#1B1D1F'};
  font-weight: ${(props) => (props.tabstate === 'active' ? '600' : '400')};
  padding: 19px 0 8px;
  display: block;
  cursor: no-drop;
`;
