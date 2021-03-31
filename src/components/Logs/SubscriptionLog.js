import React, {useState, useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import AntTable from 'cleanComponents/Table/Table'
import {getSubscriptionLogs} from 'services/logs'
import {connect} from 'react-redux'
import Moment from 'moment'


const GenericLog = ({dispatch, history, data, total}) =>{
    const [fetching, setFetching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const handleFetchLogCallback = () => {
        setFetching(false);
    }

    const fetchLog = (pageParam) =>{
        let params = {
            page : pageParam || currentPage,
            per_page : 10,
            filter : {},
            sort : {}
        }
        setFetching(true);
        dispatch(getSubscriptionLogs({params, callback : handleFetchLogCallback}))
    }

    useEffect(()=>{
        if(data.length){
            setFetching(false);
        }else{
            setFetching(true);
            fetchLog();
        }
    }, [history.location.pathname])

    const handleTableChange = pagination => {
        if(pagination.current !== currentPage){
            fetchLog(pagination.current)
            setCurrentPage(pagination.current);
        }
    }

    const columns = [
        {
            title : 'Message',
            dataIndex : 'message',
            key : 'message'
        },
        {
            title : 'Created Date',
            dataIndex : 'created_at',
            key : 'created_at',
            render : date => {
                if(date){
                    let created_at = Moment(date, 'MMMM-D, YYYY')
                    return <span className="text-capitalize">{created_at.fromNow()}</span>
                }
            }
        },
        {
            title : 'Done at',
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
    return(
        <>
            <AntTable 
                columns={columns}
                dataSource={data}
                pagination={{pageSize : 10, total : total, showSizeChanger : false, current : currentPage}}
                onChange={handleTableChange}
                loading={fetching}
                className="utils_scrollTable"
            />
        </>
    )
}


const mapStateToProps  = state => {
    return {
        data : state.SubscriptionLog.data,
        total : state.SubscriptionLog.total,
        currentPage : state.SubscriptionLog.currentPage
    }
}

export default connect(mapStateToProps)(withRouter(GenericLog))