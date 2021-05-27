import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom';
import {List} from 'antd'
import {connect} from 'react-redux'
import {getAlllogs} from 'services/logs'

const MiniLogs = ({ history, title, dispatch,data }) => {
	const [miniData, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const {Item} = List

	const fetchLogs = () => {
		let params = {
			page : 1,
			per_page : 5,
			filter : {},
			sort : {}
		}
		dispatch(getAlllogs({params, callback : handleFetchLogsCallback}))
	};

	useEffect(() => {
		let clone = [...data];
		let arr = [];
		clone.forEach((ele, index) => {
			if(index <= 5 ){
				arr.push(ele);
			}
		})
		setData(arr);
	}, [data])

	const handleFetchLogsCallback = () => {
		setLoading(false);
	}

	useEffect(() => {
		if(data.length){
			handleFetchLogsCallback()
		}else{
			setLoading(true);
			fetchLogs()
		}
	}, [history.location.pathname])

	const listItems = miniData.map((item, index) =>
		<Item key={index}>{item.message}</Item>
	);

	return (
		<>
			<div className="card">
				<div className="card-header">
					<div className="utils__title text-uppercase">
						<strong>Activity Logs</strong>
					</div>
					<div className="utils__titleDescription">
						<span>List of recent activities</span>
					</div>
				</div>
				<div className="card-body">
					<List>
						{listItems}
					</List>
				</div>
			</div>
		</>
	)
}


MiniLogs.propTypes = {
	history: PropTypes.object
}

const mapStateToProps = state => {
	return {
		data : state.Log.data
	}
}

export default connect(mapStateToProps)(withRouter(MiniLogs))

