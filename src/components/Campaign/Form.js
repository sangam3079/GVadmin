import React, { useState, useEffect, Fragment } from 'react';
import {
  Form,
  Row,
  Col,
  Radio,
  Input,
  Button,
  Upload,
  Divider,
  Checkbox,
  Select,
  Modal,
  Spin,
  message,
  Switch,
} from 'antd';

import {
  UploadOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { timeZoneList } from '../../constants/constantDatas';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { PlusOutlined, EyeOutlined } from '@ant-design/icons';
import CustomLayout from '../CustomLayout/CustomLayout';
import DynamicField from './DynamicField';
import CustomSelect from '../Notifications/CustomSelect';
import { newCampaign, updateCampaign } from 'services/campaign';
import { customFetch } from 'utils';
import cookie from 'utils/cookie';
import moment from 'moment';
// import { navTypeOptionsArr } from '../Notifications/NavTypeOptions';
import { urlWithParams } from 'services/url';
import { apiEndpoint } from 'services/constants';
import { getApiCall } from 'services/url';

import NotificationForm from '../Notifications/Form';

import { getCampaign } from 'services/campaign';
import { getAllTags } from 'services/tags';

import { getNames } from 'country-list';
import value from 'require-context.macro';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

// const message_type = [
//   { label: 'Email', value: 'EmailCampaign' },
//   { label: 'Push Notification', value: 'PushNotificationCampaign' },
// ];

const user_type = [
  { value: 'all', label: 'All' },
  { value: 'ios', label: 'Ios' },
  { value: 'android', label: 'Android' },
  { value: 'individual', label: 'Individual' },
  { value: 'countries', label: 'Countries' },
  // {label:'',value:'User Group'},
];
const target_type = [
  { value: 'userSegments', label: 'User Segments' },
  { value: 'afterEvents', label: 'After Events' },
  { value: 'userInterest', label: 'User Interest' },
];
const subscription_type = [
  { label: 'Free', value: 'free' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
  // {label : 'Trial', value : 'trial'},
  // {label : 'Promo', value : 'promo'},
  { label: 'Invitation', value: 'invitation' },
];

const wait_options = ['Immediately', 'Day', 'Date'];

const trigger_options = [
  { id: 'expires_in_7_days', name: 'expires_in_7_days' },
  { id: 'new_user', name: 'new_user' },
];

export const navTypeOptionsArr = [
  { value: 'single_player', label: 'Track Page' },
  { value: 'genre_songs_page', label: 'Genre Page' },
  { value: 'playlist_page', label: 'Playlist Page' },
  { value: 'subscribe_page', label: 'Subscribe Page' },
  { value: 'invite_page', label: 'Invite Page' },
  { value: 'download_page', label: 'Download Page' },
  { value: 'reminder_page', label: 'Reminder Page' },
  { value: 'add_new_reminder_page', label: 'Add New Reminder Page' },
  { value: 'profile_page', label: 'Profile Page' },
  { value: 'offline_page', label: 'Offline Page' },
  { value: 'home_page', label: 'Home Page' },
  { value: 'favs_page', label: 'Favourites Page' },
  { value: 'about_page', label: 'About Page' },
  { value: 'history_page', label: 'History Page' },
  { value: 'ask_question_page', label: 'Ask Question Page' },
  { value: 'notification_page', label: 'Notification Page' },
  { value: 'discover_page', label: 'Discover Page' },
  { value: 'change_password_page', label: 'Change Password Page' },
  { value: 'settings_page', label: 'Settings Page' },
];

const CampaignForm = (props) => {
  const dispatch = useDispatch();
  const { history, campaign } = props;
  const [action, setAction] = useState();
  const [id, setId] = useState(undefined);
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(false);
  // const [campaignCategoryUsersValue, setCampaignCategoryUsersValue] =useState();
  const [timeZoneValue, setTimeZoneValue] = useState();
  const [emailDatas, setEmailDatas] = useState();
  const [userType, setUserType] = useState();
  const [targetType, setTargetType] = useState();
  const [campaignType, setCampaignType] = useState('EmailCampaign');
  const [fetchingCustomer, setFetchingCustomer] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [customerValue, setCustomerValue] = useState();
  const [countryValue, setCountryValue] = useState();
  const [eventsValue, setEventsValue] = useState();
  const [sequencesValues, setSequencesValues] = useState(undefined);
  const [templatePreviewData, setTemplatePreviewData] = useState(undefined);
  const [tagData, setTagData] = useState([]);
  const [image, setImage] = useState();
  const [linkData, setLinkData] = useState([]);
  const [linkType, setLinkType] = useState();
  const [navType, setNavType] = useState();
  const [linkValue, setLinkValue] = useState();
  const [fetchingLink, setFetchingLink] = useState();
  const [form] = Form.useForm();
  const token = cookie.getToken();

  const [requesting, setRequesting] = useState();
  const [template, setTemplate] = useState(undefined);

  const [campaignCategoryData, setCampaignCategoryData] = useState([]);
  const [campaignCategoryValue, setCampaignCategoryValue] = useState();
  const [userIdsValue, setUserIdsValue] = useState();
  const [fetchingCampaignCategory, setFetchingCampaignCategory] = useState(
    false
  );

  const [fetchingUserGroup, setFetchingUserGroup] = useState(false);
  const [userGroupData, setUserGroupData] = useState([]);
  const [userGroupValue, setUserGroupValue] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalPreviewData, setModalPreviewData] = useState(undefined);
  const [modalDataLoading, setModalDataLoading] = useState(false);

  const [prevTagSearchKeyword, setPrevTagSearchKeyword] = useState(undefined);
  const [fetchingTag, setFetchingTag] = useState(false);

  const [tagValue, setTagValue] = useState(undefined);

  const [buttonDisable, setButtonDisable] = useState(false);

  useEffect(() => {
    let url = history.location.pathname.split('/');
    let action_from_url = url[url.length - 1];
    setAction(action_from_url);
    if (action_from_url === 'edit') {
      let id_from_url = url[url.length - 2];
      setId(id_from_url);
    }
  }, [history.location.pathname]);

  useEffect(() => {
    setTagData(props.tagData);
  }, [props.tagData]);

  useEffect(() => {
    setInitialValues(campaign);
  }, [campaign]);

  const handleGetCampaignCallback = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (initialValues && !Object.keys(initialValues).length && id) {
      dispatch(getCampaign({ id, callback: handleGetCampaignCallback }));
    } else {
      setLoading(false);
    }
  }, [initialValues, id]);

  const handleImageUpload = (file) => {
    setImage(file);
    return false;
  };

  const createTemplateMarkup = (templatePreviewData) => {
    return {
      __html: templatePreviewData,
    };
  };

  const fetchTemplatePreview = async (id) => {
    let response_data;
    response_data = await customFetch(
      `admin/v2/campaigns/${id}/preview`,
      'GET',
      { filters: { keyword: '' } },
      { Authorization: `Bearer ${token}` }
    );

    if (response_data) {
      setModalPreviewData(response_data[0]);
      setModalDataLoading(false);
    }
  };

  const openTemplateModal = () => {
    fetchTemplatePreview(initialValues.id);
    setShowModal(true);
    setModalDataLoading(true);
  };

  const closeTemplateModal = () => {
    setShowModal(false);
  };

  const handleFormSubmit = (values) => {
    console.log('form values  ', values);
    let sequences = [];

    values.sequences.filter((sequence, index) => {
      return sequence.delivery_time !== undefined;
    });

    values.sequences.forEach((sequence, index) => {
      if (sequence.delivery_time === 'Date') {
        delete sequence.day;
        sequence.date = sequence.date.format('YYYY-MM-DD');
        sequence.time = sequence.time.format('hh:mm A');
      } else if (sequence.delivery_time === 'Day') {
        delete sequence.date;
        sequence.time = sequence.time.format('hh:mm A');
      } else if (sequence.delivery_time === 'Immediately') {
        delete sequence.date;
        delete sequence.time;
        sequence.day = '0';
      }

      delete sequence.delivery_time;
    });

    let countries = [];
    let user_ids = [];
    let events = [];
    // let campaign_category_ids=[];
    let user_groups = [];
    let tag_ids = [];

    if (values.target_type) {
      if (values.target_type === 'userSegments') {
        delete values.events;
        // delete values.campaign_category_ids;
        delete values.user_groups;
        delete values.user;
        delete values.tag_ids;

        if (values.user_type === 'individual') {
          delete values.countries;

          let user_id = values.user_ids || [];
          user_ids = user_id.map((user) => {
            return user.value;
          });
        } else if (values.user_type === 'countries') {
          delete values.individual;

          let selectedCountries = values.countries || [];
          countries = selectedCountries.map((country) => {
            return country.value;
          });
        }
      } else if (values.target_type === 'afterEvents') {
        // delete values.campaign_category_ids;
        delete values.user_groups;
        delete values.tag_ids;
        delete values.individual;
        delete values.countries;
        values.user_type = null;

        if (values.events) {
          events = values.events.map((event) => {
            return event.value;
          });
        }
      } else if (values.target_type === 'userInterest') {
        delete values.individual;
        delete values.countries;
        delete values.events;

        values.user_type = null;

        if (values.user_groups) {
          user_groups = values.user_groups.map((userGroup) => {
            return userGroup.label;
          });
        }

        if (values.tag_ids) {
          tag_ids = values.tag_ids.map((ids) => {
            return ids.value;
          });
        }
      }
      delete values.target_type;
    }
    let data = {
      ...values,
      // campaign_category_ids:campaign_category_ids,
      user_groups: user_groups,
      countries: countries,
      user_ids: user_ids,
      tag_ids: tag_ids,
      events: events,
      template,
      image,
      status: values.status ? 'active' : 'inactive',
      payload_reference:
        navType === 'single_player' ||
        navType === 'album_songs_page' ||
        navType === 'playlist_page' ||
        navType === 'genre_songs_page'
          ? linkValue.value
          : undefined,
    };

    console.log('submit data', data);

    setButtonDisable(true);

    const handleCallback = () => {
      setRequesting(false);
      setButtonDisable(false);
      history.push('/campaign');
    };

    let formData = new FormData();

    Object.keys(data).forEach((key) => {
      console.log('data', key, data[key]);
      if (data[key] && !Array.isArray(data[key])) {
        console.log('data array', key, data[key]);
        if (key === 'timezone') {
          formData.append(`${key}`, data[key].value);
        } else {
          formData.append(key, data[key]);
        }
      } else if (data[key] === null) {
        console.log('data null', key, data[key]);
        formData.append(key, '');
      } else if (key === 'sequences' && Array.isArray(data[key])) {
        data[key].forEach((sequences, index) => {
          Object.keys(sequences).forEach((key) => {
            formData.append(`sequences[${index}][${key}]`, sequences[key]);
          });
        });
      } else if (key === 'timezone' && Array.isArray(data[key])) {
        formData.append(`${key}`, data[key][0].value);
      } else if (Array.isArray(data[key])) {
        // empty values / "" in array pushed or else old values appear
        if (data[key].length === 0) {
          formData.append(`${key}[]`, '');
        } else {
          data[key].forEach((item, index) => {
            formData.append(`${key}[]`, data[key][index]);
          });
        }
      }
    });

    if (action === 'edit') {
      setRequesting(true);
      dispatch(
        updateCampaign({
          id,
          body: formData,
          callback: handleCallback,
        })
      );
    } else {
      setRequesting(true);
      dispatch(
        newCampaign({
          body: formData,
          callback: handleCallback,
        })
      );
    }
  };

  const timeZoneData = timeZoneList.map((timezone) => {
    return {
      id: timezone.value,
      name: timezone.value,
    };
  });

  const handleFileUpload = (file) => {
    setTemplate(file);
    return false;
  };

  const removeUploadedFile = (file) => {
    setTemplate(undefined);
    // return false
  };

  const fetchCampaignCategory = async (value) => {
    let response_data;
    setFetchingCampaignCategory(true);
    setCampaignCategoryData([]);

    response_data = await customFetch(
      'admin/v2/campaign_categories',
      'GET',
      { filters: { keyword: value } },
      { Authorization: `Bearer ${token}` }
    );

    if (response_data) {
      setFetchingCampaignCategory(false);
      setCampaignCategoryData(response_data[0].data);
    }
  };

  const fetchUserGroup = async (value) => {
    let response_data;
    setFetchingUserGroup(true);
    setUserGroupData([]);

    response_data = await customFetch(
      'admin/v2/user_groups',
      'GET',
      { filters: { keyword: value } },
      { Authorization: `Bearer ${token}` }
    );

    if (response_data) {
      console.log('response_data', response_data);
      setFetchingUserGroup(false);
      setUserGroupData(response_data[0].data);
    }
  };

  const handleCampaignCategoryChange = (value) => {
    setCampaignCategoryValue(value.value);
    // setCampaignCategoryData([])
    setFetchingCampaignCategory(false);
  };

  const handleUserGroupChange = (value) => {
    setUserGroupValue(value.value);
    setFetchingUserGroup(false);
  };

  const setFormInitialValues = () => {
    if (initialValues && Object.keys(initialValues).length !== 0) {
      let target_type;
      // if((initialValues.campaign_category_users && initialValues.campaign_category_users.length!==0) || (initialValues.tags && initialValues.tags.length!==0)){
      if (
        (initialValues.user_groups &&
          initialValues.user_groups.length !== 0 &&
          initialValues.user_groups[0] !== '') ||
        (initialValues.tags && initialValues.tags.length !== 0)
      ) {
        target_type = 'userInterest';
      } else if (
        initialValues.events &&
        initialValues.events.length !== 0 &&
        initialValues.events[0] !== ''
      ) {
        target_type = 'afterEvents';
      } else if (initialValues.user_type && initialValues.user_type !== '') {
        target_type = 'userSegments';
      }

      setTargetType(target_type);

      let tag_ids = [];
      if (initialValues.tags) {
        initialValues.tags.forEach((tag) => {
          let obj = {
            label: tag.name,
            key: tag.id,
            value: tag.id,
          };
          tag_ids.push(obj);
        });
      }

      setTagValue(tag_ids);

      let campaign_category_users = [];
      if (initialValues.campaign_category_users) {
        initialValues.campaign_category_users.forEach((user) => {
          let obj = {
            label: user.full_name,
            key: user.id,
            value: user.id,
          };
          campaign_category_users.push(obj);
        });
      }
      // setCampaignCategoryValue(campaign_category_users)

      setUserType(initialValues.user_type);

      let user_ids = [];
      let countries = [];
      if (initialValues.user_type === 'individual') {
        if (initialValues.users) {
          initialValues.users.forEach((user) => {
            let obj = {
              label: user.full_name || user.email,
              key: user.id,
              value: user.id,
            };
            user_ids.push(obj);
          });
        }
        setUserIdsValue(user_ids);
      } else if (initialValues.user_type === 'countries') {
        if (initialValues.countries) {
          initialValues.countries.forEach((country) => {
            let obj = {
              label: country,
              key: country,
              value: country,
            };
            countries.push(obj);
          });
        }
        // setUserIdsValue(user_ids);
      }

      let events = [];
      if (initialValues.events) {
        initialValues.events.forEach((event) => {
          let obj = {
            label: event,
            key: event,
            value: event,
          };
          events.push(obj);
        });
      }
      setEventsValue(initialValues.events);

      let timezone = [];
      if (initialValues.timezone) {
        let obj = {
          label: initialValues.timezone,
          key: initialValues.timezone,
          value: initialValues.timezone,
        };
        timezone.push(obj);
      }
      setTimeZoneValue(timezone);

      let sequences = [];
      sequences = Object.keys(initialValues.sequences).map((key) => {
        return initialValues.sequences[key];
      });

      sequences.forEach((sequence) => {
        if (sequence.date) {
          sequence.delivery_time = 'Date';
          sequence.date = moment(sequence.date, 'YYYY-MM-DD');
          sequence.time = moment(sequence.time, 'hh:mm:ss A');
        } else if (sequence.day) {
          if (sequence.time && sequence.day) {
            sequence.delivery_time = 'Day';
            sequence.time = moment(sequence.time, 'hh:mm:ss A');
          } else if (sequence.day === '0' && !sequence.time) {
            sequence.delivery_time = 'Immediately';
          }
        }
      });

      setSequencesValues(sequences);

      let campaign_category_ids = [];
      if (initialValues.campaign_categories) {
        initialValues.campaign_categories.forEach((campaign_category) => {
          let obj = {
            label: campaign_category.title,
            key: campaign_category.id,
            value: campaign_category.id,
          };
          campaign_category_ids.push(obj);
        });
      }
      // setCampaignCategoryValue(campaign_category_ids);

      let user_groups = [];
      if (initialValues.user_groups) {
        console.log('initialValues', initialValues);
        initialValues.user_groups.forEach((userGroup) => {
          console.log('userGroup', userGroup);
          let obj = {
            label: userGroup,
            key: userGroup,
            value: userGroup,
          };
          user_groups.push(obj);
        });
      }
      setUserGroupValue(user_groups);

      if (initialValues.type) {
        setCampaignType(initialValues.type);
      }

      if (initialValues.message_type) {
        setLinkType(initialValues.message_type);
      }

      if (initialValues.navigation_type) {
        setNavType(initialValues.navigation_type);
      }

      let link_value = {
        key: initialValues
          ? initialValues.payload_reference &&
            initialValues.payload_reference.length
            ? initialValues.payload_reference[0].id
            : undefined
          : undefined,
        label: initialValues
          ? initialValues.payload_reference &&
            initialValues.payload_reference.length
            ? initialValues.payload_reference[0].name
            : undefined
          : undefined,
        value: initialValues
          ? initialValues.payload_reference &&
            initialValues.payload_reference.length
            ? initialValues.payload_reference[0].id
            : undefined
          : undefined,
      };
      setLinkValue(link_value);

      form.setFieldsValue({
        type: initialValues.type,
        category: initialValues.category,
        title: initialValues.title,
        user_type: initialValues.user_type,
        target_type,
        user_ids: user_ids,
        tag_ids,
        countries: countries,
        subscription_type: initialValues.subscription_type,
        events: events,
        // campaign_category_ids:campaign_category_ids,
        user_groups: user_groups,
        timezone: timezone,
        sequences: sequences,
        message_type: initialValues.message_type,
        payload: initialValues.payload || '',
        status: initialValues.status === 'active' ? true : false,
        navigation_type: initialValues.navigation_type
          ? initialValues.navigation_type
          : '',
        // link: initialValues.payload_reference
        //   ? initialValues.payload_reference
        //   : '',
        link: link_value,
      });
    }
  };

  useEffect(() => {
    setFormInitialValues();
  }, [initialValues]);

  const defaultTrackFileList =
    initialValues && initialValues.template_url
      ? [
          {
            uid: '1',
            name: 'initialValues.template_url',
            // name:'prevDefaultTemplate',
            status: 'done',
            url: initialValues.template_url,
          },
        ]
      : undefined;

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleTargetTypeChange = (value) => {
    setTargetType(value);
  };

  const handleCampaignTypeChange = (event) => {
    setCampaignType(event.target.value);
    console.log('campaign type', event.target.value);
  };

  const fetchCustomer = async (value) => {
    let response_data;
    setFetchingCustomer(true);
    setCustomerData([]);

    response_data = await customFetch(
      'admin/v2/users',
      'GET',
      { filters: { keyword: value } },
      { Authorization: `Bearer ${token}` }
    );

    if (response_data) {
      setFetchingCustomer(false);
      setCustomerData(response_data[0].data);
    }
  };

  useEffect(() => {
    fetchCustomer(' ');
    // fetchCampaignCategory('');
    fetchUserGroup('');
    handleTagSearch(' ');
  }, []);

  const handleCustomerChange = (value) => {
    setUserIdsValue(value);
    console.log(value);
    setCustomerData([]);
    setFetchingCustomer(false);
  };

  const handleCountrySelect = (value) => {
    setCountryValue(value);
  };

  const countryData = getNames().map((countryName) => {
    return {
      id: countryName,
      name: countryName,
    };
  });

  const handleTagSearch = (keyword) => {
    setFetchingTag(true);
    setPrevTagSearchKeyword(keyword);

    const params = {
      filter: { keyword: keyword },
    };

    const fetchObj = {
      params,
      callback: () => setFetchingTag(false),
      prevTagSearchKeyword,
    };

    dispatch(getAllTags(fetchObj));
  };

  const handleLinkTypeChange = (value) => {
    setLinkData([]);
    setLinkValue(undefined);
    setLinkType(value);
    form.setFieldsValue({ link: undefined });
  };

  const NavTypeOptions = navTypeOptionsArr.map((nav, index) => {
    return (
      <Option key={index} value={nav.value}>
        {nav.label}
      </Option>
    );
  });

  const handleNavTypeFetch = (value) => {
    setNavType(value);
    setLinkValue({});
    setLinkData([]);
    form.setFieldsValue({ link: undefined });
  };

  const fetchLink = (value) => {
    setFetchingLink(true);
    let apiTarget;
    let params = {
      filter: { keyword: value },
    };
    if (navType === 'single_player') {
      apiTarget = 'tracks';
    } else if (navType === 'genre_songs_page') {
      apiTarget = 'genres';
    } else if (navType === 'playlist_page') {
      apiTarget = 'playlists';
    }
    let url = urlWithParams(`${apiEndpoint}/${apiTarget}`, params);
    getApiCall({ url, dispatch })
      .then((resp) => {
        if (resp !== 0) {
          setLinkData(resp.data);
          console.log('link fetch data', resp.data);
        } else {
          message.error('Something went wrong');
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setFetchingLink(false));
  };

  const handleLinkChange = (value) => {
    setLinkValue(value);
    setLinkData([]);
    setFetchingLink(false);
  };

  return (
    <CustomLayout sidebarSelectionKey='campaign'>
      <React.Fragment className='bg-white p-5'>
        <Form layout='vertical' form={form} onFinish={handleFormSubmit}>
          <Row>
            <FormItem
              label='Message Type'
              name='type'
              rules={[
                {
                  required: true,
                  message: 'Message/Campaign Type is required',
                },
              ]}
              initialValue={campaignType}
            >
              <Radio.Group
                // options={message_type}
                defaultValue='EmailCampaign'
                onChange={handleCampaignTypeChange}
                value={campaignType}
              >
                <Radio value='EmailCampaign'>Email</Radio>
                <Radio value='PushNotificationCampaign'>
                  Push Notification
                </Radio>
              </Radio.Group>
            </FormItem>
          </Row>
          {/* {messageType === 'EmailCampaign' && ( */}
          <div>
            <Row>
              <Col span={24}>
                <FormItem
                  className='w-100'
                  name='title'
                  label='Message/Campaign Title'
                >
                  <Input
                    placeholder='Enter the message/campaign title'
                    size='large'
                  />
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={11}>
                <FormItem
                  name='category'
                  label='Category'
                  rules={[{ required: true, message: 'Category is required' }]}
                >
                  <Select size='medium' placeholder='Select a category'>
                    <Option value='daily_updates'>Daily Update</Option>
                    <Option value='offers'>Offers</Option>
                    <Option value='others'>Others</Option>
                  </Select>
                </FormItem>
              </Col>

              <Col span={12} offset={1}>
                <Form.Item label='Subscription Type' name='subscription_type'>
                  <Checkbox.Group
                    options={subscription_type}
                    // defaultValue={['free']}
                  ></Checkbox.Group>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={11}>
                <FormItem
                  label='Targetting'
                  name='target_type'
                  rules={[{ required: true, message: 'Target is required' }]}
                >
                  <Select
                    size='medium'
                    placeholder='Select a target'
                    onChange={handleTargetTypeChange}
                  >
                    {target_type.map((targetType) => {
                      return (
                        <Option value={targetType.value}>
                          {targetType.label}
                        </Option>
                      );
                    })}
                  </Select>
                </FormItem>
              </Col>
              <Col span={12}></Col>
            </Row>

            <Row>
              {targetType === 'userSegments' && (
                <Col span={12}>
                  <FormItem label='User Type' name='user_type'>
                    <Radio.Group
                      options={user_type}
                      onChange={handleUserTypeChange}
                    />
                  </FormItem>
                </Col>
              )}

              {targetType === 'userSegments' && userType === 'individual' && (
                <Col span={12}>
                  <Form.Item
                    label='Select Customer'
                    rules={[
                      { required: true, message: 'Customer is required' },
                    ]}
                    name='user_ids'
                  >
                    <CustomSelect
                      value={userIdsValue}
                      onSearch={fetchCustomer}
                      onChange={handleCustomerChange}
                      data={customerData}
                      loading={fetchingCustomer}
                      mode='multiple'
                    />
                  </Form.Item>
                </Col>
              )}

              {targetType === 'userSegments' && userType === 'countries' && (
                <Col span={12}>
                  <Form.Item
                    label='Select Country'
                    rules={[{ required: true, message: 'Country is required' }]}
                    name='countries'
                  >
                    <CustomSelect
                      value={countryValue}
                      data={countryData}
                      onChange={handleCountrySelect}
                      filterOption={(input, option) =>
                        option.props.children
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0 ||
                        option.props.value
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      mode='multiple'
                    />
                  </Form.Item>
                </Col>
              )}

              {targetType === 'afterEvents' && (
                <Col span={12}>
                  <FormItem label='Trigger' name='events'>
                    <CustomSelect
                      value={eventsValue}
                      // onSearch={fetchCustomer}
                      // onChange={handleEventChange}
                      data={trigger_options}
                      // loading={fetchingCustomer}
                      mode='multiple'
                    />
                  </FormItem>
                </Col>
              )}
              {targetType === 'userInterest' && (
                <Col span={11}>
                  <Form.Item
                    label='Select User Group for campaign'
                    name='user_groups'
                  >
                    <CustomSelect
                      mode='tags'
                      value={userGroupValue}
                      onSearch={fetchUserGroup}
                      onChange={handleUserGroupChange}
                      data={userGroupData}
                    />
                  </Form.Item>
                </Col>
              )}
              {targetType === 'userInterest' && (
                <Col span={11} offset={1}>
                  <Form.Item name='tag_ids' label='Select tags for campaign'>
                    <CustomSelect
                      value={tagValue}
                      loading={fetchingTag}
                      onSearch={handleTagSearch}
                      // onChange={handleTagChange}
                      data={tagData}
                      mode='multiple'
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>

            <Row>
              <Col span={11}>
                <Form.Item
                  label='Time Zone'
                  rules={[
                    {
                      required: true,
                      message: 'Campaign Category is required',
                    },
                  ]}
                  name='timezone'
                >
                  <CustomSelect
                    // value={timeZoneValue}
                    data={timeZoneData}
                    filterOption={(inputValue, option) =>
                      option.props.children
                        .toString()
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) >= 0 ||
                      option.props.value
                        .toString()
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) >= 0
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={8} offset={1}>
                {campaignType === 'EmailCampaign' ? (
                  <Form.Item
                    label='Template'
                    name='template'
                    className='form__upload__item'
                  >
                    <Upload
                      beforeUpload={(file) => handleFileUpload(file)}
                      defaultFileList={defaultTrackFileList}
                      onRemove={(file) => removeUploadedFile(file)}
                    >
                      <Button className='form__upload-btn'>
                        <UploadOutlined /> Upload Template
                      </Button>
                    </Upload>

                    {initialValues &&
                    initialValues.template_url &&
                    !template ? (
                      // <EyeOutlined
                      //   onClick={ ()=>openTemplateModal(initialValues.id)  }
                      //   style={{color : '#1890ff'}}
                      //   className="template__preview__icon"
                      // />
                      <Button
                        onClick={() => openTemplateModal(initialValues.id)}
                        className='template__preview__btn'
                      >
                        Preview Template
                      </Button>
                    ) : null}
                  </Form.Item>
                ) : (
                  <React.Fragment>
                    <Form.Item label='Push Notification Image' name='image'>
                      <Upload
                        beforeUpload={(file) => handleImageUpload(file)}
                        image
                      >
                        <Button>
                          <UploadOutlined /> Image
                        </Button>
                      </Upload>
                    </Form.Item>
                    {action === 'edit' ? (
                      initialValues.image_url ? (
                        <img
                          src={initialValues.image_url}
                          className='image-table-large my-2'
                        />
                      ) : (
                        <span className='text-muted'>
                          No display image found
                        </span>
                      )
                    ) : (
                      <></>
                    )}
                  </React.Fragment>
                )}
              </Col>
            </Row>
          </div>

          {campaignType === 'PushNotificationCampaign' && (
            <Row>
              <Col span={3}>
                <Form.Item
                  label='Message Type'
                  name='message_type'
                  rules={[
                    { required: true, message: 'Message type is required' },
                  ]}
                >
                  <Select onChange={handleLinkTypeChange}>
                    <Option value='nav'>Nav</Option>
                    <Option value='external_link'>External Link</Option>
                    <Option value='message'>Message</Option>
                  </Select>
                </Form.Item>
              </Col>
              {linkType === 'nav' && (
                <Col span={7} offset={1}>
                  <Form.Item label='Navigation type' name='navigation_type'>
                    <Select onChange={handleNavTypeFetch}>
                      {NavTypeOptions}
                    </Select>
                  </Form.Item>
                </Col>
              )}
              {linkType === 'nav' && (
                <Col span={12} offset={1}>
                  <Form.Item label='Navigation Reference' name='link'>
                    <CustomSelect
                      value={linkValue}
                      onSearch={fetchLink}
                      onChange={handleLinkChange}
                      loading={fetchingLink}
                      data={linkData}
                      disabled={
                        navType === 'single_player' ||
                        navType === 'playlist_page' ||
                        navType === 'genre_songs_page' ||
                        navType === 'album_songs_page'
                          ? false
                          : true
                      }
                    />
                  </Form.Item>
                </Col>
              )}
              {linkType !== 'nav' && linkType && (
                <Col span={20} offset={1}>
                  <Form.Item
                    label='Payload'
                    name='payload'
                    rules={[
                      {
                        type: linkType === 'external_link' ? 'url' : 'string',
                        message:
                          linkType === 'external_link'
                            ? 'This must be a link'
                            : 'Payload is required',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              )}
            </Row>
          )}

          <div className='col-lg-6'>
            <Form.Item
              label='Active/Inactive'
              name='status'
              valuePropName='checked'
            >
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
            </Form.Item>
          </div>

          <Divider dashed className='header-title'>
            Automated Messages{' '}
          </Divider>

          <DynamicField
            wait_options={wait_options}
            sequences={sequencesValues}
          />

          <Button
            // shape="round"
            size='large'
            type='primary'
            block
            htmlType='submit'
            disabled={buttonDisable}
          >
            Submit
          </Button>
        </Form>

        <Modal
          title='Template'
          visible={showModal}
          onCancel={closeTemplateModal}
          footer={null}
          className='template__preview__modal'
        >
          {modalDataLoading ? (
            <div className='template__spinner '>
              <Spin tip='Loading...' />
            </div>
          ) : (
            <div
              dangerouslySetInnerHTML={createTemplateMarkup(modalPreviewData)}
            ></div>
          )}
        </Modal>
      </React.Fragment>
    </CustomLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    campaign: state.Campaign.campaign,
    tagData: state.Tag.data,
  };
};

export default connect(mapStateToProps)(withRouter(CampaignForm));
