import React, { useState, useEffect } from 'react';
import CustomLayout from '../CustomLayout/CustomLayout';
import Header from 'components/Header/Header';
import { Button, Divider, Modal, Tag, Spin, Alert } from 'antd';
import { connect } from 'react-redux';
import {
  EyeOutlined,
  PlusCircleFilled,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from '@ant-design/icons';
import { withRouter, Link } from 'react-router-dom';
import AntTable from 'cleanComponents/Table/Table';
import { getAllCampaign, deleteCampaign } from 'services/campaign';

import {
  setCampaign,
  setCampaignCurrentpage,
  setCampaignKeyword,
} from 'store/actions/Campaign/CampaignAction';

import Moment from 'moment';
import Placeholder from 'assets/images/placeholder-image.png';
import { getSorterObject } from 'utils/helpers';
import { customFetch } from 'utils';
import cookie from 'utils/cookie';

const Campaign = ({
  history,
  campaignData,
  dispatch,
  total,
  currentPage,
  keyword,
}) => {
  const { confirm } = Modal;
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState({});
  const [sort, setSort] = useState();
  const [prevCampaignKeyword, setPrevCampaignKeyword] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [modalTemplateUrl, setModalTemplateUrl] = useState();
  const [modalPreviewData, setModalPreviewData] = useState(undefined);
  const [modalDataLoading, setModalDataLoading] = useState(false);
  // const [showIframe, setShowIframe] = useState();

  const token = cookie.getToken();

  const navigate = () => {
    dispatch(setCampaign({}));
    history.push('/campaign/new');
  };

  useEffect(() => {
    if (!campaignData.length) {
      fetchCampaign();
    } else {
      handleCallback();
    }
  }, []);

  const handleCallback = () => {
    setLoading(false);
    setFetching(false);
  };

  const handleDateFilter = (value) => {
    setDateFilter(value);
    // setCurrentPage(1)
  };

  const fetchCampaign = (pageParam, filterParam, sortParam) => {
    setPrevCampaignKeyword(keyword);

    let defaultFilter = {
      keyword,
      date_from: dateFilter.date_from,
      date_to: dateFilter.date_to,
    };
    let params = {
      page: keyword ? 1 : pageParam || currentPage || 1,
      per_page: 10,
      filter: filterParam || defaultFilter,
      sort: sortParam || sort,
    };

    setFetching(true);

    dispatch(
      getAllCampaign({ params, callback: handleCallback, prevCampaignKeyword })
    );
  };

  const handleTableChange = (pagination, filter, sorter) => {
    if (pagination.current !== currentPage) {
      dispatch(setCampaignCurrentpage(pagination.current));
    }
    if (sorter) {
      let new_sort = getSorterObject(sorter);
      setSort(new_sort);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, [keyword, dateFilter, sort, currentPage]);

  const handleEditCampaign = (id, obj) => {
    dispatch(setCampaign(obj));
    history.push(`/campaign/${id}/edit`);
  };

  function showDeleteConfirm(id) {
    confirm({
      title: 'Are you sure to delete this notification?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteThisCampaign(id);
      },
      onCancel() {},
    });
  }

  const deleteThisCampaign = (id) => {
    setFetching(true);
    dispatch(deleteCampaign({ id, callback: handleDeleteCallback }));
  };

  const handleDeleteCallback = () => {
    setFetching(false);
  };

  const openTemplateModal = (row) => {
    fetchTemplatePreview(row.id);
    // setModalTemplateUrl(template_url);
    setShowModal(true);
    setModalDataLoading(true);
    // setFetching(true);
  };

  const createTemplateMarkup = (previewData) => {
    return {
      __html: previewData,
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
      // setShowModal(true);
      setModalDataLoading(false);
    }
  };

  const closeTemplateModal = () => {
    setShowModal(false);
  };

  const columns = [
    {
      title: 'Title',
      width: 200,
      dataIndex: 'title',
      key: 'title',
      sorter: true,
      render: (title) => {
        return <span className='text-capitalize'>{title}</span>;
      },
    },
    {
      title: 'Sequences',
      width: 50,
      dataIndex: 'sequences',
      key: 'sequences',
      // sorter : true,
      render: (text) => {
        return (
          <span className='text-capitalize'>
            {text && Object.keys(text).length}
          </span>
        );
      },
    },
    {
      title: 'Campaign Category Users',
      width: 150,
      dataIndex: 'campaign_category_users',
      key: 'campaign_category_users',
      // sorter : true,
      render: (text) => {
        return (
          <span className='text-capitalize'>
            {text && Object.keys(text).length}
          </span>
        );
      },
    },
    {
      title: 'Category',
      width: 100,
      dataIndex: 'category',
      key: 'category',
      render: (text) => {
        return <Tag>{text}</Tag>;
      },
    },
    {
      title: 'Template',
      width: 50,
      dataIndex: 'template_url',
      key: 'template_url',
      sorter: true,
      render: (text, row) => {
        return (
          <span className='text-capitalize'>
            {text ? (
              <>
                <EyeOutlined
                  onClick={() => openTemplateModal(row)}
                  style={{ color: '#1890ff' }}
                />
              </>
            ) : (
              <CloseCircleTwoTone twoToneColor='red' />
            )}
          </span>
        );
      },
    },
    {
      title: 'User Type',
      width: 110,
      dataIndex: 'user_type',
      key: 'user_type',
      render: (text) => {
        return <Tag>{text ? text : 'N/A'}</Tag>;
      },
    },
    {
      title: 'Campaign Type',
      width: 210,
      dataIndex: 'type',
      key: 'type',
      sorter: true,
      render: (text) => {
        return (
          <Tag>
            {text === 'EmailCampaign'
              ? 'Email Campaign'
              : 'Push Notification Campaign'}
          </Tag>
        );
      },
    },
    {
      title: 'Status',
      width: 100,
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        return (
          <span>
            {text === 'active' ? (
              <Tag color='green'>active</Tag>
            ) : (
              <Tag color='red'>inactive</Tag>
            )}
          </span>
        );
      },
    },
    {
      title: 'Created At',
      width: 100,
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Action',
      render: (field, row) => {
        return (
          <div className='d-flex'>
            <Link to='#' onClick={() => handleEditCampaign(row.id, row)}>
              <EditOutlined className='text-primary' />
            </Link>
            <Divider type='vertical' />
            <Link to='#' onClick={() => showDeleteConfirm(row.id)}>
              <DeleteOutlined className='text-danger' />
            </Link>
          </div>
        );
      },
    },
  ];

  const handleKeywordFilter = (value) => {
    dispatch(setCampaignKeyword(value));
  };

  return (
    <CustomLayout sidebarSelectionKey='campaign'>
      <div className='card'>
        <Header
          handleDateFilter={handleDateFilter}
          handleKeywordFilter={handleKeywordFilter}
          keywordValue={keyword}
          // title="Push Notification"
          // subtitle="List of all push notifications"
          button={
            <Button onClick={navigate} type='primary'>
              <span className='px-2'>
                <PlusCircleFilled />
              </span>
              New Campaign
            </Button>
          }
        />
        <div style={{ width: '100%' }} className='card-body'>
          <AntTable
            columns={columns}
            dataSource={campaignData}
            pagination={{
              pageSize: '10',
              total: total,
              showSizeChanger: false,
              current: currentPage,
            }}
            onChange={handleTableChange}
            loading={fetching}
            scroll={{ x: 1320 }}
          />
          <Modal
            title='Template'
            visible={showModal}
            onCancel={closeTemplateModal}
            footer={null}
            className='template__preview__modal'
          >
            {/* 
                                    <div className="iframe__wrapper">
                                        <iframe 
                                                // src={modalTemplateUrl?modalTemplateUrl:null}                                     
                                                src={modalPreviewData?modalPreviewData:null}                                     
                                                // style={showIframe}
                                                width="450" 
                                                height="500"
                                                className="iframe__template"
                                        >                                
                                        </iframe>  
                                    </div>                                                   
                                */}
            {modalDataLoading ? (
              <div className='template__spinner '>
                <Spin tip='Loading...' />
              </div>
            ) : (
              <div
                dangerouslySetInnerHTML={createTemplateMarkup(modalPreviewData)}
              ></div>
            )}

            {/* <div  dangerouslySetInnerHTML={createTemplateMarkup(modalPreviewData)}></div> */}
          </Modal>
        </div>
      </div>
    </CustomLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    campaignData: state.Campaign.data,
    currentPage: state.Campaign.currentPage,
    total: state.Campaign.total,
    keyword: state.Campaign.keyword,
  };
};

export default connect(mapStateToProps)(withRouter(Campaign));
