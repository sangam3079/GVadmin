// import {
//     getApiCall,
//     postApiCall,
//     urlWithParams
// } from './url'

// import {notificationsUrl} from './url'
// import {apiEndpoint} from 'services/constants'
// // import {} from //actions
// import {message} from 'antd'
// import {    setData,
//             setMeta,
//             setNotification,
//             notificationDelete,
//             addNotification,
//             notificationUpdate } from 'store/actions/Notification/NotificationAction'

// export const getAllNotifications = obj => {
//     let {params, callback, prevNotificationKeyword} = obj
//     let url = urlWithParams(`${apiEndpoint}/${notificationsUrl}`, params)
//     return dispatch => {

//         if(prevNotificationKeyword!==undefined){
//             getApiCall({url, dispatch,abort:true})
//             .then(resp => {
//                 if(resp !== 0 && resp!==undefined){
//                     // let {push_notifications, page, pages, total} = resp.data;
//                     dispatch(setData(resp.data))
//                     dispatch(setMeta({page : resp.page_meta.current_page, pages : resp.page_meta.totalPage, total : resp.page_meta.total}))
//                 }else if(resp===undefined){
//                     console.log('[Previous keyword search aborted], getApiCall response:',resp)
//                 }else{
//                     message.error('Could not fetch push notifications. Something went wrong')
//                 }
//             })
//             .catch(err => console.log(err))
//             .finally(() => callback())
//         }else if(prevNotificationKeyword===undefined){
//             getApiCall({url, dispatch,abort:false})
//             .then(resp => {
//                 if(resp !== 0 && resp!==undefined){
//                     // let {push_notifications, page, pages, total} = resp.data;
//                     dispatch(setData(resp.data))
//                     dispatch(setMeta({page : resp.page_meta.current_page, pages : resp.page_meta.totalPage, total : resp.page_meta.total}))
//                 }else if(resp===undefined){
//                     console.log('[Previous keyword search aborted], getApiCall response:',resp)
//                 }else{
//                     message.error('Could not fetch push notifications. Something went wrong')
//                 }
//             })
//             .catch(err => console.log(err))
//             .finally(() => callback())
//         }

//     }
// }

// export const getNotification = obj => {
//     let {id, callback} = obj;
//     let url = `${apiEndpoint}/${notificationsUrl}/${id}`
//     return dispatch => {
//         getApiCall({url, dispatch})
//         .then(resp => {
//             if(resp !== 0){
//                 console.log('we are getting notification')
//                 dispatch(setNotification(resp.data))
//             }else{
//                 message.error('Something went wrong on server side')
//             }
//         })
//         .catch(err => console.log(err))
//         .finally(() => callback())
//     }
// }

// export const newNotification = ({body, callback}) => {
//     let url = `${apiEndpoint}/${notificationsUrl}`
//     return dispatch => {
//         postApiCall({dispatch, method : 'POST', url, body})
//         .then(resp => {
//         console.log(resp);
//         if(resp && resp !== 0){
//             message.success('Successfully added a notification')
//             dispatch(addNotification(resp.data))
//             callback();
//         }else{
//             // message.error('Sorry couldnot add a notification. Something went wrong')
//         }
//     })
//     .catch(err => console.log(err))
//     }
// }

// export const updateNotification = ({id, body, callback}) => {
//     let url =  `${apiEndpoint}/${notificationsUrl}/${id}`
//     return dispatch => {
//         postApiCall({dispatch, method : 'PUT', url, body})
//         .then(resp => {
//             if(resp !== 0){
//                 dispatch(notificationUpdate({id, payload : resp.data}))
//             }else{
//                 // message.error('Sorry couldnot update notification. Something went wrong')
//             }
//         })
//         .catch(err => console.log(err))
//         .finally(() => callback())
//     }
// }

// export const deleteNotification = ({id, callback}) => {
//     let url = `${apiEndpoint}/${notificationsUrl}/${id}`
//     return dispatch => {
//         postApiCall({dispatch, method : 'DELETE', url})
//         .then(resp => {
//             if(resp !== 0){
//                 dispatch(notificationDelete(id))
//             }
//         })
//         .catch(err => console.log(err))
//         .finally(() => callback())
//     }
// }
