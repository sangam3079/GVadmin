import React, { useEffect, useState } from 'react'
import {Form, Input, Select, Row, Col, DatePicker, Upload, Button, message,Switch, Progress} from 'antd'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import CustomSelect from 'components/Notifications/CustomSelect'
import { urlWithParams, getApiCall } from 'services/url';
import {apiEndpoint} from 'services/constants'

const ComposerFormFields = ({initialValues, action, id, history, dispatch}) => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [genreData, setGenreData] = useState([])
    const [genreValue, setGenreValue] = useState()
    const [categoryFetching, setCategoryFetching] = useState();
    const [categoryValue, setCategoryValue] = useState();

    const [prevGenreSearchValue,setPrevGenreSearchValue] = useState(undefined);

    const {Option} = Select;

    useEffect(()=>{
        const genre_value = {
            key : initialValues && initialValues.genre ? initialValues.genre.id : undefined, 
            label : initialValues && initialValues.genre ? initialValues.genre.name : undefined, 
            value : initialValues && initialValues.genre ? initialValues.genre.id : undefined
        }
        const category_value = {
            key : initialValues && initialValues.category ? initialValues.category.id : undefined,
            label : initialValues && initialValues.category ? initialValues.category.name : undefined,
            value : initialValues && initialValues.category ? initialValues.category.id : undefined
        }
        setGenreValue(genre_value);
        setCategoryValue(category_value);
        form.setFieldsValue({
          //
          });
    }, [initialValues])

    useEffect(() => {
        handleGenreSearch(' ')
    }, [])

    const handleCategoryChange = value => {
        setCategoryValue(value);
        setCategoryFetching(false);
    }


    const handleSubmit = (value) => {
       console.table(value)
    }


    const handleError = err => {
        console.warn(err);
    }

    const handleGenreSearch = value => {
        
        const params = {
            filter : {keyword : value}
        }
        const url = urlWithParams(`${apiEndpoint}/genres`, params);

        if(prevGenreSearchValue!==undefined && prevGenreSearchValue !== value && prevGenreSearchValue !== ' '){
             setPrevGenreSearchValue(value);

             getApiCall({dispatch, url,abort:true})
                .then(resp => {
                    if(resp){
                        setGenreData(resp.data)
                    }else if(resp===undefined){
                        console.log('getApiCall response:',resp)
                    }else{
                        message.error('Something went wrong')
                    }
                })
                .catch(err => console.log(err))

        }else if(prevGenreSearchValue===undefined || prevGenreSearchValue === ' '){
            setPrevGenreSearchValue(value);

            getApiCall({dispatch, url,abort:false})
                .then(resp => {
                    if(resp){
                        setGenreData(resp.data)
                    }else if(resp===undefined){
                        console.log('getApiCall response:',resp)
                    }else{
                        message.error('Something went wrong')
                    }
                })
                .catch(err => console.log(err))
        }
    }

    const handleGenreChange = value => {
         console.log(value.label);
        const params = {
            filter : {genre : value.label}
        }
        const url = urlWithParams(`${apiEndpoint}/categories`, params);
        getApiCall({dispatch, url})
        .then(resp => {
            if(resp){
                setCategoryData(resp.data);
            }else{
                message.error('Something went wrong')
            }
        })
        .catch(err => console.warn(err))
    }
    
    const handleSuccessCallback = () => {
        history.push('/composers');
    }

    const handleCallback = () =>{
        setSubmitting(false);
    }

    return(
        <>
            <Form 
                layout="vertical" 
                onFinish={handleSubmit} 
                onFinishFailed={handleError}
                name="composer_form" 
                form={form}
            >
            <div className="row">
                <div className="col-lg-6">
                    <Form.Item
                        label="Composer's Name"
                        name="composer_name"
                    >
                        <Input />
                    </Form.Item>
                </div>
                <div className="col-lg-6">
                    <Form.Item
                        label="Composer's Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <Form.Item
                        label="Genre"
                        name="genre"
                    >
                        <CustomSelect 
                            showArrow
                            value={genreValue}
                            onSearch={handleGenreSearch}
                            onChange={handleGenreChange}
                            data={genreData}
                        />
                    </Form.Item>
                </div>
                <div className="col-lg-6">
                    <Form.Item
                        label="Category"
                        name="category"
                    >
                            <Select
                                value={categoryValue}
                                onChange={handleCategoryChange}
                                labelInValue
                                showSearch
                                filterOption={
                                    (inputValue, option) =>  
                                        option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 
                                        || option.props.value.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
                                }  
                            >
                                {
                                    categoryData.map(city => (
                                        <Option key={city.id}>{city.name}</Option>
                                    ))
                                }
                            </Select>
                    </Form.Item>
                </div>
            </div>

            <Form.Item label="Description" name="description">
            <CKEditor
                    editor={ ClassicEditor }
                    data={ 'hello'}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                    } }
                />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting}>Submit</Button>
        </Form>
        </>
    )
}

const mapStateToProps = state => (
    {
        //
    }
)

export default connect(mapStateToProps)(withRouter(ComposerFormFields))