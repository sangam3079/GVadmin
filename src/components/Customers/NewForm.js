import React from 'react'
import PropTypes from 'prop-types'

import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { TextField, SelectField } from 'commons/Forms/InputField'
import Button from 'commons/Buttons/NormalButton'
import validate from 'utils/validate'
import { compose } from 'redux'

import Row from 'commons/Forms/Row'
import { isSubmitButtonDisabled, normalizeName, customFetch } from 'utils'
import { Form } from '../styled'
import { getNames } from 'country-list'
import cookie from 'utils/cookie'
import { pickBy } from 'lodash'

const NewForm = ({ history, initialValues, action, id, ...props}) => {
	const token = cookie.getToken()
	const associationFields = ['country']

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
			if (action === 'new'){
				[response] = await customFetch(`admin/users`, 'POST', formData, { Authorization: `Bearer ${token}` })
			}else{
				[response] = await customFetch(`admin/users/${id}`, 'PUT', formData, { Authorization: `Bearer ${token}` })
			}
			if (response.user) history.push('/customers')
		} catch (e) {

		}
	}
	const countries = getNames().map(item => ({ id: item, value: item }))

	return (
		<Form
			onSubmit={props.handleSubmit(values =>
				handleFormSubmit(values),
			)}
		>
			<Row>
				<Field
					name="full_name"
					label="Full Name *"
					component={TextField}
					normalize={normalizeName}
				/>
			</Row>
			<Row>
				<Field
					name="email"
					label="Email *"
					component={TextField}
				/>
				<Field
					name="country"
					label="Country"
					component={SelectField}
					isSearchable
					options={countries}
				/>
			</Row>
			<Row>
				<Field
					name="city"
					label="Address"
					component={TextField}
				/>
				<Field
					name="state"
					label="State"
					component={TextField}
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
	full_name: { required: true, label: 'Full Name' },
	email: { required: true, label: 'Email' },
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

