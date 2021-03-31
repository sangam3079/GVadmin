import React, {useState, useEffect} from 'react'
import CustomLayout from '../CustomLayout/CustomLayout'
import Header from '../Header/Header'
import {Button,Divider,Drawer} from 'antd'
import Spinner from '../Spinner/Spinner'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {EditOutlined, AndroidFilled, AppleFilled, PlusCircleFilled,  EyeOutlined, DownloadOutlined} from '@ant-design/icons'
import { getAllSubscription, exportSubscriptionData } from 'services/subscription'
import { setSubscription, setSubscriptionKeyword, setSubscriptionCurrentpage } from 'store/actions/Subscription/SubscriptionAction'
import AntTable from 'cleanComponents/Table/Table'
import Can from 'config/can'
import { getSorterObject } from 'utils/helpers'
import SubscriptionDetails from './SubscriptionDetails';

const Subscription = ({history, data, dispatch, total, currentPage, keyword}) => {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    // const [keyword, setKeyword] = useState('')
    const [prevSearchKeyword, setPrevSearchKeyword] = useState(undefined);
    
    const [dateFilter, setDateFilter] = useState({})
    const [plan, setPlan] = useState();
    const [deviceFilter, setDeviceFilter] = useState();
    const [sort, setSort] = useState({})
    // const [currentPage, setCurrentPage] = useState(1);


    const [selectedSubscriber,setSelectedSubscriber] = useState({});
    const [showDrawer,setShowDrawer] = useState(false);


    const onOpenDrawer=(row)=>{
        console.log(row);
        setSelectedSubscriber(row);
        setShowDrawer(true);
    }

    const onCloseDrawer = () => {
        setShowDrawer(false);
        setSelectedSubscriber({selectedSubscriber : undefined});
    }

    const columns = [
        {
            title : 'Subscriber',
            dataIndex : 'user',
            sorter : true,
            key : 'full_name',
            render : (user) => {
                return <span>{user ? user.full_name || user.email : '-'}</span>
            }
        },
        {
            title : 'Email',
            dataIndex : 'user',
            sorter : false,
            key : 'email',
            render : user => {
                return <span>{user ? user.email : ''}</span>
            }
        },
        {
            title : 'Purchase Date',
            dataIndex : 'purchase_time',
            key : 'purchase_time',
            sorter : true
        },
        {
            title : 'Plan',
            dataIndex : 'subs',
            key : 'subs',
            filters : [
                { text: 'Yearly', value: 'yearly' },
                { text: 'Monthly', value: 'monthly' },
                { text: 'Trial', value: 'trial' },
                {text: 'Free', value : 'free'}
            ],
            filterMultiple: false
        },
        {
            title : 'Devices',
            dataIndex : 'device',
            key : 'device',
            filters : [
                {text : 'ios', value : 'ios'},
                {text : 'android', value : 'android'}
            ],
            filterMultiple : false,
            render : (device) => {
                return <div className="d-flex justify-content-center">{device === 'android' ? <AndroidFilled /> : device === 'ios' ? <AppleFilled /> : <small>Unknown</small>}</div>
            }
        },
        {
            title : 'Expires after',
            dataIndex : 'days_until_expiry',
            key : 'expiry_date',
            sorter : true
        },
        {
            title : 'Options',
            dataIndex : 'options',
            key : 'options',
            render : (record, row) => {
                return(
                    <div>
                        <Can I='edit' a='subscription' passThrough>
                            {
                                
                                can => {
                                    return <EditOutlined className={can ? "text-primary" : 'text-muted'} onClick={can ? ()=>editSubscription(row.id) : null} title="Edit subscription"/>
                                }
                            }
                        </Can>

                        <Divider type="vertical"/>

                        <EyeOutlined
                             onClick={ ()=>onOpenDrawer(row)  } 
                             style={{color : '#1890ff'}}
                        />

                    </div>
                )
            }
        },
    ]
    // console.log('in suvscripton page', totalPage);
    const handleTableChange = (pagination, filter, sorter) => {
        if(pagination.current !== currentPage){
            // setCurrentPage(pagination.current);
            dispatch(setSubscriptionCurrentpage(pagination.current))
            // fetchSubscription(pagination.current)
        }
        // console.log(filter);

        if(filter){
            let key = Object.keys(filter);
            key.forEach(k => {
                if(k === 'subs'){
                    if(filter[k]){
                        setPlan(filter[k][0])
                    }else{
                        setPlan(undefined);
                    }
                } 
                if(k === 'device'){
                    if(filter[k]){
                        setDeviceFilter(filter[k][0])
                    }else{
                        setDeviceFilter(undefined);
                    }
                }
            })
        }

        if(sorter){
            // console.log(sorter);
            let new_sort = getSorterObject(sorter);
            setSort(new_sort)
        }
    }

    const fetchSubscription = (pageParam, filterParam, sorterParam) => {
        setFetching(true);
        setPrevSearchKeyword(keyword);
        let defaultFilter = {
            keyword,
            plan : plan,
            device : deviceFilter,
            date_from : dateFilter.date_from,
            date_to : dateFilter.date_to,
        }
        let params = {
            page : pageParam || currentPage,
            per_page : 10,
            filter : filterParam || defaultFilter,
            sort : sorterParam || sort
        }
        setFetching(true);
        dispatch(getAllSubscription({params, callback : handleFetchAllSubscription, prevSearchKeyword}));
    }

    const handleFetchAllSubscription = () => {
        setLoading(false);
        setFetching(false);
    }

    const editSubscription = id => {
        let subscription = data.filter(sub => sub.id === id)[0]
        dispatch(setSubscription(subscription))
        history.push(`/subscriptions/${id}/edit`);
    }

    const navigate = () => {
        dispatch(setSubscription({}))
        history.push('/subscriptions/new');
    }

    useEffect(()=>{
        fetchSubscription();
    }, [])

    const handleKeywordFilter = value => {
        // setKeyword(value);
        // setCurrentPage(1);
        dispatch(setSubscriptionKeyword(value))
    }

    const handleDateFilter = value => {
        setDateFilter(value)
        // setCurrentPage(1)
    }

    useEffect(() => {
        fetchSubscription();
    },[keyword, dateFilter, plan, sort, deviceFilter, currentPage])


    const exportData = ()=>{
        
        let defaultFilter = {
            keyword,
            date_from : dateFilter ? dateFilter.date_from : undefined,
            date_to : dateFilter ? dateFilter.date_to : undefined,
            device:deviceFilter?deviceFilter:undefined,
            plan:plan?plan:undefined,
        }
        let params = {
            filter:defaultFilter,
        }
       
        dispatch(exportSubscriptionData(params));

    }

    const renderConditionally = () => {
        if(loading){
            return(
                <CustomLayout sidebarSelectionKey="subscriptions">
                    <Spinner />
                </CustomLayout>
            )
        }else{
            return(
                <CustomLayout sidebarSelectionKey="subscriptions">
                <div className="card">
                    <Header
                        handleDateFilter={handleDateFilter}
                        handleKeywordFilter={handleKeywordFilter} 
                        // title="Subscriptions" 
                        // subtitle="List of all subscribers"
                        keywordValue={keyword}
                        button={
                        <Can I="create" a="subscription" passThrough>
                            {
                                can => {
                                    return <Button onClick={navigate} disabled={!can} type="primary"><span className="px-2"><PlusCircleFilled /></span>New Subscriptions</Button>
                                }
                            }
                        </Can>
                        }
                    />
                    <div style={{width : '100%'}} className="card-body">
                    <AntTable 
                        dataSource={data}
                        columns={columns} 
                        pagination={{pageSize : 10, total:total, showSizeChanger : false, current : currentPage}}
                        onChange={handleTableChange}
                        loading={fetching}
                        />
                    
                    <Drawer
                        title="Subscriber Information"
                        placement="right"
                        closable={true}
                        onClose={onCloseDrawer}
                        visible={showDrawer}
                        width={520}
                        destroyOnClose={true}
                    >
                       <SubscriptionDetails subscriptionData={selectedSubscriber} />
                    </Drawer>

                    <Button 
                        type="primary" 
                        icon={<DownloadOutlined/>} 
                        size="medium"
                        onClick={exportData}
                    >
                        Export
                    </Button>

                </div>
                </div>
            </CustomLayout>
            )
        }
    }

    return(renderConditionally())
}

const mapStateToProps = state => {
    return {
        data : state.Subscription.data,
        total : state.Subscription.total,
        currentPage : state.Subscription.currentPage,
        keyword : state.Subscription.keyword
    }
}


export default connect(mapStateToProps)(withRouter(Subscription))