import React, {useEffect, useState} from 'react'
import {Select, Row, Col, Form, Button, Input} from 'antd'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import {getNames} from 'country-list';
import { updateCustomer, newCustomer } from 'services/customers';

const CustomerForm = ({initialValues, action, id, history, dispatch}) => {
    const [requesting, setRequesting] = useState(false);
    const [form] = Form.useForm();
    useEffect(()=> {
        form.setFieldsValue({
            full_name : initialValues.full_name,
            email : initialValues.email,
            country : initialValues.country ? initialValues.country.value : undefined,
            address : initialValues.address,
            state : initialValues.state
        })
    }, [initialValues])
    
    const handleFormError = err => {
       if(err){
           console.log(err)
       }
    }
    const handleFormSubmit = async value => {
        let form_data = new FormData();
        let data = {
            ...value,
            active : true
        }
        Object.keys(data).forEach(key => {
            if(key !== 'confirm_password'){
                form_data.append(key, data[key])
            }
        });
        if(action === 'edit'){
            setRequesting(true);
            dispatch(updateCustomer({id, body : form_data, callback : handleCallback})) 
        }else{
            setRequesting(true)
            dispatch(newCustomer({body: form_data, callback : handleCallback}))
        }
    }

    const handleCallback = () =>{
        history.push('/customers');
    }

    const {Option} = Select;
    const countries = getNames();
    const all_country_option = countries.map((country, index) => {
        return <Option value={country} key={index}>{country}</Option>
    }) 

    return(
        <>
            <Form
                layout="vertical"
                onFinish={handleFormSubmit}
                onFinishFailed={handleFormError}
                name="customer_form"
                form={form}
            >
                <div className="row">
                    <div className="col-lg-6">
                        <Form.Item
                            label="Full Name"
                            name="full_name"
                            rules={[{required : true, message : 'Name field is required'}]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-lg-6">
                    <Form.Item
                            label="Email"
                            name="email"
                            rules={[{required : true, message : 'Invalid Email', type: 'email'}]}
                        >
                            <Input/>
                        </Form.Item>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{required : true, message : 'Password field is required'}]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-lg-6">
                    <Form.Item
                            label="Confirm Password"
                            name="confirm_password"
                            rules={[{required : true, message : 'Password field is required'}]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <Form.Item
                            label="Address"
                            name="address"
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-lg-4">
                        <Form.Item
                                label="Country"
                                name="country"
                                rules= {[{required : false}]}
                            >
                                <Select>
                                    {all_country_option}
                                </Select>
                            </Form.Item>
                    </div>
                    <div className="col-lg-4">
                        <Form.Item
                            label="State"
                            name="state"
                        >
                            <Input />
                        </Form.Item>
                    </div>
                </div>
                <Row>
                    <Col span={5}>
                        <Button 
                            htmlType="submit" type="primary" loading={requesting}>Submit</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}


export default connect()(withRouter(CustomerForm))