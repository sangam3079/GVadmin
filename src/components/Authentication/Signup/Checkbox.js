import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import theme from 'constants/theme'
import { CheckboxLabel } from 'commons/Forms/Checkbox'

const CustomCheckboxLabel = styled(CheckboxLabel)`
  & > label {
    font-size: 14px;
    cursor: pointer;
    color: ${theme.color.text.primaryFade};
    display: block;
    &::before {
      border: 1px solid ${theme.color.text.primaryLight};
    }
  }
  & > input[type='checkbox'] {
    &:checked + label {
      &::before {
        border: 1px solid ${theme.color.text.primaryLight};
      }
    }
  }
`,
  Link = styled(NavLink) `
    padding: 0 3px;
    color: ${theme.color.text.link};
    text-decoration: underline;
  `

const Checkbox = ({ input, label }) => {
  return (
    <CustomCheckboxLabel>
      <input id={input.name} type="checkbox" {...input} checked={input.value} />
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <label htmlFor={input.name}>I agree to all the terms and policies</label>
    </CustomCheckboxLabel>
  )
}

Checkbox.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta : PropTypes.object,
}

export default Checkbox
