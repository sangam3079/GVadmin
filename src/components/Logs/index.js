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
import { debounce } from 'lodash'

const Logs = ({ history }) => {
	const { currentUser } = useContext(UserContext)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [pageCount, setPageCount] = useState(0)
	const [filters, setFilters] = useState({})
	const [total, setTotal] = useState(0)

	const columns = useMemo(
		() => [
			{
				Header: "activity_logs",
				columns: [
					{
						Header: "Message",
						accessor: "message",
						Filter: true,
						type: 'text'
					},
					{
						Header: "Params",
						accessor: "params_json"
					},
					{
						Header: "Created Date",
						accessor: "created_at",
						Filter: false,
						sort: true
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

	const token = cookie.getToken()
	const fetchLogs = async ({ pageSize, pageIndex, state, hotFilters }) => {
		try {
			setLoading(true)
			const [response, headers] = await customFetch('admin/activity_logs', 'GET', { per_page: 20, page: pageIndex + 1, filters: hotFilters || '' }, { Authorization: `Bearer ${token}` })
			setData(response.activity_logs);
			setTotal(response.total);
			setLoading(false)
			setPageCount(response.pages)
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		//fetchCustomers();
	}, [])

	const fetchData = useCallback(({ pageSize, pageIndex, state, hotFilters }) => {
		fetchLogs({ pageSize, pageIndex, state, hotFilters });
	}, [])

	//if (loading) return <div>Loading...</div>
	return (
		<Container>
			<RouteWithSidebar>
				<CustomHeader currentUser={currentUser} history={history} />
				<Breadcrumb name='Activity Logs' createNew={false}/>
				<Gist>
					<NewTable
						columns={columns}
						data={data || []}
						fetchData={fetchData}
						loading={loading}
						pageCount={pageCount}
						filters={filters}
						total={total}
						handleOnInputChange={debounce(handleOnInputChange, 150)}
						pagination={true}
					/>
				</Gist>
			</RouteWithSidebar>
		</Container>
	)
}

Logs.propTypes = {
	history: PropTypes.object
}
export default Logs

