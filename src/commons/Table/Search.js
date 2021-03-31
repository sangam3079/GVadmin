/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { TextField } from 'commons/Forms/InputField'

const Search = ({ placeholder, ...props }) => {
  const [search, setSearch] = useState('')

  const handleSearch = e => setSearch(e.target.value)
  const handleSubmit = e => {
    e.preventDefault()
    props.handleSubmit(search)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        inputCss={{ height: 38 }}
        placeholder={placeholder || 'Search...'}
        input={{
          value   : search,
          onChange: handleSearch,
        }}
      />
    </form>
  )
}

Search.propTypes = {
  handleSubmit: PropTypes.func,
  placeholder : PropTypes.string,
}

export default Search
