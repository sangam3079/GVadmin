/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import styled from 'styled-components'

const colsFirstOfType = ['cols-1of3', 'cols-1of4', 'cols-1of6']

function styleGridAlign(position) {
  // may be hAlign and vAlign tersm will sound best
  switch (position) {
  case 'top':
    return 'align-items: flex-start;'
  case 'bottom':
    return 'align-items: flex-end'
  case 'right':
    return 'justify-content: flex-end'
  case 'left':
    return 'justify-content: flex-start'
  case 'center':
    return 'justify-content: center; align-items: center'
  default:
    return 'flex-start'
  }
}

export const GridCell = styled.div`
  flex: 1;
`

function styleColumn(column, firstOfType) {
  if (firstOfType) {
    switch (column) {
    case 'cols-1of4':
    case 'cols-1of3':
      return '0 0 100%'
    case 'cols-1of6':
      return '0 0 50%'
    default:
      return '0 0 100%'
    }
  } else {
    switch (column) {
    case 'cols-2':
    case 'cols-3':
    case 'cols-4':
      return '0 0 100%'
    case 'cols-6':
      return '0 0 calc(50% - 1em)'
    case 'cols-12':
      return '0 0 calc(33.3333% - 1em)'
    case 'cols-1of2':
      return '0 0 50%'
    default:
      return '0 0 100%'
    }
  }
}

function styleColumnForTablet(column, firstOfType) {
  if (firstOfType) {
    switch (column) {
    case 'cols-1of4':
      return '0 0 50%'
    case 'cols-1of3':
      return '0 0 100%'
    case 'cols-1of6':
      return '0 0 30%'
    default:
      return ''
    }
  } else {
    switch (column) {
    case 'cols-4':
      return '0 0 calc(50% - 1em)%'
    case 'cols-6':
      return '0 0 calc(33.3333% - 1em)'
    case 'cols-12':
      return '0 0 calc(16.6666% - 1em)'
    case 'cols-1of2':
      return '0 0 50%'
    default:
      return ''
    }
  }
}

/* Large screens */
function styleColumnForLargeScreen(column, firstOfType) {
  if (firstOfType) {
    switch (column) {
    case 'cols-1of4':
      return '0 0 25%'
    case 'cols-1of3':
      return '0 0 30%'
    case 'cols-1of6':
      return '0 0 16.6666%'
    default:
      return ''
    }
  } else {
    switch (column) {
    case 'cols-2':
    case 'cols-3':
    case 'cols-4':
    case 'cols-6':
    case 'cols-12':
      return '1'
    case 'cols-1of2':
      return '0 0 50%'
    default:
      return '1'
    }
  }
}

export const GridWrapper = styled.div`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  
  ${props =>
    props.full &&
    `
    flex: 0 0 100%;
  `}
  ${props =>
    props.nested &&
    `
    ${GridCell}:first-of-type {
      margin-right: 1em;
    }
  `}
  ${props =>
    props.textCenter &&
    `
    text-align: center;
  `}
  ${props =>
    props.gutters &&
    `
    margin-left: -1em;
    ${GridCell} {
      padding-left: 1em;
    }
  `}
  ${props => props.gridAlign && `${styleGridAlign(props.gridAlign)}`};
  ${props =>
    props.col && colsFirstOfType.includes(props.col)
      ? `
      > ${GridCell}:first-of-type {
        flex: ${styleColumn(props.col, true)}
      }
    `
      : `
      > ${GridCell} {
        flex: ${styleColumn(props.col, false)}
      }
    `};
  @media (min-width: 30em) {
    ${props =>
    props.col && colsFirstOfType.includes(props.col)
      ? `
      > ${GridCell}:first-of-type {
        flex: ${styleColumnForTablet(props.col, true)}
      }
    `
      : `
      > ${GridCell} {
        flex: ${styleColumnForTablet(props.col, false)}
      }
    `}
  }
  @media (min-width: 48em) {
    ${props =>
    props.col && colsFirstOfType.includes(props.col)
      ? `
      > ${GridCell}:first-of-type {
        flex: ${styleColumnForLargeScreen(props.col, true)}
      }
    `
      : `
      > ${GridCell} {
        flex: ${styleColumnForLargeScreen(props.col, false)}
      }
    `}
  }
`
