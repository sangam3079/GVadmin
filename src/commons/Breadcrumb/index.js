/* Copyright (C) Go9, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Bryan Starbuck <bryan@go9.com>, October 2019
 */
import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import theme from 'constants/theme'
import Dropdown from 'commons/Dropdown'
// import robot from 'assets/images/robot.png'

const Breadcrumb = ({ items, history, maxItemWidth }) => {
  return (
    <Wrapper>
      <NavLink to="/">
        {/* <img src={robot} height={45} style={{ cursor: 'pointer' }} /> */}
      </NavLink>
      {(items || []).map(item => (
        <ItemWrapper key={item.title}>
          <Icon icon={faChevronRight} />
          {(item.to && history.location.pathname !== item.to) ? <NavLinkStyle to={item.to} maxWidth={maxItemWidth}>
            {item.title}
          </NavLinkStyle> : (item.list && item.list.length) ?
            <Dropdown
              selectedValue={item.selected}
              options={item.list}
              width="100%"
              target={() => <DropdownWrapper maxWidth={maxItemWidth}>
                <Title style={{ margin: '0 20px 0 0' }}>{item.title}</Title>
                <DropdownIconWrapper>
                  <FontAwesomeIcon icon={faChevronDown} />
                </DropdownIconWrapper>
              </DropdownWrapper>
              }
              onChange={item.onChange} />
            :
            <Title maxWidth={maxItemWidth}>{item.title}</Title>
          }
        </ItemWrapper>
      ))}
    </Wrapper>
  )
}

Breadcrumb.propTypes = {
  history     : PropTypes.object,
  items       : PropTypes.array,
  maxItemWidth: PropTypes.string
}

export default withRouter(Breadcrumb)

const Wrapper = styled.div `
  display: flex;
  align-items: center;
`,
  ItemWrapper = styled.div `
    padding-left: 40px;
    display: flex;
    font-size: 24px;
    align-items: center;
    :first-of-type {
      padding-left: 10px;
    }
    @media(max-width: 1200px) {
      padding-left: 10px;
    }
  `,
  Icon = styled(FontAwesomeIcon) `
    color: ${theme.color.text.primaryLight};
  `,
  TextStyle = `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  Title = styled.div `
    z-index: 100;
    max-width: ${props => `${props.maxWidth }px` || 'auto'};
    margin-left: 10px;
    ${TextStyle}
    @media (max-width: 1280px) {
      font-size: 20px;
    }
    @media (max-width: 1140px) {
      font-size: 15px;
    }
  `,
  DropdownWrapper = styled.div `
    display: flex;
    max-width: ${props => `${props.maxWidth }px` || '240px'};
    align-items: center;
    ${Title} {
      color: ${theme.color.primary};
    }
  `,
  DropdownIconWrapper = styled.div `
    flex: 1;
    font-size: 18px;
    font-weight: 600;
    color: ${theme.color.text.primaryLight};
    text-align: left;
  `,
  NavLinkStyle = styled(NavLink) `
    margin-left: 10px;
    cursor: pointer;
    max-width: ${props => `${props.maxWidth }px` || 'auto'};
    color: ${theme.color.primary};
    ${TextStyle}
    @media (max-width: 1280px) {
      font-size: 20px;
    }
    @media (max-width: 1140px) {
      font-size: 15px;
    }
  `
