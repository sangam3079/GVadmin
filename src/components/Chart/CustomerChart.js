import React, { useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import {withRouter} from 'react-router-dom'
import ChartistGraph from 'react-chartist';
import {connect} from 'react-redux'
import {userGrowth} from 'services/profile'


const CustomerChart = ({ data, dispatch }) => {
	const [growth, setGrowth] = useState({})
	const [loading, setLoading] = useState(false)

	// let d_data =  {
	// 	labels: [
	// 	  "2016",
	// 	  "2017",
	// 	  "2018",
	// 	  "2019",
	// 	  "2020"
	// 	],
	// 	series: [
	// 	  [5,2,4,2,5],
	// 	  [3,1,5,4,2],
	// 	]
	//   }

	const fetchLogs = () => {
		setLoading(true);
		dispatch(userGrowth({callback : ()=>setLoading(false)}))
	};

	useEffect(()=>{
		if(!Object.keys(data).length){
			fetchLogs();
		}else{
			setLoading(false);
		}
	}, [data])

	useEffect(()=>{
		let labels = Object.keys(data);
		let series = [];
		let series_data = [];
		Object.keys(data).forEach(key =>{
			series_data.push(data[key])
		})
		series.push(series_data);
		let obj = {
			labels,
			series
		}
		setGrowth(obj);
	}, [data])

	if (loading) return <div>Loading...</div>
	return (
		<>
			<div className="card">
				<div className="card-header">
					<div className="utils__title text-uppercase">
						<strong>Growth Chart</strong>
					</div>
					<div className="utils__titleDescription">
						<span>Growth by month</span>
					</div>
				</div>
				<div className="card-body">
					<ChartistGraph
						data={growth}
						options ={{seriesBarDistance : 10}} 
						type="Bar"
						className="chart-area height-400 mt-4 chartist"
					/>
				</div>
			</div>
		</>
	)
}

CustomerChart.propTypes = {
	history: PropTypes.object
}

const mapStateToProps = state => {
	return {
		data : state.Profile.userGrowth
	}
}

export default connect(mapStateToProps)(withRouter(CustomerChart))

