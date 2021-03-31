import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Form, Input, Button, Upload} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import { last} from 'lodash'
import CustomLayout from 'components/CustomLayout/CustomLayout'
import Header from 'components/Header/Header'
import { addNewTagGroup, updateTagGroup, getTagGroup } from 'services/tagsGroup'

const TagGroupForm = ({history, initialValue, dispatch}) => {
    const locationPath = history.location.pathname.split('/')
    const [form] = Form.useForm();
    const [action, setAction] = useState(last(locationPath))
    const [image, setImage] = useState();
    const [id, setId] = useState(locationPath[locationPath.length - 2]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(()=>{
        if(action === 'edit' && !Object.keys(initialValue).length){
            console.log(action, id);
            dispatch(getTagGroup({id, callback : ()=>{}}))
        }
    }, [])

    useEffect(()=>{
        console.log(initialValue);
        form.setFieldsValue({
            name : initialValue ? initialValue.name : undefined
        })
    },[initialValue])

    const handleImageUpload = file => {
        setImage(file);
        return false
    }

    const handleCallback = () => {
        history.push('/tags')
    }

    const handleFormFinish = value => {
        console.log('this is where i am at');
        const formData = new FormData();
        formData.append('name', value.name)
        if(image){
            formData.append('image', image)
        }
        if(action === 'edit'){
            setSubmitting(true)
            dispatch(updateTagGroup({id,body : formData, callback : handleCallback, finalCallback : ()=>setSubmitting(false)}))
        }else{
            setSubmitting(true);
            dispatch(addNewTagGroup({body : formData, callback : handleCallback, finalCallback : ()=>setSubmitting(false)}))
        }
    }



    const {Item} = Form;

    return (
        <CustomLayout sidebarSelectionKey="tags">
            <div className="card">
                <Header 
                    subtitle={action === 'edit' ? 'Edit form to update tag group' : 'Fill form to create new tag group'}
                />
                <div className="card-body">
                    <Form
                        name="tags_group_form"
                        layout="vertical"
                        form={form}
                        onFinish={handleFormFinish}
                    >
                        <Item
                            name="image"
                            label="Tag Group Image"
                        >
                            <Upload
                                beforeUpload={file => handleImageUpload(file)}
                                image
                            >
                                <Button><UploadOutlined /> Image</Button>
                                
                            </Upload>
                            {
                                initialValue && initialValue.image_url ? <img src={initialValue.image_url} className="image-table-large my-3" /> : <></>
                            }
                        </Item>
                        <Item
                            label="Group Name"
                            name="name"
                            rules={[{required : true, message : 'Name is required'}]}
                        >
                            <Input />
                        </Item>
                        <div className="d-flex justify-content-end">
                            <Item>
                                <Button type="primary" htmlType="submit" loading={submitting}>Submit</Button>
                            </Item>
                        </div>
                    </Form>
                </div>
            </div>
        </CustomLayout>
    )
}

const mapStateToProps = state => {
    return {
        initialValue : state.TagGroup.tagGroup
    }
}

export default connect(mapStateToProps)(withRouter(TagGroupForm))