import React,{useState,useEffect} from 'react'
import CustomLayout from '../CustomLayout/CustomLayout'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getAllUserGroupsCampaign, deleteUserGroupsCampaign } from 'services/userCampaign';
import AntTable from 'cleanComponents/Table/Table';
import Header from 'components/Header/Header';
import { Button, Divider, Modal, Tag, Spin, Alert } from 'antd';
import {
  EyeOutlined,
  PlusCircleFilled,
  IdcardOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from '@ant-design/icons';

import {
    setUserGroupsCampaign,
    setUserGroupsCampaignCurrentpage,
    setUserGroupsCampaignKeyword,
  } from 'store/actions/UserCampaign/UserGroupsCampaignAction';

import { getSorterObject } from 'utils/helpers';
import { customFetch } from 'utils';
import cookie from 'utils/cookie';  
import UserGroupsDetails from './UserGroupsDetails';

const UserGroupsCampaign =({history,campaignData,dispatch,total,currentPage,keyword,}) => {

  const { confirm } = Modal;
  const [prevUserGroupsCampaignKeyword, setPrevUserGroupsCampaignKeyword] = useState(undefined);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState({});
  const [sort, setSort] = useState();

  const token = cookie.getToken();

  const [showModal, setShowModal] = useState(false)
  const [selectedUserGroups,setSelectedUserGroups] = useState({});

  const onOpenModal = (row) => {
    console.log(row);
    setSelectedUserGroups(row);
    setShowModal(true);
  }

  const onCloseModal = () => {
      setShowModal(false);
      setSelectedUserGroups({selectedCustomer : undefined});
  }

  

  const navigate = () => {
    dispatch(setUserGroupsCampaign({}));
    history.push('/UserGroups/new');
  };

  useEffect(() => {
    if (!campaignData.length) {
      console.log(campaignData);
      fetchUserGroupsCampaign();
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

  const fetchUserGroupsCampaign = (pageParam, filterParam, sortParam) => {
    setPrevUserGroupsCampaignKeyword(keyword);

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
      getAllUserGroupsCampaign({ params, callback: handleCallback, prevUserGroupsCampaignKeyword })
    );
  };

  const handleTableChange = (pagination, filter, sorter) => {
    if (pagination.current !== currentPage) {
      dispatch(setUserGroupsCampaignCurrentpage(pagination.current));
    } 
    if (sorter) {
      let new_sort = getSorterObject(sorter);
      setSort(new_sort);
    } 
  };

  useEffect(() => {
    fetchUserGroupsCampaign();
  }, [keyword, dateFilter, sort, currentPage]);

  const handleEditCampaign = (id, obj) => {
    dispatch(setUserGroupsCampaign(obj));
    history.push(`/UserGroups/${id}/edit`);
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
    dispatch(deleteUserGroupsCampaign({ id, callback: handleDeleteCallback }));
  };

  const handleDeleteCallback = () => {
    setFetching(false);
  };

  

  
  const columns = [
    {
      title: 'Groups Title',
    
      dataIndex: 'title',
      key: 'title',
      sorter: true,
      render: (title) => {
        return <span className='text-capitalize'>{title}</span>;
      }
    },
    {
      title:'User Id',
    
      dataIndex:'user_ids',
      key:'user_ids',
      render : (user_ids) => (
        <span>
          {user_ids.map((user_id) => {
            
            return (
              <Tag color='green' style={{borderRadius:7}}>
                  {user_id}
              </Tag>
            )
          })}
        </span>
      )
    },
    {
      title: 'Created At',
    
      dataIndex: 'created_at',
      key: 'created_at',
    },
    { 
      title : 'Options',
      dataIndex : 'options',
      key : 'options',
      render : (record, row) => {
          return (
            <div > 
              <Link to='#' onClick={() => handleEditCampaign(row.id, row)}>
                <EditOutlined className='text-primary' />
              </Link> 
              <Divider type='vertical' /> 
              <Link to='#' onClick={() => showDeleteConfirm(row.id)}>
                <DeleteOutlined className='text-danger' />
              </Link> 
              <Divider type='vertical' />
              <IdcardOutlined 
                  onClick={ ()=>onOpenModal(row)  } 
                  style={{color : '#1890ff',alignItems:'center'}}
              />
              
            </div>
          );
      }
    }      
  ] 


  const handleKeywordFilter = (value) => {
    dispatch(setUserGroupsCampaignKeyword(value));
  };
  


  return (
      <CustomLayout>
        <div className='card'>
          <Header
            handleDateFilter={handleDateFilter}
            handleKeywordFilter={handleKeywordFilter}
            keywordValue={keyword}
            button={
              <Button onClick={navigate} type='primary'>
                <span className='px-2'>
                  <PlusCircleFilled />
                </span>
                New Groups
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
              //scroll={{ x: 1320 }}
            />
            <Modal
              title="User Groups Details"
              closable={true}
              onCancel={onCloseModal}
              visible={showModal}
              width={750}
              centered={true}
              destroyOnClose={true}
              
              //className="drawer-body-padding-none"
              footer={false}
            >
              <UserGroupsDetails userGroupsData={selectedUserGroups} />
            </Modal>
           </div>
          
        </div>  
      </CustomLayout>
  )
  
}

const mapStateToProps = (state) => {
    return {
      campaignData: state.UserGroupsCampaign.data,
      currentPage: state.UserGroupsCampaign.currentPage,
      total: state.UserGroupsCampaign.total,
      keyword: state.UserGroupsCampaign.keyword,
    };
  };

export default connect(mapStateToProps)(withRouter(UserGroupsCampaign));

