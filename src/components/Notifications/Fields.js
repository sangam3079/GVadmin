// import React, { useState, useEffect } from 'react';
// import { withRouter } from 'react-router-dom';
// import {
//   Form,
//   Input,
//   Select,
//   Radio,
//   DatePicker,
//   Switch,
//   Button,
//   Checkbox,
//   Upload,
//   message,
//   Progress,
// } from 'antd';
// import { customFetch } from 'utils';
// import cookie from 'utils/cookie';
// import { connect } from 'react-redux';
// import { UploadOutlined } from '@ant-design/icons';
// import { newNotification, updateNotification } from 'services/notification';
// import Moment from 'moment';
// import { urlWithParams } from 'services/url';
// import {
//   navTypeOptionsArr,
//   addonAfterOptions,
//   subscriptionTypeOptions,
// } from './NavTypeOptions';
// import { apiEndpoint } from 'services/constants';
// import CustomSelect from './CustomSelect';
// import { getApiCall } from 'services/url';
// import { countriesList, timeZoneList } from '../../constants/constantDatas';
// import { getNames } from 'country-list';

// const Fields = ({
//   action,
//   id,
//   initialValues,
//   history,
//   dispatch,
//   uploadPercent,
// }) => {
//   const { Option } = Select;
//   const token = cookie.getToken();
//   const [form] = Form.useForm();
//   const handleFormFailed = (err) => {
//     console.log(err);
//   };

//   const [loading, setLoading] = useState(false);
//   const [userType, setUserType] = useState('all');
//   const [schedule, setSchedule] = useState();
//   const [recurring, setReccuring] = useState(false);
//   const [data, setData] = useState([]);
//   const [value, setValue] = useState();
//   const [custom_recurring_unit, setCustomRecurringUnit] = useState('days');
//   const [fetchingCustomer, setFetchingCustomer] = useState();
//   const [fetchingLink, setFetchingLink] = useState();
//   const [linkData, setLinkData] = useState([]);
//   const [linkType, setLinkType] = useState();
//   const [navType, setNavType] = useState();
//   const [linkValue, setLinkValue] = useState();
//   const [image, setImage] = useState();

//   console.log(initialValues);

//   const handleFormSubmit = (value) => {
//     console.log(value);

//     let formData = new FormData();
//     let scheduled_at = value.notification_date
//       ? value.notification_date.format()
//       : undefined;
//     let user_id = value.user_ids || [];
//     let user_ids = user_id.map((user) => {
//       return user.value;
//     });

//     let selectedCountries = value.countries || [];

//     let countries = selectedCountries.map((country) => {
//       return country.value;
//     });

//     // cannot read value of undefined
//     // let timezone = value.timezone.value;
//     let timezone = value.scheduled === 'schedule' ? value.timezone.value : null;

//     let data_form =
//       value.scheduled === 'schedule'
//         ? {
//             ...value,
//             timezone: value.timezone.value,
//             countries,
//             image,
//             recurring_every_unit: recurring ? custom_recurring_unit : undefined,
//             recurring: recurring,
//             scheduled: value.scheduled === 'schedule' ? true : false,
//             scheduled_at:
//               value.scheduled === 'schedule' ? scheduled_at : undefined,
//             user_ids: user_ids.length ? user_ids : undefined,
//             payload_reference:
//               navType === 'single_player' ||
//               navType === 'album_songs_page' ||
//               navType === 'playlist_page' ||
//               navType === 'genre_songs_page'
//                 ? linkValue.value
//                 : undefined,
//           }
//         : {
//             ...value,
//             countries,
//             image,
//             scheduled: value.scheduled === 'schedule' ? true : false,
//             user_ids: user_ids.length ? user_ids : undefined,
//             payload_reference:
//               navType === 'single_player' ||
//               navType === 'album_songs_page' ||
//               navType === 'playlist_page' ||
//               navType === 'genre_songs_page'
//                 ? linkValue.value
//                 : undefined,
//           };

