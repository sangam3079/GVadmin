import React, { useState, useEffect } from 'react';
import colorStyles from '../../colors';
import {
  Avatar,
  Table,
  Button,
  Typography,
  Tag,
  Divider,
  Tabs,
  Progress,
  Form,
  Row,
  Col,
} from 'antd';

import {
  CheckCircleTwoTone,
  MailOutlined,
  CloseCircleTwoTone,
  CheckCircleOutlined,
  CloseCircleOutlined,
  AndroidFilled,
  AppleFilled,
  MailTwoTone,
  LoginOutlined,
  GoogleSquareFilled,
  FacebookFilled,
  MailFilled,
  CompassOutlined,
  CompassTwoTone,
  UserOutlined,
  EnvironmentTwoTone,
  EnvironmentFilled,
  WomanOutlined,
  ManOutlined,
} from '@ant-design/icons';

import CustomSelect from '../Notifications/CustomSelect';
import { customFetch } from 'utils';
import cookie from 'utils/cookie';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateCustomer } from 'services/customers';

const { Text } = Typography;
const { TabPane } = Tabs;

const CustomerDetails = ({ subject, dispatch }) => {
  const customer = subject || {};
  const {
    full_name,
    id,
    email,
    address,
    city,
    state,
    country,
    device,
    paid,
    free_trail,
    login_type,
    admin,
    user_image,
    active,
    downloads,
    created_at,
    plan,
    status,
    password_set,
    settings,
    dob,
    confirmed_at,
    confirmed,
    disabled,
    deactivated,
    deactivated_reason,
    level,
    active_session,
    play_histories,
    tags,
    tag_groups,
    favourite_playlists,
    favourite_tracks,
    subscriptions,
    devices,
    active_days,
    gender,
    user_groups,
  } = customer;

  const [form] = Form.useForm();
  const token = cookie.getToken();

  const [userGroupData, setUserGroupData] = useState([]);
  const [fetchingUserGroup, setFetchingUserGroup] = useState(false);
  const [userGroupValue, setUserGroupValue] = useState([]);
  const [updating, setUpdating] = useState(false);

  const setUserGroups = () => {
    if (user_groups && user_groups.length !== 0) {
      setUserGroupData(user_groups);
    }
  };

  useEffect(() => {
    setUserGroups();
  }, [customer]);

  console.log(customer);

  // styles
  const displayFlex = {
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems:'center',
  };

  const noDataStyle = {
    color: '#afafafed',
    textAlign: 'left',
    fontSize: '17px',
  };

  const dateTagStyle = {
    fontSize: '0.83em',
    color: '#969696',
    background: '#f1f1f1',
    fontWeight: '400',
    border: 'none',
  };

  const checkedStyle = {
    fontSize: '1.3em',
  };

  const titleStyle = {
    fontSize: '1.1em',
    color: '#3e3e3e',
  };

  const notAvailableStyle = {
    borderRadius: '50%',
    fontSize: '11px',
    background: '#fff',
    color: '#b9b9b9',
    borderRadius: '#b9b9b9',
  };

  const mainTitleStyle = {
    fontSize: '2em',
    fontWeight: '600',
    marginBottom: '0px',
    color: '#4a4a4a',
  };

  let activeuser = true;

  const subscriptionsData = subscriptions
    ? subscriptions.map((subscription) => {
        return {
          id: subscription.id,
          details: {
            package_name: subscription.package_name
              ? subscription.package_name
              : null,
            product_id: subscription.product_id
              ? subscription.product_id
              : null,
            order_id: subscription.order_id ? subscription.order_id : null,
            purchase_time: subscription.purchase_time
              ? subscription.purchase_time
              : null,
            subscription_plan: subscription.subs ? subscription.subs : null,
            created_at: subscription.created_at
              ? subscription.created_at
              : null,
            expiry_date: subscription.expiry_date
              ? subscription.expiry_date
              : null,
            days_until_expiry:
              subscription.days_until_expiry ||
              subscription.days_until_expiry === 0
                ? subscription.days_until_expiry
                : null,
            transaction_date_utc: subscription.transaction_date_utc
              ? subscription.transaction_date_utc
              : null,
          },
        };
      })
    : null;

  const downloadsData = downloads
    ? downloads.map((download) => {
        return {
          id: download.id,
          details: {
            status: download.status,
            started_at: download.started_at,
            name: download.name ? download.name : null,
          },
        };
      })
    : null;

  const playHistoryData = play_histories
    ? play_histories.map((playHistory) => {
        return {
          id: playHistory.id,
          details: {
            name: playHistory.track_name,
            created_at: playHistory.created_at,
            ended_at: playHistory.ended_at,
          },
        };
      })
    : null;

  const favouriteTracksData = favourite_tracks
    ? favourite_tracks.map((favouriteTrack) => {
        return {
          id: favouriteTrack.id,
          details: {
            name: favouriteTrack.name,
            created_at: favouriteTrack.created_at,
          },
        };
      })
    : null;

  const favouritePlaylistsData = favourite_playlists
    ? favourite_playlists.map((favouritePlaylist) => {
        return {
          id: favouritePlaylist.id,
          details: {
            name: favouritePlaylist.title,
            created_at: favouritePlaylist.created_at,
          },
        };
      })
    : null;

  const noDataToShow = <p style={noDataStyle}>Sorry no data to show</p>;

  const downloadsColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      return: (id) => (id ? id : 'N/A'),
    },
    {
      title: 'Subscription Details',
      dataIndex: 'details',
      key: 'customer_details',
      render: (details) => {
        let { name, started_at, status } = details;
        return (
          <>
            <div style={displayFlex}>
              <span style={titleStyle}> {name} </span>
              <span>
                {status === 'finished' ? (
                  <Tag icon={<CheckCircleOutlined />} color='success'>
                    finished
                  </Tag>
                ) : (
                  <Tag icon={<CloseCircleOutlined />} color='error'>
                    cancelled
                  </Tag>
                )}
              </span>
            </div>
            <p style={{ marginBottom: '0px', marginTop: '4px' }}>
              {started_at ? (
                <Tag style={dateTagStyle} title='Download Started Date'>
                  <span>{started_at}</span>
                </Tag>
              ) : null}
            </p>
          </>
        );
      },
    },
  ];

  const subscriptionsColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      return: (id) => (id ? id : 'N/A'),
    },
    {
      title: 'Subscriptions Details',
      dataIndex: 'details',
      key: 'subscription_details',
      render: (details) => {
        let {
          package_name,
          created_at,
          product_id,
          order_id,
          purchase_time,
          subscription_plan,
          expiry_date,
          days_until_expiry,
          transaction_date_utc,
        } = details;
        return (
          <>
            <div style={displayFlex}>
              <span style={titleStyle}>
                {' '}
                {package_name ? (
                  package_name
                ) : (
                  <span className='low-emphasis'>[package name not found]</span>
                )}{' '}
              </span>
              <span>
                <Tag color='#ff5353'>{days_until_expiry} days left</Tag>
              </span>
            </div>
            <p style={{ marginBottom: '0px', marginTop: '4px' }}>
              {created_at ? (
                <Tag style={dateTagStyle} title=' Subscription Created Date'>
                  <span>{created_at}</span>
                </Tag>
              ) : null}
            </p>
          </>
        );
      },
    },
  ];

  const playHistoryColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (id ? id : 'N/A'),
    },
    {
      title: 'Play History Details',
      dataIndex: 'details',
      key: 'play_history_details',
      render: (details) => {
        let { name, created_at, ended_at } = details;
        return (
          <>
            <div style={displayFlex}>
              <span style={titleStyle}> {name} </span>
              <span>
                {ended_at ? (
                  <CheckCircleTwoTone
                    twoToneColor='#52c41a'
                    title='play history ended : true'
                    style={checkedStyle}
                  />
                ) : (
                  <Tag
                    style={notAvailableStyle}
                    title='play history ended at not available'
                  >
                    N/A
                  </Tag>
                )}
              </span>
            </div>
            <p style={{ marginBottom: '0px', marginTop: '4px' }}>
              {created_at ? (
                <Tag style={dateTagStyle} title='Play history created date'>
                  <span>{created_at}</span>
                </Tag>
              ) : null}
            </p>
          </>
        );
      },
    },
  ];

  const favouriteTracksColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (id ? id : 'N/A'),
    },
    {
      title: 'Favourite Tracks Details',
      dataIndex: 'details',
      key: 'favourite_tracks_details',
      render: (details) => {
        let { name, created_at } = details;
        return (
          <>
            <div style={displayFlex}>
              <span style={titleStyle}> {name} </span>
            </div>
            <p style={{ marginBottom: '0px', marginTop: '4px' }}>
              {created_at ? (
                <Tag style={dateTagStyle} title='favourite tracks created date'>
                  <span>{created_at}</span>
                </Tag>
              ) : null}
            </p>
          </>
        );
      },
    },
  ];

  const favouritePlaylistsColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (id ? id : 'N/A'),
    },
    {
      title: 'Favourite Playlist Details',
      dataIndex: 'details',
      key: 'favourite_playlists_details',
      render: (details) => {
        let { name, created_at } = details;
        return (
          <>
            <div style={displayFlex}>
              <span style={titleStyle}> {name ? name : null} </span>
            </div>
            <p style={{ marginBottom: '0px', marginTop: '4px' }}>
              {created_at ? (
                <Tag style={dateTagStyle} title='favourite tracks created date'>
                  <span>{created_at}</span>
                </Tag>
              ) : null}
            </p>
          </>
        );
      },
    },
  ];

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

  const handleUserGroupChange = (value) => {
    console.log('usergroup change', value);
    setUserGroupValue(value.value);
    setFetchingUserGroup(false);
  };

  useEffect(() => {
    fetchUserGroup('');
  }, []);

  const handleFormSubmit = (values) => {
    console.log('form values  ', values);

    let user_groups = [];

    if (values.user_groups) {
      user_groups = values.user_groups.map((userGroup) => {
        return userGroup.label;
      });
    }

    let data = {
      ...values,
      user_groups: user_groups,
      //   countries:countries,
      //   user_ids:user_ids,
      //   tag_ids:tag_ids,
      //   events:events,
      //   template,
    };

    console.log('submit data', data);

    const handleCallback = () => {
      setUpdating(false);
      //   history.push("/email");
    };

    let formData = new FormData();

    Object.keys(data).forEach((key) => {
      console.log(key);
      if (Array.isArray(data[key])) {
        if (data[key].length === 0) {
          formData.append(`${key}[]`, '');
        } else {
          data[key].forEach((item, index) => {
            formData.append(`${key}[]`, data[key][index]);
            console.log(`${key}[]`, data[key][index]);
          });
        }
      }
    });

    setUpdating(true);
    console.log(id);
    dispatch(updateCustomer({ id, body: formData, callback: handleCallback }));
  };

  const setFormInitialValues = () => {
    // check for tags too when tags are to be updated added
    if (user_groups && user_groups.length !== 0) {
      console.log('user_groups', user_groups);
      let user_groups_formatted = [];
      if (user_groups) {
        user_groups.forEach((userGroup) => {
          console.log('userGroup', userGroup);
          let obj = {
            label: userGroup.title,
            key: userGroup.id,
            value: userGroup.id,
          };
          user_groups_formatted.push(obj);
        });
      }
      setUserGroupValue(user_groups_formatted);

      form.setFieldsValue({
        user_groups: user_groups_formatted,
      });
    }
  };

  useEffect(() => {
    setFormInitialValues();
  }, [customer]);

  return (
    <div className='tab-body-with-padding'>
      <Tabs size='small' type='card' className=''>
        <TabPane tab='Basic Info' key='1'>
          <div className='d-flex justify-content-center position-relative'>
            {<Avatar size={240} src={user_image ? user_image : null} />}
            <Tag
              color='purple'
              className='user-level'
              title={`User Level: ${level}`}
            >
              {level}
            </Tag>
          </div>

          <div className='text-center' style={{ marginTop: '15px' }}>
            <p style={mainTitleStyle}>
              <span style={{ position: 'relative' }}>
                <span
                  className={active ? 'user--online' : 'user--offline'}
                  title={
                    active
                      ? 'Online Now'
                      : status
                      ? `Offline | Last seen online : ${status}`
                      : `last seen online : N\\A`
                  }
                />
                <span>{full_name || 'Name Not Found'}</span>

                {gender ? (
                  <>
                    <Divider type='vertical' />
                    {console.log(typeof gender)}

                    {gender === 'Male' ? (
                      <span>
                        <ManOutlined
                          style={{ color: colorStyles.userIcons }}
                          className='customer-gender'
                          title='Gender:Male'
                        />
                      </span>
                    ) : gender === 'Female' ? (
                      <span>
                        <WomanOutlined
                          style={{ color: colorStyles.userIcons }}
                          className='customer-gender'
                          title='Gender:Female'
                        />
                      </span>
                    ) : (
                      <span className='gender-others' title='Gender:Others'>
                        <span className='gender-others__male'>
                          <ManOutlined
                            style={{ color: colorStyles.userIcons }}
                          />
                        </span>
                        <span className='gender-others__female'>
                          <WomanOutlined
                            style={{ color: colorStyles.userIcons }}
                          />
                        </span>
                      </span>
                    )}
                  </>
                ) : (
                  ''
                )}
              </span>
            </p>
            <div className='text-secondary'>
              <span>
                <span> {email || 'Email not available'} </span>

                {login_type ? <Divider type='vertical' /> : ''}

                {login_type === 'email' ? (
                  <span
                    title={
                      confirmed
                        ? `Login type: ${login_type} & Email verified: true `
                        : `Login type: ${login_type} & Email verified: false `
                    }
                  >
                    {confirmed ? (
                      <span style={{ position: 'relative', fontSize: '14px' }}>
                        <MailTwoTone twoToneColor='#d277ff' />
                        <span
                          style={{
                            position: 'absolute',
                            bottom: '-3px',
                            left: '10px',
                            fontSize: '8px',
                          }}
                        >
                          <CheckCircleTwoTone twoToneColor='#52c41a' />
                        </span>
                      </span>
                    ) : (
                      <span style={{ position: 'relative', fontSize: '14px' }}>
                        <MailOutlined twoToneColor='#d277ff' />
                        <span
                          style={{
                            position: 'absolute',
                            bottom: '-3px',
                            left: '10px',
                            fontSize: '8px',
                          }}
                        >
                          <CloseCircleTwoTone twoToneColor='#CC0000' />
                        </span>
                      </span>
                    )}
                  </span>
                ) : login_type === 'facebook' ? (
                  <span title={`Login type: ${login_type}`}>
                    <FacebookFilled style={{ color: colorStyles.userIcons }} />
                  </span>
                ) : login_type === 'google' ? (
                  <span title={`Login type: ${login_type}`}>
                    <GoogleSquareFilled
                      style={{ color: colorStyles.userIcons }}
                    />
                  </span>
                ) : (
                  <span title={`Login type: ${login_type}`}>
                    <AppleFilled style={{ color: colorStyles.userIcons }} />
                  </span>
                )}
              </span>
              <br />
              <span>
                {address || city || state || country ? (
                  <>
                    {(address ? address + ',' : '') +
                      (city ? city + ',' : '') +
                      (state ? state + ',' : '') +
                      (country ? country : '')}
                    <EnvironmentFilled
                      style={{ color: colorStyles.userIcons }}
                      className='mx-1'
                    />
                  </>
                ) : (
                  ''
                )}
              </span>
            </div>
          </div>

          <section>
            <h3 id='profile'>Profile</h3>

            <div className='mb-2'>Date Of Birth : {dob || 'N/A'} </div>
            <div className='mb-2'>
              Payment :{' '}
              {paid ? (
                <Tag color='blue'>paid</Tag>
              ) : (
                <Tag color='red'>not paid</Tag>
              )}
            </div>
            <div className='mb-2'>
              Plan : {plan ? <Tag>{plan}</Tag> : <Tag>not available</Tag>}{' '}
            </div>
            <div className='mb-2'>
              Created At : {created_at || 'N/A'}{' '}
              {active ? (
                <Tag color='green' title=''>
                  {' '}
                  active
                </Tag>
              ) : (
                <Tag title={`Last active:${status}`}> not-active</Tag>
              )}{' '}
            </div>
            <div className='mb-2'>
              Push settings :
              {settings ? (
                <span className='ml-1'>
                  <Tag color={settings.daily_updates_push ? 'blue' : ''}>
                    {settings.daily_updates_push ? (
                      'daily updates'
                    ) : (
                      <del>daily updates</del>
                    )}
                  </Tag>
                  <Tag color={settings.offers_push ? 'blue' : ''}>
                    {settings.daily_updates_push ? 'offers' : <del>offers</del>}
                  </Tag>
                  <Tag color={settings.others_push ? 'blue' : ''}>
                    {settings.daily_updates_push ? (
                      'others '
                    ) : (
                      <del>others</del>
                    )}
                  </Tag>
                </span>
              ) : (
                'N/A'
              )}
            </div>

            <div className='mb-2'>
              Device :{' '}
              {Array.isArray(devices) && devices.length
                ? devices.map((device) => {
                    return (
                      <Tag
                        icon={
                          device.platform === 'android' ? (
                            <AndroidFilled />
                          ) : (
                            <AppleFilled />
                          )
                        }
                        color={device.active ? 'green' : ''}
                        title={
                          (device.created_at
                            ? `Created at: ${device.created_at} `
                            : 'Created at:N/A ') +
                          (device.updated_at
                            ? ` | Updated at: ${device.updated_at} `
                            : ` | Updated at:N/A `) +
                          (device.active
                            ? ' | Device status: Active'
                            : ' | Device status: Inactive')
                        }
                        key={device.id}
                      >
                        {device.name}{' '}
                        {device.version ? (
                          <>
                            <Divider type='vertical' /> {device.version}
                          </>
                        ) : (
                          ' '
                        )}
                      </Tag>
                    );
                  })
                : ' N/A '}
            </div>
            <div className='mb-2'>
              Tags:
              {Array.isArray(tags) && tags.length
                ? tags.map((tag) => {
                    return (
                      <span className='ml-1' key={tag.id}>
                        <Tag key={tag.id}>#{tag.name}</Tag>
                      </span>
                    );
                  })
                : 'N/A'}
            </div>

            <div className='mb-2 section--separate'>
              <Form
                layout='vertical'
                form={form}
                onFinish={handleFormSubmit}
                className=''
              >
                <Row>
                  {/*
                                            <Col span={24} >
                                                <Form.Item
                                                    name="tag_ids"
                                                    label="Select tags for campaign"
                                                >
                                                    <CustomSelect 
                                                        value={tagValue}
                                                        loading={fetchingTag}
                                                        onSearch={handleTagSearch}
                                                        // onChange={handleTagChange}
                                                        data={tagData}
                                                        mode="multiple"
                                                    />
                                                </Form.Item>
                                            </Col>               
                                        */}

                  <Col span={24}>
                    <Form.Item
                      label='Customers User Group: '
                      name='user_groups'
                    >
                      <CustomSelect
                        mode='tags'
                        value={userGroupValue}
                        onSearch={fetchUserGroup}
                        onChange={handleUserGroupChange}
                        data={userGroupData}
                        placeholder='Select a user group for email campaign'
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Button
                  shape='round'
                  size='medium'
                  type='primary'
                  // block
                  htmlType='submit'
                  loading={updating}
                >
                  {updating ? 'Updating...' : 'Update'}
                </Button>
              </Form>
            </div>
          </section>
        </TabPane>
        <TabPane tab='Subscription' key='2'>
          <section>
            {Array.isArray(subscriptions) && subscriptions.length ? (
              <>
                <div style={displayFlex}>
                  <h3 className='d-flex align-self-center m-0'>
                    Subscriptions:
                  </h3>
                  <Button type='primary'>View More</Button>
                </div>
                <Table
                  className='drawerTable my-3'
                  dataSource={subscriptionsData}
                  columns={subscriptionsColumn}
                  pagination={{
                    pageSize: 5,
                    total: subscriptions.length,
                    hideOnSinglePage: false,
                  }}
                />
              </>
            ) : (
              <>
                <div style={displayFlex}>
                  <h3 className='d-flex align-self-center m-0'>
                    Subscriptions:
                  </h3>
                </div>
                {noDataToShow}
              </>
            )}
          </section>
        </TabPane>
        <TabPane tab='Session' key='3'>
          <h4>Active Session:</h4>
          {active_session ? (
            <div>
              <p> Id : {active_session.id ? active_session.id : 'N/A'} </p>
              <p>
                {' '}
                Session Id :{' '}
                {active_session.session_id
                  ? active_session.session_id
                  : 'N/A'}{' '}
              </p>
              <p>
                {' '}
                Started At :{' '}
                {active_session.started_at
                  ? active_session.started_at
                  : 'N/A'}{' '}
              </p>
              <p>
                {' '}
                Ended At :{' '}
                {active_session.ended_at ? active_session.ended_at : 'N/A'}{' '}
              </p>
              <p>
                {' '}
                Duration :{' '}
                {active_session.duration ? active_session.duration : 'N/A'}{' '}
              </p>
              <p>
                {' '}
                Created At :{' '}
                {active_session.created_at
                  ? active_session.created_at
                  : 'N/A'}{' '}
              </p>
              <p>
                {' '}
                Updated At:{' '}
                {active_session.updated_at
                  ? active_session.updated_at
                  : 'N/A'}{' '}
              </p>
            </div>
          ) : (
            <span className='low-emphasis'>[no active session found]</span>
          )}

          <h4>Active Days :</h4>
          {Array.isArray(active_days) && active_days.length ? (
            active_days.map((session) => {
              return <Tag>{session.date}</Tag>;
            })
          ) : (
            <span className='low-emphasis'>no active days/sessions found</span>
          )}
        </TabPane>

        <TabPane tab='Downloads' key='4'>
          <section>
            {Array.isArray(downloads) && downloads.length ? (
              <>
                <div style={displayFlex}>
                  <h3 className='d-flex align-self-center m-0'>Downloads:</h3>
                  <Button type='primary'>View More</Button>
                </div>
                <Table
                  className='drawerTable my-3'
                  dataSource={downloadsData}
                  columns={downloadsColumn}
                  pagination={{
                    pageSize: 5,
                    total: downloads ? downloads.length : null,
                    hideOnSinglePage: true,
                  }}
                />
              </>
            ) : (
              <>
                <div style={displayFlex}>
                  <h3 className='d-flex align-self-center m-0'>Downloads:</h3>
                </div>
                {noDataToShow}
              </>
            )}
          </section>
        </TabPane>
        <TabPane tab='Play History' key='5'>
          <section>
            {Array.isArray(play_histories) && play_histories.length ? (
              <>
                <div style={displayFlex}>
                  <h3 className='d-flex align-self-center m-0'>
                    Play History:
                  </h3>
                  <Button type='primary'>View More</Button>
                </div>
                <Table
                  className='drawerTable my-3'
                  dataSource={playHistoryData}
                  columns={playHistoryColumn}
                  pagination={{
                    pageSize: 5,
                    total: play_histories ? play_histories.length : null,
                    hideOnSinglePage: false,
                  }}
                />
              </>
            ) : (
              <>
                <div style={displayFlex}>
                  <h3 className='d-flex align-self-center m-0'>
                    Play History :
                  </h3>
                </div>
                {noDataToShow}
              </>
            )}
          </section>
        </TabPane>
        <TabPane tab='Favourites' key='6'>
          <section>
            {Array.isArray(favourite_tracks) && favourite_tracks.length ? (
              <>
                <div style={displayFlex}>
                  <h3 className='d-flex align-self-center m-0'>
                    Favourite Tracks:
                  </h3>
                  <Button type='primary'>View More</Button>
                </div>
                <Table
                  className='drawerTable my-3'
                  dataSource={favouriteTracksData}
                  columns={favouriteTracksColumn}
                  pagination={{
                    pageSize: 5,
                    total: favourite_tracks ? favourite_tracks.length : null,
                    hideOnSinglePage: false,
                  }}
                />
              </>
            ) : (
              <>
                <div style={displayFlex}>
                  <h3 className='d-flex align-self-center m-0'>
                    Favourite Tracks:
                  </h3>
                </div>
                {noDataToShow}
              </>
            )}
          </section>

          <section>
            {Array.isArray(favourite_playlists) &&
            favourite_playlists.length ? (
              <>
                <div style={displayFlex}>
                  <h3 className='d-flex align-self-center m-0'>
                    Favourite Playlist:
                  </h3>
                  <Button type='primary'>View More</Button>
                </div>
                <Table
                  className='drawerTable my-3'
                  dataSource={favouritePlaylistsData}
                  columns={favouritePlaylistsColumn}
                  pagination={{
                    pageSize: 5,
                    total: favourite_playlists
                      ? favourite_playlists.length
                      : null,
                    hideOnSinglePage: false,
                  }}
                />
              </>
            ) : (
              <>
                <div style={displayFlex}>
                  <h3 className='d-flex align-self-center m-0'>
                    Favourite Playlist:
                  </h3>
                </div>
                {noDataToShow}
              </>
            )}
          </section>
        </TabPane>
      </Tabs>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    state,
  };
};

export default connect(mapStateToProps)(withRouter(CustomerDetails));
