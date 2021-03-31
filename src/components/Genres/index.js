import React, { useState, useMemo, useEffect, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'

import cookie from 'utils/cookie'
import { isLogin, customFetch } from 'utils'

import Container from 'commons/Container'
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

const Genres = ({ history }) => {
	const { currentUser } = useContext(UserContext)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [pageCount, setPageCount] = useState(0)
	const [filters, setFilters] = useState({})
	const [total, setTotal] = useState(0)
	const [order, setOrder] = useState({created_at: 'desc'})

	const columns = useMemo(
		() => [
			{
				Header: "genres",
				columns: [
					{
						Header: "Genre Name",
						accessor: "name",
						Filter: true,
						type: 'text',
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
						table: 'genres'
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
		fetchData({ pageSize, pageIndex, state, hotFilters, order })
	};

	const sortRows = async (pageSize, pageIndex, state, sortBy, value) => {
		const hotOrder = {[sortBy]: value}
		await setOrder(hotOrder)
		fetchData({ pageSize, pageIndex, state, filters, hotOrder })
	};

	const token = cookie.getToken()
	const fetchGenres = async ({ pageSize, pageIndex, state, hotFilters, hotOrder }) => {
		try {
			setLoading(true)
			const [response, headers] = await customFetch('admin/genres', 'GET', { per_page: 20, page: pageIndex+1, filters: hotFilters || '', sorts: hotOrder || '' }, { Authorization: `Bearer ${token}` })
			setData(response.genres);
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
		fetchGenres({ pageSize, pageIndex, state, hotFilters, hotOrder });
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
						onClick: () => history.push('/genres')
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
			{/* <Sidebar items={getSidebarItems()} history={history} /> */}
			<RouteWithSidebar>
				<CustomHeader currentUser={currentUser} history={history} />
				<Breadcrumb name='Genres' createNew={true} path={`/genres/new`} title='Add New Genre' />
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

Genres.propTypes = {
	history: PropTypes.object
}
export default Genres

