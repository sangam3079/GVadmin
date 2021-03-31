import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useTable,
  useFilters,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table';
import { NavLink } from 'react-router-dom';

import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Styles = styled.div`
		padding: 0px !important;
		margin-top: 0;
		table {
			border-spacing: 0;
			width: 100%;
			border-spacing: 0;
			padding: 0px !important;
			thead:nth-child(1){
				${'' /* border: 1px solid blue; */}
				tr:nth-child(1){
					display: none
				}
				tr:nth-child(3){
					display: none
				}
			}
			tr {
				:first-child{
					${'' /* border: 1px solid red; */}
				}
				:last-child {
					td {
						border-bottom: 0;
					}
				}
				td{
					width: 150px;
					max-width: 250px;
					word-break: break-all
					max-height: 100px;
					overflow-Y: none;
				}
			}
			th{
				background: #F5F6FA
				text-align: left
				padding: 20px 10px;
				color: #A3A6B4;
				svg{
					margin-left: 5px;
					color: #888787;
					cursor: pointer;
					&:hover{
						color: #525252;
					}
				}
			},
			td {
				margin: 1;
				padding: 20px 10px;
				border-bottom: 1px solid #dedede;
				text-align: left;
				:last-child {
					border-right: 0;
				}
			}
			input, select{
			width: 100%;
			padding: 10px 10px;
			margin-bottom: 20px;
			border: none;
			border-radius: 5px;
				::placeholder {
					color: #A3A6B4;
					opacity: 1;
				}
			}
			select{
				height: 40px;
				background: white;
			}
		}

		.pagination{
			display: block;
			width: 100%
			text-align: center;
			margin-top: 40px;
			button{
				border: none;
				width: 25px;
				height: 100%;
				.fa{
					font-size: 16px;
					cursor: pointer
				}
				&:focus{
					color: red;
					border: none;
				}
			}
			input{
				border: 1px solid #f0f0f7;
				padding: 10px 10px;
				border-radius: 5px;
				height: 40px;
				background: white;
			}
			select{
				border: 1px solid #f0f0f7;
				width: 20%;
				padding: 10px 10px;
				border-radius: 5px;
				height: 40px;
				background: white;
				width: 80px;
			}
			.first, .second, .third{
				display: inline-block;
				width: 250px;
				padding: 10px;
				height: 40px;
				vertical-align: middle;
				display: inline-flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
			.second{
				border-left: 0.11em solid #dedede;
				border-right: 0.11em solid #dedede;
			}
		}
	`,
  Container = styled.div`
    width: 100%;
  `,
  Options = styled.div`
    border: 1px solid red;
  `,
  Link = styled(NavLink)`
    font-size: 14px;
    cursor: pointer !important;
  `,
  CustomLink = styled.span`
    font-size: 14px;
    cursor: pointer !important;
  `;

// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
export default function Table({
  header,
  columns,
  data,
  fetchData,
  loading,
  filters,
  total,
  handleOnInputChange,
  deleteRecord,
  disableEnable,
  currentOrder,
  sortRows,
  pagination,
  pageCount: controlledPageCount,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    flatColumns,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    useSortBy,
    usePagination
  );

  // Listen for changes in pagination and use the state to fetch our new data
  useEffect(() => {
    fetchData({ pageIndex, pageSize, state });
  }, [fetchData, pageIndex, pageSize]);

  // Render the UI for your table
  return (
    <>
      {/* <pre>
				<code>
					{JSON.stringify(
						{
							pageIndex,
							pageSize,
							pageCount,
							canNextPage,
							canPreviousPage,
							state						},
						null,
						2
					)}
				</code>
			</pre> */}
      <Styles>
        <table {...getTableProps()}>
          {header !== false && (
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                      {column.sort && (
                        <FontAwesomeIcon
                          icon={faSort}
                          size='1x'
                          onClick={(e) => {
                            const sortBy =
                              (column.sort_by && column.sort_by) || column.id;
                            let newOrder;
                            if (currentOrder[sortBy]) {
                              newOrder =
                                currentOrder[sortBy] === 'desc'
                                  ? 'asc'
                                  : 'desc';
                            } else {
                              newOrder = 'desc';
                            }
                            sortRows(
                              pageSize,
                              pageIndex,
                              state,
                              sortBy,
                              newOrder
                            );
                          }}
                        />
                      )}
                      {/* Render the columns filter UI */}
                      {column.Filter && (
                        <input
                          type='text'
                          value={
                            (filters &&
                              (filters[column.searchIn] ||
                                filters[column.id])) ||
                            ''
                          }
                          id='search-input'
                          placeholder='Search...'
                          onChange={(e) => {
                            handleOnInputChange(
                              pageSize,
                              pageIndex,
                              state,
                              e.target.value,
                              (column.searchIn && column.searchIn) || column.id
                            );
                          }}
                        />
                      )}
                    </th>
                  ))}
                </tr>
              ))}
              <tr>
                <th
                  colSpan={flatColumns.length}
                  style={{
                    textAlign: 'left',
                  }}
                ></th>
              </tr>
            </thead>
          )}
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    console.log(
                      'study me',
                      cell.column.table,
                      cell.row.original.id
                    );
                    if (cell.column.type === 'options') {
                      if (cell.row.original.id) {
                        return (
                          <td>
                            {cell.column.disable && (
                              <>
                                <CustomLink
                                  onClick={(e) => {
                                    disableEnable(
                                      `admin/${cell.column.table}/${cell.row.original.id}`,
                                      { disabled: !cell.row.original.disabled }
                                    );
                                  }}
                                >
                                  {cell.row.original.disabled
                                    ? 'Enable'
                                    : 'Disable'}
                                </CustomLink>
                                <span> | </span>
                              </>
                            )}
                            <Link
                              to={{
                                pathname: `/${cell.column.parent.Header}/${cell.row.original.id}/edit`,
                                record: { ...cell.row.original },
                              }}
                            >
                              Edit
                            </Link>

                            {cell.column.parent.Header !== 'Subscriptions' && (
                              <>
                                <span> | </span>
                                <CustomLink
                                  style={{ color: 'red' }}
                                  onClick={(e) => {
                                    deleteRecord(
                                      `admin/${cell.column.table}/${cell.row.original.id}`
                                    );
                                  }}
                                >
                                  Delete
                                </CustomLink>
                              </>
                            )}
                          </td>
                        );
                      }
                    } else if (cell.column.type === 'association') {
                      // let val = JSON.parse(cell.value)
                      return (
                        <td {...cell.getCellProps()}>
                          {cell.value === {} ? '' : cell.value['value'] || ''}
                        </td>
                      );
                    } else {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    }
                  })}
                </tr>
              );
            })}
            {pagination && (
              <tr>
                {loading ? (
                  // Use our custom loading state to show a loading indicator
                  <td colSpan='10000'>Loading...</td>
                ) : (
                  <td colSpan='10000'>
                    <i>
                      Showing {page.length} of ~{total} results
                    </i>
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </Styles>
      {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
      {pagination && (
        <div className='pagination'>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type='number'
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          {/* <select
					value={pageSize}
					onChange={e => {
						setPageSize(Number(e.target.value))
					}}
				>
					{[10, 20, 30, 40, 50].map(pageSize => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select> */}
        </div>
      )}
    </>
  );
}
