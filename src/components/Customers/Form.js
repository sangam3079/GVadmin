import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import { last, isEmpty } from 'lodash'

// import { customFetch } from 'utils'
import { Form } from '../styled'
// import { getNames } from 'country-list'
import NewForm from './CustomerForm'
import {connect} from 'react-redux'
import CustomLayout from '../CustomLayout/CustomLayout'
import Header from '../../components/Header/Header'
import { getCustomer } from 'services/customers'
import Spinner from 'components/Spinner/Spinner'

const Profile = ({ history,customer,dispatch, ...props}) => {
	const locationPath = props.location.pathname.split('/')
	const [loading, setLoading] = useState(false)
	const [action] = useState(last(locationPath)),
		[id] = useState(locationPath[locationPath.length - 2])
		// [record, setRecord] = useState({})

	// const token = cookie.getToken()
	// const handleFormSubmit = async (values) => {
	// 	try {
	// 		const [response] = await customFetch('admin/users', 'POST', {
	// 			...values
	// 		})
	// 		if (response.user) history.push('/customers')
	// 	} catch (e) {

	// 	}
	// }
	// const countries = getNames().map(item => ({ id: item, value: item }))

	const fetchCustomerCallback = () => {
		setLoading(false);
}

	useEffect(() => {
		if (action === 'edit' && isEmpty(customer)){
			setLoading(true);
			dispatch(getCustomer({id, callback : fetchCustomerCallback}))
		}
	}, [props.location.pathname])

	return (
		<CustomLayout sidebarSelectionKey="customers">
			<div className="card">
				<Header title={action === 'edit' ? "Edit Customer" : "New Customer"} 
						subtitle={action === 'edit' ? 'Edit fields to edit the customer' : 'Fill all necessary field to create a new customer'}/>
				<div className="card-body">
					<div className="row">
						<div className="col-lg-12">
						{
							loading ? <div className="my-5"><Spinner /></div> : 
									<NewForm 
										history={history} 
										initialValues={customer} 
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
		customer : state.Customer.customer
	}
}

export default connect(mapStateToProps)(Profile);

