// import React, { useEffect, useState } from 'react';
// import { withRouter } from 'react-router-dom';
// import Header from '../../components/Header/Header';
// import CustomLayout from '../CustomLayout/CustomLayout';
// import Fields from './Fields';
// import { connect } from 'react-redux';
// import { getNotification } from 'services/notification';

// const Form = ({ history, notification, dispatch }) => {
//   const [action, setAction] = useState();
//   const [id, setId] = useState(undefined);
//   const [initialValues, setInitialValues] = useState({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     let url = history.location.pathname.split('/');
//     let action_from_url = url[url.length - 1];
//     setAction(action_from_url);
//     if (action_from_url === 'edit') {
//       let id_from_url = url[url.length - 2];
//       setId(id_from_url);
//     }
//   }, [history.location.pathname]);

//   useEffect(() => {
//     setInitialValues(notification);
//   }, [notification]);

//   const handleGetNotificationCallback = () => {
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (!Object.keys(initialValues).length && id) {
//       dispatch(
//         getNotification({ id, callback: handleGetNotificationCallback })
//       );
//     } else {
//       setLoading(false);
//     }
//     console.log(Object.keys(initialValues));
//   }, [initialValues, id]);

//   return (
//     <CustomLayout sidebarSelectionKey='notification'>
//       <div className='card'>
//         <Header
//           title={action === 'new' ? 'New Notification' : 'Edit Notification'}
//           subtitle={
//             action === 'new'
//               ? 'Fill all required fields to create new notification'
//               : 'Edit all necessary fields to edit this notification'
//           }
//         />
//         <div className='card-body'>
//           <div className='row'>
//             <div className='col-lg-12'>
//               <Fields id={id} action={action} initialValues={initialValues} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </CustomLayout>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     notification: state.Notification.notification,
//   };
// };

// export default connect(mapStateToProps)(withRouter(Form));
