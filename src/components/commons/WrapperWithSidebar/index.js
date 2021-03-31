import React from 'react'
import { get, compact } from 'lodash'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo-hooks'

import Container from 'commons/Container'
import Sidebar, { RouteWithSidebar } from 'commons/Sidebar'

import getSidebarItems from './sidebarItems'

const WrapperWithSidebar = ({ children, history }) => {
  return (
    <Container>
      <Sidebar items={getSidebarItems()} history={history} />
      <RouteWithSidebar>
        {children}
      </RouteWithSidebar>
    </Container>
  )
}

WrapperWithSidebar.propTypes = {
  children          : PropTypes.node,
  history           : PropTypes.object,
  recentCompanies   : PropTypes.array,
  recentWealthGuides: PropTypes.array
}

export default WrapperWithSidebar

const addRecentOnes = (array, recent, key) => {
  if(!array.length) return []

  return compact([
    ...recent.map(i => array.find(item => item[key] && item[key].toString() === i)),
    ...array.filter(item => !recent.includes(item[key] && item[key].toString()))
  ])
}
