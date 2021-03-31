/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Modal from 'commons/Modal'
import Button from 'commons/Buttons/NormalButton'

import theme from 'constants/theme'

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
  `,
  StyledButton = styled(Button)`
    margin: 0 0 0 20px;
  `,
  Text = styled.div`
    font-size: 20px;
    font-weight: 500;
    color: ${theme.color.primary};
  `,
  Logo=styled.div`
    position: absolute;
    width: 64px;
    height: 64px;
    top: -28px;
    background: #E7E9F1;
    mix-blend-mode: normal;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    border-radius: 32px;
    border: 3px solid #ffffff;
    display: flex;
    justify-content: center;
    overflow: hidden
    img{
      width: 54px;
    }
  `,
  HeaderText = styled.div`
    margin-top: 30px;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    text-transform: capitalize;
    color: #000000;
    font-weight: 500;
  `,
  HeaderSubText = styled.div`
    font-weight: 500;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    text-transform: capitalize;
    color: #314252;
  `

const CustomModal = ({ open, onClose, headerText, children, success, reject, wrapperStyle, className, headerCss, contentCss, headerSubText, headerLogo, footerCss }) => {
  return (
    <Modal open={open} onClose={onClose} className={className} wrapperStyle={wrapperStyle}>
      <Modal.Header headerCss={headerCss}>
        <Logo><img src={headerLogo} alt="" /></Logo>
        <HeaderText>{headerText}</HeaderText>
        <HeaderSubText>{headerSubText}</HeaderSubText>
      </Modal.Header>
      <Modal.Content contentCss={contentCss}>{children}</Modal.Content>
      {(success || reject) && <Modal.Footer footerCss={footerCss}>
        <ButtonWrapper>
          {success && (
            <StyledButton
              onClick={success.onClick}
              disabled={success.disabled}
            >
              {success.text}
            </StyledButton>
          )}
          {reject && (
            <StyledButton plain onClick={reject.onClick}>
              {reject.text}
            </StyledButton>
          )}
        </ButtonWrapper>
      </Modal.Footer>}
    </Modal>
  )
}

CustomModal.propTypes = {
  children    : PropTypes.node.isRequired,
  className   : PropTypes.string,
  headerText  : PropTypes.string.isRequired,
  onClose     : PropTypes.func.isRequired,
  open        : PropTypes.bool,
  reject      : PropTypes.object,
  success     : PropTypes.object,
  wrapperStyle: PropTypes.object
}

export default CustomModal
