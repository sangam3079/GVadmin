/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import React from 'react'
import PropTypes from 'prop-types'

import { MAX_VALUE } from 'constants/fieldConstants'
import {
  InputWrapper,
  InputWithIcon as TextInputWapper,
  Label,
  InputArea,
  Error,
  Prepend
} from '../styled'

const TextArea = ({
  input,
  label,
  secondaryLabel,
  meta,
  css,
  labelCss,
  disabled,
  inputCss,
  prepend,
  ...rest
}) => {
  return (
    <InputWrapper css={css}>
      {label && <Label isActive={meta !== undefined && meta.active} css={labelCss}>
        {label}
        {secondaryLabel && <span style={{ marginLeft: 3, fontSize: 12 }}>({secondaryLabel})</span>}
      </Label>}
      <TextInputWapper>
        {prepend && <Prepend>{prepend}</Prepend>}
        <InputArea
          prepend={prepend}
          css={inputCss}
          maxLength={400}
          disabled={disabled}
          isActive={meta !== undefined && meta.active}
          hasError={meta !== undefined && meta.touched && !!meta.error}
          {...input}
          {...rest}
        />
      </TextInputWapper>
      {meta !== undefined && meta.touched && !!meta.error && (
        <Error className="field-error">{meta.error}</Error>
      )}
    </InputWrapper>
  )
}

TextArea.propTypes = {
  css     : PropTypes.string,
  disabled: PropTypes.bool,
  input   : PropTypes.object,
  inputCss: PropTypes.string,
  label   : PropTypes.node,
  labelCss: PropTypes.string,
  meta    : PropTypes.shape({
    touched: PropTypes.bool,
    error  : PropTypes.string,
  }),
  prepend       : PropTypes.string,
  secondaryLabel: PropTypes.string
}

TextArea.defaultProps = {
  css     : '',
  inputCss: '',
  labelCss: '',
}

export default TextArea
