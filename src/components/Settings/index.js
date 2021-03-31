import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'

import { last } from 'lodash'
import { Form } from '../styled'
import NewForm from './SettingForm'
// import NewForm from './NewForm'
import { UserContext } from 'contexts/UserContext'
import CustomLayout from '../CustomLayout/CustomLayout'
import Header from 'components/Header/Header'

const Profile = ({ history, ...props}) => {
	const { currentUser } = useContext(UserContext)
	const locationPath = props.location.pathname.split('/')
	const [loading, setLoading] = useState(false)
	const [action] = useState(last(locationPath)),
		[id] = useState(locationPath[locationPath.length - 2])
	console.log('at index',currentUser)
	return (
		<CustomLayout>
		<div className="card">
			<Header
				title = "Settings"
			/>
			<div className="card-body">
				<div className="row">
					<div className="col-lg-12">
						<NewForm 
							history={history} 
							initialValues={currentUser} 
							id={currentUser.id} 
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

export default Profile;

