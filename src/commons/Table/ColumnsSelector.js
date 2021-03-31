/* Copyright (C) Go9, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Bryan Starbuck <bryan@go9.com>, October 2019
 */

import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { remove } from 'lodash'
import Select from 'react-select'

import theme from 'constants/theme'
import { TableContext } from './TableContext'

const style = {
  container: styles => ({
    ...styles,
    width: 200
  }),
  control: styles => ({
    ...styles,
    cursor: 'pointer'
  }),
  menu: styles => ({
    ...styles,
    zIndex   : 102,
    marginTop: 1
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
  })
}

const ColumnsSelector = ({ label }) => {
  const { allColumns: columns, hiddenColumns, updateHiddenColumns, hiddenColumnsObject } = useContext(TableContext),
    clonedHiddenColumns = [...hiddenColumns],
    options = Object.keys(columns).map(item => ({ label: columns[item].label, key: item, checked: !hiddenColumns.includes(item) }))

  return (
    <Wrapper>
      <span style={{ marginRight: 10 }}>Columns:</span>
      <Select
        options={options}
        styles={style}
        placeholder={`${options.filter(i => i.checked).length} columns shown`}
        isSearchable={false}
        components={{ Option: props => <Option
          {...props}
          toggleCheck={(key, checked) => {
            if(!checked) {
              clonedHiddenColumns.push(key)
            } else {
              remove(clonedHiddenColumns, item => item === key)
            }
            window.localStorage.setItem('hiddenColumns', JSON.stringify({ ...hiddenColumnsObject, [label]: clonedHiddenColumns }))
            updateHiddenColumns(clonedHiddenColumns)
          }} /> }}
      />
    </Wrapper>
  )
}

ColumnsSelector.propTypes = {
  label: PropTypes.string
}

export default ColumnsSelector

const Option = ({ toggleCheck, data, label }) => {
  return (
    <OptionWrapper
      onClick={e => {
        e.stopPropagation()
        toggleCheck(data.key, !data.checked)
      }}>
      <input type="checkbox" checked={data.checked} />
      <span>{label}</span>
    </OptionWrapper>
  )
}

Option.propTypes = {
  data       : PropTypes.object,
  label      : PropTypes.string,
  toggleCheck: PropTypes.func
}

const OptionWrapper = styled.div `
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 5px 10px;
  &:hover {
    background: ${theme.color.background.hovered};
  }
  >span {
    width: 160px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  >input {
    cursor: pointer;
    margin-right: 5px;
  }
`,
  Wrapper = styled.div `
    display: flex; 
    align-items: center;
    margin-right: 20px;
  `
