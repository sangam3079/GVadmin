import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Tag } from 'antd';

import { getSorterObject } from 'utils/helpers';
import AntTable from 'cleanComponents/Table/Table';
import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinner/Spinner';
import CustomLayout from '../../components/CustomLayout/CustomLayout';
import { getAllRedemptions } from 'services/redemptions';
import {
  setRedemptionsKeyword,
  setRedemptionsCurrentpage,
} from 'store/actions/Redemptions/RedemptionsAction';

const Redemptions = React.memo(({ history }) => {
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState();
  const [filter, setFilter] = useState();
  const [prevRedemptionKeyword, setPrevRedemptionKeyword] = useState(undefined);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.Redemptions.data);
  const total = useSelector((state) => state.Redemptions.total);
  const keyword = useSelector((state) => state.Redemptions.keyword);
  const currentPage = useSelector((state) => state.Redemptions.currentPage);

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user_email',
      render: (user) => user.email,
    },
    {
      title: 'Title',
      dataIndex: 'promo_code',
      key: 'title',
      render: (promo_code) => promo_code.title,
    },

    {
      title: 'Code',
      dataIndex: 'promo_code',
      key: 'code',
      render: ({ code }) => code,
    },
    {
      title: 'Subscription days',
      dataIndex: 'promo_code',
      key: 'days',
      render: ({ subscription_days }) => subscription_days,
    },
    {
      title: 'Status',
      dataIndex: 'promo_code',
      key: 'status',
      render: ({ status }) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>{status}</Tag>
      ),
    },

    {
      title: 'Remarks',
      dataIndex: 'promo_code',
      key: 'remarks',
      render: ({ remarks }) => remarks,
    },
    {
      title: 'Redeemed at',
      dataIndex: 'created_at',
      key: 'created_at',
    },
  ];

  const handleTableChange = (pagination, filter, sorter) => {
    if (pagination.current !== currentPage) {
      dispatch(setRedemptionsCurrentpage(pagination.current));
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
            [key]: filter[key][0],
          };
          obj = new_obj;
        }
      });
      setFilter(obj);
    }
  };

  const fetchRedemptions = (pageParam, filterParam, sorterParam) => {
    setFetching(true);

    setPrevRedemptionKeyword(keyword);

    let defaultFilter = {
      keyword,
    };
    let params = {
      page: pageParam || currentPage,
      per_page: 10,
      filter: filterParam || defaultFilter,
      sort: sorterParam || sort,
    };
    setFetching(true);
    dispatch(
      getAllRedemptions({
        params,
        callback: handleFetchAllRedemptions,
        prevRedemptionKeyword,
      })
    );
  };

  const handleFetchAllRedemptions = () => {
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
    dispatch(setRedemptionsKeyword(value));
  };

  useEffect(() => {
    fetchRedemptions();
  }, [keyword, sort, currentPage]);

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

export default withRouter(Redemptions);
