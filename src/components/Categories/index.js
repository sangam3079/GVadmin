import React, { useState, useMemo, useEffect, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'

import cookie from 'utils/cookie'
import { isLogin, customFetch } from 'utils'

import Container from 'commons/Container'
import getSidebarItems from '../commons/WrapperWithSidebar/sidebarItems'
import Sidebar, { RouteWithSidebar } from 'commons/Sidebar'
import CustomHeader from 'commons/CustomHeader'
import Gist from 'commons/Style/Gist'
import Breadcrumb from 'commons/Style/Breadcrumb'
import NewTable from 'commons/NewTable'
import { UserContext } from 'contexts/UserContext'
import SelectFilter from '../commons/Filter/SelectColumnFilter'
import { debounce } from 'lodash'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Categories = ({ history }) => {

	const { currentUser } = useContext(UserContext)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [pageCount, setPageCount] = useState(0)
	const [filters, setFilters] = useState({})
	const [total, setTotal] = useState(0)
	const [order, setOrder] = useState({ created_at: 'desc' })

	const optionsLinks = () => {
		return (<>
			<span>Edit</span>
			<span> | </span>
			<span>Delete</span>
		</>)
	}

	const columns = useMemo(
		() => [
			{
				Header: "Categories",
				columns: [
					{
						Header: "Name",
						accessor: "name",
						Filter: true,
						type: 'text'
					},
					{
						Header: "Genre",
						accessor: "genre",
						type: "association"
					},
					{
						Header: "Track Count",
						accessor: "track_count"
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
						table: 'categories',
						Options: optionsLinks
					}
				]
			}
		],
		[]
	);


	const handleOnInputChange = async (pageSize, pageIndex, state, value, column) => {
		await setFilters(prevState => ({ ...prevState, [column]: value }))
		const hotFilters = filters
		hotFilters[column] = value
		console.log(hotFilters)
		fetchData({ pageSize, pageIndex, state, hotFilters })
	};

	const sortRows = async (pageSize, pageIndex, state, sortBy, value) => {
		const hotOrder = { [sortBy]: value }
		await setOrder(hotOrder)
		fetchData({ pageSize, pageIndex, state, filters, hotOrder })
	};

	const token = cookie.getToken()
	const fetchCategories = async ({ pageSize, pageIndex, state, hotFilters, hotOrder }) => {
		try {
			setLoading(true)
			const [response, headers] = await customFetch('admin/categories', 'GET', { per_page: 20, page: pageIndex + 1, filters: hotFilters || '', sorts: hotOrder || '' }, { Authorization: `Bearer ${token}` })
			setData(response.categories);
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
	}, [])

	const fetchData = useCallback(({ pageSize, pageIndex, state, hotFilters, hotOrder }) => {
		fetchCategories({ pageSize, pageIndex, state, hotFilters, hotOrder });
	}, [])

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
						onClick: () => history.push('/categories')
					}
				]
			});
		} catch (e) {
			console.log(e)
		}
	}


	//if (loading) return <div>Loading...</div>
	return (
		<Container>
			<RouteWithSidebar>
				<CustomHeader currentUser={currentUser} history={history} />
				<Breadcrumb name='Categories' createNew={true} path={`/categories/new`} title='Add New Category' />
				<Gist>
					<NewTable
						columns={columns}
						data={data || []}
						fetchData={fetchData}
						loading={loading}
						pageCount={pageCount}
						filters={filters}
						total={total}
						deleteRecord={deleteRecord}
						handleOnInputChange={debounce(handleOnInputChange, 150)}
						currentOrder={order}
						sortRows={sortRows}
						pagination={true}
					/>
				</Gist>
			</RouteWithSidebar>
		</Container>
	)

}

Categories.propTypes = {
	history: PropTypes.object
}
export default Categories

