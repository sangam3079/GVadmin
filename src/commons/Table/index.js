/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import React, { useState, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import OverlaySpinner from 'commons/OverlaySpinner'
import ReactPaginate from 'react-paginate'

import TableProvider from './TableContext'
import { Main, Table, OptionsWrapper, ListWrapper, PageInfo } from './styled'
import TableHeader from './Header'
import TableBody from './Body'
import Search from './Search'
import ColumnsSelector from './ColumnsSelector'

const App = ({ isSearchable, className, canPaginate, totalPages, tableStyle, refetch, limit, label, showColumnSelector, loading, filters, tableMinWidth, ...props }) => {
  const [currentPage, changePage] = useState(0),
    [searchParam, changeSearchParam] = useState()

  const firstUpdate = useRef(true);

  /* eslint-disable */
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    changePage(0)
    refetch && refetch({ params: { search: searchParam, limit, offset: 0, filters } })
  }, [filters]);
  /* eslint-enable */

  let maxPaginationValue, totalData
  if (canPaginate) {
    maxPaginationValue = (currentPage + 1) * limit;
    totalData = totalPages * limit;
  }

  return (
    <TableProvider showColumnSelector={showColumnSelector} label={label} {...props}>
      <ListWrapper>
        {(canPaginate || isSearchable) && <OptionsWrapper>
          {(canPaginate && !loading) ?
            <PageInfo>
              {totalPages === 0 ? searchParam ? <>{`No results containing '${searchParam}'`}</>: null :
                <>{ currentPage * limit + 1} - {maxPaginationValue < totalData ? maxPaginationValue : totalData}&nbsp;
                of {totalData} {label} {searchParam && `containing '${searchParam}'`}</>}
            </PageInfo>
            : null}
          {showColumnSelector && <ColumnsSelector label={label} />}
          {isSearchable && (
            <Search
              handleSubmit={value => {
                changePage(0)
                changeSearchParam(value)
                refetch({ params: { search: value, limit, offset: 0, filters } })
              }} />
          )}
        </OptionsWrapper>}

        <Main style={tableStyle || { position: 'relative' }}>
          <Table
            className={className}
            style={{ minWidth: tableMinWidth || 0 }}>
            <TableHeader />

            <OverlaySpinner
              style={{ position: 'absolute', top: 0, backgroundColor: 'rgba(255,255,255,0.5)' }}
              loaderStyle={{ top: 50 }}
              loading={loading} />
            <TableBody />
          </Table>
        </Main>
        {(canPaginate && totalPages) ? <ReactPaginate
          pageCount={Math.ceil(totalPages)}
          forcePage={currentPage}
          pageRangeDisplayed={3}
          marginPagesDisplayed={3}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          onPageChange={page => {
            changePage(page.selected)
            refetch({ params: { search: searchParam, limit, offset: page.selected * limit, filters } })
          }}
          activeClassName="active" /> : null}
      </ListWrapper>
    </TableProvider>
  )
}

App.propTypes = {
  canPaginate       : PropTypes.bool,
  className         : PropTypes.string,
  filters           : PropTypes.object,
  isSearchable      : PropTypes.bool,
  label             : PropTypes.string,
  limit             : PropTypes.number,
  loading           : PropTypes.bool,
  onPageChange      : PropTypes.func,
  refetch           : PropTypes.func,
  showColumnSelector: PropTypes.bool,
  tableMinWidth     : PropTypes.number,
  tableStyle        : PropTypes.object,
  totalPages        : PropTypes.number
}

App.defaultProps = {
  className: 'table'
}

App.displayName = 'Table'

export { default as EditableField } from './EditableField'

export default App
