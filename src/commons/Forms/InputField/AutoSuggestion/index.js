
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { get, debounce } from 'lodash'
// import { useApolloClient } from 'react-apollo-hooks'

import SelectField from '../SelectField'
import { customFetch } from 'utils'

const AutoSuggestion = ({
  queryInput,
  queryKey,
  labelCss,
  inputCss,
  companyCategoryId,
  preDefinedOptions,
  apiUrl,
  header,
  ...props
}) => {
  const [options, setOptions] = useState(preDefinedOptions || [])
  const [loading, setLoading] = useState(false)

  // const client = useApolloClient()

  const onInputChange = async value => {
    setLoading(true)

    const [response] = await customFetch(apiUrl, 'GET', { filters: { email: value } }, header)
    if (response.users && response.users.length > 0){
      const userOptions = response.users.map(item => ({ id: item.id, value: item.email }))
      setOptions(userOptions)
      setLoading(false)
    }

    // client
    //   .query({
    //     query    : queryInput,
    //     variables: {
    //       querySearchParams: value,
    //       companyCategoryId,
    //     },
    //   })
    //   .then(data => {
    //     setOptions(get(data, `data.${queryKey}`))
    //     setLoading(false)
    //   })
  }

  // console.log('dispaly of options  ... ', options, props.input)
  return (
    <SelectField
      labelCss={labelCss}
      inputCss={inputCss}
      noOptionsMessage={opts => {
        return opts.inputValue ? 'No options' : null
      }}
      onInputChange={debounce(onInputChange, 300)}
      options={options}
      isLoading={loading}
      {...props}
    />
  )
}

AutoSuggestion.propTypes = {
  companyCategoryId: PropTypes.number,
  inputCss         : PropTypes.string,
  labelCss         : PropTypes.string,
  preDefinedOptions: PropTypes.node,
  queryInput       : PropTypes.object.isRequired,
  queryKey         : PropTypes.string.isRequired,
}

export default AutoSuggestion
