/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React from 'react'
import PropTypes from 'prop-types'
import EditIcon from 'assets/icons/edit-picture.svg'

import { TextInput, Error, Image, IconWrapper, Label, InputWrapper } from '../styled'

const FileField = ({ input, label, meta, accept, onChange, hidden, text, css, ...rest }) => {
  const handleBtnClick = e => {
    e.preventDefault()
    document.getElementById('upload').click()
  }
  return (
    <>
      {hidden && (
        <IconWrapper onClick={handleBtnClick}>
          <Image src={EditIcon} />
        </IconWrapper>
      )}
          <InputWrapper css={css}>
            {label && <Label isActive={meta !== undefined && meta.active}>
              {label} </Label>}
            <TextInput
              type="file"
              accept={accept}
              id="upload"
              hasError={meta !== undefined && meta.touched && !!meta.error}
              onChange={e => {
                input.onChange(e.target.files[0])
              }}
              hidden={hidden}
              {...rest}
            />
            {meta !== undefined && meta.touched && !!meta.error && (
              <Error>{meta.error}</Error>
            )}
          </InputWrapper>
    </>
  )
}

FileField.defaultProps = {
  accept: 'image/*',
  hidden: false,
}

FileField.propTypes = {
  accept: PropTypes.string,
  css   : PropTypes.string,
  hidden: PropTypes.bool,
  input : PropTypes.object,
  label : PropTypes.string,
  meta  : PropTypes.shape({
    touched: PropTypes.bool,
    error  : PropTypes.string,
  }),
  onChange: PropTypes.func,
  text    : PropTypes.string
}

export default FileField