//     Object.keys(data_form).map((key) => {
//       if (
//         data_form[key] !== undefined &&
//         key !== 'notification_date' &&
//         typeof data_form[key] !== 'boolean' &&
//         key !== 'notification_time' &&
//         key !== 'link' &&
//         !Array.isArray(data_form[key])
//       ) {
//         formData.append(key, data_form[key]);
//         console.log(key, data_form[key]);
//       }
//       if (Array.isArray(data_form[key])) {
//         data_form[key].forEach((item, index) => {
//           console.log(`${key}[]`, data_form[key][index]);
//           formData.append(`${key}[]`, data_form[key][index]);
//         });
//       }

//       if (typeof data_form[key] === 'boolean') {
//         formData.append(key, data_form[key].toString());
//         console.log(key, data_form[key].toString());
//       }
//     });
//     if (action === 'edit') {
//       setLoading(true);
//       dispatch(
//         updateNotification({
//           id,
//           body: formData,
//           callback: handleSuccessCallback,
//         })
//       );
//     } else {
//       setLoading(true);
//       dispatch(
//         newNotification({ body: formData, callback: handleSuccessCallback })
//       );
//     }
//   };

//   const fetchCustomer = async (value) => {
//     let response_data;
//     setFetchingCustomer(true);
//     setData([]);

//     response_data = await customFetch(
//       'admin/v2/users',
//       'GET',
//       { filters: { keyword: value } },
//       { Authorization: `Bearer ${token}` }
//     );

//     if (response_data) {
//       setFetchingCustomer(false);
//       setData(response_data[0].data);
//     }
//   };

//   const handleSuccessCallback = () => {
//     setLoading(false);
//     history.push('/notifications');
//   };

//   const handleCustomRecurringUnit = (value) => {
//     setCustomRecurringUnit(value);
//   };

//   const fetchLink = (value) => {
//     setFetchingLink(true);
//     let apiTarget;
//     let params = {
//       filter: { keyword: value },
//     };
//     if (navType === 'album_songs_page') {
//       apiTarget = 'album';
//     } else if (navType === 'single_player') {
//       apiTarget = 'tracks';
//     } else if (navType === 'genre_songs_page') {
//       apiTarget = 'genres';
//     } else if (navType === 'playlist_page') {
//       apiTarget = 'playlists';
//     }
//     let url = urlWithParams(`${apiEndpoint}/${apiTarget}`, params);
//     getApiCall({ url, dispatch })
//       .then((resp) => {
//         if (resp !== 0) {
//           setLinkData(resp.data);
//         } else {
//           message.error('Something went wrong');
//         }
//       })
//       .catch((err) => console.log(err))
//       .finally(() => setFetchingLink(false));
//   };

//   const initialValues = addonAfterOptions.map((add, index) => {
//     return (
//       <Option key={index} value={add.value}>
//         {add.label}
//       </Option>
//     );
//   });

//   const addonAfter = (
//     <>
//       <Select
//         defaultValue={custom_recurring_unit}
//         onChange={handleCustomRecurringUnit}
//       >
//         {addonAfterOptionsMapped}
//       </Select>
//     </>
//   );

//   const NavTypeOptions = navTypeOptionsArr.map((nav, index) => {
//     return (
//       <Option key={index} value={nav.value}>
//         {nav.label}
//       </Option>
//     );
//   });

//   const handleCustomerChange = (value) => {
//     setValue(value);
//     setData([]);
//     setFetchingCustomer(false);
//   };

//   const handleLinkChange = (value) => {
//     setLinkValue(value);
//     setLinkData([]);
//     setFetchingLink(false);
//   };

//   const handleNavTypeFetch = (value) => {
//     setNavType(value);
//     setLinkValue({});
//     setLinkData([]);
//     form.setFieldsValue({ link: undefined });
//   };

//   useState(() => {
//     form.setFieldsValue({
//       user_type: userType,
//     });
//   }, []);

//   const handleUserTypeChange = (event) => {
//     setUserType(event.target.value);
//   };

//   const handleRecurringSwitch = (value) => {
//     setReccuring(value);
//   };

