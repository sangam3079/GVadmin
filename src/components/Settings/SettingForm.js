import React,{useEffect, useContext} from 'react'
import {Form, Input, Select, Button} from 'antd'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getNames} from 'country-list'
import { UserContext } from 'contexts/UserContext'
import { setting } from 'services/profile'

const SettingForm = ({initialValues, id, dispatch, history}) => {
    const [form] = Form.useForm();
    const {Item} = Form;
    // const [user, setUser] = useState({})
    const {setCurrentUser} = useContext(UserContext)
    const {Option} = Select
    const handleFormFinish = (values) => {
        // console.log('values in state',values);
        // setUser(values);
        let formData = new FormData();
        Object.keys(values).map(key => {
            formData.append(key, values[key])
        })
        // handleCallback()
        dispatch(setting({id, body : formData, callback : ()=>handleCallback(values)}))
    }
    const handleFormFail = (err) => {
        console.log(err)
    }

    const handleCallback = (new_value) => {
        let new_user = {
            ...initialValues,
            ...new_value
        }
        // console.log('setting new_user with values',new_user)
        setCurrentUser(new_user);
        history.push('/');
    }

    const countries = getNames();
    const all_country_option = countries.map(country => <Option value={country} key={country}>{country}</Option>)

    useEffect(()=>{
        form.setFieldsValue({
            full_name : initialValues.full_name,
            email : initialValues.email,
            country : initialValues.country,
            address : initialValues.address,
            state : initialValues.state
        })
    }, [initialValues])

    return (
        <Form
            layout="vertical"
            form={form}
            name="setting_form"
            onFinish={handleFormFinish}
            onFinishFailed={handleFormFail}
        >
            <div className="row">
                    <div className="col-lg-6">
                        <Item
                            name="full_name"
                            label="Full Name"
                            rules={[{required : true, message : 'Full name is required'}]}
                        >
                            <Input />
                        </Item>
                    </div>
                    <div className="col-lg-6">
                            <Item
                                name="password"
                                label="New Password"
                            >
                                <Input.Password/>
                            </Item>
                    </div>
            </div>
            <div className="row">
                    <div className="col-lg-6">
                            <Item
                                name="email"
                                label="Email"
                                rules={[{required : true, message : 'Email is required', type : 'email'}]}
                            >
                                <Input htmlType="email" />
                            </Item>
                    </div>
                    <div className="col-lg-6">
                            <Item
                                name="country"
                                label="Country"
                            >
                                <Select>
                                    {all_country_option}
                                </Select>
                            </Item>
                    </div>
            </div>
            <div className="row">
                    <div className="col-lg-6">
                        <Item
                            name="address"
                            label="Address"
                        >
                            <Input />
                        </Item>
                    </div>
                    <div className="col-lg-6">
                        <Item
                            name="state"
                            label="State"
                        >
                            <Input />
                        </Item>
                    </div>
            </div>
            <div>
                <Button htmlType="submit" type="primary">Submit</Button>
            </div>
        </Form>
    )
}

export default connect()(withRouter(SettingForm))