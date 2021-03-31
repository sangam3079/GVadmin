/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {faFilter} from '@fortawesome/free-solid-svg-icons'

import Tabs from 'commons/Tabs'
import Button from 'commons/Buttons'
import Card from 'commons/Cards'

const Filter = ({ filterParams, activeFilterParam }) => {
  const [show, setShow]=useState(false)
  const {tabs, panels} = Object.keys(filterParams)
    .reduce((acc, filterParam) => {
      acc.tabs.push(
        <Tabs.Tab key={filterParam} id={filterParam}>{filterParams[filterParam].label}</Tabs.Tab>
      );
      acc.panels.push(
        <Tabs.Panel key={filterParam} panelId={filterParam}>{filterParams[filterParam].content}</Tabs.Panel>
      );
      return acc;
    }, { tabs: [], panels: [] });
  return (
    <>
      <Button.Icon secondary icon={faFilter} onClick={() => setShow(!show)} style={{ minWidth: 100, cursor: 'pointer' }}>Filter</Button.Icon>
      {show && (
        <Card style={{ marginTop: 10 }}>
          <Card.Content>
            <Tabs activeTab={activeFilterParam}>
              <Tabs.List render={() => tabs} />
              <Tabs.Panels>
                {panels}
              </Tabs.Panels>
            </Tabs>
          </Card.Content>
          <Card.Footer>
            <Button>
              <Button.Content style={{ marginRight: 10 }}>Save</Button.Content>
              <Button.Content secondary onClick={()=>setShow(!show)}>Cancel</Button.Content>
            </Button>
          </Card.Footer>
        </Card>
      )}
    </>
  )
}

Filter.propTypes = {
  activeFilterParam: PropTypes.string,
  filterParams     : PropTypes.object
}

Filter.defaultProps = {
  filterParams: {}
}

export default Filter
