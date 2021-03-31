// import React,{useState, useEffect} from 'react'
// import CustomLayout from '../CustomLayout/CustomLayout'
// import Header from 'components/Header/Header'
// import {Button, Divider, Modal} from 'antd'
// import {connect} from 'react-redux'
// import {PlusCircleFilled, DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
// import {withRouter, Link} from 'react-router-dom'
// import AntTable from 'cleanComponents/Table/Table'
// import { getAllNotifications, deleteNotification } from 'services/notification'
// import {setNotification, setNotificationCurrentpage, setNotificationKeyword} from 'store/actions/Notification/NotificationAction'
// import Moment from 'moment';
// import Placeholder from 'assets/images/placeholder-image.png'
// import { getSorterObject } from 'utils/helpers'

// const Notifications = ({history, data, dispatch, total, currentPage, keyword}) => {
//     // const [totalPages, setTotalPages] = useState(undefined);
//     const {confirm}= Modal;
//     const [fetching, setFetching] = useState(false);
//     const [loading, setLoading] = useState(true);
//     // const [keyword, setKeyword] = useState();
//     const [prevNotificationKeyword, setPrevNotificationKeyword] = useState(undefined);

//     const [dateFilter, setDateFilter] = useState({})
//     const [sort, setSort] = useState()
//     // const [currentPage, setCurrentPage] = useState(1);

//     function showDeleteConfirm(id){
//         confirm({
//             title : 'Are you sure to delete this notification?',
//             icon : <ExclamationCircleOutlined />,
//             content : 'This action cannot be undone',
//             okText : 'Yes',
//             okType : 'danger',
//             cancelText : 'No',
//             onOk(){
//                 deleteThisNotification(id)
//             },
//             onCancel(){

//             }
//         })
//     }

//     const deleteThisNotification = id =>{
//         setFetching(true);
//         dispatch(deleteNotification({id,callback : handleDeleteCallback}))
//     }

//     const handleDeleteCallback  = () => {
//         setFetching(false);
//     }

//     const columns = [
//         {
//             title : 'Image',
//             dataIndex : 'image_url',
//             key : 'image',
//             render : (image) => {
//                 return <img src={image || Placeholder} style={{width : '50px'}}/>
//             }
//         },
//         {
//             title : 'Title',
//             dataIndex : 'title',
//             key : 'title',
//             sorter : true,
//             render : title => {
//                 return <span className="text-capitalize">{title}</span>
//             }
//         },
//         {
//             title : 'Description',
//             dataIndex : 'description',
//             key : 'description',
//             render : desc => {
//                 var doc = new DOMParser().parseFromString(desc, "text/xml");
//                 return <div id="description" className="text-capitalize">{desc}</div>
//             }
//         },
//         {
//             title : 'User type',
//             dataIndex : 'user_type',
//             key : 'user_type',
//             render : type => <span className="text-capitalize">{type}</span>
//         },
//         {
//             title : 'Category',
//             dataIndex : 'category',
//             key : 'category',
//             render : category => <span className="text-capitalize">{category}</span>
//         },
//         {
//             title : 'Status',
//             dataIndex : 'opened_count',
//             key : 'status',
//             render : (open, row) => {
//                 return <>
//                     <span title="Open and sent count">Opened:{open}</span><br /><span>Sent:{row.sent_count?row.sent_count:"N/A"}</span>
//                 </>
//             }
//         },
//         {
//             title : 'Subscription',
//             dataIndex : 'subscription_type',
//             key : 'subscription_type',
//             render : type => {
//                 let str;
//                 if (type && type.length){
//                     return <span className="text-capitalize">{type.toString()}</span>
//                 }
//             }
//         },
//         {
//             title : 'Schedule',
//             dataIndex : 'scheduled_at',
//             key : 'scheduled_at',
//             sorter : true,
//             render : sch => {
//                 if(sch){
//                     let d = Moment(sch)
//                     return <span>{d.fromNow() || ''}</span>
//                 }else{
//                     return 'Not Scheduled'
//                 }
//             }
//         },
//         {
//             title : 'Recurring',
//             dataIndex : 'recurring',
//             key : 'recurring',
//             render : (recurring, row) => {
//                 return <span>{recurring ? `Every ${row.recurring_every_unit_no} ${row.recurring_every_unit}` : 'Not recurring'}</span>
//             }
//         },
//         {
//             title : 'Action',
//             render : (field, row) => {
//                 return <div className="d-flex">
//                     <Link to="#" onClick={()=>handleEditNotification(row.id, row)}><EditOutlined className="text-primary"/></Link>
//                     <Divider type="vertical" />
//                     <Link to="#"><DeleteOutlined className="text-danger" onClick={()=>showDeleteConfirm(row.id)}/></Link>
//                 </div>
//             }
//         }
//     ]

