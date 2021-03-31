/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Dropdown from 'commons/Dropdown'

import theme from 'constants/theme'

const SelectDropdown = ({ options, selectedValue, changeSelectedValue, width = 225 }) => {
  return (
    <Dropdown
      controlStyles={{ margin: 0 }}
      selectedValue={selectedValue}
      onChange={changeSelectedValue}
      width={width}
      options={options}
      target={() => (
        <DropdownWrapper>
          <DropdownLabel width={width}>{selectedValue.label}</DropdownLabel>
          <DropdownIcon>
            <FontAwesomeIcon icon={faCaretDown} />
          </DropdownIcon>
        </DropdownWrapper>
      )}
    />
  );
}

const DropdownWrapper = styled.div`
    border: 1px solid ${theme.color.border.primary};
    border-radius: 4px;
    height: 36px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    align-items: center;
  `,
  DropdownLabel = styled.div`
    color: ${theme.color.text.primaryFade};
    font-size: 16px;
    padding: 0 10px;
    width: ${props => props.width - 35 || 170}px;
  `,
  DropdownIcon = styled.div`
    width: 32px;
    height: 100%;
    background: #dbe7e9;
    border-left: 1px solid ${theme.color.border.primary};
    display: flex;
    align-items: center;
    justify-content: center;
  `

SelectDropdown.propTypes = {
  changeSelectedValue: PropTypes.func,
  options            : PropTypes.array,
  selectedValue      : PropTypes.object,
  width              : PropTypes.number
}

export default SelectDropdown