//   const handleScheduleSelection = (value) => {
//     setSchedule(value);
//     if (value === 'send_now') {
//       setReccuring(false);
//     }
//   };

//   const handleLinkTypeChange = (value) => {
//     setLinkData([]);
//     setLinkValue(undefined);
//     setLinkType(value);
//     form.setFieldsValue({ link: undefined });
//   };

//   const handleImageUpload = (file) => {
//     setImage(file);
//     return false;
//   };

//   useEffect(() => {
//     let data = initialValues.data || {};
//     let link_type;
//     let link_value = {
//       key: initialValues
//         ? initialValues.payload_reference &&
//           initialValues.payload_reference.length
//           ? initialValues.payload_reference[0].id
//           : undefined
//         : undefined,
//       label: initialValues
//         ? initialValues.payload_reference &&
//           initialValues.payload_reference.length
//           ? initialValues.payload_reference[0].name
//           : undefined
//         : undefined,
//       value: initialValues
//         ? initialValues.payload_reference &&
//           initialValues.payload_reference.length
//           ? initialValues.payload_reference[0].id
//           : undefined
//         : undefined,
//     };

//     let timezone = {
//       key: initialValues.timezone ? initialValues.timezone : undefined,
//       label: initialValues.timezone
//         ? initialValues.timezone.substring(
//             initialValues.timezone.lastIndexOf('/') + 1
//           )
//         : undefined,
//       value: initialValues.timezone ? initialValues.timezone : undefined,
//     };

//     let countries = initialValues.countries
//       ? initialValues.countries.map((country) => {
//           return {
//             key: country,
//             label: country,
//             value: country,
//           };
//         })
//       : [];

//     setReccuring(initialValues.recurring);
//     setUserType(initialValues.user_type);
//     setSchedule(initialValues.scheduled === true ? 'schedule' : 'send_now');
//     setLinkType(initialValues.message_type);
//     setLinkValue(link_value);
//     setNavType(initialValues.navigation_type);

//     if (Object.keys(data)) {
//       let name = Object.keys(data)[0];
//       if (name === 'track_id') {
//         setLinkType('tracks');
//         link_type = 'tracks';
//       }
//     }
//     let user_ids = [];
//     if (initialValues.users) {
//       initialValues.users.forEach((user) => {
//         let obj = {
//           label: user.email,
//           key: user.id,
//           value: user.id,
//         };
//         user_ids.push(obj);
//       });
//     }
//     setValue(user_ids);

//     if (initialValues.recurring_every_unit) {
//       setCustomRecurringUnit(initialValues.recurring_every_unit);
//     }

//     form.setFieldsValue({
//       title: initialValues.title,
//       user_type: initialValues.user_type,
//       user_ids,
//       scheduled: initialValues.scheduled === true ? 'schedule' : 'send_now',
//       subscription_type: initialValues.subscription_type,
//       link_type,
//       notification_date: initialValues.scheduled_at
//         ? Moment(initialValues.scheduled_at)
//         : undefined,
//       recurring_every_unit_no:
//         initialValues.recurring_every_unit_no || undefined,
//       description: initialValues.description,
//       message_type: initialValues.message_type,
//       navigation_type: initialValues.navigation_type,
//       payload: initialValues.payload || '',
//       link: link_value,
//       category: initialValues.category,
//       timezone,
//       countries,
//     });
//   }, [initialValues]);

//   const countryData = getNames().map((countryName) => {
//     return {
//       id: countryName,
//       name: countryName,
//     };
//   });

//   const timeZoneData = timeZoneList.map((timezone) => {
//     return {
//       id: timezone.value,
//       name: timezone.name,
//     };
//   });