//     const handleTableChange = (pagination, filter, sorter) => {
//         if(pagination.current !== currentPage){
//             // setCurrentPage(pagination.current);
//             dispatch(setNotificationCurrentpage(pagination.current))
//             // fetchNotification(pagination.current)
//         }
//         if(sorter){
//             let new_sort = getSorterObject(sorter);
//             setSort(new_sort);
//         }
//     }

//     const handleEditNotification = (id, obj) => {
//         dispatch(setNotification(obj));
//         history.push(`/notifications/${id}/edit`)
//     }

//     const navigate = () => {
//         dispatch(setNotification({}));
//         history.push('/notifications/new')
//     }

//     const fetchNotification = (pageParam, filterParam, sortParam) => {

//         setPrevNotificationKeyword(keyword);

//         let defaultFilter = {
//             keyword,
//             date_from : dateFilter.date_from,
//             date_to : dateFilter.date_to
//         }
//         let params = {
//             page :keyword ? 1 : ( pageParam || currentPage || 1),
//             per_page : 10,
//             filter : filterParam || defaultFilter,
//             sort : sortParam || sort
//         }
//         setFetching(true);
//         dispatch(getAllNotifications({params, callback : handleCallback, prevNotificationKeyword}))
//     }

//     useEffect(()=>{
//         if(!data.length){
//             // console.log('ultimate fetch');
//             fetchNotification()
//         }else{
//             handleCallback()
//         }
//     }, [])

//     const handleCallback = () =>{
//         setLoading(false);
//         setFetching(false);
//     }

//     const handleKeywordFilter = value => {
//         // setKeyword(value)
//         // setCurrentPage(1)
//         dispatch(setNotificationKeyword(value))
//     }

//     const handleDateFilter = value => {
//         setDateFilter(value);
//         // setCurrentPage(1)
//     }

//     useEffect(()=>{
//         fetchNotification();
//         // console.log('fetch on change');
//     }, [keyword, dateFilter, sort, currentPage])

//     return(
//         <CustomLayout sidebarSelectionKey="notification">
//           <div className="card">
//                     <Header
//                         handleDateFilter={handleDateFilter}
//                         handleKeywordFilter={handleKeywordFilter}
//                         keywordValue={keyword}
//                         // title="Push Notification"
//                         // subtitle="List of all push notifications"
//                         button={<Button onClick={navigate} type="primary"><span className="px-2"><PlusCircleFilled /></span>New Push Notification</Button>}
//                     />
//                     <div style={{width : '100%'}} className="card-body">
//                         <AntTable
//                             columns={columns}
//                             dataSource={data}
//                             pagination={{pageSize: '10', total : total,  showSizeChanger : false, current : currentPage}}
//                             onChange={handleTableChange}
//                             loading={fetching}
//                         />
//                     </div>
//                 </div>
//         </CustomLayout>
//     )
// }

// const mapStateToProps = state => {
//     console.log(state.Notification.currentPage)
//     return{
//         data : state.Notification.data,
//         currentPage : state.Notification.currentPage,
//         total : state.Notification.total,
//         keyword : state.Notification.keyword,
//     }
// }

// export default connect(mapStateToProps)(withRouter(Notifications))
