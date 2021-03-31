/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Icon from 'commons/Icons'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import theme from 'constants/theme'

function getPosition(props) {
  const { tooltipWidth, placement } = props
  const width = tooltipWidth || 200

  switch (placement) {
  case 'left':
    return {
      marginRight: '10px',
      right      : '100%',
      top        : 0,
    }
  case 'right':
    return {
      left      : '100%',
      marginLeft: '10px',
      top       : 0,
    }
  case 'top':
    return {
      bottom    : '100%',
      left      : '50%',
      marginLeft: -(10 + width / 2),
    }
  case 'bottom':
    return {
      top       : '100%',
      left      : '50%',
      marginLeft: -(10 + width / 2),
    }
  default:
    return null
  }
}

const Wrapper = styled.div`
    display: inline-block;
    position: relative;
  `,
  TooltipComponent = styled.div`
    display: flex;
    align-items: center;
    background-color: ${theme.color.white};
    border-radius: 3px;
    box-shadow: 0 0 10px 0 #ddd;
    font-size: 14px;
    justify-content: center;
    min-height: 100%;
    position: absolute;
    text-align: center;
    white-space: normal;
    width: ${props => props.tooltipWidth}px;
    z-index: 10;
    ${props => getPosition(props)};
    ${props => props.tooltipStyle && css(...props.tooltipStyle)};
  `

const Tooltip = ({
  children,
  className,
  icon,
  iconSize,
  tooltipWidth,
  placement,
  tooltipStyle,
  trigger,
  triggerStyle
}) => {
  const [showTooltip, setShowTooltip] = useState(false)
  function handleMouseEnter() {
    setShowTooltip(true)
  }

  function handleMouseLeave() {
    setShowTooltip(false)
  }

  return (
    <Wrapper className={className}>
      {showTooltip && (
        <TooltipComponent
          tooltipWidth={tooltipWidth}
          placement={placement}
          tooltipStyle={tooltipStyle}
        >
          {children}
        </TooltipComponent>
      )}
      <div style={triggerStyle}>
        {trigger ? (
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {React.cloneElement(trigger, {})}
          </div>
        ) : (
          <Icon
            icon={icon}
            size={iconSize}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        )}
      </div>
    </Wrapper>
  )
}

Tooltip.propTypes = {
  children : PropTypes.node.isRequired,
  className: PropTypes.string,
  icon     : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  iconSize    : PropTypes.string,
  placement   : PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
  tooltipStyle: PropTypes.string,
  tooltipWidth: PropTypes.number,
  trigger     : PropTypes.node,
  triggerStyle: PropTypes.object,
}

Tooltip.defaultProps = {
  icon        : faInfo,
  iconSize    : '1x',
  placement   : 'top',
  tooltipWidth: 200,
  tooltipStyle: '',
  className   : 'tooltip-wrapper',
}

export default Tooltip