//   return (
//     <Form
//       form={form}
//       onFinish={handleFormSubmit}
//       onFinishFailed={handleFormFailed}
//       name='notification_form'
//       layout='vertical'
//     >
//       <div className='row'>
//         <div className='col-lg-2'>
//           <Form.Item label='Push Notification Image' name='image'>
//             <Upload beforeUpload={(file) => handleImageUpload(file)} image>
//               <Button>
//                 <UploadOutlined /> Image
//               </Button>
//             </Upload>
//           </Form.Item>
//           {action === 'edit' ? (
//             initialValues.image_url ? (
//               <img
//                 src={initialValues.image_url}
//                 className='image-table-large my-2'
//               />
//             ) : (
//               <span className='text-muted'>No display image found</span>
//             )
//           ) : (
//             <></>
//           )}
//         </div>
//         <div className='col-lg-10'>
//           <Form.Item
//             label='Title'
//             rules={[{ required: true, message: 'Title is required' }]}
//             name='title'
//           >
//             <Input />
//           </Form.Item>
//         </div>
//       </div>
//       <div className='row'>
//         <div className='col-lg-12'>
//           <Form.Item label='Description' name='description'>
//             <Input.TextArea />
//           </Form.Item>
//         </div>
//       </div>
//       <div className='row'>
//         <div className='col-lg-2'>
//           <Form.Item
//             label='Message Type'
//             name='message_type'
//             rules={[{ required: true, message: 'Message type is required' }]}
//           >
//             <Select onChange={handleLinkTypeChange}>
//               <Option value='nav'>Nav</Option>
//               <Option value='external_link'>External Link</Option>
//               <Option value='message'>Message</Option>
//             </Select>
//           </Form.Item>
//         </div>
//         {linkType === 'nav' && (
//           <div className='col-lg-4'>
//             <Form.Item label='Navigation type' name='navigation_type'>
//               <Select onChange={handleNavTypeFetch}>{NavTypeOptions}</Select>
//             </Form.Item>
//           </div>
//         )}
//         {linkType === 'nav' && (
//           <div className='col-lg-4'>
//             <Form.Item label='Navigation Reference' name='link'>
//               <CustomSelect
//                 value={linkValue}
//                 onSearch={fetchLink}
//                 onChange={handleLinkChange}
//                 loading={fetchingLink}
//                 data={linkData}
//                 disabled={
//                   navType === 'single_player' ||
//                   navType === 'playlist_page' ||
//                   navType === 'genre_songs_page' ||
//                   navType === 'album_songs_page'
//                     ? false
//                     : true
//                 }
//               />
//             </Form.Item>
//           </div>
//         )}
//         {linkType !== 'nav' && linkType && (
//           <div className='col-lg-6'>
//             <Form.Item
//               label='Payload'
//               name='payload'
//               rules={[
//                 {
//                   type: linkType === 'external_link' ? 'url' : 'string',
//                   message:
//                     linkType === 'external_link'
//                       ? 'This must be a link'
//                       : 'Payload is required',
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>
//           </div>
//         )}
//       </div>
//       <div className='row'>
//         <div className='col-lg-6'>
//           <Form.Item
//             name='category'
//             label='Category'
//             rules={[{ required: true, message: 'Category is required' }]}
//           >
//             <Select>
//               <Option value='daily_updates'>Daily Update</Option>
//               <Option value='offers'>Offers</Option>
//               <Option value='others'>Others</Option>
//             </Select>
//           </Form.Item>
//         </div>
//       </div>
//       <div className='row'>
//         <div className='col-lg-6'>
//           <Form.Item
//             label='User type'
//             name='user_type'
//             rules={[{ required: true, message: 'User type is required' }]}
//           >
//             <Radio.Group value={userType} onChange={handleUserTypeChange}>
//               <Radio value='all'>All</Radio>
//               <Radio value='android'>Android</Radio>
//               <Radio value='ios'>ios</Radio>
//               <Radio value='individual'>Individual</Radio>
//               <Radio value='countries'>Country</Radio>
//             </Radio.Group>
//           </Form.Item>
//         </div>
//         <div className='col-lg-6'>
//           {userType === 'individual' && (
//             <>
//               <Form.Item
//                 label='Select Customer'
//                 rules={[{ required: true, message: 'Customer is required' }]}
//                 name='user_ids'
//               >
//                 <CustomSelect
//                   value={value}
//                   onSearch={fetchCustomer}
//                   onChange={handleCustomerChange}
//                   data={data}
//                   loading={fetchingCustomer}
//                   mode='multiple'
//                 />
//               </Form.Item>
//             </>
//           )}
//         </div>
//         <div className='col-lg-6'>
//           {userType === 'countries' && (
//             <>
//               <Form.Item
//                 label='Select Country'
//                 rules={[{ required: true, message: 'Country is required' }]}
//                 name='countries'
//               >
//                 <CustomSelect
//                   value={value}
//                   data={countryData}
//                   filterOption={(input, option) =>
//                     option.props.children
//                       .toLowerCase()
//                       .indexOf(input.toLowerCase()) >= 0 ||
//                     option.props.value
//                       .toLowerCase()
//                       .indexOf(input.toLowerCase()) >= 0
//                   }
//                   mode='multiple'
//                 />
//               </Form.Item>
//             </>
//           )}
//         </div>
//       </div>
//       <div className='row'>
//         <div className='col-lg-4'>
//           <Form.Item label='Subscription Type' name='subscription_type'>
//             <Checkbox.Group
//               options={subscriptionTypeOptions}
//               defaultValue={['free']}
//             ></Checkbox.Group>
//           </Form.Item>
//         </div>
//       </div>
//       <div className='row'>
//         <div className='col-lg-3'>
//           <Form.Item label='Schedule' name='scheduled'>
//             <Select onChange={handleScheduleSelection}>
//               <Option value='send_now'>Send Now</Option>
//               <Option value='schedule'>Schedule Date and Time</Option>
//             </Select>
//           </Form.Item>
//         </div>
//         {schedule === 'schedule' && (
//           <>
//             <div className='col-lg-3'>
//               <Form.Item label='Time Zone' name='timezone'>
//                 <CustomSelect
//                   value={value}
//                   data={timeZoneData}
//                   filterOption={(inputValue, option) =>
//                     option.props.children
//                       .toLowerCase()
//                       .indexOf(inputValue.toLowerCase()) >= 0 ||
//                     option.props.value
//                       .toLowerCase()
//                       .indexOf(inputValue.toLowerCase()) >= 0
//                   }
//                 />
//               </Form.Item>
//             </div>
//             <div className='col-lg-3'>
//               <div className='row'>
//                 <div className='col-lg-12'>
//                   <Form.Item label='Starting from' name='notification_date'>
//                     <DatePicker
//                       format='YYYY-MM-DD HH:mm:ss'
//                       style={{ width: '100%' }}
//                       showTime={{
//                         defaultValue: Moment('00:00:00', 'HH:mm:ss'),
//                       }}
//                     />
//                   </Form.Item>
//                 </div>
//               </div>
//             </div>
//             <div className='col-lg-3'>
//               <div className='d-flex justify-content-between'>
//                 <div className='ant-form-item-label'>
//                   <label>Recurring</label>
//                 </div>
//                 <div>
//                   <Switch
//                     onChange={handleRecurringSwitch}
//                     checked={recurring}
//                   />
//                 </div>
//               </div>
//               {
//                 <Form.Item name='recurring_every_unit_no'>
//                   <Input
//                     addonBefore='Every'
//                     addonAfter={addonAfter}
//                     disabled={!recurring}
//                   />
//                 </Form.Item>
//               }
//             </div>
//           </>
//         )}
//       </div>
//       <div className='row'>
//         <div className='col'>
//           <Button type='primary' htmlType='submit' loading={loading}>
//             Submit
//           </Button>
//           <div>
//             {uploadPercent && (
//               <div className='row'>
//                 <div className='col-lg-12'>
//                   <Progress
//                     strokeColor={{
//                       '0%': '#108ee9',
//                       '100%': '#87d068',
//                     }}
//                     percent={uploadPercent}
//                   />
//                   <span>{uploadPercent === 100 ? 'Processing' : ''}</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </Form>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     uploadPercent: state.UploadPercentage.percent,
//   };
// };

// export default connect(mapStateToProps)(withRouter(Fields));
