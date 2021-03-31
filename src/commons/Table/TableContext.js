/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'
import { omit } from 'lodash'

import { isEmpty } from 'utils'

// eslint-disable-next-line import/no-mutable-exports
let TableContext
// eslint-disable-next-line no-multi-assign
const { Provider, Consumer } = (TableContext = createContext({}))

const TableProvider = ({ children, columns, data, label, ...props }) => {
  const [showInput, setShowInput] = useState({})
  const [value, setValue] = useState(''),
    hiddenColumnsObject = window.localStorage.getItem('hiddenColumns')
  const hiddenColumns = hiddenColumnsObject ? JSON.parse(hiddenColumnsObject) : {},
    [hiddenColumnsForTable, updateHiddenColumns] = useState(hiddenColumns[label] || [])

  const handleShowInput = args => {
    setShowInput(args)
    if (!isEmpty(args)) {
      setValue(args.value[args.key.key])
    }
  }
  const handleInputValue = val => setValue(val)

  return (
    <Provider
      value={{
        showInput,
        hiddenColumns      : hiddenColumnsForTable,
        hiddenColumnsObject: hiddenColumns,
        updateHiddenColumns,
        handleShowInput,
        value,
        handleInputValue,
        allColumns         : columns,
        columns            : omit(columns, hiddenColumnsForTable),
        data,
        ...props,
      }}
    >
      {children}
    </Provider>
  )
}

TableProvider.propTypes = {
  border  : PropTypes.bool,
  children: PropTypes.node.isRequired,
  columns : PropTypes.shape({
    cssHeader: PropTypes.string,
  }).isRequired,
  data             : PropTypes.arrayOf(PropTypes.object).isRequired,
  header           : PropTypes.oneOf(['primary', 'secondary', 'white']),
  isSearchable     : PropTypes.bool,
  label            : PropTypes.string,
  onCheckboxClicked: PropTypes.func,
  rowConfig        : PropTypes.shape({
    uniqueKey: PropTypes.string,
    css      : PropTypes.string,
    onClick  : PropTypes.func,
  }),
  showColumnSelector: PropTypes.bool
}

TableProvider.defaultProps = {
  header   : 'primary',
  border   : false,
  rowConfig: {
    uniqueKey: 'id',
    css      : '',
    onClick  : () => {},
  },
}

export default TableProvider
export { Consumer as TableConsumer, TableContext }
