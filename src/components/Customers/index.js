import React, {useState, useMemo, useEffect, useContext, useCallback} from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css';
import cookie from 'utils/cookie'
import { customFetch } from 'utils'
import {Table} from 'antd';
// import Container from 'commons/Container'
// import Sidebar, { RouteWithSidebar } from 'commons/Sidebar'
// import CustomHeader from 'commons/CustomHeader'
// import Gist from 'commons/Style/Gist'
// import Breadcrumb from 'commons/Style/Breadcrumb'
// import NewTable from 'commons/NewTable'
import { UserContext } from 'contexts/UserContext'
// import { debounce } from 'lodash'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Customers = ({ history }) => {
	const {currentUser} = useContext(UserContext)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [pageCount, setPageCount] = useState(0)
	const [filters, setFilters] = useState({})
	const [total, setTotal] = useState(0)
	const [order, setOrder] = useState({ created_at: 'desc' })

	const columnss = useMemo(
		() => [
			{
				Header: "customers",
				columns: [
					{
						Header: "Email",
						accessor: "email",
						Filter: true,
						type: 'text'
					},
					{
						Header: "Plan",
						accessor: "plan"
					},
					{
						Header: "Country",
						accessor: "country",
						type: 'association'
					},
					{
						Header: "Status",
						accessor: "status",
						Filter: false
					},
					{
						Header: "Device",
						accessor: "device",
						sort: true
					},
					{
						Header: "Created Date",
						accessor: "created_at",
						Filter: false,
						sort: true
					},
					{
						Header: "Options",
						accessor: "",
						type: 'options',
						table: 'users',
						disable: true
					}
				]
			}
		],
		[]
	);
	const columns = [
        {
            title : 'Email',
            dataIndex : 'email',
            key : 'email'
        },
        {
            title : 'Plan',
            dataIndex : 'plan',
            key : 'plan'
        },
        {
            title : 'Country',
            dataIndex : 'country',
            key : 'country'
        },
        {
            title : 'Status',
            dataIndex : 'status',
            key : 'status'
        },
        {
            title : 'Device',
            dataIndex : 'device',
            key : 'device'
        },
        {
            title : 'Created Date',
            dataIndex : 'created_at',
            key : 'created_at'
        },
        {
            title : 'Options',
            render : () => (
                <i>hello world for now</i>
            )
        }
        
    ];

	const handleOnInputChange = async (pageSize, pageIndex, state, value, column) => {
		await setFilters(prevState => ({ ...prevState, [column]: value }))
		const hotFilters = filters
		hotFilters[column] = value
		console.log(hotFilters)
		fetchData({ pageSize, pageIndex, state, hotFilters})
	};

	// const sortRows = async (pageSize, pageIndex, state, sortBy, value) => {
	// 	const hotOrder = { [sortBy]: value }
	// 	await setOrder(hotOrder)
	// 	fetchData({ pageSize, pageIndex, state, filters, hotOrder })
	// };

	const token = cookie.getToken()
	const fetchCustomers = async ({ pageSize, pageIndex, state, hotFilters, hotOrder }) => {
		try {
			setLoading(true)
			const [response] = await customFetch('admin/users', 'GET', { per_page: 20, page: pageIndex + 1, filters: hotFilters || '', sorts: hotOrder || ''}, { Authorization: `Bearer ${token}` })
			setData(response.users);
			setTotal(response.total);
			setOrder(response.order);
			setLoading(false)
			setPageCount(response.pages)
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		//fetchCustomers();
		fetchData()
	}, [])

	const fetchData = useCallback(({ pageSize, pageIndex, state, hotFilters, hotOrder }) => {
		fetchCustomers({ pageSize, pageIndex, state, hotFilters, hotOrder});
	}, [])

	const confirmEnableDisable = async (url, val) => {
		try {
			const desiredAction = val['disabled'] ? 'disable' : 'enable'
			confirmAlert({
				title: `Confirm to ${desiredAction}`,
				message: `Are you sure, you want to ${desiredAction} this record?`,
				buttons: [
					{
						label: 'Yes',
						onClick: () => {
							customFetch(url, 'PUT', val, { Authorization: `Bearer ${token}` })
							window.location.reload()
						}
					},
					{
						label: 'No',
						onClick: () => history.push('/customers')
					}
				]
			});
		} catch (e) {
			console.log(e)
		}
	}

	const deleteRecord = async (url) => {
		try {
			confirmAlert({
				title: 'Confirm to delete',
				message: 'Are you sure, you want to delete this record?',
				buttons: [
					{
						label: 'Yes',
						onClick: () => {
							customFetch(url, 'DELETE', {}, { Authorization: `Bearer ${token}` })
							window.location.reload()
						}
					},
					{
						label: 'No',
						onClick: () => history.push('/customers')
					}
				]
			});
		} catch (e) {
			console.log(e)
		}
	}

	const disableEnable = async (url, val) => {
		const [response] = await customFetch(url, 'PUT', val, { Authorization: `Bearer ${token}` })
		window.location.reload()
	}

	//if (loading) return <div>Loading...</div>
	return (
		// <Container>
		// 	<RouteWithSidebar>
		// 		<CustomHeader currentUser={currentUser} history={history}/>
		// 		<Breadcrumb name='Customers' createNew={true} path={`/customers/new`} title='Add New Customer' />
		// 		<Gist>
		// 			<NewTable
		// 				columns={columns}
		// 				data={data || []}
		// 				fetchData={fetchData}
		// 				loading={loading}
		// 				pageCount={pageCount}
		// 				filters={filters}
		// 				total={total}
		// 				handleOnInputChange={debounce(handleOnInputChange, 150)}
		// 				deleteRecord={deleteRecord}
		// 				disableEnable={confirmEnableDisable}
		// 				currentOrder={order}
		// 				sortRows={sortRows}
		// 				pagination={true}
		// 			/>
		// 		</Gist>
		// 	</RouteWithSidebar>
		// </Container>
		<Table columns={columns} dataSource={data} />
	)
}

Customers.propTypes = {
	history: PropTypes.object
}
export default Customers

