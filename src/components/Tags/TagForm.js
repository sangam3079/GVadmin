import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { last} from 'lodash'
import CustomLayout from 'components/CustomLayout/CustomLayout'
import Header from 'components/Header/Header'
import {Form, Input, Button, message} from 'antd'
import { getTag, updateTag, addNewTag } from 'services/tags'
import {apiEndpoint} from 'services/constants'
import { urlWithParams } from 'services/url';
import CustomSelect from 'components/Notifications/CustomSelect'
import {getApiCall} from 'services/url'

const TagForm = ({history, dispatch, initialValue}) => {
    const locationPath = history.location.pathname.split('/')
    const [form] = Form.useForm();
    const [action, setAction] = useState(last(locationPath))
    const [id, setId] = useState(locationPath[locationPath.length - 2]);
    const [submitting, setSubmitting] = useState(false);
    const [tagGroupData, setTagGroupData] = useState([]);
    const [searchingTagGroup, setSearchingTagGroup] = useState(false);
    const [prevSearchKeyword, setPrevSearchKeyword] = useState(undefined);

    const [tagGroupValue, setTagGroupValue] = useState();

    useEffect(()=>{
        if(action === 'edit' && !Object.keys(initialValue).length){
            dispatch(getTag({id, callback : ()=>{}}))
        }
    }, [])

    useEffect(()=>{
        console.log(initialValue);
        let tag_group_obj = initialValue && initialValue.tag_group ? {
            label : initialValue.tag_group.name,
            key : initialValue.tag_group.id,
            value : initialValue.tag_group.name
        } : {}
        setTagGroupValue(tag_group_obj);
        form.setFieldsValue({
            name : initialValue ? initialValue.name : undefined,
            tag_group : tag_group_obj
        })
    }, [initialValue])

    const handleFormFinish = value => {
        console.log(value);
        const formData = new FormData();
        formData.append('name', value.name);
        formData.append('tag_group_id', tagGroupValue.key)
        if(action === 'edit'){
            setSubmitting(true);
            dispatch(updateTag({id, body : formData, callback : handleCallback, finalCallback : ()=>setSubmitting(false)}))
        }else{
            setSubmitting(true);
            dispatch(addNewTag({body : formData, callback : handleCallback, finalCallback : ()=>setSubmitting(false)}))
        }
    }

    const handleCallback = () => {
        history.push('/tags')
    }

    const handleTagGroupChange = value => {
        console.log(value);
        setTagGroupValue(value);
        setTagGroupData([])
    }

    const handleTagGroupSearch = value => {
        
        setSearchingTagGroup(true);
        setPrevSearchKeyword(value);
        const params = {
            filter : {keyword : value}
        }
        
        const url = urlWithParams(`${apiEndpoint}/tag_groups`, params);

        if(prevSearchKeyword !== undefined){
            getApiCall({url, dispatch,abort:true})
            .then(resp => {
                if(resp){
                    setTagGroupData(resp.data)
                }else if(resp===undefined){
                    console.log('[Previous keyword search aborted], getApiCall response:',resp)
                }else{
                    message.error('Something went wrong')
                }
            })
            .catch(err => console.log(err))
            .finally(()=>setSearchingTagGroup(false))
        }else if(prevSearchKeyword === undefined){
            getApiCall({url, dispatch,abort:false})
            .then(resp => {
                if(resp){
                    setTagGroupData(resp.data)
                }else if(resp===undefined){
                    console.log('[Previous keyword search aborted], getApiCall response:',resp)
                }else{
                    message.error('Something went wrong')
                }
            })
            .catch(err => console.log(err))
            .finally(()=>setSearchingTagGroup(false))
        }



    }

    const {Item} = Form

    return (
        <CustomLayout sidebarSelectionKey="tags">
           <div className="card">
                <Header 
                    subtitle={action === 'edit' ? 'Edit form to update tag' : 'Fill form to create new tag'}
                />
                <div className="card-body">
                    <Form
                        form={form}
                        name="tag_form"
                        layout="vertical"
                        onFinish={handleFormFinish}
                    >
                        <Item
                            name="name"
                            label="Name"
                            required={true}
                        >
                            <Input />
                        </Item>
                        <Item
                            name="tag_group"
                            label="Select a tag group"
                            required={true}
                        >
                            <CustomSelect 
                                value={tagGroupValue}
                                loading={searchingTagGroup}
                                onSearch={handleTagGroupSearch}
                                onChange={handleTagGroupChange}
                                data={tagGroupData}
                                placeholder="search for tag group"
                                showArrow={true}
                            />
                        </Item>
                        <div className="d-flex justify-content-end">
                            <Button type="primary" htmlType="submit" loading={submitting}>Submit</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </CustomLayout>
    )
}

const mapStateToProps = state => {
    return {
        initialValue : state.Tag.tag
    }
}

export default connect(mapStateToProps)(withRouter(TagForm))