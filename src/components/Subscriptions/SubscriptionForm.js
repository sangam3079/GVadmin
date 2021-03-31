import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import { DatePicker, Form, Select, Button} from 'antd'
import moment from 'moment'
import {connect} from 'react-redux'
import { getAllUnsubscribedUser, updateSubscription, newSubscription } from 'services/subscription';

const SubscriptionForm = ({history, initialValues, action, id, users, dispatch}) => {
    const [form] = Form.useForm();
    const [requesting, setRequesting] = useState(false);
    const [fetchingCustomer, setFetchingCustomer] = useState();
    const [data, setData] = useState(users);
    const [value, setValue] = useState();
    const all_plan = [
        {label : 'Monthly', value : 'monthly'},
        {label : 'Yearly', value : 'yearly'}
    ]
    const {Option} = Select

    const all_plan_options = all_plan.map((plan) => {
        return <Option value={plan.value}>{plan.label}</Option>
    })

    useEffect(()=>{
        form.setFieldsValue({
            user_id : initialValues? initialValues.user ? {label : initialValues.user.email, value : initialValues.user.id, key : initialValues.user.id} : undefined : undefined,
            subs : initialValues.subs,
            purchase_time : initialValues.purchase_time ? moment(initialValues.purchase_time) : undefined
        })
        setValue(initialValues? initialValues.user ? initialValues.user.id : undefined : undefined)
    }, [initialValues])

    useEffect(() => {
        fetchCustomer('');
    }, [history.location.pathname])

    const handleFormFailed = err => {
        console.log(err)
    }

    const handleFormSubmit = fieldValue => {
        let purchased_date = moment(fieldValue.purchase_time).format();
        let formData = new FormData();
        formData.append('purchase_time', purchased_date);
        formData.append('user_id', fieldValue.user_id.value);
        formData.append('subs', fieldValue.subs);
        setRequesting(true)
        if(action === 'edit'){
            dispatch(updateSubscription({id, body : formData, callback : handleCallback}))
        }else{
            dispatch(newSubscription({body : formData, callback : handleCallback}))
        }
    }

    const handleCallback = () => {
        setRequesting(false)
        history.push('/subscriptions')
    }

    const fetchCustomer = value => {
        let params = {
            filter : {keyword : value},
            sort : {}
        }
        dispatch(getAllUnsubscribedUser({params}))
    }

    const handleCustomerChange = value => {
        console.log(value)
        setValue(value);
        setData([])
        setFetchingCustomer(false);
    }

    useEffect(() => {
        setData(users);
    }, [users])

    return(
        <>
            <Form
                name="subscription_form"
                layout="vertical"
                onFinish={handleFormSubmit}
                onFinishFailed={handleFormFailed}
                form={form}
            >
                <Form.Item
                    label="Select Customer"
                    rules={[{required : true, message : 'Customer is required'}]}
                    name="user_id"
                >
                    <Select
                        showSearch
                        labelInValue
                        value={value}
                        // placeholder="Select customer"
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        notFoundContent={null}
                        onSearch={fetchCustomer}
                        onChange={handleCustomerChange}
                    >
                        {
                            data.map(d => {
                                return <Option value={d.id} key={d.id}>{d.email}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <div className="row">
                    <div className="col-lg-6">
                        <Form.Item
                        label="Plan"
                        name="subs"
                    >
                        <Select>
                            {all_plan_options}
                        </Select>
                    </Form.Item>
                    </div>
                    <div className="col-lg-6">
                        <Form.Item
                            label="Purchase Date"
                            name = 'purchase_time'
                        >
                    <DatePicker style={{width : '100%'}}/>
                </Form.Item>
                    </div>
                </div>
                <Button htmlType="submit" type="primary" loading={requesting}>Submit</Button>
            </Form>
        </>
    )

}

const mapStateToProps = state =>{
    return {
        users : state.Subscription.unsubscribedUser
    }
}

export default connect(mapStateToProps)(withRouter(SubscriptionForm))