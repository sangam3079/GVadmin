/* Copyright (C) Go9, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Bryan Starbuck <bryan@go9.com>, October 2019
 */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import theme from 'constants/theme'
import RouterTab from 'commons/RouterTab/index'

const activeStyles = `
  position: relative;
  border-top: 3px solid ${theme.color.button.primary};
  bottom: -1px;
`

const Title = styled(RouterTab.Title)`
      background: ${props => props.active ? props.activeBackground || '#fff' : props.background || theme.color.background.primary};
      border: solid 1px ${theme.color.border.primary};
      border-bottom: 0;
      border-radius: 4px 4px 0px 0px;
      flex-grow: ${props => props.menuWidth ? 'auto' : 1};
      width: ${props => props.menuWidth ? `${props.menuWidth }px` : 'auto'};
      padding: 15px 0px;
      margin-right: 5px;
      text-align: center;
      &:last-of-type {
        margin-right: 0;
      }
      ${props => props.active && activeStyles}
  && {
      color: ${props => props.active ? theme.color.button.primary : theme.color.text.secondary};
      font-weight: bold;
  }
`

const Tabs = ({ location, menus, menuWidth, tabBackground, selectedTabBackground }) => {
  return (
    <RouterTab>
      {menus.map(menu => {
        return (
          <Title
            path={menu.path}
            active={menu.hasChildPaths ? location.pathname.includes(menu.path) : location.pathname === menu.path}
            menuWidth={menuWidth}
            background={tabBackground}
            activeBackground={selectedTabBackground}
          >
            {menu.name || menu.title}
          </Title>
        )
      })}
    </RouterTab>
  )
}

Tabs.propTypes = {
  location             : PropTypes.object,
  menus                : PropTypes.array,
  menuWidth            : PropTypes.number,
  selectedTabBackground: PropTypes.string,
  tabBackground        : PropTypes.string
}

Tabs.defaultProps = {
  menus: [],
}

export default withRouter(Tabs)
