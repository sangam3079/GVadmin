import React from 'react'
import PropTypes from 'prop-types'

import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { TextField, FileField, SelectField, DateField, AutoSuggestion } from 'commons/Forms/InputField'
import Button from 'commons/Buttons/NormalButton'
import validate from 'utils/validate'
import { compose } from 'redux'

import Row from 'commons/Forms/Row'
import { isSubmitButtonDisabled, customFetch } from 'utils'
import { Form } from '../styled'
import cookie from 'utils/cookie'
import { pickBy } from 'lodash'
import Switch from 'commons/Forms/Switch'

const NewForm = ({ history, initialValues, action, id, users, ...props}) => {
	const token = cookie.getToken()
	const associationFields = ['user_id']

	const handleFormSubmit = async (values) => {
		const formData = new FormData();
		const newValues = pickBy(values, v => v !== undefined && v !== null)
		// pick not null values here so that null values don't have to be stringified
		// do json.stringify for every values here and JSON.parse on every value son server
		const keys = Object.keys(newValues)
		keys.map(key => {
			formData.append(key, associationFields.includes(key) ? values[key]['id'] || "" : values[key] || "")
		})

		try {
			let response
			if (action === 'new') {
				[response] = await customFetch(`admin/subscriptions`, 'POST', formData, { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' })
			} else {
				[response] = await customFetch(`admin/subscriptions/${id}`, 'PUT', formData, { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' })
			}
			if (response.subscription) history.push('/subscriptions')
		} catch (e) {
			console.log(e)
		}
	}

	const plans = [{ id: 'monthly', value: 'Monthly' }, { id: 'yearly', value: 'Yearly'}]

	return (
		<Form
			onSubmit={props.handleSubmit(values =>
				handleFormSubmit(values),
			)}
		>
			<Row>
				<Field
					name="user_id"
					label="Select Customer *"
					component={AutoSuggestion}
					apiUrl="admin/users/unsubscribed_users"
					header={{ Authorization: `Bearer ${token}` }}
					queryInput={''}
					isSearchable
					placeholder="Select..."
					allowNewOptions
				/>
			</Row>
			<Row>
				<Field
					name="subs"
					label="Plan"
					component={SelectField}
					options={plans}
				/>
				<Field
					name="purchase_time"
					label="Purchase Date"
					component={DateField}
				/>
			</Row>
			<Row>
				<Button
					type="submit"
					disabled={isSubmitButtonDisabled(props)}
				>
					Save
				</Button>
			</Row>
		</Form>
	)
}

Form.propTypes = {
	history: PropTypes.object
}

const fields = {
	package_name: { required: true, label: 'Full Name' },
	user_id: { required: true, label: 'Customer' }
}

export default compose(
	connect((state, props) => {
		return {
			initialValues: props.initialValues
		}
	}),
	reduxForm({
		form: 'newNewForm',
		fields: { ...fields },
		validate,
		enableReinitialize: true,
	}),
)(NewForm)

