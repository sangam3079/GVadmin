import React, {useState} from 'react'
import {Tabs, Typography,Tag,Pagination,Table} from 'antd'
//import { Table } from 'reactstrap'
import { CheckCircleTwoTone,CloseCircleTwoTone, CheckCircleOutlined, CloseCircleOutlined,AndroidFilled, AppleFilled } from '@ant-design/icons';
import AntTable from 'cleanComponents/Table/Table';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import {
    setUserGroupsCampaign,
    setUserGroupsCampaignCurrentpage,
    setUserGroupsCampaignKeyword,
  } from 'store/actions/UserCampaign/UserGroupsCampaignAction';

import { getSorterObject } from 'utils/helpers';  

const { TabPane } = Tabs;

const {Text} = Typography;

const UserGroupsDetails = ({userGroupsData,currentPage, dispatch,total}) => {

    const userGroups = userGroupsData || {};
    const { id, title, user_ids, users, created_at} = userGroupsData;

    const [sort, setSort] = useState();


    console.log(userGroupsData);

    const handleTableChange = (pagination, filter, sorter) => {
        if (pagination.current !== currentPage) {
          dispatch(setUserGroupsCampaignCurrentpage(pagination.current));
        } 
        if (sorter) {
          let new_sort = getSorterObject(sorter);
          setSort(new_sort);
        } 
      };


    return (
        <div className='card'>         
          <div className="row border-bottom" style={{margin:8}}>
              <div className='col-lg-3'><h3>User Id</h3></div>
              <div className='col-lg-4'><h3>User Email</h3></div>
              <div className='col-lg-4'><h3>User Name</h3></div>
          </div>
          <div>
              {users.map((user) => {
                  return (  
                          <div className="row border-bottom" style={{margin:10}}>
                              <div className='col-lg-3' >
                                  {user.id}
                              </div>    
                              <div className='col-lg-4'>
                                  {user.email}
                              </div>
                              <div className='col-lg-4'>
                                  {user.full_name}
                              </div>
                          </div> 
                  )
              })}
          
            <Pagination 
              //defaultCurrent={1} 
              pageSize={10}
              total={total}
              current= {currentPage}
              showSizeChanger={false}
              style={{display:'flex' ,justifyContent:'flex-end'}}
            /> 
        </div>    
      </div>    
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

export default connect(mapStateToProps)(withRouter(UserGroupsDetails));

//export default UserGroupsDetails
