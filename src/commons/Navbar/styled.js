/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import theme from 'constants/theme'

function styleMenuPosition(props) {
  if (props.right) {
    return 'flex-end'
  }
  if (props.left) {
    return 'flex-start'
  }
  if (props.center) {
    return 'center'
  }
  return 'center'
}

export const HeaderWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: ${theme.color.white};
  `,
  Header = styled.div`
    padding: 4px;
    display: flex;
    max-width: 1280px;
    width: 100%;
    margin: auto;
  `,
  CompanyLogo = styled.div`
    align-items: center;
    display: flex;
  `,
  LogoLink = styled(Link)`
    padding: 12px 0;
    border-radius: 4px;
  `,
  Image = styled.img`
    max-width: 100%;
    width: 180px;
  `,
  ProfileDropdown = styled.div`
    cursor: pointer;
  `,
  Avatar = styled.img`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    object-fit: cover;
  `,
  Menu = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: ${props => {
    return styleMenuPosition(props)
  }};
  `,
  MenuItem = styled(Link)`
    color: ${theme.color.black};
    padding: 10px;
    text-decoration: none;
    font-size: 1em;
  `
