import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { UserContext } from 'contexts/UserContext'
import MiniCustomers from '../Customers/MiniCustomers'
import MiniTracks from '../Tracks/MiniTracks'
import MiniLogs from '../Logs/MiniLogs'
import CustomerChart from '../Chart/CustomerChart'
import CustomLayout from '../../components/CustomLayout/CustomLayout'
import InfoCard from '../../cleanComponents/ChartCard'
import CustomerGrowthChart from '../../components/Chart/CustomerGrowthChart'
import WidgetCard from '../../cleanComponents/widgets'
import WidgetGraph from '../../cleanComponents/Graphs'
import DoughnutGraph from '../../cleanComponents/Graphs/DoughnutGraph'
// import BreadCrumb from 'cleanComponents/Breadcrumb/BreadCrumb'


const Dashboard = ({ history }) => {
	const [loading, updateLoading] = useState(true),
		[data, setData] = useState([]),
		{ currentUser, metrics } = useContext(UserContext)

	// if (loading) return <div>Loading...</div>
	return (
		<>
		<CustomLayout sidebarSelectionKey="dashboard">
			<div className="utils__title utils__title--flat mb-3">
				<strong className="text-uppercase font-size-16">Recent Statistics</strong>
			</div>
			<div className="row">
				<div className="col-sm-3">
					<InfoCard title="Tracks" amount={metrics.tracks_count} />
				</div>
				<div className="col-sm-3">
					<InfoCard title="Customer" amount={metrics.customers_count}/>
				</div>
				<div className="col-sm-3">
					<InfoCard title="Subscriber" amount={metrics.subscribers_count}/>
				</div>
				<div className="col-sm-3">
					<InfoCard title="Active User" amount={metrics.active_users_count}/>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-12">
					<MiniCustomers />
				</div>
			</div>
			<div className="row">
				<div className="col-lg-12">
					<CustomerGrowthChart />
				</div>
			</div>
			<div className="row">
				<div className="col-lg-6">
					<MiniLogs />
				</div>
				<div className="col-lg-6">
					<CustomerChart />
				</div>
			</div>
		</CustomLayout>
		</>
	)
}

Dashboard.propTypes = {
	history: PropTypes.object
}

export default Dashboard

