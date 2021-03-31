import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Tag } from 'antd';

import { getSorterObject } from 'utils/helpers';
import AntTable from 'cleanComponents/Table/Table';
import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinner/Spinner';
import CustomLayout from '../../components/CustomLayout/CustomLayout';
import { getAllInvitations } from 'services/invitations';
import {
  setInvitationsKeyword,
  setInvitationsCurrentpage,
} from 'store/actions/Invitations/InvitationsAction';

const Invitations = React.memo(({ history }) => {
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState();
  const [filter, setFilter] = useState();
  const [prevInvitationKeyword, setPrevInvitationKeyword] = useState(undefined);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.Invitations.data);
  const total = useSelector((state) => state.Invitations.total);
  const keyword = useSelector((state) => state.Invitations.keyword);
  const currentPage = useSelector((state) => state.Invitations.currentPage);

  const columns = [
    {
      title: 'Inviter',
      dataIndex: 'inviter',
      key: 'inviter_email',
      render: ({ email, full_name }) => (
        <>
          <div>{full_name}</div>
          <div>{email}</div>
        </>
      ),
    },
    {
      title: 'Invitee',
      dataIndex: 'email',
      key: 'user_email',
    },
    {
      title: 'Invitation status',
      dataIndex: 'active',
      key: 'invitee_status',
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
      filterMultiple: false,
      render: (status) => (
        <Tag color={status ? 'green' : 'red'}>
          {status ? 'active' : 'inactive'}
        </Tag>
      ),
    },

    {
      title: 'Accepted',
      dataIndex: 'accepted',
      key: 'accepted',
      render: (text) =>
        text ? (
          <span style={{ color: 'green' }}>✔️</span>
        ) : (
          <span style={{ color: 'red' }}>❌</span>
        ),
    },
    {
      title: 'Invited at',
      dataIndex: 'created_at',
      key: 'created_at',
    },
  ];

  const handleTableChange = (pagination, filter, sorter) => {
    if (pagination.current !== currentPage) {
      dispatch(setInvitationsCurrentpage(pagination.current));
    }
    if (sorter) {
      let newSort = getSorterObject(sorter);
      setSort(newSort);
    }
    if (filter) {
      let obj;
      Object.keys(filter).forEach((key) => {
        if (filter[key]) {
          let new_obj = {
            ...obj,
            ['keyword']: filter[key][0],
          };
          obj = new_obj;
        }
      });
      setFilter(obj);
    }
  };

  const fetchInvitations = (pageParam, filterParam, sorterParam) => {
    setFetching(true);
    setPrevInvitationKeyword(keyword);

    let defaultFilter = {
      keyword,
      ...filter,
    };
    let params = {
      page: pageParam || currentPage,
      per_page: 10,
      filter: filterParam || defaultFilter,
      sort: sorterParam || sort,
    };
    setFetching(true);
    dispatch(
      getAllInvitations({
        params,
        callback: handleFetchAllInvitations,
        prevInvitationKeyword,
      })
    );
  };

  const handleFetchAllInvitations = () => {
    setLoading(false);
    setFetching(false);
  };

  useEffect(() => {
    if (data.length) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [history.location.pathname]);

  const handleKeywordFilter = (value) => {
    dispatch(setInvitationsKeyword(value));
  };

  useEffect(() => {
    fetchInvitations();
  }, [keyword, sort, filter, currentPage]);

  const renderConditionally = () => {
    if (loading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    } else {
      return (
        <div>
          <div style={{ width: '100%' }} className='card'>
            <Header
              handleKeywordFilter={handleKeywordFilter}
              keywordValue={keyword}
            />
            <div className='card-body'>
              <AntTable
                dataSource={data}
                columns={columns}
                rowKey={(record) => record.id}
                pagination={{
                  pageSize: 10,
                  total,
                  showSizeChanger: false,
                  current: currentPage,
                }}
                onChange={handleTableChange}
                loading={fetching}
              />
            </div>
          </div>
        </div>
      );
    }
  };
  return renderConditionally();
});

export default withRouter(Invitations);
