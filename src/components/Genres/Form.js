import React, {useEffect, useState} from 'react'

import { last} from 'lodash'
import {connect} from 'react-redux'

import NewForm from './GenreForm'
import CustomLayout from '../CustomLayout/CustomLayout'
import Header  from '../../components/Header/Header'
import { getGenre } from 'services/genre'

const Genre = ({ history,genre,dispatch, ...props}) => {

	const locationPath = props.location.pathname.split('/')
	const [loading, setLoading] = useState(false)
	const [action] = useState(last(locationPath)),
		[id] = useState(locationPath[locationPath.length - 2]),
		[record, setRecord] = useState({})

	const handleCallback = () => {
		setLoading(false);
	}

	useEffect(() => {
		if (action === 'edit' && !Object.keys(genre).length){
			setLoading(true);
			dispatch(getGenre({id, callback : handleCallback}))
		}
	}, [props.location.pathname])

	useEffect(() => {
		let record = {
			paid : false,
			push_notification : true,
			active : true,
			...genre
		}
		// console.log('while setting', record);
		setRecord(record)
	},[genre])

	return (
		<CustomLayout sidebarSelectionKey="genres">
			<div className="card">
				<Header 
					title="New Genre"
					subtitle="Fill all necessary fields to add new genre"
				/>
				<div className="card-body">
					<div className="row">
						<div className="col-lg-12">
							<NewForm 
								initialValues={record} 
								action={action} 
								id={id}
							/>
						</div>
					</div>
				</div>
			</div>
		</CustomLayout>
	)
}

const mapStateToProps = state => {
	return{
		genre : state.Genre.genre
	}
}

export default connect(mapStateToProps)(Genre)

