/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React from 'react'
import PropTypes from 'prop-types'

// import {Field} from 'redux-form'

import Radio from 'commons/Forms/Radio'
import Card from 'commons/Cards'
import theme from 'constants/theme'

const CardRadio = ({
  cardCss,
  header,
  content,
  name,
  id,
  label,
  editable,
  headerCss,
  value,
  contentCss,
  onClick,
  className,
}) => {
  return (
    <Card css={cardCss} className={className}>
      <Card.Header css={headerCss}>{header}</Card.Header>
      {content && (
        <Card.Content css={contentCss}>
          {content}
          {editable ? (
            <Radio input={{name, id, value}} label={label} onClick={onClick} />
          ) : (
            <Card.Content>{label}</Card.Content>
          )}
        </Card.Content>
      )}
    </Card>
  )
}

CardRadio.propTypes = {
  cardCss   : PropTypes.string,
  className : PropTypes.string,
  content   : PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  contentCss: PropTypes.string,
  editable  : PropTypes.bool,
  header    : PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  headerCss : PropTypes.string,
  id        : PropTypes.string,
  label     : PropTypes.string,
  name      : PropTypes.string,
  onClick   : PropTypes.func,
  value     : PropTypes.string,
}

CardRadio.defaultProps = {
  editable  : false,
  headerCss : `background: ${theme.color.primary}; color: ${theme.color.white}`,
  contentCss: `background: ${theme.color.background.secondary};`,
  cardCss   : '',
}

export default CardRadio
