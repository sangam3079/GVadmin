import React, {useState, useEffect} from 'react'
import CustomLayout from '../CustomLayout/CustomLayout'
import Header from '../Header/Header'
import Spinner from '../Spinner/Spinner'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { getAlllogs } from 'services/logs'
import AntTable from 'cleanComponents/Table/Table'
import SubscriptionLog from './SubscriptionLog'
import {getSubscriptionLogs} from 'services/logs'
import Moment from 'moment'
import { EyeFilled, EyeOutlined } from '@ant-design/icons'

const Logs = ({history, dispatch, data, total}) => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState();
    const [fetching, setFetching] = useState(false);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [autoRefreshSubs, setAutoRefreshSubs] = useState(false);

    const fetchLogs = (page) => {
        let params = {
            page : page || currentPage,
            per_page : 10,
            filter : {},
            sort : {}
        }
        setFetching(true);
        dispatch(getAlllogs({params, callback : handleFetchAllLogCallback}))
    }

    const handleFetchAllLogCallback = () => {
        setLoading(false);
        setFetching(false);
    }

    const handleFetchLogCallback = () => {
        setFetching(false);
    }

    useEffect(()=>{
        if(data.length){
            setLoading(false);
        }else{
            setFetching(true);
            fetchLogs();
        }
    }, [history.location.pathname])

    useEffect(()=>{
        let interval;
        const params ={ 
            per_page : 10,
            page : 1
        }
        if(autoRefresh){
            interval = setInterval(()=>{
                dispatch(getAlllogs({params, callback : handleFetchAllLogCallback}))
            }, 10000)
        }
        return ()=>clearInterval(interval)
    }, [autoRefresh])

    useEffect(()=>{
        let interval;
        const params = {
            per_page : 10,
            page : 1
        }
        if(autoRefreshSubs){
            interval = setInterval(()=>{
                dispatch(getSubscriptionLogs({params, callback : handleFetchLogCallback}))
            }, 2000)
        }
        return ()=>clearInterval(interval)
    })

    const columns = [
        {
            title : 'Message',
            dataIndex : 'message',
            key : 'message'
        },
        {
            title : 'Action',
            dataIndex : 'action',
            key : 'action',
            render : action => {
                let char = action.replace(/_/g, ' ');
                return <span className="text-capitalize">{char}</span>
            }
        },
        // {
        //     title : 'Created Date',
        //     dataIndex : 'created_at',
        //     key : 'created_at',
        //     render : date => {
        //         let created_at = Moment(date, 'MMMM-D, YYYY')
        //         return <span className="text-capitalize">{created_at.fromNow()}</span>
        //     }
        // },
        {
            title : 'Done At',
            dataIndex : 'done_at',
            key : 'done_at',
            render : date => {
                if(date){
                    let done_at = Moment(date)
                    return <span className="text-capitalize">{done_at.fromNow()}</span>
                }
            }
        }
    ]

    const toggleAutoRefresh = () => {
        setAutoRefresh(!autoRefresh);
    }

    const toggleAutoRefreshSubs = () =>{
        setAutoRefreshSubs(!autoRefreshSubs);
    }

    const renderConditionally = () => {
        if(loading){
            return(
                <CustomLayout sidebarSelectionKey="logs">
                    <Spinner />
                </CustomLayout>
            )
        }else{
            return(
                <CustomLayout sidebarSelectionKey="logs">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="d-flex justify-content-between card-header">
                                    <div className="utils__title text-uppercase">
                                        <strong>Generic Logs</strong>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        {autoRefresh ? <EyeFilled title = "Auto Refresh enabled" style={{fontSize : 18}} onClick={toggleAutoRefresh}/> : <EyeOutlined style={{fontSize : 18}} onClick={toggleAutoRefresh} title = "Auto Refresh disabled" /> }
                                    </div>
                                </div>
                                <div className="card-body">
                                        <AntTable 
                                            columns={columns} 
                                            dataSource={data}
                                            pagination={{pageSize : 10, total : total,  showSizeChanger : false, current : currentPage}}
                                            onChange={handleTableChange}
                                            loading={fetching}
                                            className="utils_scrollTable"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="d-flex justify-content-between card-header">
                                    <div className="utils__title text-uppercase">
                                            <strong>Subscription Logs</strong>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        {autoRefreshSubs ? <EyeFilled title = "Auto Refresh enabled" style={{fontSize : 18}} onClick={toggleAutoRefreshSubs}/> : <EyeOutlined style={{fontSize : 18}} onClick={toggleAutoRefreshSubs} title = "Auto Refresh disabled" />}
                                    </div>
                                </div>
                                <div className="card-body">
                                    <SubscriptionLog />
                                </div>
                            </div>
                        </div>
                    </div>
            </CustomLayout>
            )
        }
    }

    const handleTableChange = (pagination) => {
        if(pagination.current !== currentPage){
            setCurrentPage(pagination.current);
            fetchLogs(pagination.current);
        }
    }

    return(renderConditionally())
}

const mapStateToProps = state => {
    return {
        data : state.Log.data,
        total : state.Log.total,
        currentPage : state.Log.currentPage
    }
}


export default connect(mapStateToProps)(withRouter(Logs))