import React from 'react'
import PropTypes from 'prop-types'

import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { TextField, FileField, SelectField, TextArea } from 'commons/Forms/InputField'
import Button from 'commons/Buttons/NormalButton'
import validate from 'utils/validate'
import { compose } from 'redux'

import Row from 'commons/Forms/Row'
import { isSubmitButtonDisabled, customFetch } from 'utils'
import { Form } from '../styled'
import cookie from 'utils/cookie'
import { pickBy } from 'lodash'

const NewForm = ({ history, initialValues, action, id, genres, ...props}) => {
	const token = cookie.getToken()
	const associationFields = ['genre_id']

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
				[response] = await customFetch(`admin/categories`, 'POST', formData, { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' })
			} else {
				[response] = await customFetch(`admin/categories/${id}`, 'PUT', formData, { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' })
			}
			if (response.category) history.push('/categories')
		} catch (e) {
			console.log(e)
		}
	}
	const genreList = genres.map(item => ({ id: item.id, value: item.name }))

	return (
		<Form
			onSubmit={props.handleSubmit(values =>
				handleFormSubmit(values),
			)}
		>
			<Row>
				<Field
					name="name"
					label="Category Name *"
					component={TextField}
				/>
				<Field
					name="genre_id"
					label="Genre"
					component={SelectField}
					isSearchable
					options={genreList}
				/>
			</Row>
			<Row>
				<Field
					name="description"
					label="Description"
					component={TextArea}
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
	name: { required: true, label: 'Category Name' }
}

export default compose(
	connect((state, props) => {
		return {
			initialValues: props.initialValues
		}
	}),
	reduxForm({
		form: 'newCategoryForm',
		fields: { ...fields },
		validate,
		enableReinitialize: true,
	}),
)(NewForm)

