import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Tag, Divider } from 'antd';
import { withRouter } from 'react-router-dom';
import {
  PlusCircleFilled,
  EditOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { getSorterObject } from 'utils/helpers';
import AntTable from 'cleanComponents/Table/Table';
import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinner/Spinner';
import Can from 'config/can';
import CustomLayout from '../../components/CustomLayout/CustomLayout';

import { getAllPromoCodes, promoCodeDelete } from 'services/promoCodes';
import {
  setPromoCodes,
  setPromoCodesKeyword,
  setPromoCodesCurrentpage,
} from 'store/actions/PromoCodes/PromoCodesAction';

const PromoCodes = React.memo(
  ({ history, dispatch, data, total, currentPage, keyword }) => {
    const { confirm } = Modal;
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState();
    const [filter, setFilter] = useState();

    const [prevPromoKeyword, setPrevPromoKeyword] = useState(undefined);

    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        sorter: true,
      },
      {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: 'Description',
        dataIndex: 'remarks',
        key: 'remarks',
      },
      {
        title: 'Redeem Count',
        dataIndex: 'redeemed_count',
        key: 'redeemed_count',
      },
      {
        title: 'Subscription Days',
        dataIndex: 'subscription_days',
        key: 'subscription_days',
      },
      {
        title: 'Expiry Date',
        dataIndex: 'end_date',
        key: 'expiry_date',
        render: (text) => (text ? text : '-'),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text) => (
          <Tag color={text === 'active' ? 'green' : 'red'}>{text}</Tag>
        ),
      },
      {
        title: 'Options',
        dataIndex: 'options',
        key: 'options',
        render: (record, row) => {
          return (
            <div>
              <Can I='edit' a='promo-codes' passThrough>
                {(can) => {
                  return (
                    <EditOutlined
                      className={can ? 'text-primary' : 'text-muted'}
                      onClick={can ? () => editPromoCodes(row.id) : null}
                      title='Edit promo-codes'
                    />
                  );
                }}
              </Can>
              <Divider type='vertical' />
              <Can I='delete' a='promo-codes' passThrough>
                {(can) => {
                  return (
                    <DeleteOutlined
                      className='text-danger'
                      onClick={() => showDeleteConfirm(row.id)}
                      title='Delete Promo'
                    />
                  );
                }}
              </Can>
            </div>
          );
        },
      },
    ];

    const handleTableChange = (pagination, filter, sorter) => {
      if (pagination.current !== currentPage) {
        dispatch(setPromoCodesCurrentpage(pagination.current));
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

    const fetchPromoCodes = (pageParam, filterParam, sorterParam) => {
      setFetching(true);
      setPrevPromoKeyword(keyword);
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
        getAllPromoCodes({
          params,
          callback: handleFetchAllPromoCodes,
          prevPromoKeyword,
        })
      );
    };

    const handleFetchAllPromoCodes = () => {
      setLoading(false);
      setFetching(false);
    };

    const editPromoCodes = (id) => {
      let promoCodes = data.filter((promo) => promo.id === id)[0];
      dispatch(setPromoCodes(promoCodes));
      history.push(`/promos/promo-codes/${id}/edit`);
    };

    const addPromoCode = () => {
      dispatch(setPromoCodes({}));
      history.push('/promos/promo-codes/new');
    };

    const deletePromoCode = (id) => {
      setFetching(true);
      dispatch(promoCodeDelete({ id, callback: handleDeletePromoCallback }));
    };

    const showDeleteConfirm = (id) => {
      confirm({
        title: 'Are you sure delete this Promo?',
        icon: <ExclamationCircleOutlined />,
        content: 'This action cannot be undone.',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          deletePromoCode(id);
        },
        onCancel() {
          console.info('Cancel');
        },
      });
    };

    const handleDeletePromoCallback = () => {
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
      dispatch(setPromoCodesKeyword(value));
    };

    useEffect(() => {
      fetchPromoCodes();
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
                button={
                  <Can I='create' a='promo-codes' passThrough>
                    {(can) => {
                      return (
                        <Button
                          onClick={addPromoCode}
                          disabled={!can}
                          type='primary'
                        >
                          <span className='px-2'>
                            <PlusCircleFilled />
                          </span>
                          Generate New Promo
                        </Button>
                      );
                    }}
                  </Can>
                }
              />
              <div className='card-body'>
                <AntTable
                  dataSource={data}
                  columns={columns}
                  rowKey={(record) => record.id}
                  pagination={{
                    pageSize: 10,
                    total: total,
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
  }
);

const mapStateToProps = (state) => {
  return {
    data: state.PromoCodes.data,
    total: state.PromoCodes.total,
    currentPage: state.PromoCodes.currentPage,
    keyword: state.PromoCodes.keyword,
  };
};

export default connect(mapStateToProps)(withRouter(PromoCodes));
