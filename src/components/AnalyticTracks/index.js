import React, {useState, useContext} from 'react'
import { Card, Tabs } from 'antd';
import { UserContext } from 'contexts/UserContext'
import CustomLayout from '../CustomLayout/CustomLayout'
import Header from '../../components/Header/Header'
import WidgetChart from '../../cleanComponents/Graphs'
import WeeklyChart from '../../cleanComponents/Graphs/weekly'
import InfoCard from '../../cleanComponents/ChartCard'
import WidgetCard from '../../cleanComponents/widgets'
import StaticCard from '../../cleanComponents/Statics'
import PopularTracks from '../../components/Tracks/PopularTracks'



const AnalyticTracks = () => {

  const [loading, updateLoading] = useState(true),
		[data, setData] = useState([]),
		{ currentUser, metrics } = useContext(UserContext)

  const { TabPane } = Tabs;

  return (
    <CustomLayout sidebarSelectionKey='Analytic Tracks'>
      <div className="utils__title utils__title--flat mb-3">
				<strong className="text-uppercase font-size-16">Recent Statistics</strong>
			</div>
      <div className="row">
        <div className="col-sm-3">
          <WidgetCard title="Total Tracks" amount={metrics.tracks_count} />
        </div>
        <div className="col-sm-3">
          <InfoCard title="Total Subscribers" amount={metrics.subscribers_count}/>
        </div>
        <div className="col-sm-3">
          <InfoCard title="Monthly Subscribers" amount={metrics.monthly_subscribers}/>
        </div>
        <div className="col-sm-3">
          <InfoCard title="Yearly Subscribers" amount={metrics.yearly_subscribers}/>
        </div>
      </div>
      <div className="row">
          <div className="col-lg-6">
            <Tabs defaultActiveKey='1'>
              <TabPane tab='This week' key='1'>
                <WeeklyChart />
              </TabPane>
              <TabPane tab='This Month' key='2'>
                <WeeklyChart />
              </TabPane>
              <TabPane tab='This year' key='3'>
                <WidgetChart />
              </TabPane>
            </Tabs>
          </div>
          <div className="col-lg-6">
            <PopularTracks />
          </div>
        </div>       
    </CustomLayout>
  );
};

export default AnalyticTracks;