/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { formatNumber, formatCurrency } from 'utils'
import spinner from 'assets/icons/spinner.gif'
import theme from 'constants/theme'
import Editable from './Editable'

const EditableField = ({ value, name, save, color, isCurrencyField, ...props }) => {
  const [isEditable, changeEditable] = useState(false),
    [isLoading, currentValue, saveData] = useSave(changeEditable, save, name)

  if ((!value && value !== 0) && !isEditable) return <EnterText onClick={() => changeEditable(true)}>Enter</EnterText>

  return (
    <Container onClick={() => changeEditable(true)}>
      {isLoading && <SpinnerWrapper><img src={spinner} height={40} /></SpinnerWrapper>}
      {!isEditable || isLoading ? <CellValue color={color}>{isCurrencyField ? `${formatCurrency(isLoading ? currentValue : value, false)}` : value}</CellValue> :
        <Editable
          hide={() => changeEditable(false)}
          initialValues={{ [name]: isCurrencyField ? formatNumber(value) : value }}
          name={name}
          save={saveData}
          isCurrencyField={isCurrencyField}
          {...props} />}
    </Container>
  );
};

const useSave = (changeEditable, save, name) => {
  const [isLoading, changeLoading] = useState(false),
    [currentValue, changeCurrentValue] = useState('')

  const saveData = async values => {
    changeLoading(true)
    changeCurrentValue(values[name])
    try {
      await save(values)
      changeEditable(false)
    } catch (e) {
      // toast.error(e.message)
    } finally {
      changeLoading(false)
    }
  }

  return [isLoading, currentValue, saveData]
}

EditableField.propTypes = {
  color          : PropTypes.string,
  isCurrencyField: PropTypes.bool,
  name           : PropTypes.string,
  save           : PropTypes.func,
  value          : PropTypes.string
};

export default EditableField

const Container = styled.div `
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`,
  CellValue = styled.div `
    color: ${props => props.color || theme.color.text.primary};
    border-bottom: 1px solid ${props => props.color || theme.color.text.primary};
  `,
  EnterText = styled.div `
    color: #20ABBE;
    text-decoration: underline;
    cursor: pointer;
  `,
  SpinnerWrapper = styled.div `
    position: absolute;
    top: 0;
    z-index: 4;
    left:0;
    right:0;
    bottom: 0;
    opacity: 0.9;
    display:flex;
    align-items: center;
    justify-content: center;
    background: #fff;
  `

