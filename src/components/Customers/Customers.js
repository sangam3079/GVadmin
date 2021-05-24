
import React, {useState, useEffect} from 'react'
import {Table, Button, Divider, Modal, Switch, Drawer, Input, Select} from 'antd';
import Spinner from '../../components/Spinner/Spinner'
import Header from '../../components/Header/Header'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import CustomLayout from '../../components/CustomLayout/CustomLayout'
import {SearchOutlined, DownloadOutlined, DeleteOutlined, ExclamationCircleOutlined, EditOutlined, AndroidFilled, AppleFilled, IdcardOutlined, PlusCircleFilled  } from '@ant-design/icons';
import Moment from 'moment'
import { deleteCustomer, getAllCustomer, updateCustomer, exportCustomerData } from 'services/customers';
import {setCustomer, setCustomerCurrentpage, setCustomerKeyword, setCustomerDevice} from 'store/actions/Customer/CustomerAction';
import AntTable from 'cleanComponents/Table/Table'
import CustomerDetails from './CustomerDetails'
import Can from 'config/can'
import { getSorterObject } from 'utils/helpers'
import CustomerDashboard from './CustomerDashboard';
import { isObjectType } from 'graphql';

const { Option } = Select;






const Customers = React.memo(({history, dispatch, data, total, currentPage, keyword, device }) => {
    const { confirm } = Modal;
    let [switchLoading, setSwitchLoading] = useState(false);
    let [fetching, setFetching] = useState(false);
    let [loading, setLoading] = useState(false);
    let [prevSearchKeyword, setPrevSearchKeyword] = useState(undefined);
    let [dateFilter, setDateFilter] = useState();
   // let [device, setDevice] = useState();
    let [sort, setSort] = useState()
    let [filter, setFilter] = useState()
    const [showModal, setShowModal] = useState(false)
    const [selectedCustomer,setSelectedCustomer] =useState({})


    // let [currentPage, setCurrentPage] = useState(1);
    
    const deleteUser = (id) => {
        setFetching(true);
        dispatch(deleteCustomer({id, callback : deleteCustomerCallback}))
    }

    const editCustomer = id => {
        let customer_arr = [...data];
        let customer = {};
        customer_arr.forEach((c, index) => {
            if(c.id === id){
                customer = c;
                setSelectedCustomer(customer)
            }
        })
        dispatch(setCustomer(customer));
        history.push(`/customers/${id}/edit`);
    }

    

    

    const onOpenModal = (record) => {
        console.log(record);
        setSelectedCustomer(record);
        setShowModal(true);
    }
    
    const onCloseModal = () => {
        setShowModal(false);
        setSelectedCustomer({selectedCustomer : undefined});
    }
    

    const handleActiveChange = (id,value) => {
        let body = {
            deactivated : !value
        }
        setFetching(true);
        dispatch(updateCustomer({id, body, callback : updateCustomerCallback}))
    }

    function showDeleteConfirm(id) {
    confirm({
        title: 'Are you sure delete this customer?',
        icon: <ExclamationCircleOutlined />,
        content: 'This action cannot be undone.',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
        // console.log('OK');
        deleteUser(id)
        },
        onCancel() {
        console.log('Cancel');
        },
    });
    }


    const exportData = ()=>{
        
        let defaultFilter = {
            keyword,
            date_from : dateFilter ? dateFilter.date_from : undefined,
            date_to : dateFilter ? dateFilter.date_to : undefined,
            ...filter
        }
        let params = {
            filter:defaultFilter,
        }
        dispatch(exportCustomerData(params));
    }


    

    
    const columns = [
        {
            title : 'Full Name',
            dataIndex : 'full_name',
            key : 'full_name',
            sorter : true
        },
        {
            title : 'Email',
            dataIndex : 'email',
            key : 'email'
        },
        {
            title : 'Plan',
            dataIndex : 'plan',
            key : 'plan',
            filters : [
                { text: 'Yearly', value: 'yearly' },
                { text: 'Monthly', value: 'monthly' },
                {text: 'Free', value : 'free'}
            ],
            filterMultiple: false
        },
        {
            title : 'Country',
            dataIndex : 'country',
            key : 'country',
            render : (country) => (<span>{country ? country.name : ''}</span>)
        },
        {
            title : 'Last Active',
            dataIndex : 'status',
            key : 'status',
            render : (active) => {
                if(active !== 'NA'){
                    let last_active = Moment.utc(active,'DD/MM/YY HH:mm:ss');
                    return last_active.fromNow()
                }else{
                    return <span>N/A</span>
                }
            }
        },
        { /*
            title : 'Device',
            device:'device',
            key : 'device',
            filters : [
                {text : 'iOS', value: 'ios'},
                {text : 'Android', value : 'android'}
            ],
            filterMultiple: false,
            
            render : (device) => {
                return <div style={{display : 'flex', justifyContent :'center'}}>{device === 'android' ? <AndroidFilled /> : device === 'ios' ? <AppleFilled /> : <small>-</small>}</div>
            } */
           
            
        },
        {
            title : `Created Date`,
            dataIndex : 'created_at',
            key : 'created_at',
            sorter : true
        },
        {
            title : 'Activated',
            dataIndex : 'deactivated',
            render : (active, row) => {
                return (
                    <Can I='edit' a='customer' passThrough>
                        {
                            can => {
                                return <Switch 
                                // defaultChecked={active} 
                                title={active ? 'User is activated' : 'User is deactivated'}
                                onChange={(value)=>handleActiveChange(row.id, value)}
                                loading={switchLoading}
                                checked={!active}
                                disabled={!can}
                        />
                            }
                        }
                    </Can>
                )
            }
        },
        {
            title : 'Options',
            dataIndex : 'active',
            fixed:'right',
            render : (active, record) => (
                <div>
                    <Can I="edit" a="customer" passThrough>
                        {
                            (can) => {
                                return <EditOutlined style={can ? {color : '#1890ff'} : {color : 'grey'}} onClick={can ? ()=>editCustomer(record.id) : null} title="Edit customer"/>
                            }
                        }
                    </Can>
                    <Divider type="vertical" />
                    <Can I='delete' a='customer' passThrough>
                        {
                            can => {
                                return <DeleteOutlined 
                                        style={can ? {color : 'red'} : {color : 'grey'}}
                                        title="Delete this user"
                                        onClick={can ? ()=>showDeleteConfirm(record.id) : null}
                                        title="Delete customer" 
                                    />
                            }
                        }
                    </Can>
                    <Divider type="vertical" />
                        <IdcardOutlined 
                            onClick={ ()=>onOpenModal(record)  } 
                            style={{color : '#1890ff'}}
                        />
                       
                </div>
            )
        }
    ];

    const handleTableChange = (pagination, filter, sorter) => {
        if(pagination.current !== currentPage){
            setFetching(true);
            // setCurrentPage(pagination.current);
            dispatch(setCustomerCurrentpage(pagination.current))
        }
        if(sorter){
            let newSort = getSorterObject(sorter);
            setSort(newSort)
        }
        
        if(filter){
            let obj;
            Object.keys(filter).forEach(key => {
                if(filter[key]){
                    let new_obj = {
                        ...obj,
                        [key] : filter[key][0]
                    }
                    obj = new_obj
                }
            })
            setFilter(obj); 
        } 
    }

    const fetchCustomers = (pageParam, filterParam, sorterParam) => {
        
        setPrevSearchKeyword(keyword);

        let defaultFilter = {
            keyword,
            date_from : dateFilter ? dateFilter.date_from : undefined,
            date_to : dateFilter ? dateFilter.date_to : undefined,
            device,
            
            ...filter
        }

        let defaultSort = sort
        let params = {
            per_page : '10',
            page : pageParam || currentPage,
            filter : filterParam || defaultFilter,
            sort : sorterParam || defaultSort
        }
        setFetching(true);
        dispatch(getAllCustomer({callback : fetchCustomerCallback, params, prevSearchKeyword}));
    }

    const handleClick = () => {
        dispatch(setCustomer({}));
        history.push('/customers/new')
    }

    const fetchCustomerCallback = () => {
        setLoading(false);
        setFetching(false);
    }

    const deleteCustomerCallback = () => {
        setFetching(false);
    }

    const updateCustomerCallback = () => {
        setFetching(false);
    }

    useEffect(()=>{
        if(data.length){
            setLoading(false);
        }else{
            // console.log('i run only once. not when pagination changes');
            setLoading(false);
            fetchCustomers();
        }
    },[history.location.pathname])

    const handlekeywordFilter = value => {
        // setCurrentPage(1)
        // setKeyword(value);
        dispatch(setCustomerKeyword(value))
    }

    const handleDateFilter = value => {
        // setCurrentPage(1)
        setDateFilter(value);
    }

    const handleDeviceFilter = value => {
        // setCurrentPage(1)
        dispatch(setCustomerDevice(value))
    }


    
    

    useEffect(() => {
        // console.log('i run when keyword datefilter sort filter changes', keyword, dateFilter, sort, filter);
        fetchCustomers();
    },[keyword, dateFilter, device, sort,  filter, currentPage])

    const renderConditionally = () => {
        if(loading){
            return (
                <CustomLayout sidebarSelectionKey="customers">
                    <Spinner />
                </CustomLayout>
            )
        }else{
            return (
                <CustomLayout sidebarSelectionKey="customers">
                    <div style={{background:'darkgrey', width:120, borderRadius:8, marginLeft:865 }}>
                        <Select 
                            placeholder={'ios/android'} 
                            onChange={handleDeviceFilter} 
                            style={{ width: 115 }} 
                            bordered={false}
                            
                        >
                            <Option value='ios'> <AppleFilled/> IOS</Option>
                            <Option value='android'> <AndroidFilled/>  Android</Option>
                        </Select>
                    </div>
                    

                    <div style={{marginTop:25, marginBottom:20}}>  

                        <Header 
                            // title="Customers" 
                            // subtitle="List of all customers"
                            handleDateFilter={handleDateFilter}
                            handleKeywordFilter={handlekeywordFilter}
                            keywordValue={keyword}
                            
                            button={
                            <Can I="create" a="customer" passThrough>
                                {
                                    can => (
                                        <Button type="primary" onClick={handleClick} disabled={!can}><span className="px-2"><PlusCircleFilled /></span>New Customer</Button>
                                    )
                                }
                            </Can>
                            } 
                        />  
                    </div>  
                   
                      
                       
                    <div className="a">
                        
                        <CustomerDashboard />
                    </div>  
                    
                    <div style={{width : '100%'}} className="card">
                       
                        
                        
                        <div className="card-body drawer-customPadding">
                            
                            <AntTable 
                                dataSource={data} 
                                columns={columns}
                                pagination={{pageSize : 10, total:total,  showSizeChanger : false, current : currentPage}}
                                onChange={handleTableChange}
                                loading={fetching}
                            /> 
                            <Modal
                                title="Customer Information"
                                closable={true}
                                onCancel={onCloseModal}
                                visible={showModal}
                                width={920}
                                centered={true}
                                destroyOnClose={true}
                                
                                //className="drawer-body-padding-none"
                                footer={false}
                            >
                                <CustomerDetails  subject={selectedCustomer}/>
                            </Modal>
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
})

const mapStateToProps = state => {
    return {
        data : state.Customer.data,
        total : state.Customer.total,
        currentPage : state.Customer.currentPage,
        keyword : state.Customer.keyword,
        device : state.Customer.device
    }
}

export default connect(mapStateToProps)(withRouter(Customers)) 



