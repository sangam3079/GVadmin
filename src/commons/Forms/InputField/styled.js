/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import styled from 'styled-components'
import theme from 'constants/theme'

export function borderColor(props) {
  if (props.isActive) return 'solid 1px rgba(13, 135, 152, 1)'
  if (props.hasError) return 'solid 1px red'
  return 'solid 1px rgba(236,236,236, 1)'
}

function labelColor(props) {
  if (props.hasError) return 'red'
  return theme.color.text.primary
}

export const InputWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    max-width: 100%;
    ${({ css }) => css}
  `,
  Label = styled.label`
    margin-bottom: 5px;
    margin-left: 4px;
    font-size: 16px;
    line-height: 19px;
    mix-blend-mode: normal;
    opacity: 0.7;
    color: ${props => labelColor(props)};
    ${({ css }) => css}
  `,
  TextInput = styled.input`
    font-size: 1em;
    color: rgba(110, 110, 110);
    border: ${props => borderColor(props)};
    border-radius: 6px;
    height: 45px;
    padding: 0 12px;
    padding-left: ${props => props.prepend ? '22px' : '12px'};
    width: 100%;
    :disabled {
      background-color: ${theme.color.background.fade};
      cursor: not-allowed;
    }
    :focus {
      outline: none;
    }
    ::placeholder {
      margin-left: 10px;
      color: rgb(217, 217, 217);
    }
    visibility: ${props => (props.hidden ? props.hidden : false)};
    ${({ css }) => css}
  `,
  InputArea = styled.textarea`
    font-size: 1em;
    color: rgba(110, 110, 110);
    border: ${props => borderColor(props)};
    border-radius: 6px;
    height: 90px;
    padding: 0 12px;
    padding-left: ${props => props.prepend ? '22px' : '12px'};
    width: 100%;
    :disabled {
      background-color: ${theme.color.background.fade};
      cursor: not-allowed;
    }
    :focus {
      outline: none;
    }
    ::placeholder {
      margin-left: 10px;
      color: rgb(217, 217, 217);
    }
    visibility: ${props => (props.hidden ? props.hidden : false)};
    ${({ css }) => css}
  `,
  Error = styled.span`
    color: red;
    font-size: 12px;
    margin: 10px 0 0 10px;
  `,
  InputWithIcon = styled.div`
    position: relative;
    width: 100%;
    display: flex;
  `,
  SIcon = styled.span`
    position: absolute;
    bottom: 10px;
    right: 6px;
    width: 24px;
    height: 24px;
  `,
  InputGroupAppend = styled.div``,
  Image = styled.img`
    max-width: 100%;
    width: 100%;
  `,
  IconWrapper = styled.div`
    position: absolute;
    top: 90px;
    left: 144px;
    cursor: pointer;
  `,
  Prepend = styled.div `
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 12px;
    `,
  SelectInputWrapper = styled.div`
  ${({ css }) => css}
  `
