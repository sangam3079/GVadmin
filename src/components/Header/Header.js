import React, {useState, useEffect} from 'react'
import {Input, DatePicker, Select} from 'antd'
import moment from 'moment';
import {debounce} from 'lodash'
import {connect} from 'react-redux'
import { EyeFilled, EyeOutlined ,AndroidFilled, AppleFilled} from '@ant-design/icons'
import CustomSelect from '../Notifications/CustomSelect'
import { getApiCall, urlWithParams } from 'services/url'
import {apiEndpoint} from 'services/constants'

const Header = ({
    autoRefresh, 
    subtitle, 
    button, 
    handleKeywordFilter, 
    handleDateFilter, 
    handleDeviceFilter,
    toggleAutoRefresh,
    handleCategoryChange,
    handleGenreChange,
    categoryData,
    extraFilter,
    dispatch,
    keywordValue,
    
}) => {
    // console.log(keywordValue)
    const [categoryValue, setCategoryValue] = useState()
    // const [categoryData, setCategoryData] = useState([])
    const [genreValue, setGenreValue] = useState()
    const [genreData, setGenreData] = useState([])
    const [fetchingGenre, setFetchingGenre] = useState(false)

   

    

    useEffect(()=>{
        if(typeof handleGenreChange === 'function'){
            handleGenreSearch('')
        }
    },[])

    const keywordChange = e => {
        e.persist();
        const debouncedFunction = debounce(()=>{
            let keyword = e.target.value;
            handleKeywordFilter(keyword)
        }, 1000)
        debouncedFunction();
    }

    const dateChange = value => {
        if(value){
            let date_from = value[0].format()
            let date_to = value[1].format();
            handleDateFilter({date_from, date_to})
        }else{
            handleDateFilter({})
        }
    }
    const deviceChange = value => {
        handleDeviceFilter(value)
    }

    const onGenreChange = value => {
        handleGenreChange(value);
    }
    
    const onCategoryChange = value => {
        handleCategoryChange(value)
    }

    const handleGenreSearch = value => {
        const param = {
            filter : {keyword : value}
        }
        const url = urlWithParams(`${apiEndpoint}/genres`, param)
        setFetchingGenre(true);
        getApiCall({dispatch, url})
        .then(resp => {
            if(resp){
                setGenreData(resp.data)
            }
        })
        .catch(err => console.log(err))
        .finally(()=>setFetchingGenre(false))
    }

    

    // console.log(autoRefresh);

    const { RangePicker } = DatePicker;
    const {Option} = Select

    return (
        <div className="card-header">
                            <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                    {/* <div className="utils__title text-uppercase">
                                        <strong>{title}</strong>
                                    </div>
                                    <div className="utils__titleDescription">
                                        <span className="text-muted">{subtitle}</span>
                                    </div> */}
                                        {
                                            subtitle ? <span className="text-muted">{subtitle}</span> : <></>
                                        }
                                        {
                                            typeof handleKeywordFilter === 'function' ? 
                                                <div 
                                                    className="pr-3" 
                                                    // style={{width : '80%'}}
                                                >
                                                    <Input.Search 
                                                        onChange={keywordChange} 
                                                        placeholder="Search"
                                                        defaultValue={keywordValue}
                                                        allowClear
                                                        
                                                        /> 
                                                </div>
                                                : <></>
                                        }
                                    
                                        {
                                            typeof handleDateFilter === 'function' ? 
                                            <div 
                                                className="px-3"
                                                // style={{width : '50%'}}
                                                
                                            >
                                                <RangePicker
                                                    //defaultValue={[moment().startOf('month'), moment().endOf('month')]}
                                                    onChange={dateChange}
                                                    style={handleCategoryChange && handleGenreChange ? {width : 100, } : { borderRadius:2}}
                                                    ranges={{
                                                        'Today': [moment().startOf('day'), moment().endOf('day')],
                                                        'Yesterday' : [moment().startOf('day').subtract(1,'days'), moment().endOf('day').subtract(1,'days')],
                                                        'Last Week' : [moment().startOf('day').subtract(7,'days'), moment().endOf('day')],
                                                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                                                        'This Year': [moment().startOf('year'), moment().endOf('year')],
                                                    }}
                                                /> 
                                            </div>
                                            : <></>
                                        }

                                        {
                                            typeof handleGenreChange === 'function' ?
                                                <CustomSelect
                                                    style={{width : 150}} 
                                                    showArrow
                                                    value={genreValue}
                                                    loading={fetchingGenre}
                                                    onSearch={handleGenreSearch}
                                                    onChange={onGenreChange}
                                                    data={genreData}
                                                    placeholder="Genre Filter"
                                                    allowClear
                                                /> : <></>
                                        }

                                        {
                                            extraFilter ? extraFilter : null
                                        }

                                        {
                                            typeof handleCategoryChange === 'function' ?
                                                <div className="mx-2">
                                                <Select
                                                    style={{width : 150}}
                                                    value={categoryValue}
                                                    onChange={onCategoryChange}
                                                    labelInValue
                                                    placeholder="Category Filter"
                                                    allowClear
                                                    
                                                >
                                                    {categoryData.map(category => {
                                                        return <Option key={category.id}>{category.name}</Option>
                                                    })}
                                                </Select></div> : <></>
                                        }

                                        {
                                            typeof handleDeviceFilter === 'function' ?
                                            <div style={{background:'darkgrey', width:115, borderRadius:8, }}>
                                                <Select 
                                                    placeholder={'ios/android'} 
                                                    onChange={deviceChange} 
                                                    style={{ width: 115 }} 
                                                    bordered={false}
                                                    
                                                >
                                                    <Option value='ios'> <AppleFilled/> IOS</Option>
                                                    <Option value='android'> <AndroidFilled/>  Android</Option>
                                                </Select>
                                            </div> 
                                                    
                                             : <></>
                                        }

                                </div>
                                <div className="d-flex justify-content-end align-items-center">
                                    {autoRefresh ?  autoRefresh === 'active' ? <EyeFilled style={{fontSize : 18}} onClick={toggleAutoRefresh} title="Auto Refresh enabled" /> : <EyeOutlined style={{fontSize : 18}} onClick={toggleAutoRefresh} title="Auto Refresh disabled" /> : ''}
                                    {button ? button : <></>}
                                </div>
                            </div>
                        </div>
    )
}

export default connect()(Header)