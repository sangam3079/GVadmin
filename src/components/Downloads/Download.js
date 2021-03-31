import React, {useState, useEffect, useCallback} from 'react'
import CustomLayout from '../CustomLayout/CustomLayout'
import Header from '../../components/Header/Header'
// import {Table} from 'antd'
import AntTable from 'cleanComponents/Table/Table'
import {connect} from 'react-redux'
import { getAllDownload } from 'services/download'
import Moment from 'moment'
import {getSorterObject} from 'utils/helpers'
import {withRouter} from 'react-router-dom'
import { setDownloadCurrentpage, setDownloadKeyword } from 'store/actions/Download/DownloadAction'

const Download = ({dispatch, data, totalPage, history, currentPage, keyword}) => {

    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(false);
    // const [keyword, setKeyword] = useState();
    const [prevDownloadKeyword, setPrevDownloadKeyword] = useState(undefined);
    
    const [dateFilter, setDateFilter] = useState({})
    const [sort, setSort] = useState()
    const [filter, setFilter] = useState()
    // const [currentPage, setCurrentPage] = useState(1);
    const [autoRefresh, setAutoRefresh] = useState(false);

    const column = [
        {
            title : 'Track Name',
            dataIndex : 'track',
            key : 'track',
            sorter : true,
            render : track => {
                return <span>{track ? track.name : ''}</span>
            }
        },
        {
            title : 'Customer Name',
            dataIndex : 'user',
            key : 'user',
            sorter : true,
            render : user => {
                return <span>{user ? user.full_name || user.email: undefined}</span>
            }
        },
        {
            title : 'Device',
            dataIndex : 'device',
            key : 'device',
            filters : [
                {text : 'Andriod', value : 'android'},
                {text : 'iOS', value : 'ios'}
            ],
            filterMultiple : false
        },
        {
            title : 'Status',
            dataIndex : 'status',
            key : 'status'
        },
        {
            title : 'Downloaded at',
            dataIndex : 'started_at',
            key : 'started_at',
            render : (date) => {
                if(date){
                    let downloaded_at = Moment(date, 'YYYY-MM-DD')
                    return downloaded_at.fromNow()
                }
            }
        }
    ]

    const fetchDownload = (pageParam, filterParam, sortParam) => {

        setPrevDownloadKeyword(keyword);

        let defaultFilter = {
            keyword, 
            date_from : dateFilter.date_from, 
            date_to : dateFilter.date_to,
            ...filter
        }
        let params = {
            page : pageParam || currentPage,
            per_page : 10,
            filter : filterParam || defaultFilter,
            sort : sortParam || sort
        }
        setFetching(true);
        dispatch(getAllDownload({params, callback : handleAllDownloadCallback,prevDownloadKeyword}))
    }

    const handleAllDownloadCallback = () => {
        setLoading(false);
        setFetching(false);
    }

    useEffect(()=>{
        let interval;
        let params = {
            per_page : 10,
            page : 1
        }
        if(autoRefresh){
            interval = setInterval(()=>{
                dispatch(getAllDownload({params, callback : handleAllDownloadCallback}))
            }, 10000)
        }
        return ()=> clearInterval(interval)
    }, [autoRefresh])

    useEffect(()=>{
        if(!data.length){
            fetchDownload()
        }else{
            setLoading(false);
        }
    }, [])

    const handleKeywordFilter = value => {
        if(keyword !== value){
            // setCurrentPage(1);
            // setKeyword(value);
            dispatch(setDownloadKeyword(value))
        }
    }

    const toggleAutoRefresh = () => {
        setAutoRefresh(!autoRefresh);
    }

    const handleDateFilter = value => {
        if(dateFilter !== value){
            // setCurrentPage(1);
            setDateFilter(value);
        }
    }

    const handleTableChange = (pagination, filterParam, sorter) => {
        if(pagination.current !== currentPage){
            // setCurrentPage(pagination.current);
            dispatch(setDownloadCurrentpage(pagination.current))
        }
        if(sorter){
            let new_sort = getSorterObject(sorter);
            if(new_sort !== sort){
                setSort(new_sort)
            }
        }

        if(filterParam){
            let obj;
            Object.keys(filterParam).forEach(key => {
                if(filterParam[key]){
                    let new_obj = {
                        ...obj,
                        [key] : filterParam[key][0]
                    }
                    obj = new_obj
                }
            })
            setFilter(obj);
        }
    }

    useEffect(()=>{
        fetchDownload();
    },[keyword, dateFilter, sort, currentPage])


    return (
        <CustomLayout sidebarSelectionKey="download">
                    <div className="card">
                            <Header 
                                // title="Download"
                                // subtitle="List of all downloads"
                                autoRefresh={autoRefresh ? 'active' : 'inactive'}
                                toggleAutoRefresh={toggleAutoRefresh}
                                handleKeywordFilter={handleKeywordFilter}
                                handleDateFilter={handleDateFilter}
                                keywordValue={keyword}
                                />
                            <div className="card-body">
                                <AntTable
                                    onChange={handleTableChange} 
                                    columns={column}
                                    dataSource={data}
                                    loading={fetching}
                                    pagination={{pageSize : 10, total: totalPage, current : currentPage,  showSizeChanger : false}}
                                />
                            </div>
                    </div>
        </CustomLayout>
    )
}

const mapStateToProps = state => (
    {
        data : state.Download.data,
        currentPage : state.Download.currentPage,
        keyword : state.Download.keyword,
        totalPage : state.Download.total,
    }
)

export default connect(mapStateToProps)(withRouter(Download))