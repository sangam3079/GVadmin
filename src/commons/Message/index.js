/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import cross from 'assets/icons/cross.svg'
import crossGreen from 'assets/icons/cross-green.svg'
import {MessageWrapper, CrossIcon} from './styled'

const Message = ({message}) => {
  const [isMessageShown, showMessage] = useState(true)

  useEffect(() => {
    showMessage(true)
  }, [message])

  if (!message || !isMessageShown) return null

  return (
    <MessageWrapper type={message.type}>
      <div style={{flex: 1}}>{message.text}</div>
      <CrossIcon
        onClick={() => showMessage(false)}
        src={message.type === 'error' ? cross : crossGreen}
      />
    </MessageWrapper>
  )
}

Message.propTypes = {
  message: PropTypes.object,
}

export default Message
