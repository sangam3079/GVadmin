/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import styled from 'styled-components'
import theme from 'constants/theme'

export const TitleText = styled.div`
    color: ${theme.color.text.primary};
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
  `,
  Form = styled.form``,
  Wrapper = styled.div`
    margin: ${props => (props.margin ? props.margin : '20px 0')};
    width: ${props => (props.width ? props.width : '35%')};
    position: ${props => props.position};
  `,
  Message = styled.div`
    background-color: ${props =>
    props.error
      ? theme.color.messageBox.error
      : theme.color.messageBox.success};
    color: white;
    padding: 8px;
    text-align: center;
    margin: 10px;
  `,
  Avatar = styled.img`
    border-radius: 10px;
    max-width: 100%;
    width: 115px;
    height: 115px;
    object-fit: cover;
  `,
  UserNameText = styled.div`
    color: ${theme.color.text.primary};
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 49px;
    margin: 0 0 30px 0;
  `,
  FormWrapper = styled.div`
    margin-top: 35px;
  `,
  LinkText = styled.span`
   color: ${theme.color.link.primary};
  text-decoration: underline;
  `

