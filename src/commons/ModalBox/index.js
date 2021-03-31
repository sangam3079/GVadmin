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
    background: ${theme.color.primary};
  `,
  Text = styled.div`
    font-size: 20px;
    font-weight: 500;
    color: ${theme.color.primary};
  `
const ModalBox = ({ open, onClose, headerText, children, success, reject, wrapperStyle, className, headerCss, contentCss, footerCss }) => {
  return (
    <Modal open={open} onClose={onClose} className={className} wrapperStyle={wrapperStyle}>
      <Modal.Header headerCss={headerCss}>
        <Text>{headerText}</Text>
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

ModalBox.propTypes = {
  children    : PropTypes.node.isRequired,
  className   : PropTypes.string,
  headerText  : PropTypes.string.isRequired,
  onClose     : PropTypes.func.isRequired,
  open        : PropTypes.bool,
  reject      : PropTypes.object,
  success     : PropTypes.object,
  wrapperStyle: PropTypes.object
}

export default ModalBox
