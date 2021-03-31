/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import styled, { css } from 'styled-components'

import theme from 'constants/theme'

// import ArrowDown from 'Components/Generics/Icons/Svg/arrow-down'

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  @media(max-width: 1280px) {
    overflow: auto;
    padding-bottom: 80px;
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const Thead = styled.thead`
  background-color: ${theme.color.table.header};
  position: sticky;
  color: ${theme.color.table.text};
  ${props => props.css && css(...props.css)};
`

export const Th = styled.th`
  text-overflow: ellipsis;
  padding: 6px;
  font-weight: 400;
  text-align: ${props => (props.align ? props.align : 'center')};
  width: ${props => (props.width ? props.width : 'auto')};
  ${props => props.css && css(...props.css)};
`

export const Td = styled.td`
  color: ${theme.color.text.primary};
  height: 50px;
  font-weight: 400;
  padding: 0 6px;
  text-align: ${props => (props.align ? props.align : 'left')};
  ${props => props.css && css(...props.css)};
  & > a {
    display: block;
    color: ${theme.color.text.primary};
  }
`

export const Tr = styled.tr`
  box-shadow: ${props =>
    props.border && 'rgb(247, 247, 247) 0px -1px, rgb(247, 247, 247) 0px 1px'};
  height: 50px;
  ${props => props.css && css(...props.css)};
  :hover {
    background: ${theme.color.background.hovered};
  }
`

// export const DownArrow = styled(ArrowDown)`
//   margin: 0 6px;
//   cursor: pointer;
//   vertical-align: middle;
// `

export const SortHead = styled.span``

export const Loader = styled.div`
  padding: 30px 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ListWrapper = styled.div`
  width: 100%;
`
export const OptionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 20px;
`

export const PageInfo = styled.div `
  flex: 1;
  align-items: flex-end;
  display: flex;
  justify-content: flex-start;
  font-size: 16px;
  font-weight: 600;
`

export const FilterWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
`

export const Message = styled.div`
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid var(--borderColor);
  color: #ababab;
`
