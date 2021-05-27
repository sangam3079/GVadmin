import React, { useState, useEffect} from 'react'
import PropTypes, { string } from 'prop-types'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
// import moment from 'moment';
import moment from 'moment-timezone'
import { getAllActiveCustomer } from 'services/customers';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import {Switch} from 'antd'
import AntTable from 'cleanComponents/Table/Table'
import { EyeFilled, EyeOutlined } from '@ant-design/icons'

const MiniCustomers = ({ history, title, dispatch}) => {
	const [loading, setLoading] = useState(true)
	const [fetching, setFetching] = useState(false);
	const [miniData, setData] = useState([])
	const [autoRefresh, setAutoRefresh] = useState(false);
	const [currentPage, setCurrentPage] = useState(1)
	const [total, setTotal] = useState()

	const columns = [
		{
			title : 'Email',
			dataIndex : 'email'
		},
		{
			title : 'Plan',
			dataIndex : 'plan'
		},
		
		{
			title : 'Device',
			dataIndex : 'device',
			render : (device) => {
                return <div style={{display : 'flex', justifyContent :'center'}}>{device === 'android' ? <AndroidFilled /> : device === 'ios' ? <AppleFilled /> : <small>-</small>}</div>
            }
		},/*
		{
			title : 'Created Date',
			dataIndex : 'created_at'
		},  */
		{
			title : 'Last Active',
			dataIndex : 'status',
			render : (status) => {
				if(status === 'NA'){
					return 'Unknown'
				}
				// moment.tz.setDefault('Asia/Katmandu')
				let mmt = moment.utc(status, 'DD/MM/YY HH:mm:ss');
				// console.log(mmt)
				let last_login = mmt.fromNow()
				return last_login
			}
		},
		/*
		{
			title : 'Status',
			dataIndex : 'active',
			render : (active, row) => {
                return (
                    // <Switch 
                    //     checked={active} 
                    //     title={active ? 'User is active' : 'User is inactive'}
					// 	// onChange={()=>{}}
						
					//     />
					<p>{active ? 'Active' : 'Inactive'}</p>
                )
            } 
		},  */
	]

	useEffect(() => {
		fetchCustomers()
	}, [currentPage])

	const fetchCustomers = () => {
		// setFetching(true);
		const params = {
			page : currentPage,
			per_page : 10,
			// filter : {},
			// sort : {}
		}
		dispatch(getAllActiveCustomer({callback : handleFetchAllCustomerCallback, params}))
	};

	const handleTableChange = pagination => {
		console.log(pagination)
		if(pagination.current !== currentPage){
			setCurrentPage(pagination.current)
		}
	}

	const handleFetchAllCustomerCallback = (resp) => {
		setLoading(false);
		setFetching(false);
		setData(resp.data)
		setTotal(resp.page_meta.total)
	}

	const toggleAutoRefresh = _ => {
		setAutoRefresh(!autoRefresh)
	}

	useEffect(() => {
		fetchCustomers()
	}, [history.location.pathname])

	// useEffect(() => {
	// 	let clonedData = [...data];
	// 	let arr = [];
	// 	clonedData.forEach((d, index) => {
	// 		if(index <= 5){
	// 			arr.push(d)
	// 		}
	// 	})
	// 	setData(arr);
	// }, [data])

	useEffect(() => {
		let interval;
		if(autoRefresh){
			interval = setInterval(()=>{
				fetchCustomers()
			}, 10000)
		}
		return ()=>clearInterval(interval)
	}, [autoRefresh])
	

	return (
		<>
					<div className="card">
						<div className="card-header">
							<div className="d-flex justify-content-between">
								<div>
									<div className="utils__title text-uppercase">
										<strong>Active Customers</strong>
									</div>
									<div className="utils__titleDescription">
										<span>List of active customers</span>
									</div>
								</div>
								<div className="d-flex align-items-center">
								{autoRefresh ? <EyeFilled title = "Auto Refresh enabled" style={{fontSize : 18}} onClick={toggleAutoRefresh}/> : <EyeOutlined style={{fontSize : 18}} onClick={toggleAutoRefresh} title = "Auto Refresh disabled" /> }
								</div>
							</div>
						</div>
						<div className="card-body">
							<AntTable 
								className="utils_scrollTable"
								pagination={{pageSize : 10, total : total, current : currentPage, showSizeChanger : false}}
								dataSource={miniData}
								columns={columns}
								loading={fetching}
								onChange={handleTableChange}
							/>
						</div>
					</div>
				</>
	)
}

MiniCustomers.propTypes = {
	history: PropTypes.object
}

// const mapStateToProps = state => {
// 	return {
// 		data : state.Customer.data
// 	}
// }


export default connect()(withRouter(MiniCustomers))

