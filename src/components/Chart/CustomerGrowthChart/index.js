import React from 'react'
import { Card, Tabs } from 'antd';
import CustomerGrowthChart from './CustomerGrowthChart'
import WidgetChart from '../../../cleanComponents/Graphs'

function CustomerGrowth() {

    const { TabPane } = Tabs;


    return (
        <div className="card">
          <div className="card-body">
            <Tabs defaultActiveKey='2'>
              <TabPane tab='This Month' key='1'>
                <WidgetChart />
              </TabPane>
              <TabPane tab='This year' key='2'>
                <CustomerGrowthChart />
              </TabPane>
            </Tabs>
          </div>  
        </div>
    )
}

export default CustomerGrowth
