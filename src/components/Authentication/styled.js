/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Button from 'commons/Buttons'
import theme from 'constants/theme'

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    min-height: Calc(100vh - 84px);
    @media (max-width: 768px) {
      min-height: auto;
      width: 100%;
    }
  `,
  Section = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
    @media (max-width: 768px) {
      :last-child {
        display: none;
      }
    }
  `,
  Header = styled.div`
    display: flex;
    justify-content: space-between;
  `,
  ButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 60px;
    flex-wrap: wrap;
  `,
  Form = styled.form`
    padding-bottom: 10px;
    width: 100%;
    max-width: 400px;
  `,
  ChangePage = styled.div `
    display: flex;
    justify-content: flex-end;
    line-height: 30px;
    flex-wrap: wrap;
  `,
  CustomButton = styled(Button.Content)`
    text-transform: uppercase;
    height: 40px;
  `,
  AccountInfo = styled.div`
    font-size: 16px;
    padding-right: 5px;
    color: ${theme.color.text.primaryLight};
  `,
  StyledLink = styled(Link)`
    text-decoration: none;
    color: ${theme.color.button.primary};
    font-size: 16px;
    text-align: center;
  `
