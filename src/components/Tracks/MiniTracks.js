import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
// import {Table} from 'antd'
import { getAllTracks, getPopularTracks } from 'services/tracks';

import AntTable from 'cleanComponents/Table/Table'

const MiniTracks = ({ history, title, data,currentPage, total, dispatch }) => {
	const [miniData, setMiniData] = useState([])
	const [fetching, setFetching] = useState(true)

	const columns = [
		{
			title : 'Tracks Title',
			dataIndex : 'name'
		}, 
		{
			title : 'Play Count',
			dataIndex : 'play_count'
		},
		/*
		{
			title : 'Duration',
			dataIndex : 'duration'
		} */
	]


	const handleTableChange = (pagination)=>{
		if(pagination.current !== currentPage){
			fetchPopularTracks(pagination.current);
		}
	}


	const fetchPopularTracks = (pagination) => {
		let params = {
			per_page : 4,
			page : pagination || 1,
			filter : {},
			sort : {}
		}
		dispatch(getPopularTracks({params, callback : fetchTrackCallback}))
	};

	const fetchTrackCallback = () => {
		setFetching(false);
	}


	useEffect(() => {
		if(data.length){
			fetchTrackCallback()
		}else{
			fetchPopularTracks()
		}
	}, [history.location.pathname])

	useEffect(() => {
		let clonedData = [...data];
		let arr = [];
		clonedData.forEach((ele, index) => {
			if(index <= 5){
				arr.push(ele)
			}
		})
		setMiniData(arr);
	}, [data])

	return ( 
		<>
					<div className="card">
						<div className="card-header">
							<div className="utils__title text-uppercase">
								<strong>Popular Tracks</strong>
							</div>
							<div className="utils__titleDescription">
								<span>List of popular tracks</span>
							</div>
						</div>
						<div>
							<AntTable 
								//className="utils_scrollTable"
								//pagination={{pageSize : 6, total : total, current : currentPage, showSizeChanger : false}}
								dataSource={miniData}
								columns={columns}
								loading={fetching}
								onChange={handleTableChange}
								//showHeader={false}
								pagination={false}
								borderd={true}
							/>
						</div>
					</div>
				</>
	)
}

MiniTracks.propTypes = {
	history: PropTypes.object
}

const mapStateToProps = state => {
	return {
		data : state.Track.data,
		currentPage:state.Track.currentPage,
		total:state.Track.total,
	}
}

export default connect(mapStateToProps)(withRouter(MiniTracks))

