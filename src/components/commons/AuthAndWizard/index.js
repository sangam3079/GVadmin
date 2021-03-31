/* Copyright (C) Go9, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Bryan Starbuck <bryan@go9.com>, October 2019
 */

import styled from 'styled-components'

import theme from 'constants/theme'
import { HeaderFooterWrapper } from './Header'

export { default as Header } from './Header'
export { default as HeaderText } from './HeaderText'

export const Wrapper = styled.div`
    min-height: 100vh;
    background: ${theme.color.background.primary};
  `,
  ContentWrapper = styled.div `
    display: flex;
    min-height: 100vh;
    padding-top: 80px;
    @media (max-width: 768px) { 
      padding-top: 60px;
    }
  `,
  RightContent = styled.div `
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-basis: 50%;
    @media (max-width: 1024px) { 
      display: none;    
    }
  `,
  LeftContent = styled.div `
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    background: #fff;
    padding: 40px 30px 40px 30px;
    flex-basis: 50%;
    max-width: 100%;
    min-height: Calc(100vh - 80px);
    @media (min-width: 768px) { 
      padding: 90px 70px 70px 70px;
      min-height: Calc(100vh - 60px);
    }
    @media (min-width: 1280px) {
      padding: 90px 70px 70px 110px;
    }
  `,
  LeftContentWrapper = styled.div `
    width: 100%;
    max-width: 500px;
  `,
  Form = styled.form`
    padding: 20px 0 10px;
    width: 100%;
  `,
  FooterWrapper = styled.div `
    ${HeaderFooterWrapper}
    display: block;
    bottom: 0;
    padding: 20px 50px;
    @media (max-width: 768px) {
      padding: 10px 20px;
    }
  `


