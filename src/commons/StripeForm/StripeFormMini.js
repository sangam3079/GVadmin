/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { get } from 'lodash'
import { reduxForm, Field } from 'redux-form'
import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements'
import { compose } from 'redux'

import theme from 'constants/theme'
import { TextField } from 'commons/Forms/InputField'
import { UserContext } from 'contexts/UserContext'

import visa from 'assets/icons/cards/visa.png'
import masterCard from 'assets/icons/cards/master.png'
import americanExpress from 'assets/icons/cards/american.png'

const StripeFormMini = ({ changeErrorStatus, initialize }) => {
  const [cardNumber, changeCardNumber, onCardNumberBlur] = useFieldHandler('Card Number'),
    [cardExpiry, changeCardExpiry, onExpiryBlur] = useFieldHandler('Card Expiry'),
    [cardCVC, changeCardCVC, onCVCBlur] = useFieldHandler('Card CVC');

  useEffect(() => {
    changeErrorStatus(cardNumber.error || cardExpiry.error || cardCVC.error)
  }, [cardNumber, cardExpiry, cardCVC, changeErrorStatus])

  const userContext = useContext(UserContext)
  const fullName = `${get(userContext, 'currentUser.userProfile.firstName') || '' } ${ get(userContext, 'currentUser.userProfile.lastName') || ''}`

  useEffect(() => {
    initialize({ fullName })
  }, [fullName, initialize])

  return (
    <div>
      <Row1>
        <Field name="email" component={TextField} placeholder="Email" />
      </Row1>
      <Row2>
        <CardNumberWrapper>
          <StyledCardNumberElement
            onBlur={onCardNumberBlur}
            onChange={changeCardNumber} />
          {cardNumber.errorMessage && <Error>{cardNumber.errorMessage}</Error>}
        </CardNumberWrapper>
      </Row2>
      <Row3>
        <CardInfo>
          <div style={{ flex: 1 }}>
            <StyledCardExpiryElement
              onBlur={onExpiryBlur}
              onChange={changeCardExpiry} />
            <Error>{cardExpiry.errorMessage}</Error>
          </div>
          <div style={{ flex: 1 }}>
            <StyledCVCElement
              onBlur={onCVCBlur}
              onChange={changeCardCVC}
            />
            <Error>{cardCVC.errorMessage}</Error>
          </div>
        </CardInfo>
      </Row3>
    </div>
  )
}

const useFieldHandler = label => {
  const [field, changeField] = useState({ hasValue: false, error: true, errorMessage: '' })

  const onBlur = () => {
    if (!field.hasValue) {
      changeField({
        ...field,
        error       : true,
        errorMessage: `${label} is required.`
      })
    }
  }

  const onChange = element => {
    const errorMessage = get(element, 'error.message') || ''

    changeField({
      ...field,
      hasValue: !element.empty,
      error   : !!errorMessage,
      errorMessage
    })
  }

  return [field, onChange, onBlur]
};

const Row1 = styled.div `
  input{
    border-radius: 4px;
    height: 40px;
    padding: 5px;
    &:focus{
      height: 40px;
      padding: 5px;
    }
  }`,
  Row2=styled.div `
    margin-top: 25px;
  `,
  Row3=styled.div `
    padding-bottom: 0px;
    margin-top: -11px;
  `,
  CustomStyle = `
    height: 40px;
    border: 1px solid ${theme.color.border.primary};
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 4px 4px 0px 0px;
    &>div:first-of-type {
      flex: 1;
    }
`,
  CardNumberWrapper = styled.div `
    position: relative;
  `,
  CardImages = styled.div `
    position: absolute;
    right: 5px;
    top: 10px;
    display: flex;
    img {
      height: 20px;
      margin-right: 5px;
    }
  `,
  Info = `
    ${CustomStyle}
    flex: 1;
    :last-child {
      margin-right: 0;
    }
    border-radius: 0px 0px 0px 4px;
  `,
  CVCInfo = `
    ${CustomStyle}
    flex: 1;
    :last-child {
      margin-right: 0;
    }
    border-radius: 0px 0px 4px 0px;
  `,
  StyledCardNumberElement = styled(CardNumberElement) `${CustomStyle}`,
  StyledCardExpiryElement = styled(CardExpiryElement) `${Info}`,
  StyledCVCElement = styled(CardCVCElement) `${CVCInfo}`,
  CardInfo = styled.div `
    display: flex;
    margin: 10px 0 0;
  `,
  Label = styled.div `
    margin-bottom: 10px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    opacity: 0.7;
  `,
  Error = styled.div `
    color: ${theme.color.text.error};
    padding: 2px;
    font-size: 10px;
    height: 50px;
  `

StripeFormMini.propTypes = {
  changeErrorStatus: PropTypes.func,
  initialize       : PropTypes.func
};

export default compose(
  reduxForm({
    form: 'paymentForm',
  }),
)(StripeFormMini)
