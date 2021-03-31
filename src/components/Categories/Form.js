import React, {useEffect, useState, useContext} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { last } from 'lodash'
// import { customFetch } from 'utils'
import { Form } from '../styled'
// import cookie from 'utils/cookie'
import NewForm from './CategoryForm'
// import { UserContext } from 'contexts/UserContext'
import CustomLayout from '../CustomLayout/CustomLayout'
import Header from '../../components/Header/Header'
import { getAllgenres } from 'services/genre'
import { getCategory } from 'services/category'

const Track = ({ history,dispatch, category,genres, ...props}) => {
	const locationPath = props.location.pathname.split('/')
	const [loading, setLoading] = useState(false)
	const [action] = useState(last(locationPath)),
		[id] = useState(locationPath[locationPath.length - 2]),
		[record, setRecord] = useState({})

	const handleCallback = () => {
		setLoading(false);
	}

	useEffect(() => {
		if (action === 'edit' && !Object.keys(category).length){
			setLoading(true);
			dispatch(getCategory({id, callback : handleCallback}))
		}

		if(!genres.length){
			let params = {
				page : 1,
				per_page : 10,
				filter : {},
				sort : {}
			}
			dispatch(getAllgenres({params, callback : handleCallback}))
		}
	}, [props.location.pathname])

	console.log('genre coming',genres);

	useEffect(() => {
		let record = {
			paid : false,
			push_notification : true,
			active : true,
			...category
		}
		console.log(record);
		setRecord(record)
	}, [category])

	return (
		<CustomLayout sidebarSelectionKey="category">
		<div className="card">
			<Header 
				title={action === 'edit' ? 'Edit Category' : "Add Category"} 
				subtitle={action === 'edit' ? 'Edit necessary fields to edit category' : "Fill all necessary fields to add new category"} 
			/>
			<div className="card-body">
				<div className="row">
					<div className="col-lg-12">
						<NewForm 
							history={history} 
							initialValues={record} 
							action={action} 
							id={id} 
							genres={genres}
						/>
					</div>
				</div>
			</div>
		</div>
		</CustomLayout>
	)
}

Form.propTypes = {
	history: PropTypes.object
}

const mapStateToProps = state => {
	return {
		category : state.Category.category,
		genres : state.Genre.data
	}
}

export default connect(mapStateToProps)(Track)

