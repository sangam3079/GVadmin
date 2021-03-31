import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import { last, isEmpty } from 'lodash'
import { Form } from '../styled'
import NewForm from './ComposerForm'
import {connect} from 'react-redux'
import CustomLayout from '../CustomLayout/CustomLayout'
import Header from '../../components/Header/Header'
import Spinner from 'components/Spinner/Spinner'

const Composer = ({ history,composer, dispatch, ...props}) => {
	const locationPath = props.location.pathname.split('/')
	const [loading, setLoading] = useState(false)
	const [action] = useState(last(locationPath)),
		[id] = useState(locationPath[locationPath.length - 2])

	useEffect(() => {
		if (action === 'edit' && isEmpty(composer)){
			setLoading(true);
		}
	}, [props.location.pathname])

	return (
		<CustomLayout sidebarSelectionKey="composers">
			<div className="card">
				<Header title={action === 'edit' ? "Edit Composer" : "New Composer"} 
						subtitle={action === 'edit' ? 'Edit fields to edit the composer' : 'Fill all necessary field to create a new composer'}/>
				<div className="card-body">
					<div className="row">
						<div className="col-lg-12">
						{
							loading ? <div className="my-5"><Spinner /></div> : 
									<NewForm 
										history={history} 
										initialValues={composer} 
										action = {action} 
										id={id}
									/>
						}
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
		// composer : state.Composer.composer
	}
}

export default connect(mapStateToProps)(Composer);

