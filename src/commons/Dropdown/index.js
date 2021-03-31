/* Copyright (C) Go9, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Bryan Starbuck <bryan@go9.com>, October 2019
 */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

import theme from 'constants/theme'
import dropdown from 'assets/icons/dropdown.svg'

const selectStyles = (width, controlStyles, right) => ({
  control: styles => ({
    ...styles,
    margin    : 8,
    border    : 'none',
    boxShadow : 'none',
    cursor    : 'pointer',
    background: 'transparent',
    ...controlStyles,
  }),
  indicatorSeparator: () => ({ width: 0 }),
  valueContainer    : () => ({ padding: 0 }),
  menu              : styles => ({
    ...styles,
    boxShadow: `0 0 10px 0 ${theme.color.shadow.primary}`,
    width    : width || 120,
    minWidth : 120,
    marginTop: 0,
    zIndex   : 120,
    right    : right || 0,
  }),
  option: (styles, { isFocused }) => ({
    ...styles,
    background  : theme.color.white,
    fontWeight  : 400,
    fontSize    : 16,
    whiteSpace  : 'nowrap',
    overflow    : 'hidden',
    textOverflow: 'ellipsis',
    color       : theme.color.text.primary,
    cursor      : 'pointer',
    '&:hover'   : {
      background: theme.color.background.hovered,
    },
  }),
})

const PopoutDropdown = ({
  options,
  target,
  width,
  right,
  controlStyles,
  onChange,
  selectedValue,
  history,
  ...props
}) => {
  const [value, setValue] = useState({})

  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  const defaultTarget = () => (
    <div
      role="button"
      tabIndex={0}
      onClick={e => {
        e.stopPropagation()
      }}
    >
      <img src={dropdown} alt="dropdown" />
    </div>
  )

  const onSelectChange = val => {
    if (val.onClick) {
      val.onClick()
    }
    setValue(val)
  }
  return (
    <div onClick={e => e.stopPropagation()}>
      <Select
        backspaceRemovesValue={false}
        components={{ DropdownIndicator: target || defaultTarget }}
        controlShouldRenderValue={false}
        hideSelectedOptions={false}
        isClearable={false}
        open
        isSearchable={false}
        autoFocus={false}
        onChange={onChange || onSelectChange}
        options={options.filter(option => !option.hide)}
        placeholder=""
        styles={selectStyles(width, controlStyles, right)}
        tabSelectsValue={false}
        value={selectedValue || value}
        className="select-dropdown"
        {...props}
      />
    </div>
  )
}

PopoutDropdown.propTypes = {
  controlStyles: PropTypes.object,
  onChange     : PropTypes.func,
  options      : PropTypes.array,
  right        : PropTypes.number,
  selectedValue: PropTypes.object,
  target       : PropTypes.func,
  width        : PropTypes.number,
}

export default PopoutDropdown
