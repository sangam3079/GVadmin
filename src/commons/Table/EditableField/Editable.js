/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { TextField } from 'commons/Forms/InputField'

import cross from 'assets/icons/cross.svg'
import check from 'assets/icons/check-table.svg'
import { convertCurrencyToFloat } from 'utils'
import theme from 'constants/theme'

const EditableField = ({ name = 'inputField', hide, save, isCurrencyField, handleSubmit, normalize, pristine, valid }) => {
  const toAppend = isCurrencyField ? {
    prepend: '$',
  } : {}

  return (
    <Container>
      <Field
        name={name}
        component={TextField}
        onBlur={hide}
        normalize={normalize}
        autoFocus
        {...toAppend}
        css="flex: 1;"
        inputCss={`color: ${theme.color.text.primary};height: 30px; padding: 5px;${isCurrencyField ? 'padding-left: 22px' : ''}`}
      />
      <ActionButtons>
        <ImgWrapper
          disabled={pristine || !valid}
          onMouseDown={handleSubmit(values => {
            if(pristine) return
            const value = values[name]
            save(isCurrencyField ? { [name]: convertCurrencyToFloat(value) } : values)
          })}>
          <img src={check} alt="save" height={12} />
        </ImgWrapper>
        <ImgWrapper onClick={hide}>
          <img src={cross} alt="cancel" height={12} />
        </ImgWrapper>
      </ActionButtons>
    </Container>
  );
}

const Container = styled.div `
        display: flex;
        & span.field-error {
          margin-top: 0;
          font-weight: normal;
          text-align: left;
        }
        `,
  ActionButtons = styled.div `
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        width: 50px;
        `,
  ImgWrapper = styled.div `
        padding: 6px;
        cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}
        `

EditableField.propTypes = {
  handleSubmit   : PropTypes.func,
  hide           : PropTypes.func,
  isCurrencyField: PropTypes.bool,
  name           : PropTypes.string,
  normalize      : PropTypes.func,
  pristine       : PropTypes.bool,
  save           : PropTypes.func,
  valid          : PropTypes.bool,
  validate       : PropTypes.func
};

export default compose(
  connect((state, props) => ({
    validate: props.validate
  })),
  reduxForm({
    form: 'editableField'
  }))(EditableField)
