import React,{useState,useEffect} from 'react'
import CustomLayout from '../CustomLayout/CustomLayout'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getAllUserGroupsCampaign, } from 'services/userCampaign';
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

const UserGroupsCampaign =({history,campaignData,dispatch,total,currentPage,keyword,}) => {

  const [prevUserGroupsCampaignKeyword, setPrevUserGroupsCampaignKeyword] = useState(undefined);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState({});
  const [sort, setSort] = useState();

  const token = cookie.getToken();

  const navigate = () => {
    dispatch(setUserGroupsCampaign({}));
    history.push('/userCampaign');
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

  
  const columns = [
    {
      title: 'Title',
    
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
            let color= user_id.length < 3 ? 'yellow' : 'red'
            return (
              <Tag color={color} style={{borderRadius:10}}>
                  {user_id}
              </Tag>
            )
          })}
        </span>
      )
    },
    {
      title: "users",
      dataIndex:"users",
      key:'users',
      render : (users) => (
        <span>
          {users.map((user) => {
            return (
              <ul>
                <li>{user.id}</li>
                <li>{user.email}</li>
                <li>{user.full_name}</li>
              </ul> 
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
      title : 'User Details',
      
      render : () => {
          return (
            <div>
              <IdcardOutlined 
                  //onClick={showModal}
                  style={{color : '#1890ff'}}
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
                New UserGroupCampaign
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

