// import * as actions from 'store/actions/Notification/NotificationAction'

// const initialStore = {
//     data : [],
//     notification : {},
//     total : undefined,
//     totalPage : undefined,
//     currentPage : 1,
//     keyword : undefined
// }

// export default function notificationReducer(state = initialStore, action){
//     let {payload} = action;
//     switch(action.type){
//         case actions.SET_NOTIFICATION_DATA:
//             return{
//                 ...state,
//                 data : payload
//             }
//         case actions.SET_NOTIFICATION_META:
//             return{
//                 ...state,
//                 total : payload.total,
//                 totalPage : payload.pages,
//                 currentPage : payload.page
//             }
//         case actions.UPDATE_NOTIFICATION:
//             let updated_data = [];
//             state.data.forEach((notification, index) => {
//                 if(notification.id === action.id){
//                     updated_data = [...state.data];
//                     let updated_notification = {...updated_data[index]}
//                     updated_notification = {
//                         ...updated_notification,
//                         ...action.payload
//                     }
//                     console.log(updated_notification);
//                     updated_data[index] = updated_notification
//                 }
//             })
//             return{
//                 ...state,
//                 data : updated_data
//             }
//         case actions.SET_NOTIFICATION:
//             return{
//                 ...state,
//                 notification : payload
//             }
//         case actions.NEW_NOTIFICATION:
//             let new_data = [action.payload, ...state.data];
//             return{
//                 ...state,
//                 data : new_data
//             }
//         case actions.DELETE_NOTIFICATION:
//             let data_without_deleted = state.data.filter(notification => {
//                 return notification.id !== payload
//             });

//             return {
//                 ...state,
//                 data : data_without_deleted
//             }
//         case actions.SET_NOTIFICATION_CURRENTPAGE:
//             return {
//                 ...state,
//                 currentPage : action.payload
//             }
//         case actions.SET_NOTIFICATION_KEYWORD:
//             return {
//                 ...state,
//                 keyword : action.payload
//             }
//         default:
//             return state
//     }
// }
